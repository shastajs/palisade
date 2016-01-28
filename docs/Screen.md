# Model.screen(type, user, data)

Palisade adds a `.screen()` function to both the Model class as well as all instances of the model (via define and defineStatic). This function recursively filters out fields based on your security schema and the requesting user.

When using the instance method, the data argument is set to the instance.

## API

- `type` argument is the type of access
  - Can be either read or write
- `user` is the requesting user you want to [pull roles from](docs/Roles.md)
  - Optional
- `data` is the data to be sanitized
  - Can be an object, array of objects, or

### Considerations

- If no rules are specified for a field, defaults to denying access
- If data is not an object or an array, it is simply returned

## Example

```js
// create and wire in the schema
// in this one, only admins can see the name field
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
  role: 'pleb',
  name: 'Todd'
}

// ask for a read on them from me
var filtered = User.screen('read', me, them)
console.log(filtered) // {name: 'Todd'}

// ask for a read on me from them
var filtered2 = User.screen('read', them, me)
console.log(filtered2) // {}
```
