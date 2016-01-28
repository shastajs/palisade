# Model.authorized(type, user, data)

Palisade adds a `.authorized()` function to both the Model class as well as all instances of the model (via define and defineStatic). This function checks the document rules in your security schema and returns `true` if everything is cool.

When using the instance method, the data argument is set to the instance.

## API

- `type` argument is the type of operation being requested on the document
  - Can be any type you [specified in your document ruleset](docs/Rules.md)
- `user` is the requesting user you want to [pull roles from](docs/Roles.md)
  - Optional
- `data` is the document the operating is being requested for
  - Optional

### Considerations

- If no rules are specified for a document operation type, defaults to denying access
- If an object with an `id` attribute isn't given for the data argument, the `self` role can't be provided
  - *Hot tip:* If you don't have access to the whole document but you know the id, just `{id: 'the id'}` will work fine

## Read Example

In this example, we have two users: one admin, and one moderator. The schema specifies that only admins can read user documents, so only the admin user gets a `true` return from calling `authorized()`.

```js
// create and wire in the schema
var schema = {
  document: {
    read: ['admin']
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
var canRead = User.authorize('read', me, them)
console.log(canRead) // true

// ask for a read on me from them
var canRead2 = User.authorize('read', them, me)
console.log(canRead2) // false
```
