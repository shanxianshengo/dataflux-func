# -*- coding: utf-8 -*-

# Builtin Modules
import re
import math

# 3rd-party Modules
import psutil
from celery.schedules import crontab as celery_crontab
from kombu import Queue

# Project Modules
from worker.utils import yaml_resources, toolkit

CONFIG = yaml_resources.get('CONFIG')

# 队列名与路由名相同
def create_queue(queue_name):
    return Queue(queue_name, routing_key=queue_name)

'''
Some fixed Celery configs
'''

# Worker
worker_concurrency = CONFIG['_WORKER_CONCURRENCY']
if worker_concurrency == 'auto':
    memory_gb = math.ceil(psutil.virtual_memory().total / 1024 / 1024 / 1024)
    if memory_gb < 3:
        worker_concurrency = 3
    elif memory_gb > 10:
        worker_concurrency = 10
    else:
        worker_concurrency = memory_gb

worker_prefetch_multiplier = CONFIG['_WORKER_PREFETCH_MULTIPLIER']
worker_max_tasks_per_child = CONFIG['_WORKER_MAX_TASKS_PER_CHILD']

# Worker log
worker_hijack_root_logger  = False
worker_log_color           = False
worker_redirect_stdouts    = False

# Broker
broker_transport_options = {
    'priority_steps'      : list(range(4)), # 0=system, 1=high, 2=medium, 3=low
    'queue_order_strategy': 'priority',
}

# Queue
task_default_queue       = toolkit.get_worker_queue(CONFIG['_WORKER_DEFAULT_QUEUE'])
task_default_routing_key = task_default_queue
task_queues = [
    create_queue(task_default_queue),
]

# Task
task_routes = {
    # '<Task Name>': {'queue': toolkit.get_worker_queue('<Queue Name>')},
}

imports = [
    'worker.tasks.webhook',
    'worker.tasks.internal',

    'worker.tasks.example',
]

# Beat
beat_schedule = {}

# Job serialization
task_serializer   = 'json'
result_serializer = 'json'
accept_content    = ['json']

# Time zone
enable_utc = True
timezone   = 'Asia/Shanghai'

# Result
result_expires = 3600

########## Content for YOUR project below ##########
# Queue
for i in range(CONFIG['_WORKER_QUEUE_COUNT']):
    # 自动生成队列
    q = toolkit.get_worker_queue(str(i))
    task_queues.append(create_queue(q))

# Task
imports.append('worker.tasks.main')

# Route
task_routes.update({
    'Main.*': {
        'queue': toolkit.get_worker_queue(CONFIG['_WORKER_DEFAULT_QUEUE'])
    },
})

# Beat
def create_schedule(crontab_expr):
    splited = crontab_expr.split(' ')
    kwargs = {
        'minute'       : splited[0],
        'hour'         : splited[1],
        'day_of_month' : splited[2],
        'month_of_year': splited[3],
        'day_of_week'  : splited[4],
    }
    return celery_crontab(**kwargs)

# 自动触发配置启动器
beat_schedule['run-crontab-starter'] = {
    'task'    : 'Main.CrontabStarter',
    'schedule': create_schedule(CONFIG['_CRONTAB_STARTER']),
}

# 缓存数据刷入数据库
beat_schedule['run-sync-cache'] = {
    'task'    : 'Main.SyncCache',
    'schedule': create_schedule(CONFIG['_CRONTAB_SYNC_CACHE']),
}

# 自动清理
beat_schedule['run-auto-clean'] = {
    'task'    : 'Main.AutoClean',
    'schedule': create_schedule(CONFIG['_CRONTAB_AUTO_CLEAN']),
}

# 数据库自动备份
beat_schedule['run-auto-backup-db'] = {
    'task'    : 'Main.AutoBackupDB',
    'schedule': create_schedule(CONFIG['_CRONTAB_AUTO_BACKUP_DB']),
}

# 工作队列压力恢复
beat_schedule['run-reset-worker-queue-pressure'] = {
    'task'    : 'Main.ResetWorkerQueuePressure',
    'schedule': create_schedule(CONFIG['_CRONTAB_RESET_WORKER_QUEUE_PRESSURE']),
}

# 重新加载数据MD5缓存
beat_schedule['run-reload-data-md5-cache'] = {
    'task'    : 'Main.ReloadDataMD5Cache',
    'kwargs'  : { 'lockTime': 15, 'all': True },
    'schedule': create_schedule(CONFIG['_CRONTAB_RELOAD_DATA_MD5_CACHE']),
}

##### 功能关闭 #####

# 关闭数据库自动备份
if CONFIG['_DISABLE_DB_AUTO_BACKUP']:
    beat_schedule.pop('run-auto-backup-db', None)

##### 系统任务默认最高优先级 #####
for t, opt in beat_schedule.items():
    if 'options' not in opt:
        opt['options'] = {}

    opt['options']['priority'] = 0
