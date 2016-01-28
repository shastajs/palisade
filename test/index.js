/*global it: true, describe: true */
/*eslint no-console: 0*/
import should from 'should'
import palisade, { screenDeep } from '../src'
import createModel from './fixtures/createModel'

const createUser = () =>
  createModel(`User-${Math.random()}`, {
    name: String,
    bday: Date
  })

describe('palisade', () => {
  it('should export a plugin function', () => {
    should.exist(palisade)
    palisade.should.be.a.function
  })
  it('should export a screenDeep', () => {
    should.exist(screenDeep)
    screenDeep.should.be.a.function
  })

  it('should return a Model class', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules).should.equal(User)
  })

  it('should add a security field to a Model class', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    should.exist(User.security)
    User.security.should.equal(rules)
  })
})

describe('Model.authorized', () => {
  it('should exist on class', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    should.exist(User.authorized)
  })
  it('should exist on instance', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    should.exist(new User({}).authorized)
  })
  it('should return false if no document rules specified', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    User.authorized('read').should.equal(false)
  })
  it('should return false if no document rules for type specified', () => {
    let rules = {
      document: {}
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read').should.equal(false)
  })
  it('should return false if document rules specified have no roles', () => {
    let rules = {
      document: {
        read: []
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read').should.equal(false)
  })
  it('should return true if document rules are public and no user given', () => {
    let rules = {
      document: {
        read: [ 'public' ]
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read').should.equal(true)
  })
  it('should return false if user role attr doesnt match', () => {
    let rules = {
      document: {
        read: [ 'admin' ]
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read', {
      role: 'pleb'
    }).should.equal(false)
  })
  it('should return false if user roles attr doesnt match', () => {
    let rules = {
      document: {
        read: [ 'admin' ]
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read', {
      roles: [ 'pleb' ]
    }).should.equal(false)
  })
  it('should return true if user role attr matches', () => {
    let rules = {
      document: {
        read: [ 'admin', 'pleb' ]
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read', {
      role: 'admin'
    }).should.equal(true)
  })
  it('should return true if user roles attr matches', () => {
    let rules = {
      document: {
        read: [ 'admin', 'super' ]
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.authorized('read', {
      roles: [ 'pleb', 'admin' ]
    }).should.equal(true)
  })
  it('should return true if self role matches', () => {
    let rules = {
      document: {
        read: [ 'self' ]
      }
    }
    let User = createUser()
    palisade(User, rules)
    let u1 = new User({ id: 123 })
    User.authorized('read', u1, u1).should.equal(true)
    u1.authorized('read', u1).should.equal(true)
  })
})

describe('Model.screen', () => {
  it('should exist on class', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    should.exist(User.screen)
  })
  it('should exist on instance', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    should.exist(new User({}).screen)
  })
  it('should return empty if no read rules specified', () => {
    let rules = {}
    let User = createUser()
    palisade(User, rules)
    User.screen('read', null, { name: 'test' }).should.eql({})
  })
  it('should return empty if no document rules for type specified', () => {
    let rules = {
      read: {}
    }
    let User = createUser()
    palisade(User, rules)
    User.screen('read', null, { name: 'test' }).should.eql({})
  })
  it('should return empty if document rules specified have no roles', () => {
    let rules = {
      read: {
        name: []
      }
    }
    let User = createUser()
    palisade(User, rules)
    User.screen('read', null, { name: 'test' }).should.eql({})
  })
  it('should return data if read rules are public and no user given', () => {
    let rules = {
      read: {
        name: [ 'public' ]
      }
    }
    let User = createUser()
    let o = { name: 'test' }
    palisade(User, rules)
    User.screen('read', null, o).should.eql(o)
  })
  it('should return empty if user role attr doesnt match', () => {
    let rules = {
      read: {
        name: [ 'admin' ]
      }
    }
    let User = createUser()
    let u1 = { role: 'pleb' }
    let o = { name: 'test' }
    palisade(User, rules)
    User.screen('read', u1, o).should.eql({})
  })
  it('should return empty if user roles attr doesnt match', () => {
    let rules = {
      read: {
        name: [ 'admin' ]
      }
    }
    let User = createUser()
    let u1 = { roles: [ 'pleb' ] }
    let o = { name: 'test' }
    palisade(User, rules)
    User.screen('read', u1, o).should.eql({})
  })
  it('should return data if user role attr matches', () => {
    let rules = {
      read: {
        name: [ 'admin', 'pleb' ]
      }
    }
    let User = createUser()
    let u1 = { role: 'admin' }
    let o = { name: 'test' }
    palisade(User, rules)
    User.screen('read', u1, o).should.eql(o)
  })
  it('should return array data if user role attr matches', () => {
    let rules = {
      read: {
        name: [ 'admin', 'pleb' ]
      }
    }
    let User = createUser()
    let u1 = { role: 'admin' }
    let o = { name: 'test' }
    let data = [ o, o ]
    palisade(User, rules)
    User.screen('read', u1, data).should.eql(data)
  })
  it('should return data if user roles attr matches', () => {
    let rules = {
      read: {
        name: [ 'admin', 'super' ]
      }
    }
    let User = createUser()
    let u1 = { roles: [ 'admin', 'pleb' ] }
    let o = { name: 'test' }
    palisade(User, rules)
    User.screen('read', u1, o).should.eql(o)
  })
  it('should return data if self role matches', () => {
    let rules = {
      read: {
        id: [ 'self' ],
        name: [ 'self' ]
      }
    }
    let User = createUser()
    let o = { id: 123, name: 'test' }
    palisade(User, rules)
    let u1 = new User(o)
    User.screen('read', u1, u1).should.eql(o)
    u1.screen('read', u1).should.eql(o)
  })
  it('should return nested data if user roles attr matches', () => {
    let rules = {
      read: {
        attributes: {
          name: [ 'admin', 'super' ]
        }
      }
    }
    let User = createUser()
    let u1 = { roles: [ 'admin', 'pleb' ] }
    let o = { attributes: { name: 'test' } }
    palisade(User, rules)
    User.screen('read', u1, o).should.eql(o)
  })
  it('should return empty nested data if user roles attr doesnt match', () => {
    let rules = {
      read: {
        attributes: {
          name: [ 'root', 'super' ]
        }
      }
    }
    let User = createUser()
    let u1 = { roles: [ 'admin', 'pleb' ] }
    let o = { attributes: { name: 'test' } }
    palisade(User, rules)
    User.screen('read', u1, o).should.eql({ attributes: {} })
  })
})

describe('screenDeep', () => {
  it('should return an empty array when no read specified', () => {
    let User = createUser()
    palisade(User, {
      read: {
        id: [ 'public' ],
        name: [ 'self' ]
      }
    })
    let u1 = new User({
      id: 123,
      name: 'test1'
    })
    let u2 = new User({
      id: 456,
      name: 'test2'
    })
    let data = [ u1, u2 ]
    screenDeep(null, data).should.eql([])
  })
  it('should return an empty nested array when no read specified', () => {
    let User = createUser()
    palisade(User, {
      read: {
        id: [ 'public' ],
        name: [ 'self' ]
      }
    })
    let u1 = new User({
      id: 123,
      name: 'test1'
    })
    let u2 = new User({
      id: 456,
      name: 'test2'
    })
    let data = [ [ u1, u2 ] ]
    screenDeep(null, data).should.eql([ [ ] ])
  })
})
