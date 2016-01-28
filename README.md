<p align='center'>
  <img src='https://i.imgur.com/ksLTGTi.png'/>
</p>

# palisade [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]


## Install

```
npm install palisade --save
```

## API

- [Introduction](docs/Introduction.md)
- [Rules](docs/Rules.md)
- [Roles](docs/Roles.md)
- [Model.screen()](docs/Screen.md)
- [screenDeep()](docs/ScreenDeep.md)

## Example

### ES6

```js
// your thinky connection instance
import db from 'connections/thinky'
import palisade, { screenDeep } from 'palisade'

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
    times: {
      created: ['admin']
    }
  },
  write: {
    id: ['admin'],
    name: ['admin'],
    birthday: ['admin', 'self'],
    times: {
      created: ['admin']
    }
  }
})
```

### ES5

```js
// your thinky connection instance
var db = require('connections/thinky');
var palisade = require('palisade');
var screenDeep = palisade.screenDeep;

var User = db.createModel('User', {
  id: String,
  name: String,
  birthday: Date,
  times: {
    created: Date
  }
});

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
    times: {
      created: ['admin']
    }
  },
  write: {
    id: ['admin'],
    name: ['admin'],
    birthday: ['admin', 'self'],
    times: {
      created: ['admin']
    }
  }
});
```


[downloads-image]: http://img.shields.io/npm/dm/palisade.svg
[npm-url]: https://npmjs.org/package/palisade
[npm-image]: http://img.shields.io/npm/v/palisade.svg

[travis-url]: https://travis-ci.org/shastajs/palisade
[travis-image]: https://travis-ci.org/shastajs/palisade.png?branch=master
