# User Roles

User roles come from:

- `public` (always exists)
- `loggedIn` (if a user object was provided)
- `self` (if the user accessing the data has the same id as the document)
- `{user.role}` (if user accessing data has a `role` string)
- `{user.roles}` (if user accessing data has a `roles` array of strings)

Roles may be named whatever you like, but I typically use:

- `public` (provided by palisade)
- `self` (provided by palisade)
- `loggedIn` (provided by palisade)
- `admin`
- `root`
