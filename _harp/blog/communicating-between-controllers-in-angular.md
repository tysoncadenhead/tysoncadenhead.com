In Angular, there are times when you will want one controller to be able to communicate with other controllers. For example, if you want your user to be able to click a button and for a different controller to be aware of the UI change.

<!-- more -->

Take this markup as an example:

```html
<div ng-app="myApp">
    <div ng-controller="Ctrl1">
        The current number is: {{number}}
    </div>
    <div ng-controller="Ctrl2">
        <button ng-click="buttonClick()">Click Me</button>
    </div>
</div>
```

It's a very basic contrived example, but we have a controller called "Ctrl1" that has a number in its scope. We also have a totally separate controller called "Ctrl2" that has a button with a click event on it.

Our entire application might look like this:

```js
var myApp = angular.module('myApp', []);

myApp.controller('Ctrl1', ['$scope', function ($scope) {
    $scope.number = 1;
}]);

myApp.controller('Ctrl2', ['$scope', function ($scope) {
    $scope.buttonClick = function () {
        console.log('button was clicked');
    };
}]);
```

We obviously don't want to reference `Ctrl2` in `Ctrl1`. That is what we call "tight coupling" and it is a sure recipe for building an app that will  fall apart when changes are made. What we want to do is broadcast an event to let any controllers in the application know that there has been a change. That way, the controllers that are interested will react to the event, but no controller is directly communicating with any other controller. In other words, all `Ctrl1` knows is that it is broadcasting an event. All that `Ctrl2` knows is that it is listening for an event. They are completely unaware of the existence of one another.

First of, we will need to modify `Ctrl1` to listen for an event. Angular gives us the ability to listen for and emit events on any module, but it won't do any good to listen for an event on the `$scope` of `Ctrl1` itself because `Ctrl2` can't send an event to it. It doesn't know that it exists. Instead, we will need to inject the $rootScope into our controller. The $rootScope is the application itself.

Using the $rootScope and the `$on` method, we can listen for any events that are broadcast to the `$rootScope`.

```js
var myApp = angular.module('myApp', []);

myApp.controller('Ctrl1', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.number = 1;
    $rootScope.$on('buttonClicked', function () {
        $scope.number++;
    });
}]);

```

The `$on` event that is triggered has two arguments, the context of the event and the data that is being broadcast. This means that you could actually pass an object of data with the event.

Last of all, we will need to update `Ctrl2` to broadcast an event when the button is clicked. Again, this will need to happen on the `$rootScope`.

```js
myApp.controller('Ctrl2', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.buttonClick = function () {
        $rootScope.$broadcast('buttonClicked');
    };
}]);
```

As you can see, sending messages between controllers is actually pretty simple. If you'd like to see this all together, I've created a [Fiddle](http://jsfiddle.net/63KWh/) that you can try out. For more advanced messaging, I would recommend checking out Jonathan Creamer's article, "[An angular.js event bus with postal.js](http://jonathancreamer.com/an-angular-event-bus-with-postal-js/)" where he shows how do this same thing using Postal. His approach requires another library, but it does provide a more robust API to work with.

How are you handling communication between modules and controllers in Angular? I'd love to hear your thoughts.