At the ng-europe conference in Paris this year, the Angular team made several revelations about what Angular 2.0 will look like once it is complete. Several of the current features of Angular will be put to rest, but one of the more notable ones is the controller `$scope`. As developers prepare to eventually migrate their applications to Angular 2.0, it is important to do what we can currently in order to prepare for the easiest migration. One thing we already know we can do is to stop using the angular $scope entirely in our controllers. This is how you can do exactly that.

<!-- more -->

### What's Wrong With `$scope`?

The current implementation of the Angular $scope is an artifact of the earlier days of Angular when many of the big questions about how to build high-quality single page applications were still being figured out and debated. The issue with injecting a `$scope` into a controller is that the there is no way to distinguish where a parameter is coming from in a template. Take this as an example:

```js
<div ng-controller="MyFirstController">
    <div ng-controller="MySecondController">
        {{myProperty}}
    </div>
</div>
```
In the example above, there is no way to determine whether the first controller or the second controller sets the `myProperty` binding. It could actually be either one, since the scope is inherited up the chain.

Because of the ambiguity along with the unnecessary verbosity of creating a unique scope inside of every controller, as the Angular 2.0 project has been progressing, it has been determined that a much better approach is to treat the controller itself as the scope.

### What Can I Do To Stop Using `$scope`?

Fortunately, we can already stop injecting a `$scope` into our controllers by using the `controllerAs` syntax in the current version of Angular. The controllerAs syntax is fairly straightforward and will probably look more familiar to developers who cut their teeth in traditional object oriented JavaScript before learning Angular. When we use `controllerAs`, `this` becomes what we would refer to as the scope of the controller.

That means that instead of this:

```js
angular
    .module('myApp')
    .controller('MyFirstController', MyFirstController);

MyFirstController.$inject = ['$scope'];

function MyFirstController ($scope) {
    $scope.myAttr = 'myAttribute';
    $scope.myMethod = function () {}
}
```

A controller would look more like this:

```js
angular
    .module('myApp')
    .controller('MyFirstController', MyFirstController);

MyFirstController.$inject = [];

function MyFirstController () {
    var vm = this;
    vm.myAttr = 'myAttribute';
    vm.myMethod = function () {}
}
```

### Okay, But How Do I Bind That?

Ultimately, you'll want to try to bind your controllers outside of your the template that is bound to. That way, you could reuse templates as needed. I won't be doing that in this example, because everything is in a single template, but I just wanted to make that clear. To bind your new controller, you'll just need to do something like this:

```js
<div ng-controller="MyFirstController as myFirstCtrl">
    <div ng-click="myFirstCtrl.myMethod()">{{myFirstCtrl.myAttr}}</div>
</div>
```

Now everything related to the controller that you have bound is namespaced to it. This avoids the confusion of nested scopes and lets you easily distinguish where everything is coming from.

### Can I Bind The Controller In The Route?

Whenever possible, it is best to bind your controller in the route itself rather than inside your templates. That will look something like this:

```js
function appConfig($routeProvider) {
    $routeProvider
        .when('/myRoute/:id', {
            templateUrl: '/templates/myTemplate.html',
            controller: 'MyFirstController',
            controllerAs: 'myFirstCtrl'
        });
}
```

This functionally works the same as setting the controller in the template. Everything in the `this` context of the controller is namespaced to `myFirstCtrl`.

I can say from my own personal experience that I ditched the use of `$scope` a few weeks ago and I haven't missed it at all. I feel good knowing that I'm working towards an easier migration once Angular 2.0 is ready and my applications have honestly been much easier to read and debug.