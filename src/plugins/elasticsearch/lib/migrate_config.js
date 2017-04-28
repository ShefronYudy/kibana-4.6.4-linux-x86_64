'use strict';

var upgrade = require('./upgrade_config');

var _require = require('./kibana_index_mappings');

var mappings = _require.mappings;

module.exports = function (server) {
  var config = server.config();
  var client = server.plugins.elasticsearch.client;
  var options = {
    index: config.get('kibana.index'),
    type: 'config',
    body: {
      size: 1000,
      sort: [{
        buildNum: {
          order: 'desc',
          unmapped_type: mappings.config.properties.buildNum.type
        }
      }]
    }
  };

  return client.search(options).then(upgrade(server));
};
