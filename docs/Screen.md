# Model.screen(type, user, data)

Palisade adds a `.screen()` function to both the Model class as well as all instances of the model (via define and defineStatic). This function recursively filters out fields based on your security schema and the requesting user.

When using the instance method, the data argument is set to the instance.

## API

- `type` argument is the type of access
  - Can be either `read` or `write`
- `user` is the requesting user you want to [pull roles from](docs/Roles.md)
  - Optional
- `data` is the data to be sanitized
  - Can be an object, array of objects, or

### Considerations

- If no rules are specified for a field, defaults to denying access
- If data is not an object or an array, it is simply returned

## Read Example

In this example, we have two users: one admin, and one moderator. The schema specifies that only admins can read the name field, so only the admin user is able to see it.

```js
// create and wire in the schema
var schema = {
  document: {
    read: ['public']
  },
  read: {
    name: ['admin']
  }
}
palisade(User, schema)

// create some dummy data
var me = {
  role: 'admin',
  name: 'Contra'
}

var them = {
  role: 'moderator',
  name: 'Todd'
}

// ask for a read on them from me
var filtered = User.screen('read', me, them)
console.log(filtered) // {name: 'Todd'}

// ask for a read on me from them
var filtered2 = User.screen('read', them, me)
console.log(filtered2) // {}
```

## Write Example

In the same way that you can sanitize reads, you can also sanitize writes. Before inserting anything into the database or updating any documents, run all user-provided data through `.screen()` to ensure that any updates they don't have permission for are removed.

In this example, we have two users: one admin, and one moderator. The schema specifies that only admins can write the name field, so the moderator provided data has that field removed.

```js
// create and wire in the schema
var schema = {
  document: {
    read: ['public']
  },
  write: {
    name: ['admin']
  }
}
palisade(User, schema)

// create some dummy data
var me = {
  role: 'admin',
  name: 'Contra'
}

var them = {
  role: 'moderator',
  name: 'Todd'
}

// ask for a write on them from me
var filtered = User.screen('write', me, them)
console.log(filtered) // {name: 'Todd'}

// ask for a write on me from them
var filtered2 = User.screen('write', them, me)
console.log(filtered2) // {}
```
