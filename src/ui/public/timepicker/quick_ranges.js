define(function (require) {
  let module = require('ui/modules').get('kibana');

  module.constant('quickRanges', [
    { from: 'now/d',    to: 'now/d',    display: '今天',                 section: 0 },
    { from: 'now/w',    to: 'now/w',    display: '本周',             section: 0 },
    { from: 'now/M',    to: 'now/M',    display: '本月',            section: 0 },
    { from: 'now/y',    to: 'now/y',    display: '本年',             section: 0 },
    { from: 'now/d',    to: 'now',      display: '今天初到现在',        section: 0 },
    { from: 'now/w',    to: 'now',      display: '本周初到现在',          section: 0 },
    { from: 'now/M',    to: 'now',      display: '本月初到现在',         section: 0 },
    { from: 'now/y',    to: 'now',      display: '本年初到现在',          section: 0 },

    { from: 'now-1d/d', to: 'now-1d/d', display: '昨天',             section: 1 },
    { from: 'now-2d/d', to: 'now-2d/d', display: '前天',  section: 1 },
    { from: 'now-7d/d', to: 'now-7d/d', display: '上周今天',    section: 1 },
    { from: 'now-1w/w', to: 'now-1w/w', display: '上一周',         section: 1 },
    { from: 'now-1M/M', to: 'now-1M/M', display: '上一月',        section: 1 },
    { from: 'now-1y/y', to: 'now-1y/y', display: '上一年',         section: 1 },

    { from: 'now-15m',  to: 'now',      display: '最近15分钟',       section: 2 },
    { from: 'now-30m',  to: 'now',      display: '最近30分钟',       section: 2 },
    { from: 'now-1h',   to: 'now',      display: '最近1 小时',           section: 2 },
    { from: 'now-4h',   to: 'now',      display: '最近4 小时',          section: 2 },
    { from: 'now-12h',  to: 'now',      display: '最近12小时',         section: 2 },
    { from: 'now-24h',  to: 'now',      display: '最近24小时',         section: 2 },
    { from: 'now-7d',   to: 'now',      display: '最近7 天',           section: 2 },

    { from: 'now-30d',  to: 'now',      display: '最近30天',          section: 3 },
    { from: 'now-60d',  to: 'now',      display: '最近60天',          section: 3 },
    { from: 'now-90d',  to: 'now',      display: '最近90天',          section: 3 },
    { from: 'now-6M',   to: 'now',      display: '最近半年',         section: 3 },
    { from: 'now-1y',   to: 'now',      display: '最近1 年',           section: 3 },
    { from: 'now-2y',   to: 'now',      display: '最近2 年',          section: 3 },
    { from: 'now-5y',   to: 'now',      display: '最近5 年',          section: 3 },

  ]);

});
