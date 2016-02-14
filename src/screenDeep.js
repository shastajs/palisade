import reduce from 'lodash.reduce'
import isObject from 'lodash.isobject'
import isArray from 'lodash.isarray'
import isDate from 'lodash.isdate'

const screenDeep = (user, data, returnEmpty) => {
  if (isDate(data)) return data.toISOString()

  // check if the user can even see the doc
  if (isObject(data) && !isArray(data)) {
    if (data.authorized &&
      !data.authorized('read', user)) {
      if (returnEmpty) return
      return isArray(data) ? [] : {}
    }
    // single instance w/ lens
    if (data.screen) {
      return data.screen('read', user)
    }

    // object with values as data
    return reduce(data, (p, v, k) => {
      let nv = screenDeep(user, v, true)
      if (typeof nv !== 'undefined') p[k] = nv
      return p
    }, {})
  }

  // array of data
  if (isArray(data)) {
    return reduce(data, (p, v) => {
      let nv = screenDeep(user, v, true)
      if (typeof nv !== 'undefined') p.push(nv)
      return p
    }, [])
  }

  return data
}

export default screenDeep
