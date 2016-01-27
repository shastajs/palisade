import screen from './screen'
import isAuthorized from './isAuthorized'

// Security Schema:
// All values should be an array of roles
// - document
//   - read
//   - create
//   - update
//   - replace
//   - delete
// - read
//   - $fieldName
// - write
//   - $fieldName

// Model.lens(user, type, data)
// - user = requesting users object, optional
// - type = type of access, possibles: read, write
// - data = data to be sanitized, can be an object or array
// if data is not an object or array, return it
// if rules[type] is not defined, return null
// return object where all fields the user doesnt have access to are removed

export screenDeep from './screenDeep'

export default (Model, rules) => {
  Model.security = rules
  Model.defineStatic('authorized', isAuthorized.bind(null, Model.security))
  Model.define('authorized', function (type, user) {
    return Model.authorized(type, user, this)
  })
  Model.defineStatic('screen', screen.bind(null, Model.security))
  Model.define('screen', function (type, user) {
    return Model.screen(type, user, this)
  })
  return Model
}
