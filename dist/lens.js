'use strict';

var _lodash = require('lodash.isarray');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.reduce');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lodash7 = require('lodash.isdate');

var _lodash8 = _interopRequireDefault(_lodash7);

var _isAllowed = require('./isAllowed');

var _isAllowed2 = _interopRequireDefault(_isAllowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterWithLens = function filterWithLens(schema, user, data) {
  if (!(0, _lodash4.default)(data)) return;
  if ((0, _lodash8.default)(data)) return data.toISOString();
  return (0, _lodash6.default)(data, function (o, v, k) {
    var rules = schema[k];
    var needsNesting = (0, _lodash4.default)(rules) && !(0, _lodash2.default)(rules);

    if (needsNesting) {
      if ((0, _lodash4.default)(v)) {
        o[k] = filterWithLens(rules, user, v);
      }
    } else if ((0, _isAllowed2.default)(rules, user, data)) {
      o[k] = v;
    }

    return o;
  }, {});
};

module.exports = filterWithLens;