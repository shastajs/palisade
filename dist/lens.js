'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _lodash = require('lodash.reduce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isdate');

var _lodash4 = _interopRequireDefault(_lodash3);

var _isAllowed = require('./isAllowed');

var _isAllowed2 = _interopRequireDefault(_isAllowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterWithLens = function filterWithLens(schema, user, data) {
  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') return;
  if ((0, _lodash4.default)(data)) return data.toISOString();
  return (0, _lodash2.default)(data, function (o, v, k) {
    if (!data.hasOwnProperty(k)) return;
    var rules = schema[k];
    var needsNesting = (typeof rules === 'undefined' ? 'undefined' : (0, _typeof3.default)(rules)) === 'object' && !Array.isArray(rules);

    if (needsNesting) {
      if ((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object') {
        o[k] = filterWithLens(rules, user, v);
      }
    } else if ((0, _isAllowed2.default)(rules, user, data)) {
      o[k] = v;
    }

    return o;
  }, {});
};

module.exports = filterWithLens;