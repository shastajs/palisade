# palisade [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]


## Install

```
npm install palisade --save
```
## Example

### ES6

```js
// your thinky connection instance
import db from 'connections/thinky'
import palisade from 'palisade'

const User = db.createModel('User', {
  id: String,
  name: String,
  birthday: Date,
  times: {
    created: Date
  }
})

// Anyone can list and read users and their public fields (id and name)
// Users can update themselves, but only their own birthday
// Admins can create, update, replace, or delete any user
palisade(User, {
  document: {
    read: ['public'],
    create: ['admin'],
    update: ['admin', 'self'],
    replace: ['admin'],
    delete: ['admin']
  },
  read: {
    id: ['public'],
    name: ['public'],
    birthday: ['admin', 'self'],
    times: ['admin']
  },
  write: {
    id: ['admin'],
    name: ['admin'],
    birthday: ['admin', 'self'],
    times: ['admin']
  }
})
```

[downloads-image]: http://img.shields.io/npm/dm/palisade.svg
[npm-url]: https://npmjs.org/package/palisade
[npm-image]: http://img.shields.io/npm/v/palisade.svg

[travis-url]: https://travis-ci.org/shastajs/palisade
[travis-image]: https://travis-ci.org/shastajs/palisade.png?branch=master
