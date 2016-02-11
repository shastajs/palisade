export default (user, data) => {
  let roles = [ 'public' ]
  if (user) roles.push('loggedIn')
  if (!user) return roles // nothing left to do

  if (user.role) roles.push(user.role)
  if (user.roles) roles = roles.concat(user.roles)
  if (data && user.id === data.id) roles.push('self')
  return roles
}
