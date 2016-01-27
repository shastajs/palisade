import intersection from 'lodash.intersection'
import getRoles from './getRoles'

// - rules = the security rules defined on Model.security
// - user = requesting users object, optional
// - type = type of access, possibles: read, create, update, replace, delete
// if rules.document is not defined, return false
// if rules.document[type] is not defined, return false
// if rules.document[type] does not include any of the users roles, return false
// if rules.document[type] includes at least one of the users roles, return true

export default (rules, type, user, data) => {
  if (!type) throw new Error('Missing operation type')
  if (!rules.document || !rules.document[type]) return false
  return intersection(getRoles(user, data), rules.document[type]).length !== 0
}
