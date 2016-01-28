'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (user, data) {
  var roles = ['public'];
  if (user) roles.push('loggedIn');
  if (user && user.role) roles.push(user.role);
  if (user && user.roles) roles = roles.concat(user.roles);
  if (user && data && user.id === data.id) roles.push('self');
  return roles;
};

module.exports = exports['default'];