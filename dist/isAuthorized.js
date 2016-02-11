'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isAllowed = require('./isAllowed');

var _isAllowed2 = _interopRequireDefault(_isAllowed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (rules, type, user, data) {
  if (!type) throw new Error('Missing operation type');
  if (!rules.document) return false;
  return (0, _isAllowed2.default)(rules.document[type], user, data);
};

module.exports = exports['default'];