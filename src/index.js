import screen from './screen'
import isAuthorized from './isAuthorized'

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
