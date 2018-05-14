<div class="series-placement">

    This is part 6 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/angular-controllers-with-sails-app) | [Next Post In This Series](/blog/syncing-angular-with-sails)</h4>

</div>

In the last few posts, we have been building an application using Sails, Angular and RequireJS. We've got a basic UI in place now, so we should be able to get it to a point where we can actually send and receive data from the server.

<!-- more -->

The first thing to do is to open our `/api/models/List.js` file that we generate earlier. There shouldn't be much in it at this point. We can go ahead and a few attributes:

```js
module.exports = {

  attributes: {
    "description": {
        "type": "string",
        "required": true
    },
    "completed": {
        "type": "boolean",
        "defaultsTo": false
    }
  }

};
```

Now, we have a "completed" boolean for each record that defaults to false and a "description" that is required.

### Sails Blueprints

Sails makes creating an API really easy by providing something called "blueprints". The basic idea is that if you have a controller and model with the same name, Sails will automatically create REST and CRUD endpoints that you can easily hit with Ajax.

By default, all of the paths route to the root of the root of the domain, but if we edit the `config/controllers.js` file, we can change the path that the blueprints point to so that it doesn't interfere with the rest of our application. We just need to find the option called "prefix" and add our own prefix like this:

```js
{
  ...
  prefix: '/api',
  ...
}
```

Now our routes should look something like this:

- POST /api/list - Inserts a record
- PUT: /api/list/:id - Updates the record
- DELETE: /api/list/:id - Deletes a record
- GET: /api/list/find - Returns all of the records
- GET: /api/list/find/:id - Returns a specific record

The really cool thing is that we barely did anything to make all of this possible. It simply works.

If you want to write your own methods for the API, you can add them to your controller and map them with the route config, but 90% of the time, the blueprints will give you everything you need if you have a well-written model layer.

That should be enough to get us to the next post where I will talk about using Angular services to communicate with the Sails api we just created.

If you are following the Github repo, we are currently at [this point](https://github.com/tysoncadenhead/sails-angular-example-app/tree/89eec077b278ed12c4a18eb369e36e544e60cc84) in the application.