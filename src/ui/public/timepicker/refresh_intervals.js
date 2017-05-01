define(function (require) {
  let module = require('ui/modules').get('kibana');

  module.constant('refreshIntervals', [
    { value : 0, display: '关闭', section: 0},

    { value : 5000, display: '5 秒', section: 1},
    { value : 10000, display: '10 秒', section: 1},
    { value : 30000, display: '30 秒', section: 1},
    { value : 45000, display: '45 秒', section: 1},

    { value : 60000, display: '1 分', section: 2},
    { value : 300000, display: '5 分', section: 2},
    { value : 900000, display: '15 分', section: 2},
    { value : 1800000, display: '30 分', section: 2},

    { value : 3600000, display: '1 小时', section: 3},
    { value : 7200000, display: '2 小时', section: 3},
    { value : 43200000, display: '12 小时', section: 3},
    { value : 86400000, display: '1 天', section: 3}
  ]);

});
