'use strict';

var SetupError = require('./setup_error');
var format = require('util').format;

var _require = require('./kibana_index_mappings');

var mappings = _require.mappings;

module.exports = function (server) {
  var client = server.plugins.elasticsearch.client;
  var index = server.config().get('kibana.index');

  function handleError(message) {
    return function (err) {
      throw new SetupError(server, message, err);
    };
  }

  return client.indices.create({
    index: index,
    body: {
      settings: {
        number_of_shards: 1
      },
      mappings: mappings
    }
  })['catch'](handleError('Unable to create Kibana index "<%= kibana.index %>"')).then(function () {
    return client.cluster.health({
      waitForStatus: 'yellow',
      index: index
    })['catch'](handleError('Waiting for Kibana index "<%= kibana.index %>" to come online failed.'));
  });
};
