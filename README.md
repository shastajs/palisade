<p align='center'>
  <img src='https://cloud.githubusercontent.com/assets/425716/12656327/86aafe0c-c5b2-11e5-8de8-b6a7f0552397.png' width='400'/>
  <p align='center'>Role-based security, authorization, and filtering utilities for Thinky/RethinkDB</p>
</p>

## Install

One command and you're ready to secure your data:

```
npm install palisade --save
```

**Now**, check out the [documentation](http://shasta.tools/palisade/docs/Rules.html) to get started!

## Example

The documentation has more detailed examples, but here's a quick peek:

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
