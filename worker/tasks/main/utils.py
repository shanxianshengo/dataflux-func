# -*- coding: utf-8 -*-

'''
杂项任务
包含各类清理类任务、AutoCleanTask各类数据定时同步任务、数据源检查/调试任务等
'''

# Builtin Modules
import traceback
import pprint
import os
import textwrap

# 3rd-party Modules
import six
import arrow

# Project Modules
from worker import app
from worker.utils import toolkit, yaml_resources
from worker.tasks import gen_task_id
from worker.tasks.main import decipher_data_source_config_fields
from worker.utils.extra_helpers import HexStr
from worker.utils.extra_helpers import format_sql_v2 as format_sql

# Current Module
from worker.tasks import BaseTask
from worker.tasks.main import func_runner, DATA_SOURCE_HELPER_CLASS_MAP

CONFIG     = yaml_resources.get('CONFIG')
IMAGE_INFO = yaml_resources.get('IMAGE_INFO')

SQL_STR_TYPE_KEYWORDS = { 'char', 'text', 'blob' }

DEFAULT_TASK_INFO_LIMIT_MAP = {
    'authLink'   : CONFIG['_TASK_INFO_DEFAULT_LIMIT_AUTH_LINK'],
    'crontab'    : CONFIG['_TASK_INFO_DEFAULT_LIMIT_CRONTAB'],
    'batch'      : CONFIG['_TASK_INFO_DEFAULT_LIMIT_BATCH'],
    'integration': CONFIG['_TASK_INFO_DEFAULT_LIMIT_INTEGRATION'],
}

# Main.ReloadDataMD5Cache
class ReloadDataMD5CacheTask(BaseTask):
    '''
    数据MD5缓存任务
    '''

    META = {
        'script': {
            'table'   : 'biz_main_script',
            'md5Field': "IFNULL(`codeMD5`, 'x')",
        },
        'dataSource': {
            'table'   : 'biz_main_data_source',
            'md5Field': "MD5(`configJSON`)",
        },
        'envVariable': {
            'table'   : 'biz_main_env_variable',
            'md5Field': "MD5(CONCAT(valueTEXT, '|', autoTypeCasting))"
        },
    }

    def cache_data_md5(self, data_type, data_id=None):
        meta = self.META.get(data_type)

        sql = '''
            SELECT `id`, ? AS `md5` FROM ??
            '''
        sql_params = [ meta['md5Field'], meta['table'] ]

        if data_id:
            data_id = toolkit.as_array(data_id)

            sql += '''
                WHERE `id` IN (?)
                '''
            sql_params.append(data_id)

        db_res = self.db.query(sql, sql_params)

        data_md5_map = dict([ ( d['id'], d['md5'] ) for d in db_res ])

        data_md5_cache_key = toolkit.get_cache_key('cache', 'dataMD5Cache', ['dataType', data_type])

        # 不指定ID表示全部重建
        if not data_id:
            self.cache_db.delete(data_md5_cache_key)

        if data_md5_map:
            # 有数据 -> 建立缓存
            self.cache_db.hmset(data_md5_cache_key, data_md5_map)

        elif data_id:
            # 无数据 + 指定ID -> 清除缓存
            self.cache_db.hdel(data_md5_cache_key, data_id)

@app.task(name='Main.ReloadDataMD5Cache', bind=True, base=ReloadDataMD5CacheTask)
def reload_data_md5_cache(self, *args, **kwargs):
    lock_time  = kwargs.get('lockTime') or 0
    reload_all = kwargs.get('all')      or False
    data_type  = kwargs.get('type')
    data_id    = kwargs.get('id')

    # 根据参数确定是否需要上锁
    if isinstance(lock_time, (int, float)) and lock_time > 0:
        self.lock(max_age=int(lock_time))

    # 将数据MD5缓存入Redis
    if reload_all:
        for data_type in self.META.keys():
            self.cache_data_md5(data_type)

    else:
        self.cache_data_md5(data_type, data_id)

# Main.SyncCache
class SyncCache(BaseTask):
    def sync_func_call_count(self):
        data = []

        # 搜集数据
        cache_key = toolkit.get_cache_key('syncCache', 'funcCallInfo')
        for i in range(CONFIG['_SYNC_CACHE_BULK_COUNT']):
            cache_res = self.cache_db.run('rpop', cache_key)
            if not cache_res:
                break

            try:
                cache_res = toolkit.json_loads(cache_res)
            except Exception as e:
                for line in traceback.format_exc().splitlines():
                    self.logger.error(line)
            else:
                data.append(cache_res)

        # 归类计算
        count_map = {}
        for d in data:
            func_id   = d['funcId']
            timestamp = d.get('timestamp')

            # 时间戳按照分钟对齐（减少内部时序数据存储压力）
            timestamp = int(int(timestamp) / 60) * 60

            pk = '~'.join([func_id, str(timestamp)])
            if pk not in count_map:
                count_map[pk] = {
                    'funcId'   : func_id,
                    'timestamp': timestamp,
                    'count'    : 0
                }

            count_map[pk]['count'] += 1

        # 写入时序数据
        for pk, c in count_map.items():
            cache_key = toolkit.get_server_cache_key('monitor', 'sysStats', ['metric', 'funcCallCount', 'funcId', c['funcId']]);

            self.cache_db.ts_add(cache_key, c['count'], timestamp=c['timestamp'], mode='addUp')

    def sync_script_running_info(self):
        data = []

        # 搜集数据
        cache_key = toolkit.get_cache_key('syncCache', 'scriptRunningInfo')
        for i in range(CONFIG['_SYNC_CACHE_BULK_COUNT']):
            cache_res = self.cache_db.run('rpop', cache_key)
            if not cache_res:
                break

            try:
                cache_res = toolkit.json_loads(cache_res)
            except Exception as e:
                for line in traceback.format_exc().splitlines():
                    self.logger.error(line)
            else:
                data.append(cache_res)

        # 计算最新版本号
        func_latest_version_map = {}
        for d in data:
            func_id                = d['funcId']
            script_publish_version = d['scriptPublishVersion']

            if func_id not in func_latest_version_map:
                func_latest_version_map[func_id] = script_publish_version
            else:
                func_latest_version_map[func_id] = max(script_publish_version, func_latest_version_map[func_id])

        # 分类计算
        data_map = {}
        for d in data:
            func_id                = d['funcId']
            script_publish_version = d['scriptPublishVersion']
            exec_mode              = d['execMode']
            is_failed              = d['isFailed']
            cost                   = d['cost']
            timestamp              = d.get('timestamp')

            if not timestamp:
                continue

            latest_version = func_latest_version_map.get(func_id)
            if latest_version and script_publish_version < latest_version:
                continue

            if exec_mode is None:
                exec_mode = 'sync'

            pk = '~'.join([func_id, str(script_publish_version), exec_mode])
            if pk not in data_map:
                data_map[pk] = {
                    'funcId'              : func_id,
                    'scriptPublishVersion': script_publish_version,
                    'execMode'            : exec_mode,
                }

            if 'succeedCount' not in data_map[pk]:
                data_map[pk]['succeedCount'] = 0

            if 'failCount' not in data_map[pk]:
                data_map[pk]['failCount'] = 0

            data_map[pk]['latestFailTimestamp']    = None
            data_map[pk]['latestSucceedTimestamp'] = None

            if is_failed:
                data_map[pk]['failCount']           += 1
                data_map[pk]['latestFailTimestamp'] = timestamp
                data_map[pk]['status']              = 'failed'
            else:
                data_map[pk]['succeedCount']           += 1
                data_map[pk]['latestSucceedTimestamp'] = timestamp
                data_map[pk]['status']                 = 'succeeded'

            if 'minCost' not in data_map[pk]:
                data_map[pk]['minCost'] = cost
            else:
                data_map[pk]['minCost'] = min(data_map[pk]['minCost'], cost)

            if 'maxCost' not in data_map[pk]:
                data_map[pk]['maxCost'] = cost
            else:
                data_map[pk]['maxCost'] = max(data_map[pk]['maxCost'], cost)

            if 'totalCost' not in data_map[pk]:
                data_map[pk]['totalCost'] = cost
            else:
                data_map[pk]['totalCost'] += cost

            data_map[pk]['latestCost'] = cost

        # 分类入库
        for pk, d in data_map.items():
            func_id                = d['funcId']
            script_publish_version = d['scriptPublishVersion']
            exec_mode              = d['execMode']

            sql = '''
                SELECT
                     `succeedCount`
                    ,`failCount`
                    ,`minCost`
                    ,`maxCost`
                    ,`totalCost`
                    ,`latestCost`
                    ,UNIX_TIMESTAMP(`latestSucceedTime`) AS `latestSucceedTimestamp`
                    ,UNIX_TIMESTAMP(`latestFailTime`)    AS `latestFailTimestamp`
                    ,`status`
                FROM biz_rel_func_running_info
                WHERE
                        `funcId`               = ?
                    AND `scriptPublishVersion` = ?
                    AND `execMode`             = ?
                LIMIT 1
                '''
            sql_params = [
                func_id,
                script_publish_version,
                exec_mode,
            ]
            prev_info = self.db.query(sql, sql_params)

            # 删除已过时记录

            if not prev_info:
                # 无记录，则补全记录
                sql = '''
                    INSERT IGNORE INTO biz_rel_func_running_info
                    SET
                       `funcId`               = ?
                      ,`scriptPublishVersion` = ?
                      ,`execMode`             = ?

                      ,`succeedCount`      = ?
                      ,`failCount`         = ?
                      ,`minCost`           = ?
                      ,`maxCost`           = ?
                      ,`totalCost`         = ?
                      ,`latestCost`        = ?
                      ,`latestSucceedTime` = FROM_UNIXTIME(?)
                      ,`latestFailTime`    = FROM_UNIXTIME(?)
                      ,`status`            = ?
                '''
                sql_params = [
                    func_id,
                    script_publish_version,
                    exec_mode,

                    d['succeedCount'],
                    d['failCount'],
                    d['minCost'],
                    d['maxCost'],
                    d['totalCost'],
                    d['latestCost'],
                    d['latestSucceedTimestamp'],
                    d['latestFailTimestamp'],
                    d['status'],
                ]
                self.db.query(sql, sql_params)

            else:
                prev_info = prev_info[0]

                # 有记录，合并
                sql = '''
                    UPDATE biz_rel_func_running_info
                    SET
                         `succeedCount`      = ?
                        ,`failCount`         = ?
                        ,`minCost`           = ?
                        ,`maxCost`           = ?
                        ,`totalCost`         = ?
                        ,`latestCost`        = ?
                        ,`latestSucceedTime` = FROM_UNIXTIME(?)
                        ,`latestFailTime`    = FROM_UNIXTIME(?)
                        ,`status`            = ?

                    WHERE
                            `funcId`               = ?
                        AND `scriptPublishVersion` = ?
                        AND `execMode`             = ?
                    LIMIT 1
                '''
                sql_params = [
                    d['succeedCount'] + (prev_info['succeedCount'] or 0),
                    d['failCount']    + (prev_info['failCount']    or 0),
                    min(filter(lambda x: x is not None, (d['minCost'], prev_info['minCost']))),
                    max(filter(lambda x: x is not None, (d['maxCost'], prev_info['maxCost']))),
                    d['totalCost'] + (prev_info['totalCost'] or 0),
                    d['latestCost'],
                    d['latestSucceedTimestamp'] or prev_info['latestSucceedTimestamp'],
                    d['latestFailTimestamp']    or prev_info['latestFailTimestamp'],
                    d['status'],

                    func_id,
                    script_publish_version,
                    exec_mode,
                ]
                self.db.query(sql, sql_params)

        # 删除过时数据
        for func_id, latest_version in func_latest_version_map.items():
            sql = '''
                DELETE FROM biz_rel_func_running_info
                WHERE
                        `funcId`                                      =  ?
                    AND `scriptPublishVersion`                        != ?
                    OR  UNIX_TIMESTAMP() - UNIX_TIMESTAMP(updateTime) >  ?
                '''
            sql_params = [
                func_id,
                latest_version,
                3600 * 24 * 30,
            ]
            self.db.query(sql, sql_params)

    def sync_task_info(self):
        data = []

        # 搜集数据
        cache_key = toolkit.get_cache_key('syncCache', 'taskInfoBuffer')
        for i in range(CONFIG['_SYNC_CACHE_BULK_COUNT']):
            cache_res = self.cache_db.run('rpop', cache_key)
            if not cache_res:
                break

            try:
                cache_res = toolkit.json_loads(cache_res)
            except Exception as e:
                for line in traceback.format_exc().splitlines():
                    self.logger.error(line)
            else:
                data.append(cache_res)

        # 搜集任务记录限额
        task_info_limit_map = {}
        for d in data:
            origin    = d.get('origin')
            origin_id = d.get('originId')

            default_task_info_limit = DEFAULT_TASK_INFO_LIMIT_MAP.get(origin) or 0
            task_info_limit         = d.get('taskInfoLimit') or default_task_info_limit
            task_info_limit_map[origin_id] = task_info_limit

            # 写入数据库
            if task_info_limit > 0:
                _data = {
                    'id'            : d['id'],
                    'originId'      : d['originId'],
                    'rootTaskId'    : d['rootTaskId'],
                    'funcId'        : d['funcId'],
                    'execMode'      : d['execMode'],
                    'status'        : d['status'],
                    'triggerTimeMs' : d['triggerTimeMs'],
                    'startTimeMs'   : d['startTimeMs'],
                    'endTimeMs'     : d['endTimeMs'],
                    'logMessageTEXT': d.get('logMessageTEXT'),
                    'einfoTEXT'     : d.get('einfoTEXT'),
                    'edumpTEXT'     : d.get('edumpTEXT'),
                }
                sql = '''
                    INSERT IGNORE INTO biz_main_task_info
                    SET ?
                '''
                sql_params = [ _data ]
                self.db.query(sql, sql_params)

        # 数据回卷
        for origin_id, task_info_limit in task_info_limit_map.items():
            sql = '''
                SELECT
                    seq AS expiredMaxSeq
                FROM biz_main_task_info
                WHERE
                    originId = ?
                ORDER BY
                    seq DESC
                LIMIT ?, 1
            '''
            sql_params = [ origin_id, task_info_limit ]
            db_res = self.db.query(sql, sql_params)

            if db_res:
                expired_max_seq = db_res[0]['expiredMaxSeq']
                sql = '''
                    DELETE FROM biz_main_task_info
                    WHERE
                            seq      <= ?
                        AND originId =  ?
                '''
                sql_params = [ expired_max_seq, origin_id ]
                self.db.query(sql, sql_params)

@app.task(name='Main.SyncCache', bind=True, base=SyncCache)
def sync_cache(self, *args, **kwargs):
    # 上锁
    self.lock(max_age=30)

    # 函数调用计数刷入数据库
    try:
        self.sync_func_call_count()
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

    # 脚本运行信息刷入数据库
    try:
        self.sync_script_running_info()
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

    # 自动触发配置/批处理任务记录刷入数据库
    try:
        self.sync_task_info()
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

# Main.AutoClean
class AutoCleanTask(BaseTask):
    def _delete_by_seq(self, table, seq, include=True):
        if seq <= 0:
            return

        if not include:
            seq = seq - 1

        sql = '''
            DELETE FROM ??
            WHERE
                `seq` <= ?;
            '''
        sql_params = [table, seq]
        self.db.query(sql, sql_params)

    def clear_table_by_limit(self, table, limit):
        sql = '''
            SELECT
                MAX(`seq`) AS maxSeq
            FROM ??
            '''
        sql_params = [ table ]
        db_res = self.db.query(sql, sql_params)
        if not db_res:
            return

        max_seq = db_res[0]['maxSeq'] or 0
        if not max_seq:
            return

        delete_from_seq = max(max_seq - limit, 0)
        self._delete_by_seq(table, delete_from_seq, include=True)

    def clear_table_by_expires(self, table, expires):
        delete_from_seq = 0

        # 开始SEQ
        sql = '''
            SELECT
                MIN(seq) AS seq
            FROM ??
            '''
        sql_params = [ table ]
        res = self.db.query(sql, sql_params)
        if not res:
            return

        start_seq = res[0]['seq'] or 0
        if not start_seq:
            return

        # 结束SEQ
        sql = '''
            SELECT
                MAX(seq) AS seq
            FROM ??
            '''
        sql_params = [ table ]
        res = self.db.query(sql, sql_params)
        if not res:
            return

        end_seq = res[0]['seq'] or 0
        if not end_seq:
            return

        # 分组查询
        MAX_TRY = 30
        GROUPS  = 20

        check_seq_list = None
        for i in range(MAX_TRY):
            # 分组采样
            next_check_seq_list = list(range(start_seq, end_seq, int((end_seq - start_seq) / GROUPS) or 1))
            next_check_seq_list.extend([start_seq, end_seq])     # 添加端点
            next_check_seq_list = list(set(next_check_seq_list)) # 去重
            next_check_seq_list = sorted(next_check_seq_list)    # 排序

            if check_seq_list == next_check_seq_list:
                delete_from_seq = check_seq_list[0]
                break

            check_seq_list = next_check_seq_list

            sql = '''
                    SELECT
                        seq,
                        createTime,
                        UNIX_TIMESTAMP() - UNIX_TIMESTAMP(createTime) AS elapse
                    FROM ??
                    WHERE
                        seq IN (?)
                    ORDER BY
                        seq ASC
                '''
            sql_params = [ table, check_seq_list ]
            res = self.db.query(sql, sql_params)
            for d in res:
                if d['elapse'] > expires:
                    if d['seq'] > start_seq:
                        start_seq = d['seq']
                else:
                    if d['seq'] < end_seq:
                        end_seq = d['seq']

        if not delete_from_seq and check_seq_list:
            delete_from_seq = check_seq_list[0]

        if delete_from_seq:
            self._delete_by_seq(table, delete_from_seq, include=False)

    def clear_table(self, table):
        sql = '''TRUNCATE ??'''
        sql_params = [table]
        self.db.query(sql, sql_params)

    def clear_cache_key(self, cache_key):
        self.cache_db.delete(cache_key)

    def clear_cache_key_pattern(self, pattern):
        self.cache_db.del_by_pattern(pattern)

    def clear_temp_file(self, folder):
        limit_timestamp = f"{arrow.get().format('YYYYMMDDHHmmss')}_"

        temp_dir = os.path.join(CONFIG['RESOURCE_ROOT_PATH'], folder)
        if not os.path.exists(temp_dir):
            return

        for folder_path, _, file_names in os.walk(temp_dir):
            for file_name in file_names:
                if file_name < limit_timestamp:
                    file_path = os.path.join(folder_path, file_name)
                    os.remove(file_path)

    def clear_outdated_cache_key(self):
        origin_ids = set()

        # 集成函数自动触发配置永不过期
        origin_ids.add(CONFIG['_INTEGRATION_CRONTAB_CONFIG_ID'])

        # 自动触发配置ID
        sql = '''
            SELECT id FROM biz_main_crontab_config
            '''
        db_res = self.db.query(sql)
        for d in db_res:
            origin_ids.add(d['id'])

        # 批处理ID
        sql = '''
            SELECT id FROM biz_main_batch
            '''
        db_res = self.db.query(sql)
        for d in db_res:
            origin_ids.add(d['id'])

        # 获取所有任务信息Key
        cache_pattern = toolkit.get_cache_key('syncCache', 'taskInfo', tags=[ 'originId', '*' ])
        cache_res = self.cache_db.keys(cache_pattern)
        for cache_key in cache_res:
            cache_key_info = toolkit.parse_cache_key(cache_key)

            if cache_key_info['tags']['originId'] not in origin_ids:
                self.cache_db.delete(cache_key)

    def clear_deprecated_data(self):
        self.clear_table('biz_main_script_log')
        self.clear_table('biz_main_script_failure')
        self.clear_table('biz_main_batch_task_info')
        self.clear_table('biz_main_crontab_task_info')
        self.clear_cache_key(toolkit.get_cache_key('syncCache', 'scriptFailure'))
        self.clear_cache_key(toolkit.get_cache_key('syncCache', 'scriptLog'))
        self.clear_cache_key(toolkit.get_cache_key('syncCache', 'taskInfo'))
        self.clear_cache_key_pattern(toolkit.get_cache_key('syncCache', 'taskInfo', tags=[ 'originId', '*' ]))

@app.task(name='Main.AutoClean', bind=True, base=AutoCleanTask)
def auto_clean(self, *args, **kwargs):
    # 上锁
    self.lock(max_age=30)

    # 回卷数据库数据
    table_limit_map = CONFIG['_DBDATA_TABLE_LIMIT_MAP']
    for table, limit in table_limit_map.items():
        try:
            self.clear_table_by_limit(table=table, limit=int(limit))
        except Exception as e:
            for line in traceback.format_exc().splitlines():
                self.logger.error(line)

    table_expire_map = CONFIG['_DBDATA_TABLE_EXPIRE_MAP']
    for table, expires in table_expire_map.items():
        try:
            self.clear_table_by_expires(table=table, expires=int(expires))
        except Exception as e:
            for line in traceback.format_exc().splitlines():
                self.logger.error(line)

    # 清理临时目录
    try:
        self.clear_temp_file(CONFIG['UPLOAD_TEMP_ROOT_FOLDER'])
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

    try:
        self.clear_temp_file(CONFIG['DOWNLOAD_TEMP_ROOT_FOLDER'])
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

    # 清理过时的缓存
    try:
        self.clear_outdated_cache_key()
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

    # 清楚已弃用功能的数据
    try:
        self.clear_deprecated_data()
    except Exception as e:
        for line in traceback.format_exc().splitlines():
            self.logger.error(line)

# Main.AutoRun
class AutoRunTask(BaseTask):
    def get_integrated_auto_run_funcs(self):
        sql = '''
            SELECT
               `func`.`id`
            FROM biz_main_func AS `func`
            WHERE
                   `func`.`integration` = 'autoRun'
                AND JSON_EXTRACT(`func`.`extraConfigJSON`, '$.integrationConfig.onLaunch') = TRUE;
            '''
        return self.db.query(sql)

@app.task(name='Main.AutoRun', bind=True, base=AutoRunTask)
def auto_run(self, *args, **kwargs):
    # 上锁
    self.lock(max_age=30)

    # 获取函数功能集成自动运行函数
    integrated_auto_run_funcs = self.get_integrated_auto_run_funcs()
    for f in integrated_auto_run_funcs:
        # 任务ID
        task_id = gen_task_id()

        # 任务参数
        task_kwargs = {
            'funcId'  : f['id'],
            'origin'  : 'integration',
            'execMode': 'async',
            'queue'   : CONFIG['_FUNC_TASK_DEFAULT_QUEUE'],
        }

        # 自动运行总是使用默认队列
        queue = toolkit.get_worker_queue(CONFIG['_FUNC_TASK_DEFAULT_QUEUE'])

        func_runner.apply_async(task_id=task_id, kwargs=task_kwargs, queue=queue)

# Main.AutoBackupDB
class AutoBackupDBTask(BaseTask):
    def get_tables(self):
        # 查询需要导出的表
        tables = []

        sql = '''SHOW TABLES'''
        db_res = self.db.query(sql)
        for d in db_res:
            t = list(d.values())[0]

            # 避免备份到迁移数据
            t_lower = t.lower()
            if not t_lower.startswith('biz_') and not t_lower.startswith('wat_'):
                continue

            tables.append(t)

        return tables

    def get_table_dump_parts(self, table):
        table_dumps_parts = []

        # 删除表
        sql = '''DROP TABLE IF EXISTS `??`'''
        sql_params = [ table ]
        table_dumps_parts.append(format_sql(sql, sql_params) + ';')

        # 获取表创建语句
        sql = '''SHOW CREATE TABLE `??`'''
        sql_params = [ table ]
        db_res = self.db.query(sql, sql_params);
        if not db_res:
            return

        table_dumps_parts.append(db_res[0]['Create Table'] + ';')

        # 限制数据量的表不备份数据

        if table in CONFIG['_DBDATA_TABLE_LIMIT_MAP'] \
            or table in CONFIG['_DBDATA_TABLE_EXPIRE_MAP']:
            return table_dumps_parts

        # 无数据的表不备份数据
        sql = '''SELECT * FROM `??` LIMIT 1'''
        sql_params = [ table ]
        db_res = self.db.query(sql, sql_params)
        if not db_res:
            return table_dumps_parts

        # 获取表结构
        field_type_map = {}

        sql = '''DESCRIBE `??`'''
        sql_params = [ table ]
        db_res = self.db.query(sql, sql_params)
        for d in db_res:
            field      = d['Field']
            field_type = d['Type'].lower()
            if field_type == 'json':
                field_type_map[field] = 'json'
            else:
                for type_keyword in SQL_STR_TYPE_KEYWORDS:
                    if type_keyword in field_type:
                        field_type_map[field] = 'hexStr'
                        break
                else:
                    field_type_map[field] = 'normal'

        # 备份数据
        table_dumps_parts.append('');

        sql = '''LOCK TABLES `??` WRITE'''
        sql_params = [ table ]
        table_dumps_parts.append(format_sql(sql, sql_params) + ';')

        select_fields = []
        for f, t in field_type_map.items():
            if t == 'hexStr':
                select_fields.append('HEX(`{0}`) AS `{0}`'.format(f))
            else:
                select_fields.append(f)

        select_fields_sql = ', '.join(select_fields)

        seq = 0
        while True:
            sql = '''
                SELECT ??
                FROM `??`
                WHERE
                    `seq` > ?
                ORDER BY
                    `seq` ASC
                LIMIT 20
            '''
            sql_params = [ select_fields_sql, table, seq ]
            db_res = self.db.query(sql, sql_params)
            if not db_res:
                table_dumps_parts.append('''UNLOCK TABLES;''')
                break

            values = []
            for d in db_res:
                _d = []
                for f in field_type_map.keys():
                    v = d[f]
                    t = field_type_map[f]
                    if v is None:
                        _d.append(None)
                    else:
                        if t == 'hexStr':
                            _d.append(HexStr(v))
                        else:
                            _d.append(v)

                values.append(_d)

            insert_fields = []
            for f in field_type_map.keys():
                insert_fields.append('`{0}`'.format(f))

            insert_fields_sql = ', '.join(insert_fields)

            sql = '''INSERT INTO `??` (??)\nVALUES\n  ?'''
            sql_params = [ table, insert_fields_sql, values ]
            table_dumps_parts.append(format_sql(sql, sql_params, pretty=True) + ';')

            seq = db_res[-1]['seq']

        return table_dumps_parts

    def run_backup(self, tables):
        # 准备备份
        now = arrow.get().to('Asia/Shanghai')
        date_str = now.format('YYYYMMDD-HHmmss')
        dump_file_dir  = CONFIG['DB_AUTO_BACKUP_PATH']
        dump_file_name = f"{CONFIG['_DB_AUTO_BACKUP_PREFIX']}{date_str}{CONFIG['_DB_AUTO_BACKUP_EXT']}"
        dump_file_path = os.path.join(dump_file_dir, dump_file_name)

        # 保证目录
        os.makedirs(dump_file_dir, exist_ok=True)

        with open(dump_file_path, 'a') as _f:
            _f.write(textwrap.dedent(f'''
                    -- {'-' * 50}
                    -- DataFlux Func DB Backup
                    -- Date: {now.format('YYYY-MM-DD HH:mm:ss')}
                    -- Version: {IMAGE_INFO['CI_COMMIT_REF_NAME']}
                    -- {'-' * 50}
                ''').lstrip())
            for t in tables:
                table_dump_parts = self.get_table_dump_parts(t)
                if table_dump_parts:
                    table_dumps = '\n'.join(table_dump_parts) + '\n\n'
                    _f.write(table_dumps)

    def limit_backups(self):
        dump_file_dir = CONFIG['DB_AUTO_BACKUP_PATH']
        if not os.path.exists(dump_file_dir):
            return

        backup_file_names = []
        with os.scandir(dump_file_dir) as _dir:
            for _f in _dir:
                if _f.is_file() and _f.name.startswith(CONFIG['_DB_AUTO_BACKUP_PREFIX']) and _f.name.endswith(CONFIG['_DB_AUTO_BACKUP_EXT']):
                    backup_file_names.append(_f.name)

        backup_file_names.sort()
        if len(backup_file_names) > CONFIG['DB_AUTO_BACKUP_LIMIT']:
            for file_name in backup_file_names[0:-1 * CONFIG['DB_AUTO_BACKUP_LIMIT']]:
                file_path = os.path.join(dump_file_dir, file_name)
                os.remove(file_path)

@app.task(name='Main.AutoBackupDB', bind=True, base=AutoBackupDBTask)
def auto_backup_db(self, *args, **kwargs):
    # 上锁
    self.lock(max_age=60)

    # 需要导出的表
    tables = self.get_tables()

    # 导出
    self.run_backup(tables)

    # 自动删除旧备份
    self.limit_backups()

# Main.CheckDataSource
@app.task(name='Main.CheckDataSource', bind=True, base=BaseTask, soft_time_limit=3, time_limit=5)
def check_data_source(self, *args, **kwargs):
    self.logger.info('Main.CheckDataSource Task launched.')

    data_source_type   = kwargs.get('type')
    data_source_config = kwargs.get('config')

    # 检查数据源
    data_source_helper_class = DATA_SOURCE_HELPER_CLASS_MAP.get(data_source_type)
    if not data_source_helper_class:
        e = Exception('Unsupported DataSource type: `{}`'.format(data_source_type))
        raise e

    data_source_helper = data_source_helper_class(self.logger, config=data_source_config)

    data_source_helper.check()

# Main.QueryDataSource
@app.task(name='Main.QueryDataSource', bind=True, base=BaseTask, soft_time_limit=30, time_limit=35)
def query_data_source(self, *args, **kwargs):
    self.logger.info('Main.QueryDataSource Task launched.')

    data_source_id = kwargs.get('id')
    command        = kwargs.get('command')
    command_args   = kwargs.get('commandArgs')   or []
    command_kwargs = kwargs.get('commandKwargs') or {}
    return_type    = kwargs.get('returnType')    or 'json'

    data_source = None

    # 查询数据源
    sql = '''
        SELECT
            `type`,
            `configJSON`
        FROM biz_main_data_source
        WHERE
            `id` = ?
        '''
    sql_params = [data_source_id]
    db_res = self.db.query(sql, sql_params)
    if len(db_res) > 0:
        data_source = db_res[0]
        data_source['config'] = toolkit.json_loads(data_source['configJSON'])

    if not data_source:
        e = Exception('No such DataSource')
        raise e

    # 执行数据源命令
    data_source_type   = data_source.get('type')
    data_source_config = data_source.get('config')
    data_source_config = decipher_data_source_config_fields(data_source_config)

    data_source_helper_class = DATA_SOURCE_HELPER_CLASS_MAP.get(data_source_type)
    if not data_source_helper_class:
        e = Exception('Unsupported DataSource type: `{}`'.format(da))
        raise e

    # 解密字段
    data_source_helper = data_source_helper_class(self.logger, config=data_source_config)

    db_res = getattr(data_source_helper, command)(*command_args, **command_kwargs)

    ret = None
    if return_type == 'repr':
        ret = pprint.pformat(db_res, width=100)
    else:
        ret = db_res
    return ret

# Main.ResetWorkerQueuePressure
@app.task(name='Main.ResetWorkerQueuePressure', bind=True, base=BaseTask)
def reset_worker_queue_pressure(self, *args, **kwargs):
    # 上锁
    self.lock(max_age=30)

    for i in range(CONFIG['_WORKER_QUEUE_COUNT']):
        queue_key = toolkit.get_worker_queue(i)
        queue_length = self.cache_db.run('llen', queue_key)

        if not queue_length or int(queue_length) <= 0:
            cache_key = toolkit.get_server_cache_key('cache', 'workerQueuePressure', tags=['workerQueue', i])
            self.cache_db.run('set', cache_key, 0)
