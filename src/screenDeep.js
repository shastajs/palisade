import map from 'lodash.map'
import mapValues from 'lodash.mapvalues'

const screenDeep = (user, data) => {
  // check if the user can even see the doc
  if (data && data.authorized &&
    !data.authorized(user, 'read')) {
    return
  }
  // single instance w/ lens
  if (data && data.lens) {
    return data.lens(user, 'read')
  }

  // array of instances w/ lens
  if (Array.isArray(data)) {
    return map(data, screenDeep.bind(null, user))
  }

  if (typeof data === 'object') {
    return mapValues(data, screenDeep.bind(null, user))
  }

  return data
}

export default screenDeep
