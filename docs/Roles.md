# User Roles

[`Model.authorized()`](docs/Authorized.md), [`Model.screen()`](docs/Screen.md), and [`.screenDeep()`](docs/ScreenDeep.md) take an optional user object as an argument which can provide role information.

## Assumed Roles

- `public` is always assumed
- `loggedIn` is assumed if any user object was provided
- `self` is assumed if the user provided has the same id as the document being accessed

## Other Roles

- If a user has a `role` attribute, it will be included
  - This can either be a string, or a function that returns a boolean
  - Any functions given will receive an object as the sole argument, which contains `user`, `data`, and `roles` keys
- If a user has a `roles` attribute, it will be included
  - Expects either an array of strings, or functions that returns a boolean
    - (or any combination of the two!)
  - Any functions given will receive an object as the sole argument, which contains `user`, `data`, and `roles` keys

## Naming Roles

Your can name your roles however you like, but I typically use:

- `public` (provided by palisade)
- `self` (provided by palisade)
- `loggedIn` (provided by palisade)
- `admin` (people responsible for moderating or performing maintenance)
- `root` (you, the engineer)
