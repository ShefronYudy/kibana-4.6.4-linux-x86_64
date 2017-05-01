define(function (require) {
  let moment = require('moment-timezone');
  let _ = require('lodash');

  return function configDefaultsProvider() {
    // wraped in provider so that a new instance is given to each app/test

    return {
      'buildNum': {
        readonly: true
      },
      'query:queryString:options': {
        value: '{ "analyze_wildcard": true }',
        description: 'lucene搜索字符串解析器的选项',
        type: 'json'
      },
      'sort:options': {
        value: '{ "unmapped_type": "boolean" }',
        description: '选择Elasticsearch排序参数',
        type: 'json'
      },
      'dateFormat': {
        value: 'MMMM Do YYYY, HH:mm:ss.SSS',
        description: '显示格式不正确的日期时，请使用此格式'
      },
      'dateFormat:tz': {
        value: 'Browser',
        description: '应该使用哪个时区。 “浏览器”将使用浏览器检测到的时区.',
        type: 'select',
        options: _.union(['Browser'], moment.tz.names())
      },
      'dateFormat:scaled': {
        type: 'json',
        value:
          '[\n' +
          '  ["", "HH:mm:ss.SSS"],\n' +
          '  ["PT1S", "HH:mm:ss"],\n' +
          '  ["PT1M", "HH:mm"],\n' +
          '  ["PT1H",\n' +
          '      "YYYY-MM-DD HH:mm"],\n' +
          '  ["P1DT", "YYYY-MM-DD"],\n' +
          '  ["P1YT", "YYYY"]\n' +
          ']',
        description: '定义在时基“+”的情况下使用的格式的值'+
        	         '数据按顺序呈现，并且格式化的时间戳应该适应'+
        	         '测量之间的间隔。 钥匙是' +
        ' <a href="http://en.wikipedia.org/wiki/ISO_8601#Time_intervals" target="_blank">' +
        'ISO8601间隔.</a>'
      },
      'defaultIndex': {
        value: null,
        description: '未设置索引的访问索引'
      },
      'metaFields': {
        value: ['_source', '_id', '_type', '_index', '_score'],
        description: '存在于_source之外的字段在显示时合并到我们的文档中'
      },
      'discover:sampleSize': {
        value: 500,
        description: '要在表中显示的行数'
      },
      'doc_table:highlight': {
        value: true,
        description: '突出显示结果发现和保存的搜索仪表板。'+
        '突出显示在大文件上工作时请求缓慢。'
      },
      'courier:maxSegmentCount': {
        value: 30,
        description: '发现的请求被分割成段，以防止发送大量请求到'+
                   '弹性搜索 此设置会尝试阻止细分列表过长，这可能会'+
                   '因为要求要花更长的时间来处理'
      },
      'fields:popularLimit': {
        value: 10,
        description: 'Top N的最受欢迎的领域'
      },
      'histogram:barTarget': {
        value: 50,
        description: '当在日期直方图中使用“自动”间隔时，尝试围绕这个多个栏生成'
      },
      'histogram:maxBars': {
        value: 100,
        description: '不要在日期直方图中显示更多的条形图，如果需要，不要显示比例值'
      },
      'visualization:tileMap:maxPrecision': {
        value: 7,
        description: '在瓦片地图上显示的最大geoHash精度：7高，10非常高，' +
        '12是最大. ' +
        '<a href="http://www.elastic.co/guide/en/elasticsearch/reference/current/' +
        'search-aggregations-bucket-geohashgrid-aggregation.html#_cell_dimensions_at_the_equator" target="_blank">' +
        '单元格尺寸说明</a>'
      },
      'visualization:tileMap:WMSdefaults': {
        value: JSON.stringify({
          enabled: false,
          url: 'https://basemap.nationalmap.gov/arcgis/services/USGSTopo/MapServer/WMSServer',
          options: {
            version: '1.3.0',
            layers: '0',
            format: 'image/png',
            transparent: true,
            attribution: 'Maps provided by USGS',
            styles: '',
          }
        }, null, '  '),
        type: 'json',
        description: '瓦片地图中WMS地图服务器支持的默认属性'
      },
      'visualization:colorMapping': {
        type: 'json',
        value: JSON.stringify({
          'Count': '#57c17b'
        }),
        description: '将值映射到可视化内的指定颜色'
      },
      'visualization:loadingDelay': {
        value: '2s',
        description: '在查询期间调暗可视化之前等待的时间'
      },
      'csv:separator': {
        value: ',',
        description: '使用此字符串分隔导出的值'
      },
      'csv:quoteValues': {
        value: true,
        description: '应该在csv导出中引用值?'
      },
      'history:limit': {
        value: 10,
        description: '在具有历史记录的字段（例如查询输入）中显示许多最近的值'
      },
      'shortDots:enable': {
        value: false,
        description: '缩短长字段，例如，而不是foo.bar.baz，显示f.b.baz'
      },
      'truncate:maxHeight': {
        value: 115,
        description: '表格中单元格应占据的最大高度。 设置为0以禁用截断'
      },
      'indexPattern:fieldMapping:lookBack': {
        value: 5,
        description: '对于在其名称中包含时间戳的索引模式，请查找这个许多最近匹配的'+
                   '从中查询字段映射的模式'
      },
      'format:defaultTypeMap': {
        type: 'json',
        value: [
          '{',
          '  "ip": { "id": "ip", "params": {} },',
          '  "date": { "id": "date", "params": {} },',
          '  "number": { "id": "number", "params": {} },',
          '  "_source": { "id": "_source", "params": {} },',
          '  "_default_": { "id": "string", "params": {} }',
          '}',
        ].join('\n'),
        description: '每个字段类型默认使用的格式名称的映射。 '+
                   '如果未明确提及字段类型，则使用“_default_'
      },
      'format:number:defaultPattern': {
        type: 'string',
        value: '0,0.[000]',
        description: '“数字”格式的默认数字格式'
      },
      'format:bytes:defaultPattern': {
        type: 'string',
        value: '0,0.[000]b',
        description: '“字节”格式的默认数字格式'
      },
      'format:percent:defaultPattern': {
        type: 'string',
        value: '0,0.[000]%',
        description: '“百分比”格式的默认数字格式'
      },
      'format:currency:defaultPattern': {
        type: 'string',
        value: '($0,0.[00])',
        description: '“货币”格式的默认数字格式'
      },
      'savedObjects:perPage': {
        type: 'number',
        value: 5,
        description: '加载对话框中每页显示的对象数'
      },
      'timepicker:timeDefaults': {
        type: 'json',
        value: [
          '{',
          '  "from": "now-15m",',
          '  "to": "now",',
          '  "mode": "quick"',
          '}'
        ].join('\n'),
        description: 'Kibana启动时不需要时间选择'
      },
      'timepicker:refreshIntervalDefaults': {
        type: 'json',
        value: [
          '{',
          '  "display": "关闭",',
          '  "pause": false,',
          '  "value": 0',
          '}'
        ].join('\n'),
        description: 'timefilter的默认刷新间隔'
      },
      'dashboard:defaultDarkTheme': {
        value: false,
        description: '默认情况下，新的仪表板使用黑色主题'
      },
      'state:storeInSessionStorage': {
        value: false,
        description: '网址有时可能会变得太大，某些浏览器可能会'+
        	           '处理。 为了防止这种情况，我们正在测试如果将URL的部分存储在'+
        	           '会话中是否起到作用。 请让我们知道如何去！'
      }
    };
  };
});
