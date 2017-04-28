'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _lodash = require('lodash');

function doTagsMatch(event, tags) {
  return (0, _lodash.isEqual)((0, _lodash.get)(event, 'tags'), tags);
}

// converts the given event into a debug log if it's an error of the given type
function downgradeIfErrorMatches(errorType, event) {
  var isClientError = doTagsMatch(event, ['connection', 'client', 'error']);
  var matchesErrorType = isClientError && (0, _lodash.get)(event, 'data.errno') === errorType;

  if (!matchesErrorType) return null;

  var errorTypeTag = errorType.toLowerCase();

  return {
    event: 'log',
    pid: event.pid,
    timestamp: event.timestamp,
    tags: ['debug', 'connection', errorTypeTag],
    data: errorType + ': Socket was closed by the client (probably the browser) before it could be read completely'
  };
}

var LogInterceptor = (function (_Stream$Transform) {
  _inherits(LogInterceptor, _Stream$Transform);

  function LogInterceptor() {
    _classCallCheck(this, LogInterceptor);

    _get(Object.getPrototypeOf(LogInterceptor.prototype), 'constructor', this).call(this, {
      readableObjectMode: true,
      writableObjectMode: true
    });
  }

  /**
   *  Since the upgrade to hapi 14, any socket read
   *  error is surfaced as a generic "client error"
   *  but "ECONNRESET" specifically is not useful for the
   *  logs unless you are trying to debug edge-case behaviors.
   *
   *  For that reason, we downgrade this from error to debug level
   *
   *  @param {object} - log event
   */

  _createClass(LogInterceptor, [{
    key: 'downgradeIfEconnreset',
    value: function downgradeIfEconnreset(event) {
      return downgradeIfErrorMatches('ECONNRESET', event);
    }

    /**
     *  Since the upgrade to hapi 14, any socket write
     *  error is surfaced as a generic "client error"
     *  but "EPIPE" specifically is not useful for the
     *  logs unless you are trying to debug edge-case behaviors.
     *
     *  For that reason, we downgrade this from error to debug level
     *
     *  @param {object} - log event
     */
  }, {
    key: 'downgradeIfEpipe',
    value: function downgradeIfEpipe(event) {
      return downgradeIfErrorMatches('EPIPE', event);
    }

    /**
     *  Since the upgrade to hapi 14, any socket write
     *  error is surfaced as a generic "client error"
     *  but "ECANCELED" specifically is not useful for the
     *  logs unless you are trying to debug edge-case behaviors.
     *
     *  For that reason, we downgrade this from error to debug level
     *
     *  @param {object} - log event
     */
  }, {
    key: 'downgradeIfEcanceled',
    value: function downgradeIfEcanceled(event) {
      return downgradeIfErrorMatches('ECANCELED', event);
    }
  }, {
    key: '_transform',
    value: function _transform(event, enc, next) {
      var downgraded = this.downgradeIfEconnreset(event) || this.downgradeIfEpipe(event) || this.downgradeIfEcanceled(event);

      this.push(downgraded || event);
      next();
    }
  }]);

  return LogInterceptor;
})(_stream2['default'].Transform);

exports.LogInterceptor = LogInterceptor;
;
