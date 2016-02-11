'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.isarray');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.some');

var _lodash4 = _interopRequireDefault(_lodash3);

var _getRoles = require('./getRoles');

var _getRoles2 = _interopRequireDefault(_getRoles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (rules, user, data) {
  if (!(0, _lodash2.default)(rules) && typeof rules !== 'function') return false;
  var roles = (0, _getRoles2.default)(user, data);
  var fnOpt = {
    user: user,
    data: data,
    roles: roles
  };

  // auth is a fn
  if (typeof rules === 'function') {
    return rules(fnOpt);
  }

  // auth is an array of strings or fns
  return (0, _lodash4.default)(rules, function (v) {
    if (typeof v === 'function') return v(fnOpt);
    if (typeof v === 'string') return roles.indexOf(v) !== -1;
    return false;
  });
};

module.exports = exports['default'];