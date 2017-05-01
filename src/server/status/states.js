'use strict';

var _ = require('lodash');

exports.all = [{
  id: 'red',
  title: '红色',
  icon: 'danger',
  severity: 1000,
  nicknames: ['Danger Will Robinson! 危险!']
}, {
  id: 'uninitialized',
  title: '未初始化',
  icon: 'spinner',
  severity: 900,
  nicknames: ['初始化中...']
}, {
  id: 'yellow',
  title: 'Yellow',
  icon: 'warning',
  severity: 800,
  nicknames: ['S.N.A.F.U', 'I\'ll be back', 'brb']
}, {
  id: 'green',
  title: '绿色',
  icon: 'success',
  severity: 0,
  nicknames: ['良好']
}, {
  id: 'disabled',
  title: '禁用',
  severity: -1,
  icon: 'toggle-off',
  nicknames: ['I\'m I even a thing?']
}];

exports.allById = _.indexBy(exports.all, 'id');

exports.defaults = {
  icon: 'question',
  severity: Infinity
};

exports.get = function (id) {
  return exports.allById[id] || _.defaults({ id: id }, exports.defaults);
};
