import intersection from 'lodash.intersection'
import getRoles from './getRoles'

export default (rules, type, user, data) => {
  if (!type) throw new Error('Missing operation type')
  if (!rules.document || !rules.document[type]) return false
  return intersection(getRoles(user, data), rules.document[type]).length !== 0
}
