'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.__esModule = true;

var _lodash = require('lodash.map');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.mapvalues');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screenDeep = function screenDeep(user, data) {
  // check if the user can even see the doc
  if (data && data.authorized && !data.authorized(user, 'read')) {
    return;
  }
  // single instance w/ lens
  if (data && data.lens) {
    return data.lens(user, 'read');
  }

  // array of instances w/ lens
  if (Array.isArray(data)) {
    return (0, _lodash2.default)(data, screenDeep.bind(null, user));
  }

  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object') {
    return (0, _lodash4.default)(data, screenDeep.bind(null, user));
  }

  return data;
};

exports.default = screenDeep;
module.exports = exports['default'];