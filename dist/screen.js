'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectLens = require('object-lens');

var _objectLens2 = _interopRequireDefault(_objectLens);

var _lodash = require('lodash.map');

var _lodash2 = _interopRequireDefault(_lodash);

var _getRoles = require('./getRoles');

var _getRoles2 = _interopRequireDefault(_getRoles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = function screen(rules, type, user, data) {
  if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') return data;

  if (Array.isArray(data)) {
    if (!rules[type]) return [];
    return (0, _lodash2.default)(data, screen.bind(null, rules, type, user));
  }
  if (!rules[type]) return {};
  return (0, _objectLens2.default)(rules[type], (0, _getRoles2.default)(user, data), data);
};

exports.default = screen;
module.exports = exports['default'];