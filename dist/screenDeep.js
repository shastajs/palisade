'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.reduce');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.mapvalues');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenDeep = function screenDeep(user, data, returnEmpty) {
  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') return data;

  // check if the user can even see the doc
  if (data.authorized && !data.authorized('read', user)) {
    if (returnEmpty) return;
    return Array.isArray(data) ? [] : {};
  }
  // single instance w/ lens
  if (data.screen) {
    return data.screen('read', user);
  }

  // array of instances w/ lens
  if (Array.isArray(data)) {
    return (0, _lodash2.default)(data, function (p, v) {
      var nv = screenDeep(user, v, true);
      if (nv != null) p.push(nv);
      return p;
    }, []);
  }

  return (0, _lodash4.default)(data, function (v) {
    return screenDeep(user, v, true);
  });
};

exports.default = screenDeep;
module.exports = exports['default'];