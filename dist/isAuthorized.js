'use strict';

exports.__esModule = true;

var _lodash = require('lodash.intersection');

var _lodash2 = _interopRequireDefault(_lodash);

var _getRoles = require('./getRoles');

var _getRoles2 = _interopRequireDefault(_getRoles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// - rules = the security rules defined on Model.security
// - user = requesting users object, optional
// - type = type of access, possibles: read, create, update, replace, delete
// if rules.document is not defined, return false
// if rules.document[type] is not defined, return false
// if rules.document[type] does not include any of the users roles, return false
// if rules.document[type] includes at least one of the users roles, return true

exports.default = function (rules, user, type) {
  if (!rules.document || !rules.document[type]) return false;
  return (0, _lodash2.default)((0, _getRoles2.default)(user), rules.document[type]).length !== 0;
};

module.exports = exports['default'];