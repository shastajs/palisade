import isArray from 'lodash.isarray'
import isObject from 'lodash.isobject'
import reduce from 'lodash.reduce'
import isAllowed from './isAllowed'

const filterWithLens = (schema, user, data) => {
  if (!isObject(data)) return
  return reduce(data, (o, v, k) => {
    const rules = schema[k]
    const needsNesting = !isArray(rules) && isObject(rules)

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
