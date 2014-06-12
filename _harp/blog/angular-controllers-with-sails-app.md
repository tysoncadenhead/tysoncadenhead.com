<div class="series-placement">

    This is part 5 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/adding-dependencies)</h4>

</div>

In the past few posts, I've been laying the groundwork for building an Angular application on top of Sails. Now that everything is in place, we can jump right in to adding Angular views.

<!-- more -->

### Create the List Route

First, we will generate a new controller and model called "list":

```bash
sails generate list
```

Next, we will add a link to the list page in our layout.ejs file:

```html
<li class="<% if (title === 'List') { %>active<% } %>">
  <%- link_to('List', '/list') %>
</li>
```

Now, if we open our `/api/controllers/ListController.js` file, we can add a method to render the index page:

```js
module.exports = {
  index: function (req, res) {
    res.view(null, {
        title: 'List'
    });
  },
  _config: {}
};
```

Finally, we will create a view for the lists in `/views/list/index.ejs`:

```html
<ul class="checklist">
    <li>
        <input type="checkbox" checked /> Do a thing
    </li>
    <li>
        <input type="checkbox" /> Do another thing
    </li>
    <li>
        <input type="checkbox" /> Do a third thing
    </li>
</ul>

<button class="btn btn-primary">Add</button>
<button class="btn btn-danger">Remove</button>
```

### Add the Angular Controller

Now that we've got the view rendering for our list, we can add an Angular controller to it.

We will update the markup for the `views/list/index.ejs` template to use Angular:

```html
<div ng-controller="ListCtrl">
    <ul class="checklist">
        <li ng-repeat="item in items">
            <input type="checkbox" ng-checked="item.completed" /> <span ng-bind="item.description"></span>
        </li>
    </ul>

    <button class="btn btn-primary" ng-click="addItem">Add</button>
    <button class="btn btn-danger" ng-click="removeItems">Remove</button>
</div>
```

The Angular bindings to take note of are the `ng-controller`. That will bind everything inside of it to the context of the controller we specified. Next, there is the `ng-repeat`, which loops over items in the scope.

Now that we've added the controller to the markup, we need to actually create the controller in JavaScript. Let's look at our `/assets/js/app.js` file. We'll need it to update it to look like this:

```js
define([
  'angular',
  'sails.io',
  'controllers'
], function (angular, io) {

  var socket = io.connect(), app;

  socket.on('connect', function socketConnected() {
    console.log('Socket is now connected');
  });

  app = angular.module('todoIt', [
    'controllers'
  ]);

  return app;

});
```

Basically, we are requiring a JavaScript file which we haven't created yet called `controllers.js`. We are also adding a "controllers" module to our application.

Now that we've got that in place, let's create the `/assets/js/controllers.js` file:

```js
define(function (require) {
  
  var angular = require('angular'),
      Controllers = angular.module('controllers', []);
  
  Controllers.controller('ListCtrl', require('controllers/listCtrl'));
  
  return Controllers;
  
});
```

The great thing about the way we've set up this file is that anytime we need to add a new controller, it's as simple as adding one new line. This will require the controller and initialize it.

Now, we'll need to create a new directory at `/assets/js/controllers`. Inside our new folder, we'll make a file named `listCtrl.js`. The listCtrl.js file should look like this:

```js
define(function () {
    return ['$scope', function($scope) {
        $scope.addItem = function () {
            console.log('addItem');
        };
        $scope.removeItems = function () {
            console.log('removeItems');
        };
        $scope.items = [{
            description: 'Do a thing',
            completed: true
        }, {
            description: 'Do another thing',
            completed: false
        }, {
            description: 'Do a third thing',
            completed: false
        }];
    }];
});
```

So there we go. Each of our controller AMD modules will just return an array with the dependencies as the items in the array and a function as the last item, just like a regular Angular controller except the controller is being initialized in the controller.js file, not on an individual module basis.

We are adding an array of "items" to the `$scope`. We also went ahead and stubbed out a couple of methods for the buttons. They'll just do a console.log for now, but we'll get them working soon.

Now we have Angular controllers on top of our Sails app. At this point, the app should look something like this:

![](/images/blog/angular-controllers-with-sails-app2.png)

Next time we'll start getting real data on the app.

If you want to see the point our sample app should be at by now, check out the Github repo [at this point](https://github.com/tysoncadenhead/sails-angular-example-app/tree/12d1e1860f0c1ae5acead7f6011059ce6b637375).