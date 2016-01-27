'use strict';

exports.__esModule = true;

var _objectLens = require('object-lens');

var _objectLens2 = _interopRequireDefault(_objectLens);

var _lodash = require('lodash.map');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.mapvalues');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Security Schema:
// All values should be an array of roles
// - document
//   - read
//   - create
//   - update
//   - replace
//   - delete
// - read
//   - $fieldName
// - write
//   - $fieldName

// Model.lens(user, type, data)
// - user = requesting users object, optional
// - type = type of access, possibles: read, write
// - data = data to be sanitized, can be an object or array
// if data is not an object or array, return it
// if rules[type] is not defined, return null
// return object where all fields the user doesnt have access to are removed

exports.default = function (Model, rules) {
  Model.security = rules;
  Model.defineStatic('authorized', isAuthorized.bind(null, Model.security));
  Model.define('authorized', Model.authorized);
  Model.defineStatic('screen', function (user, type, data) {
    if (data == null) return data;
    if (!rules[type]) return null;

    if (Array.isArray(data)) {
      return (0, _lodash2.default)(data, Model.lens.bind(null, user, type));
    }
    var roles = getRoles(user, data);
    return (0, _objectLens2.default)(rules[type], roles, data);
  });
  Model.define('screen', function (user, type) {
    return Model.lens(user, type, this);
  });
  return Model;
};

module.exports = exports['default'];