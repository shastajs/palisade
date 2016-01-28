# ACL Rules

Palisade has three categories of security rules:

### `document`

  - Each key is an operation type (for example: read, create, delete, update) that can be performed at a document level
  - You may specify any number of operation types named whatever you like, but I always use these ones as they correspond to standard REST actions:
    - `list` - Can they query for more than one document
    - `read` - Can they read a single document
    - `create` - Can they create a new document
    - `update` - Can they update fields on an existing document
    - `replace` - Can they completely replace an existing document
    - `delete` - Can they delete an existing document

### `read`

  - Each key is a field name that corresponds to your schema
  - The value is an array of roles that can update the field
  - The value can also be an object with more fields inside of it for nested data

### `write`

  - Each key is a field name that corresponds to your schema
  - The value is an array of roles that can update the field
  - The value can also be an object with more fields inside of it for nested data

## Example Schema

In this example ruleset:

- Anyone can list users
- Anyone can read a single user
- Anyone read a user's public fields `id` and `name`
- Users can update themselves, but only their own birthday
- Admins can create, update, replace, or delete any user

```js
var userSchema = {
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
};
```

## Plugging it in

To add the security functionality to a [Thinky](http://thinky.io) model, pass the palisade function the model and your security schema.

This does a few things:
- Adds a [.screen()](Screen.md) function to the Model class and all Model instances
- Adds a [.authorized()](Authorized.md) function to the Model class and all Model instances
- Adds your security ruleset as a `.security` property on the Model class
  - This makes it easy for models to extend eachother's security rules

```js
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
palisade(User, userSchema)
```
