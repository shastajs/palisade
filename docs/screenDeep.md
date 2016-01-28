# screenDeep(user, data)

Palisade exports a `.screenDeep()` function that lets you ensure complex objects or arrays have all nested data within it secured. It recursively walks through data and runs `.screen()` + `.authorized()` on any objects that expose it. This is extremely useful for exposing sets of data that contain multiple types of models, or are nested in any way.

## API

- `user` is the requesting user you want to [pull roles from](docs/Roles.md)
  - Optional
  - `data` is the data to be sanitized
    - Can be an object, array of objects, or

## Considerations

- Objects and arrays will be recursively processed
- Objects that expose a [`.screen()`](docs/Screen.md) function will be replaced with the output of that call with a type of `read`
- Objects that expose a [`.authorized()`](docs/Authorized.md) function will be removed if the output of that call with a type of `read` is false
- Objects removed from either `screen()` or `authorized()` will be stripped
  - If you have 20 items where the user can't see 10, it will return an array of 10 items
