import isAllowed from './isAllowed'

export default (rules, type, user, data) => {
  if (!type) throw new Error('Missing operation type')
  if (!rules.document) return false
  return isAllowed(rules.document[type], user, data)
}
