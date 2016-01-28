/*eslint no-console: 0*/
import reduce from 'lodash.reduce'

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

  // array of data
  if (Array.isArray(data)) {
    return reduce(data, (p, v) => {
      let nv = screenDeep(user, v, true)
      if (typeof nv !== 'undefined') p.push(nv)
      return p
    }, [])
  }

  // object with values as data
  return reduce(data, (p, v, k) => {
    let nv = screenDeep(user, v, true)
    if (typeof nv !== 'undefined') p[k] = nv
    return p
  }, {})
}

export default screenDeep
