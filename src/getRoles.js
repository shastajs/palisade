// user roles come from:
// - 'public' (always)
// - 'loggedIn' (if user object exists)
// - 'self' (if document.id === user.id)
// - '{user.role}' (if user object provided has a `role` field that is a string)
// - '{user.roles}' (if user object provided has a `roles` field that is an array)

export default (user, data) => {
  let roles = [ 'public' ]
  if (user) roles.push('loggedIn')
  if (user && user.role) roles.push(user.role)
  if (user && user.roles) roles = roles.concat(user.roles)
  if (user && data && user.id === data.id) roles.push('self')
  return roles
}
