# User Roles

[`Model.authorized()`](docs/Authorized.md), [`Model.screen()`](docs/Screen.md), and [`.screenDeep()`](docs/ScreenDeep.md) take an optional user object as an argument which can provide role information.

## Assumed Roles

- `public` is always assumed
- `loggedIn` is assumed if any user object was provided
- `self` is assumed if the user provided has the same id as the document being accessed

## Other Roles

- If a user has a `role` attribute that is a string, it will be included
- If a user has a `roles` attribute that is an array of strings, they will be included

## Naming Roles

Your can name your roles however you like, but I typically use:

- `public` (provided by palisade)
- `self` (provided by palisade)
- `loggedIn` (provided by palisade)
- `admin` (for people responsible for moderating or performing maintenance)
- `root` (you, the engineer)
