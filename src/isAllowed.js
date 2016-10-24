import some from 'lodash.some'
import getRoles from './getRoles'

export default (rules, user, data) => {
  if (!Array.isArray(rules) && typeof rules !== 'function') return false
  const roles = getRoles(user, data)
  const fnOpt = {
    user: user,
    data: data,
    roles: roles
  }

  // auth is a fn
  if (typeof rules === 'function') {
    return rules(fnOpt)
  }

  // auth is an array of strings or fns
  return some(rules, (v) => {
    if (typeof v === 'function') return v(fnOpt)
    if (typeof v === 'string') return roles.indexOf(v) !== -1
    return false
  })
}
