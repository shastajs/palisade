import reduce from 'lodash.reduce'
import mapValues from 'lodash.mapvalues'

const screenDeep = (user, data, returnEmpty) => {
  if (typeof data !== 'object') return data

  // check if the user can even see the doc
  if (data.authorized &&
    !data.authorized('read', user)) {
    if (returnEmpty) return
    return Array.isArray(data) ? [] : {}
  }
  // single instance w/ lens
  if (data.screen) {
    return data.screen('read', user)
  }

  // array of instances w/ lens
  if (Array.isArray(data)) {
    return reduce(data, (p, v) => {
      let nv = screenDeep(user, v, true)
      if (nv != null) p.push(nv)
      return p
    }, [])
  }

  return mapValues(data, (v) => screenDeep(user, v, true))
}

export default screenDeep
