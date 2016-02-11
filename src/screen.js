import map from 'lodash.map'
import isObject from 'lodash.isobject'
import isArray from 'lodash.isarray'
import lens from './lens'

const screen = (rules, type, user, data) => {
  if (isArray(data)) {
    if (!rules[type]) return []
    return map(data, screen.bind(null, rules, type, user))
  }
  if (isObject(data)) {
    if (!rules[type]) return {}
    return lens(rules[type], user, data)
  }
}

export default screen
