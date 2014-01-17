[Previously](/blog/how-do-yo-make-a-compoundjs-app), I introduced you to Compound, an awesome MVC framework for NodeJS. Today, I am going to expound on how the routing works in Compound.

If you are not familiar with how MVC work, I suggest you take a look at some of my older articles about [JavaScript Architecture](/blog/javascript-architecture) and [Code Separation](/blog/code-seperation/). From here on, I will assume that you have a basic understanding of the place of controllers in the MVC paradigm so that the routing will make sense. Let's begin.

<!-- more -->

The CompoundJS router is built on top of the ExpressJS router, so if you are familiar with Express, the syntax should look suspiciously similar. Your router will be located in the /config/routes.js file. It should look something like this:

```javascript
exports.routes = function (map) {
    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};
```

As you can see, the router above is setting some basic global rules. If we hit /users/create it will resolve to the "create" method of the users controller. If we hit /users/edit/12 it will resolve to the "edit" method of the users controller with an id of "12" passed into the method.

To map all of the basic CRUD functionality to a Compound controller, just add:

```javascript
map.resources('users');
```

Yes, that is just one line of code, but it magically maps all of these routes:

-   users GET - users#index
-   users POST - users#create
-   users/new GET - users#new
-   users/:id/edit - users#edit
-   users/:id DELETE - users#destroy
-   users/:id PUT - users#update
-   users/:id - users#show

That will cover many of your routing needs, but if you need to make a route go directly to a controller method, the syntax looks like this:

```javascript
map.get('users/login', 'users#login');
```

With the code above, you will be able to go to the /users/login URL and it will resolve to the "login" method of the users controller.

To map your homepage, you can use map.root like this:

```javascript
map.root('pages#home');
```

The above snippet will map to the "home" method of the pages controller.

The Compound routing is very robust, so you may need to read through the documentation to see everything that it can do for you.