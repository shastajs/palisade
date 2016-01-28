# User Roles

[`Model.authorized()`](docs/Authorized.md), [`Model.screen()`](docs/Screen.md), and [`.screenDeep()`](docs/ScreenDeep.md) take a user object as an argument and use this system for getting the roles off of it:

- `public` (always exists)
- `loggedIn` (if a user object was provided)
- `self` (if the user accessing the data has the same id as the document)
- `{user.role}` (if user accessing data has a `role` string)
- `{user.roles}` (if user accessing data has a `roles` array of strings)

Your roles can be named whatever you like, but I typically use:

- `public` (provided by palisade)
- `self` (provided by palisade)
- `loggedIn` (provided by palisade)
- `admin`
- `root`
