'use strict';

/* Builtin Modules */

/* 3rd-party Modules */
var async = require('async');

/* Project Modules */
var E           = require('../utils/serverError');
var CONFIG      = require('../utils/yamlResources').get('CONFIG');
var toolkit     = require('../utils/toolkit');
var modelHelper = require('../utils/modelHelper');
var urlFor      = require('../utils/routeLoader').urlFor;

var funcMod     = require('../models/funcMod');
var batchMod    = require('../models/batchMod');
var taskInfoMod = require('../models/taskInfoMod');

/* Configure */

/* Handlers */
var crudHandler = exports.crudHandler = batchMod.createCRUDHandler();

exports.list = function(req, res, next) {
  var batches       = null;
  var batchPageInfo = null;

  var batchModel    = batchMod.createModel(res.locals);
  var taskInfoModel = taskInfoMod.createModel(res.locals);

  async.series([
    function(asyncCallback) {
      var opt = res.locals.getQueryOptions();
      batchModel.list(opt, function(err, dbRes, pageInfo) {
        if (err) return asyncCallback(err);

        batches       = dbRes;
        batchPageInfo = pageInfo;

        if (opt.extra && opt.extra.withTaskInfo) {
          return taskInfoModel.appendTaskInfoMap(batches, asyncCallback);
        } else {
          return asyncCallback();
        }
      });
    },
  ], function(err) {
    if (err) return next(err);

    var ret = toolkit.initRet(batches, batchPageInfo);
    res.locals.sendJSON(ret);
  });
};

exports.add = function(req, res, next) {
  var data   = req.body.data;
  var origin = req.get('X-Dff-Origin') === 'DFF-UI' ? 'UI' : 'API';

  _add(res.locals, data, origin, function(err, addedId) {
    if (err) return next(err);

    var ret = toolkit.initRet({
      id : addedId,
      url: urlFor('mainAPI.callBatchByGet', {
        params: { id: addedId },
      }),
    });
    return res.locals.sendJSON(ret);
  });
};

exports.modify = function(req, res, next) {
  var id   = req.params.id;
  var data = req.body.data;

  _modify(res.locals, id, data, null, function(err, modifiedId, url) {
    if (err) return next(err);

    var ret = toolkit.initRet({
      id : id,
      url: url,
    });
    return res.locals.sendJSON(ret);
  });
};

exports.delete = function(req, res, next) {
  var id = req.params.id;

  _delete(res.locals, id, function(err, deletedId) {
    if (err) return next(err);

    var ret = toolkit.initRet({
      id: deletedId,
    });
    return res.locals.sendJSON(ret);
  });
};

exports.addMany = function(req, res, next) {
  var data   = req.body.data;
  var origin = req.get('X-Dff-Origin') === 'DFF-UI' ? 'UI' : 'API';

  var addedIds = [];

  var transScope = modelHelper.createTransScope(res.locals.db);
  async.series([
    function(asyncCallback) {
      transScope.start(asyncCallback);
    },
    function(asyncCallback) {
      async.eachSeries(data, function(d, eachCallback) {
        _add(res.locals, d, origin, function(err, addedId) {
          if (err) return eachCallback(err);

          addedIds.push(addedId);

          return eachCallback();
        });
      }, asyncCallback);
    },
  ], function(err) {
    transScope.end(err, function(scopeErr) {
      if (scopeErr) return next(scopeErr);

      var ret = toolkit.initRet({
        ids: addedIds,
      });
      return res.locals.sendJSON(ret);
    });
  });
};

exports.modifyMany = function(req, res, next) {
  var data = req.body.data;

  var modifiedIds = [];

  var batchModel = batchMod.createModel(res.locals);

  var transScope = modelHelper.createTransScope(res.locals.db);
  async.series([
    function(asyncCallback) {
      var opt = res.locals.getQueryOptions();
      opt.fields = ['bat.id'];

      if (toolkit.isNothing(opt.filters)) {
        return asyncCallback(new E('EBizCondition.DeleteConditionNotSpecified', 'At least one condition should been specified'));
      }

      batchModel.list(opt, function(err, dbRes) {
        if (err) return asyncCallback(err);

        modifiedIds = dbRes.reduce(function(acc, x) {
          acc.push(x.id);
          return acc;
        }, []);

        return asyncCallback();
      });
    },
    function(asyncCallback) {
      transScope.start(asyncCallback);
    },
    function(asyncCallback) {
      async.eachSeries(modifiedIds, function(id, eachCallback) {
        var opt = { funcCallKwargs: 'merge' };
        var _data = toolkit.jsonCopy(data);
        _modify(res.locals, id, _data, opt, eachCallback);
      }, asyncCallback);
    },
  ], function(err) {
    transScope.end(err, function(scopeErr) {
      if (scopeErr) return next(scopeErr);

      var ret = toolkit.initRet({
        ids: modifiedIds,
      });
      return res.locals.sendJSON(ret);
    });
  });
};

exports.deleteMany = function(req, res, next) {
  var deleteIds = [];

  var batchModel = batchMod.createModel(res.locals);

  var transScope = modelHelper.createTransScope(res.locals.db);
  async.series([
    function(asyncCallback) {
      var opt = res.locals.getQueryOptions();
      opt.fields = ['bat.id'];

      if (toolkit.isNothing(opt.filters)) {
        return asyncCallback(new E('EBizCondition.DeleteConditionNotSpecified', 'At least one condition should been specified'));
      }

      batchModel.list(opt, function(err, dbRes) {
        if (err) return asyncCallback(err);

        deleteIds = dbRes.reduce(function(acc, x) {
          acc.push(x.id);
          return acc;
        }, []);

        return asyncCallback();
      });
    },
    function(asyncCallback) {
      transScope.start(asyncCallback);
    },
    function(asyncCallback) {
      async.eachSeries(deleteIds, function(id, eachCallback) {
        _delete(res.locals, id, eachCallback);
      }, asyncCallback);
    },
  ], function(err) {
    transScope.end(err, function(scopeErr) {
      if (scopeErr) return next(scopeErr);

      var ret = toolkit.initRet({
        ids: deleteIds,
      });
      return res.locals.sendJSON(ret);
    });
  });
};

function _add(locals, data, origin, callback) {
  // 自动记录操作界面
  data.origin = origin;

  var funcModel  = funcMod.createModel(locals);
  var batchModel = batchMod.createModel(locals);

  var addedId = null;

  async.series([
    // 检查函数
    function(asyncCallback) {
      funcModel.getWithCheck(data.funcId, ['func.seq'], asyncCallback);
    },
    // 数据入库
    function(asyncCallback) {
      batchModel.add(data, function(err, _addedId) {
        if (err) return asyncCallback(err);

        addedId = _addedId;

        return asyncCallback();
      });
    },
  ], function(err) {
    if (err) return callback(err);
    return callback(null, addedId);
  });
};

function _modify(locals, id, data, opt, callback) {
  opt = opt || {};

  var funcModel  = funcMod.createModel(locals);
  var batchModel = batchMod.createModel(locals);

  var batch = null;

  async.series([
    // 获取数据
    function(asyncCallback) {
      var fields = [
        'bat.seq',
        'bat.funcCallKwargsJSON',
      ];
      batchModel.getWithCheck(id, fields, function(err, dbRes) {
        if (err) return asyncCallback(err);

        batch = dbRes;

        if (opt.funcCallKwargs === 'merge' && !toolkit.isNothing(data.funcCallKwargsJSON)) {
          // 合并funcCallKwargsJSON参数
          var prevFuncCallKwargs = toolkit.jsonCopy(batch.funcCallKwargsJSON);
          data.funcCallKwargsJSON = Object.assign(prevFuncCallKwargs, data.funcCallKwargsJSON);
        }

        return asyncCallback();
      });
    },
    // 检查函数
    function(asyncCallback) {
      if (toolkit.isNothing(data.funcId)) return asyncCallback();

      funcModel.getWithCheck(data.funcId, ['func.seq'], asyncCallback);
    },
    function(asyncCallback) {
      batchModel.modify(id, data, asyncCallback);
    },
  ], function(err) {
    if (err) return callback(err);

    var url = urlFor('mainAPI.callBatchByGet', { params: { id: id } });
    return callback(null, id, url);
  });
};

function _delete(locals, id, callback) {
  var batchModel = batchMod.createModel(locals);

  async.series([
    function(asyncCallback) {
      batchModel.getWithCheck(id, ['bat.seq'], asyncCallback);
    },
    function(asyncCallback) {
      batchModel.delete(id, asyncCallback);
    },
  ], function(err) {
    if (err) return callback(err);
    return callback(null, id);
  });
};
