define(function (require) {
  let module = require('ui/modules').get('kibana');

  module.constant('timeUnits', {
    s: '秒',
    m: '分钟',
    h: '小时',
    d: '天',
    w: '周',
    M: '月',
    y: '年'
  });

});
