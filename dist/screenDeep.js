'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.reduce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isarray');

var _lodash6 = _interopRequireDefault(_lodash5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenDeep = function screenDeep(user, data, returnEmpty) {
  // check if the user can even see the doc
  if ((0, _lodash4.default)(data) && !(0, _lodash6.default)(data)) {
    if (data.authorized && !data.authorized('read', user)) {
      if (returnEmpty) return;
      return (0, _lodash6.default)(data) ? [] : {};
    }
    // single instance w/ lens
    if (data.screen) {
      return data.screen('read', user);
    }

    // object with values as data
    return (0, _lodash2.default)(data, function (p, v, k) {
      var nv = screenDeep(user, v, true);
      if (typeof nv !== 'undefined') p[k] = nv;
      return p;
    }, {});
  }

  // array of data
  if ((0, _lodash6.default)(data)) {
    return (0, _lodash2.default)(data, function (p, v) {
      var nv = screenDeep(user, v, true);
      if (typeof nv !== 'undefined') p.push(nv);
      return p;
    }, []);
  }

  return data;
};

exports.default = screenDeep;
module.exports = exports['default'];