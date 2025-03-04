'use strict';

/* Builtin Modules */
var path = require('path');
var http = require('http');
var fs   = require('fs-extra');

/* 3rd-party Modules */
var express    = require('express');
var bodyParser = require('body-parser');
var async      = require('async');
var yaml       = require('js-yaml');

/* Project Modules */
var toolkit = require('./utils/toolkit');

/* Load YAML resources */
var yamlResources = require('./utils/yamlResources');

var CONFIG       = null;
var USER_CONFIG  = null;
var UPGRADE_INFO = null;
var IMAGE_INFO   = require('../image-info.json');

var INSTALL_CHECKER_INTERVAL          = 3 * 1000;
var SYS_CONFIG_ID_CURRENT_UPGRADE_SEQ = 'upgrade.db.upgradeSeq';

// DB/Cache helper should load AFTER config is loaded.
var mysqlHelper = null;
var redisHelper = null;

// Setup error
var SetupErrorWrap = function() {
  this.errors = {}
};
SetupErrorWrap.prototype.set = function(key, title, error) {
  if (this.errors[key]) return;

  this.errors[key] = { title: title };
  if (error) {
    this.errors[key].error = error.toString();
  }
};
SetupErrorWrap.prototype.has = function(key) {
  return (key in this.errors);
};
SetupErrorWrap.prototype.hasError = function(key) {
  return Object.keys(this.errors).length > 0;
};
SetupErrorWrap.prototype.toJSON = function() {
  return this.errors;
};

function _doInstall(config, callback) {
  var config = toolkit.jsonCopy(config);

  var adminUserId         = 'u-admin';
  var adminUsername       = config.ADMIN_USERNAME;
  var adminPassword       = config.ADMIN_PASSWORD;
  var adminPasswordRepeat = config.ADMIN_PASSWORD_REPEAT;
  delete config.ADMIN_USERNAME;
  delete config.ADMIN_PASSWORD;
  delete config.ADMIN_PASSWORD_REPEAT;

  // 错误包装
  var setupErrorWrap = new SetupErrorWrap();

  var cacheHelper = null;
  var dbHelper    = null;
  async.series([
    // Check admin username/password
    function(asyncCallback) {
      if (!adminUsername || !adminPassword) {
        setupErrorWrap.set('adminUser', 'Administrator username or password is not inputed');
        return asyncCallback();
      }

      if (!toolkit.isNothing(adminPasswordRepeat) && adminPassword !== adminPasswordRepeat) {
        setupErrorWrap.set('adminUser', 'Repeated administrator password not match');
        return asyncCallback();
      }

      return asyncCallback();
    },
    // Check MySQL, version
    function(asyncCallback) {
      try {
        var _config = {
          host    : config.MYSQL_HOST,
          port    : config.MYSQL_PORT,
          user    : config.MYSQL_USER,
          password: config.MYSQL_PASSWORD,
          database: config.MYSQL_DATABASE,
        }
        dbHelper = mysqlHelper.createHelper(null, _config);
        dbHelper.skipLog = true;

        dbHelper.query('SELECT VERSION() AS ver', null, function(err, data) {
          if (err) {
            setupErrorWrap.set('mysql', 'Connecting to MySQL failed', err);

          } else {
            var versionParts = data[0].ver.split('.');
            var majorVer = parseInt(versionParts[0]);
            var minorVer = parseInt(versionParts[1]);
            if (majorVer < 5 || (majorVer === 5 && minorVer < 7)) {
              setupErrorWrap.set('mysql', 'MySQL 5.7 or above is required');
            }
          }

          return asyncCallback();
        });

      } catch(err) {
        setupErrorWrap.set('mysql', 'Unexpected error with MySQL', err);
        return asyncCallback();
      }
    },
    // Check MySQL variable
    function(asyncCallback) {
      if (setupErrorWrap.has('mysql')) return asyncCallback();

      try {
        dbHelper.query("SHOW VARIABLES LIKE 'innodb_large_prefix'", null, function(err, data) {
          if (err) {
            setupErrorWrap.set('mysql', 'Connecting to MySQL failed', err);

          } else if (data.length > 0 && data[0].Value.toUpperCase() !== 'ON') {
            setupErrorWrap.set('mysql', 'MySQL system variable "innodb_large_prefix" should be ON');
          }

          return asyncCallback();
        });
      } catch(err) {
        setupErrorWrap.set('mysql', 'Unexpected error with MySQL', err);
        return asyncCallback();
      }
    },
    // Check Redis
    function(asyncCallback) {
      try {
        var _config = {
          host    : config.REDIS_HOST,
          port    : config.REDIS_PORT,
          password: config.REDIS_PASSWORD,
          db      : config.REDIS_DATABASE || 0,
          useTLS  : config.REDIS_USE_TLS  || false,

          disableRetry: true,
          errorCallback(err) {
            setupErrorWrap.set('redis', 'Connecting to Redis failed', err);

            if (cacheHelper) {
              cacheHelper.end();
            }
          }
        }
        cacheHelper = redisHelper.createHelper(null, _config);
        cacheHelper.skipLog = true;

        cacheHelper.run('info', 'server', function(err, data) {
          if (err) {
            setupErrorWrap.set('redis', 'Access Redis failed', err);

          } else {
            var version = null;
            data.split('\n').forEach(function(line) {
              if (line.indexOf('redis_version:') === 0) {
                version = line.split(':')[1];
              }
            });

            var versionParts = version.split('.');
            var majorVer = parseInt(versionParts[0]);
            var minorVer = parseInt(versionParts[1]);
            if (majorVer < 4) {
              setupErrorWrap.set('redis', 'Redis 4.0 or above is required');
            }
          }

          return asyncCallback();
        });

      } catch(err) {
        setupErrorWrap.set('redis', 'Unexpected error with Redis', err);
        return asyncCallback();
      }
    },
    // Init DB
    function(asyncCallback) {
      if (setupErrorWrap.hasError()) return asyncCallback();

      var initSQLPath = path.join(__dirname, '../db/dataflux_func_latest.sql');
      var initSQL = fs.readFileSync(initSQLPath).toString();

      dbHelper.query(initSQL, null, function(err, data) {
        if (err) {
          setupErrorWrap.set('mysqlInit', 'Initializing MySQL database failed', err);
        }

        return asyncCallback();
      });
    },
    // Add sys config
    function(asyncCallback) {
      if (setupErrorWrap.hasError()) return asyncCallback();

      var sql = 'INSERT INTO `wat_main_system_config` SET `id` = ?, `value` = ?';
      var sqlParams = [SYS_CONFIG_ID_CURRENT_UPGRADE_SEQ, UPGRADE_INFO[UPGRADE_INFO.length - 1].seq];
      dbHelper.query(sql, sqlParams, function(err, data) {
        if (err) {
          setupErrorWrap.set('mysqlInit', 'Initializing system configs failed', err);
        }

        return asyncCallback();
      });
    },
    // Update admin password
    function(asyncCallback) {
      if (setupErrorWrap.hasError()) return asyncCallback();

      var adminPasswordHash = toolkit.getSaltedPasswordHash(
          adminUserId, adminPassword, config.SECRET);

      var sql = 'UPDATE `wat_main_user` SET ? WHERE `id` = ?';
      var sqlParams = [
        {
          username    : adminUsername,
          passwordHash: adminPasswordHash,
        },
        adminUserId,
      ]
      dbHelper.query(sql, sqlParams, function(err, data) {
        if (err) {
          setupErrorWrap.set('adminUser', 'Setup administrator password failed', err);
        }

        return asyncCallback();
      });
    },
  ], function(err) {
    if (err) return process.exit(1);

    if (setupErrorWrap.hasError()) return callback(setupErrorWrap);

    // Write config file
    Object.assign(USER_CONFIG, config)
    USER_CONFIG._IS_INSTALLED = true;

    fs.writeFileSync(CONFIG.CONFIG_FILE_PATH, yaml.dump(USER_CONFIG));

    console.log('App setup');

    // Response for redirection
    var redirectURL = config.WEB_BASE_URL || CONFIG.WEB_BASE_URL || null;
    return callback(null, redirectURL);
  });
};

function runInstallationServer() {
  /*
    安装向导为一个单页面应用，在服务器应用之前启动
    用户确认配置信息后，应用将配置写入`user-config.yaml`文件中并退出
    随后服务器应用启动

    **当同时启动多个实例时，
    每个进程定期检测配置信息中`_IS_INSTALLED`的值判断是否已经安装完毕
    检测发现安装完毕后自动退出
   */
  var installCheckerT = null;
  function installChecker() {
    // 每次都需要重新加载配置文件，检查是否已安装
    yamlResources.loadConfig(path.join(__dirname, '../config.yaml'), function(err, _config) {
      if (err) {
        console.log(err);

        if (installCheckerT) clearInterval(installCheckerT);
        return process.exit(1);
      }

      if (!_config._IS_INSTALLED) {
        console.log('Waiting for setup.');
        return;
      }

      console.log('Other process finished setup.');

      if (installCheckerT) clearInterval(installCheckerT);

      // 退出安装程序，执行后一个程序
      return process.exit(0);
    });
  };

  // 启动自动检测
  var installCheckerT = setInterval(installChecker, INSTALL_CHECKER_INTERVAL);

  // Express
  var app = express();

  // App Setting
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  // Static files
  app.use('/statics', express.static(path.join(__dirname, 'statics')));

  // Setup page
  app.get('/', function(req, res) {
    var defaultConfig = toolkit.jsonCopy(CONFIG);

    // 默认管理员用户/密码
    defaultConfig['ADMIN_USERNAME']        = 'admin';
    defaultConfig['ADMIN_PASSWORD']        = 'admin';
    defaultConfig['ADMIN_PASSWORD_REPEAT'] = 'admin';

    res.render('setup', { CONFIG: defaultConfig, IMAGE_INFO: IMAGE_INFO });
  });

  // Setup handler
  app.use(bodyParser.json({limit: '1mb'}));
  app.post('/setup', function(req, res, next) {
    // 配置来自接口调用上报
    var config = req.body.config || {};

    _doInstall(config, function(setupErrorWrap, redirectURL) {
      if (setupErrorWrap && setupErrorWrap.hasError()) {
        res.status(400);
        return res.send({ setupErrors: setupErrorWrap.toJSON() });
      }

      res.send({ redirectURL: redirectURL });

      // 配置成功后，关闭服务器
      setTimeout(function() {
        server.close();
      }, 3 * 1000);
    });
  });

  // Redirect to /
  app.use(function(req, res) {
    res.redirect('/');
  });

  var server = http.createServer(app);

  var listenOpt = {
    host: '0.0.0.0',
    port: CONFIG.WEB_PORT,
  };
  server.listen(listenOpt, function() {
    // Print some message of the server
    console.log(toolkit.strf('Installation Server is listening on {0}  (Press CTRL+C to quit)', CONFIG.WEB_PORT));
  });
}

function runUpgrade() {
  /*
    更新处理默认数据库/缓存能够正常连接

    **当同时启动多个实例时，
    每个进程依靠判断Redis排他锁确定是否已经有其他进程正在更新
    当发现有其他进程正在更新时，则转为定期检查是否已经更新完毕
    检测发现更新完毕后自动退出
   */
  if (toolkit.isNothing(UPGRADE_INFO)) {
    console.log('No upgrade info, skip.');
    process.exit(0);
  }

  // Init
  var cacheHelper = redisHelper.createHelper();
  var dbHelper    = mysqlHelper.createHelper();

  var currentUpgradeSeq = null;
  var nextUpgradeSeq    = null;
  var upgradeItems      = null;

  var lockKey     = toolkit.strf('{0}#upgradeLock', CONFIG.APP_NAME);
  var lockValue   = toolkit.genRandString();
  var maxLockTime = 30;
  async.series([
    // Check upgrade lock
    function(asyncCallback) {
      cacheHelper.lock(lockKey, lockValue, maxLockTime, function(err, cacheRes) {
        if (err) {
          console.log('Checking upgrade status failed: ', err);
          return process.exit(1);
        }

        // 正常取得锁，继续执行
        if (cacheRes) return asyncCallback();

        // 未能取得锁，其他进程正在更新，等待锁失效后认为更新完毕
        console.log('Other process is running upgrade, waiting...');
        setInterval(function() {
          cacheHelper.get(lockKey, function(err, cacheRes) {
            if (err) {
              console.log('Waiting upgrade status failed: ', err);
              return process.exit(1);
            }

            if (cacheRes) {
              console.log('Upgrading is still running...');
              return;
            }

            console.log('Upgrading ended, start application...');
            return process.exit(0)
          });
        }, INSTALL_CHECKER_INTERVAL);
      });
    },
    // Get upgrade items
    function(asyncCallback) {
      var sql = 'SELECT value FROM wat_main_system_config WHERE id = ?';
      var sqlParams = [SYS_CONFIG_ID_CURRENT_UPGRADE_SEQ];
      dbHelper.query(sql, sqlParams, function(err, dbRes) {
        if (err) return asyncCallback(err);

        if (dbRes.length <= 0) {
          // 从未升级过，执行所有升级项
          currentUpgradeSeq = null;
          upgradeItems = UPGRADE_INFO;

        } else if (dbRes.length > 0) {
          // 曾经升级过，仅执行后续升级项
          currentUpgradeSeq = parseInt(dbRes[0].value);

          upgradeItems = UPGRADE_INFO.filter(function(d) {
            return d.seq > currentUpgradeSeq;
          });
        }

        return asyncCallback();
      });
    },
    // Do upgrade
    function(asyncCallback) {
      if (toolkit.isNothing(upgradeItems)) {
        console.log('Already up to date, skip.');
        return asyncCallback();
      }

      console.log(toolkit.strf('Run upgrade: {0} -> {1}',
          toolkit.isNothing(currentUpgradeSeq) ? 'BASE' : currentUpgradeSeq,
          upgradeItems[upgradeItems.length -1].seq));

      async.eachSeries(upgradeItems, function(item, eachCallback) {
        console.log(toolkit.strf('Upgading to SEQ {0}...', item.seq));

        dbHelper.query(item.database, null, function(err) {
          if (err) return eachCallback(err);

          nextUpgradeSeq = item.seq;

          cacheHelper.extendLockTime(lockKey, lockValue, maxLockTime, function(err) {
            if (err) return console.log('Extend upgrading lock time failed: ', err);
          });

          return eachCallback();
        });
      }, asyncCallback);
    },
    // Update upgrade seq
    function(asyncCallback) {
      if (toolkit.isNothing(nextUpgradeSeq)) return asyncCallback();

      var sql = toolkit.isNothing(currentUpgradeSeq)
              ? 'INSERT INTO wat_main_system_config SET value = ?, id = ?'
              : 'UPDATE wat_main_system_config SET value = ? WHERE id = ?';
      var sqlParams = [nextUpgradeSeq, SYS_CONFIG_ID_CURRENT_UPGRADE_SEQ];

      dbHelper.query(sql, sqlParams, function(err) {
        if (err) return asyncCallback(err);

        console.log('Upgrading completed.');

        return asyncCallback();
      });
    },
  ], function(err) {
    cacheHelper.unlock(lockKey, lockValue);

    if (err) {
      console.log('Upgrading failed: ', err);
      return process.exit(1);
    }

    return process.exit(0);
  });
}

// Load extra YAML resources and run install
yamlResources.loadConfig(path.join(__dirname, '../config.yaml'), function(err, _config, _userConfig) {
  if (err) throw err;

  mysqlHelper = require('./utils/extraHelpers/mysqlHelper');
  redisHelper = require('./utils/extraHelpers/redisHelper');

  CONFIG      = _config;
  USER_CONFIG = _userConfig;

  // Load upgrade info
  var upgradeInfoPath = path.join(__dirname, '../upgrade-info.yaml')
  UPGRADE_INFO = yaml.load(fs.readFileSync(upgradeInfoPath)).upgradeInfo;

  var callback = null;

  if (CONFIG._DISABLE_SETUP) {
    console.log('Installation disabled, skip.');
    return process.exit(0);
  }

  if (!CONFIG._IS_INSTALLED) {
    // 运行安装服务器，并提供配置页面
    console.log('Start setup guide...')
    callback = runInstallationServer;

  } else {
    // Upgrade
    console.log('Start upgrade process...')
    callback = runUpgrade;
  }

  require('./appInit').beforeAppCreate(callback);
});
