define(function (require) {
  const _ = require('lodash');
  const angular = require('angular');

  const canStack = (function () {
    const err = new Error();
    return !!err.stack;
  }());

  const errors = {};

  // abstract error class
  function KbnError(msg, constructor) {
    this.message = msg;

    Error.call(this, this.message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, constructor || KbnError);
    } else if (canStack) {
      this.stack = (new Error()).stack;
    } else {
      this.stack = '';
    }
  }
  errors.KbnError = KbnError;
  _.class(KbnError).inherits(Error);

  /**
   * HastyRefresh error class
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  errors.HastyRefresh = function HastyRefresh() {
    KbnError.call(this,
      '在上一次查询未结束之前路由又尝试启动一个查询.',
      errors.HastyRefresh);
  };
  _.class(errors.HastyRefresh).inherits(KbnError);

  /**
   * SearchTimeout error class
   */
  errors.SearchTimeout = function SearchTimeout() {
    KbnError.call(this,
      '全部或部分数据请求超时.展示的数据可能不完整.',
      errors.SearchTimeout);
  };
  _.class(errors.SearchTimeout).inherits(KbnError);

  /**
   * Request Failure - When an entire mutli request fails
   * @param {Error} err - the Error that came back
   * @param {Object} resp - optional HTTP response
   */
  errors.RequestFailure = function RequestFailure(err, resp) {
    err = err || false;

    KbnError.call(this,
      '请求Elasticsearch失败: ' + angular.toJson(resp || err.message),
      errors.RequestFailure);

    this.origError = err;
    this.resp = resp;
  };
  _.class(errors.RequestFailure).inherits(KbnError);

  /**
   * FetchFailure Error - when there is an error getting a doc or search within
   *  a multi-response response body
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  errors.FetchFailure = function FetchFailure(resp) {
    KbnError.call(this,
      '获取文档: ' + angular.toJson(resp)+'失败',
      errors.FetchFailure);

    this.resp = resp;
  };
  _.class(errors.FetchFailure).inherits(KbnError);

  /**
   * ShardFailure Error - when one or more shards fail
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  errors.ShardFailure = function ShardFailure(resp) {
    KbnError.call(this, resp._shards.failed + ' of ' + resp._shards.total + ' shards failed.',
      errors.ShardFailure);

    this.resp = resp;
  };
  _.class(errors.ShardFailure).inherits(KbnError);


  /**
   * A doc was re-indexed but it was out of date.
   * @param {Object} resp - The response from es (one of the multi-response responses).
   */
  errors.VersionConflict = function VersionConflict(resp) {
    KbnError.call(this,
      'Failed to store document changes do to a version conflict.',
      errors.VersionConflict);

    this.resp = resp;
  };
  _.class(errors.VersionConflict).inherits(KbnError);


  /**
   * there was a conflict storing a doc
   * @param {String} field - the fields which contains the conflict
   */
  errors.MappingConflict = function MappingConflict(field) {
    KbnError.call(this,
      '在匹配的索引中字段 "' + field + '"至少在两个不同的类型中定义',
      errors.MappingConflict);
  };
  _.class(errors.MappingConflict).inherits(KbnError);

  /**
   * a field mapping was using a restricted fields name
   * @param {String} field - the fields which contains the conflict
   */
  errors.RestrictedMapping = function RestrictedMapping(field, index) {
    let msg = field + ' is a restricted field name';
    if (index) msg += ', found it while attempting to fetch mapping for index pattern: ' + index;

    KbnError.call(this, msg, errors.RestrictedMapping);
  };
  _.class(errors.RestrictedMapping).inherits(KbnError);

  /**
   * a non-critical cache write to elasticseach failed
   */
  errors.CacheWriteFailure = function CacheWriteFailure() {
    KbnError.call(this,
      'A Elasticsearch cache write has failed.',
      errors.CacheWriteFailure);
  };
  _.class(errors.CacheWriteFailure).inherits(KbnError);

  /**
   * when a field mapping is requested for an unknown field
   * @param {String} name - the field name
   */
  errors.FieldNotFoundInCache = function FieldNotFoundInCache(name) {
    KbnError.call(this,
      '这个 ' + name + ' 字段在缓存的映射中未找到',
      errors.FieldNotFoundInCache);
  };
  _.class(errors.FieldNotFoundInCache).inherits(KbnError);

  /**
   * when a mapping already exists for a field the user is attempting to add
   * @param {String} name - the field name
   */
  errors.DuplicateField = function DuplicateField(name) {
    KbnError.call(this,
      '这个 "' + name + '" 字段映射中已存在',
      errors.DuplicateField);
  };
  _.class(errors.DuplicateField).inherits(KbnError);

  /**
   * A saved object was not found
   * @param {String} field - the fields which contains the conflict
   */
  errors.SavedObjectNotFound = function SavedObjectNotFound(type, id) {
    this.savedObjectType = type;
    this.savedObjectId = id;
    const idMsg = id ? ' (id: ' + id + ')' : '';
    KbnError.call(this,
      '无法获取' + type + idMsg,
      errors.SavedObjectNotFound);
  };
  _.class(errors.SavedObjectNotFound).inherits(KbnError);

  /**
   * Tried to call a method that relies on SearchSource having an indexPattern assigned
   */
  errors.IndexPatternMissingIndices = function IndexPatternMissingIndices(type) {
    KbnError.call(this,
      '索引模式中配置的模式没有匹配到任何索引',
      errors.IndexPatternMissingIndices);
  };
  _.class(errors.IndexPatternMissingIndices).inherits(KbnError);

  /**
   * Tried to call a method that relies on SearchSource having an indexPattern assigned
   */
  errors.NoDefinedIndexPatterns = function NoDefinedIndexPatterns(type) {
    KbnError.call(this,
      '请先定义至少一个索引模式',
      errors.NoDefinedIndexPatterns);
  };
  _.class(errors.NoDefinedIndexPatterns).inherits(KbnError);


  /**
   * Tried to load a route besides settings/indices but you don't have a default index pattern!
   */
  errors.NoDefaultIndexPattern = function NoDefaultIndexPattern(type) {
    KbnError.call(this,
      '请指定一个默认的索引模式',
      errors.NoDefaultIndexPattern);
  };
  _.class(errors.NoDefaultIndexPattern).inherits(KbnError);


  /**
   * used by the vislib, when the container is too small
   * @param {String} message - the message to provide with the error
   */
  errors.ContainerTooSmall = function ContainerTooSmall() {
    KbnError.call(this,
    '这个容器去渲染这个视图有点小',
    errors.ContainerTooSmall);
  };
  _.class(errors.ContainerTooSmall).inherits(KbnError);

  /**
   * error thrown when user tries to render an chart with less
   * than the required number of data points
   * @param {String} message - the message to provide with the error
   */
  errors.NotEnoughData = function NotEnoughData(message) {
    KbnError.call(this, message, errors.NotEnoughData);
  };
  _.class(errors.NotEnoughData).inherits(KbnError);

  /**
   * error thrown when no results are returned from an elasticsearch query
   */
  errors.NoResults = function NoResults() {
    KbnError.call(this,
    '未找到记录',
    errors.NoResults);
  };
  _.class(errors.NoResults).inherits(KbnError);

  /**
   * error thrown when no results are returned from an elasticsearch query
   */
  errors.PieContainsAllZeros = function PieContainsAllZeros() {
    KbnError.call(this,
      '由于所有值都为0,无结果展示',
      errors.PieContainsAllZeros);
  };
  _.class(errors.PieContainsAllZeros).inherits(KbnError);

  /**
   * error thrown when no results are returned from an elasticsearch query
   */
  errors.InvalidLogScaleValues = function InvalidLogScaleValues() {
    KbnError.call(this,
      'Values less than 1 cannot be displayed on a log scale',
      errors.InvalidLogScaleValues);
  };
  _.class(errors.InvalidLogScaleValues).inherits(KbnError);

  /** error thrown when wiggle chart is selected for non linear data */
  errors.InvalidWiggleSelection = function InvalidWiggleSelection() {
    KbnError.call(this,
      'In wiggle mode the area chart requires ordered values on the x-axis. Try using a Histogram or Date Histogram aggregation.',
      errors.InvalidWiggleSelection);
  };
  _.class(errors.InvalidWiggleSelection).inherits(KbnError);

  errors.PersistedStateError = function PersistedStateError(msg) {
    KbnError.call(this,
      msg || 'PersistedState Error',
      errors.PersistedStateError);
  };
  _.class(errors.PersistedStateError).inherits(KbnError);


  return errors;
});
