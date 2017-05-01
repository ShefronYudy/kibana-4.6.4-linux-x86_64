define(function (require) {
  let moment = require('moment');

  return {
    toString: function (range, format) {
      if (!range.from) {
        return format(range.to)+'之前';
      } else if (!range.to) {
        return format(range.from)+'之后';
      } else {
        return format(range.from) + ' 到 ' + format(range.to);
      }
    },
    parse: function (rangeString, format) {
      let chunks = rangeString.split(' 到 ');
      if (chunks.length === 2) return {from: moment(chunks[0], format), to: moment(chunks[1], format)};

      chunks = rangeString.split('之前 ');
      if (chunks.length === 2) return {to: moment(chunks[1], format)};

      chunks = rangeString.split('之后 ');
      if (chunks.length === 2) return {from: moment(chunks[1], format)};

      throw new Error('Error attempting to parse date range: ' + rangeString);
    }
  };
});
