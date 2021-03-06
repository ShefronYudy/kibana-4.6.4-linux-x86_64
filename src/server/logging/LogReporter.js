'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _log_interceptor = require('./log_interceptor');

var _ = require('lodash');
var Squeeze = require('good-squeeze').Squeeze;
var writeStr = require('fs').createWriteStream;

var LogFormatJson = require('./LogFormatJson');
var LogFormatString = require('./LogFormatString');

module.exports = (function () {
  function KbnLogger(events, config) {
    _classCallCheck(this, KbnLogger);

    this.squeeze = new Squeeze(events);
    this.format = config.json ? new LogFormatJson(config) : new LogFormatString(config);
    this.logInterceptor = new _log_interceptor.LogInterceptor();

    if (config.dest === 'stdout') {
      this.dest = process.stdout;
    } else {
      this.dest = writeStr(config.dest, {
        flags: 'a',
        encoding: 'utf8'
      });
    }
  }

  _createClass(KbnLogger, [{
    key: 'init',
    value: function init(readstream, emitter, callback) {
      var _this = this;

      this.output = readstream.pipe(this.logInterceptor).pipe(this.squeeze).pipe(this.format);

      this.output.pipe(this.dest);

      emitter.on('stop', function () {
        _this.output.unpipe(_this.dest);
      });

      callback();
    }
  }]);

  return KbnLogger;
})();
