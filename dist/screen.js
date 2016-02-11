'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.map');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isobject');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.isarray');

var _lodash6 = _interopRequireDefault(_lodash5);

var _lens = require('./lens');

var _lens2 = _interopRequireDefault(_lens);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = function screen(rules, type, user, data) {
  if ((0, _lodash6.default)(data)) {
    if (!rules[type]) return [];
    return (0, _lodash2.default)(data, screen.bind(null, rules, type, user));
  }
  if ((0, _lodash4.default)(data)) {
    if (!rules[type]) return {};
    return (0, _lens2.default)(rules[type], user, data);
  }
};

exports.default = screen;
module.exports = exports['default'];