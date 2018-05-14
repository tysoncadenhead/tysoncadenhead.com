<div class="series-placement">

    This is part 7 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/sails-models)</h4>

</div>

Now that we've gotten our server-side API set up, we can us it to get data into the Angular portion of our application. We'll be using the $http service that Angular gives us out of the box. The point of this is to quickly get the application running and not necessarily best practice, so please be forgiving.

<!-- more -->

We'll start off by adding the `$http` service to our controller in `assets/js/controllers/ListCtrl.js`.

```js
define(function () {
    return ['$scope', '$http', function($scope, $http) {
        $scope.description = '';
        $scope.items = [...];
    }];
});
```

We also added a description to the scope for managing new items in our list. We'll get back to that in a second.

Previously, we were passing an array to `$scope.items`. Now that we have an api to hit, we can get the data from the server:

```js
$http.get('/list/find').success(function(data) {
  for (var i = 0; i < data.length; i++) {
    data[i].index = i;
  }
  $scope.items = data;
});
```

We can also flesh out the adding and removing of items from our list:

```js
$scope.addItem = function () {
    $http.get('/list/create?description=' + $scope.description).success(function(data) {
      $scope.items.push(data);
    });
};

$scope.removeItem = function (data) {
    $http['delete']('/list/' + data.id).success(function() {
      $scope.items.splice(data.index, 1);
    });
};
```

Last of all, we'll add a method to trigger when an item in the list is checked:

```js
$scope.itemCheck = function (data) {
    $http.get('/list/update?id=' + data.id + '&completed=' + ((data.completed) ? 0: 1));
};
```

Now, we just need to make a few updates to our `/views/list/index.ejs` template:

```html
<div ng-controller="ListCtrl">
    <ul class="checklist">
        <li ng-repeat="item in items">
            <input type="checkbox" ng-model="item.completed" ng-click="itemCheck(item)" /> <span ng-bind="item.description"></span> <button class="btn btn-sm btn-danger" ng-click="removeItem(item)">x</button><br /><br />
        </li>
    </ul>

    <input type="text" ng-model="description" /> <button class="btn btn-primary" ng-click="addItem()">Add</button>
</div>
```

That will do it. Angular and Sails should now be communicating with each other and your data is being saved correctly to the database.

If you are following along with the Github repo, [this is the place that we've gotten to](https://github.com/tysoncadenhead/sails-angular-example-app/tree/75d83433e1deffee62542af877a8e7dc31a3031c).

Thanks for following along with this series! Now that it is over, we can get back to normal one-off posts.