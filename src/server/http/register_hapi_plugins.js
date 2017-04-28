'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _h2o2 = require('h2o2');

var _h2o22 = _interopRequireDefault(_h2o2);

var _bluebird = require('bluebird');

var plugins = [_vision2['default'], _inert2['default'], _h2o22['default']];

function registerPlugins(server) {
  return _regeneratorRuntime.async(function registerPlugins$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _bluebird.fromNode)(function (cb) {
          server.register(plugins, cb);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = function (kbnServer, server, config) {
  registerPlugins(server);
};

module.exports = exports['default'];
