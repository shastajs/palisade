import reduce from 'lodash.reduce'
import isDate from 'lodash.isdate'
import isAllowed from './isAllowed'

const filterWithLens = (schema, user, data) => {
  if (typeof data !== 'object') return
  if (isDate(data)) return data.toISOString()
  return reduce(data, (o, v, k) => {
    if (!data.hasOwnProperty(k)) return
    const rules = schema[k]
    const needsNesting =  typeof rules === 'object' && !Array.isArray(rules)

    if (needsNesting) {
      if (typeof v === 'object') {
        o[k] = filterWithLens(rules, user, v)
      }
    } else if (isAllowed(rules, user, data)) {
      o[k] = v
    }

    return o
  }, {})
}

module.exports = filterWithLens
