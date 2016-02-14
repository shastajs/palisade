import isArray from 'lodash.isarray'
import isObject from 'lodash.isobject'
import reduce from 'lodash.reduce'
import isDate from 'lodash.isdate'
import isAllowed from './isAllowed'

const filterWithLens = (schema, user, data) => {
  if (!isObject(data)) return
  if (isDate(data)) return data.toISOString()
  return reduce(data, (o, v, k) => {
    const rules = schema[k]
    const needsNesting =  isObject(rules) && !isArray(rules)

    if (needsNesting) {
      if (isObject(v)) {
        o[k] = filterWithLens(rules, user, v)
      }
    } else if (isAllowed(rules, user, data)) {
      o[k] = v
    }

    return o
  }, {})
}

module.exports = filterWithLens
