'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.intersection');

var _lodash2 = _interopRequireDefault(_lodash);

var _getRoles = require('./getRoles');

var _getRoles2 = _interopRequireDefault(_getRoles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (rules, type, user, data) {
  if (!type) throw new Error('Missing operation type');
  if (!rules.document || !rules.document[type]) return false;
  return (0, _lodash2.default)((0, _getRoles2.default)(user, data), rules.document[type]).length !== 0;
};

module.exports = exports['default'];