# API Endpoint

To tie it all together, here's how you would use Palisade to create some secure API endpoints:

## Reading a User by Id

```js
import palisade, {screenDeep} from 'palisade'
import User from 'models/User'

export default (req, res, next) => {
  // first check if the request is allowed to read
  // anything from the users collection
  if (!User.authorized('read', req.user)) {
    return res.status({status: 403})
  }

  // run the query
  User.get(req.params.id).run(function(err, data){
    if (err) return next(err)

    // send back our secured data!
    res.json(screenDeep(req.user, filtered))
  })
}
```

## Updating a User by Id

```js
import palisade, {screenDeep} from 'palisade'
import User from 'models/User'

export default (req, res, next) => {
  // checks if the request is allowed to update the
  // document at all. provides the id to enable the `self` role to exist
  if (!User.authorized('update', req.user, {id: req.params.id})) {
    return res.status({status: 403})
  }

  // screen the user-provided data
  var change = User.screen('write', req.user, req.body)

  // run the query to update
  User.get(req.params.id)
    .update(change, {returnChanges: true})
    .execute((err, res) => {
      if (err) return next(err)

      // send back our new secured data!
      res.json(screenDeep(req.user, filtered))
    })
}
```
