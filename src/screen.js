import lens from 'object-lens'
import map from 'lodash.map'
import getRoles from './getRoles'

const screen = (rules, type, user, data) => {
  if (typeof data !== 'object') return data

  if (Array.isArray(data)) {
    if (!rules[type]) return []
    return map(data, screen.bind(null, rules, type, user))
  }
  if (!rules[type]) return {}
  return lens(rules[type], getRoles(user, data), data)
}

export default screen
