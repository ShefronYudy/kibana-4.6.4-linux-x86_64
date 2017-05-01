'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

module.exports = function (kbnServer, server, config) {

  server.decorate('server', 'config', function () {
    return kbnServer.config;
  });

  var tmpl = '"<%= key %>"的设置还未应用, 请检查拼写错误确保插件已被加载.';
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(config.getPendingSets()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2);

      var key = _step$value[0];
      var val = _step$value[1];

      server.log(['warning', 'config'], { key: key, val: val, tmpl: tmpl });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
