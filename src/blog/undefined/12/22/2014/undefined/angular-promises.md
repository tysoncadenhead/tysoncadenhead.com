Writing complex behaviors in an asynchronous language like JavaScript can be a bit of a challenge. If you aren't careful, you can make some pretty ugly nested code in order to get things to work like you expect. To solve the problem of illegible nested callbacks, we have promises. If you are writing applications in Angular, you are in luck because Angular ships with a great promise library called "Q". Today, we're going to look at a few approaches to making more readable and maintainable Angular applications with the help of the built in Q promise library.

<!-- more -->

<img src="http://cdn.meme.am/instances/500x/54391964.jpg" width="50%" alt="">

### What Are Promises?

In the distant past, I have been guilty of writing things like this:

```
myModels.getPerson({ id: 1 }, function (person) {
   myModels.getDad(person, function (dad) {
        myModels.getPet(dad, function (pet) {
            myModels.getPetColor(pet, function (color) {
                // ...
            });
        });
   });
});
```

It looks really ugly, but there were instances where I needed to make one asynchronous operation, then based on the data that I got back from the operation, I would need to make another operation and the tunnel of madness would begin. Promises are an answer to that problem.

Whether you know it or not, you've probably been exposed to promises inside of libraries like jQuery when you tack a `then()` method on after a function.

The way it works is that the function returns a "promise" instead of a result. Inside the function, the promise can be resolved at some point and the `then()` method is fired which continues the chain of methods you are building.

Taking our contrived example above, if we were using promises, it might look more like this:

```
myModels
    .getPerson({
        id: 1
    })
    .then(myModels.getDad)
    .then(myModels.getPet)
    .then(myModels.getPetColor)
    .done(function (data) {
        // ...
    });
```

Now we've got an API that is readable and maintainable. Life is good again.

<img src="http://www.quickmeme.com/img/01/015f8f78101fcf7e97a3b9492a1aee81f7ed3958b5356eee14cf8391a98d2888.jpg" width="50%" />

### What Is `Q`?

There are numerous promise libraries out there, but Angular ships with one called [Q](https://github.com/kriskowal/q). It is a really nice library and I've used it for some of my non-Angular and even some of my Node projects in the past. Angular can inject `$q` directly, but some of the services, such as the `$resource` service already use it under the hood.

<img src="http://ct.fra.bz/ol/fz/sw/i59/5/9/27/frabz-One-does-Not-Simply-give-a-promise-then-pretend-it-never-happen-2d0ebe.jpg" width="50%" />

### Deferring A Promise

The syntax for deferring a promise is pretty straightforward. You need to instantiate a new `$q.defer()` and then return the promise off of the object that it returns. When you're done doing what you're doing, you just need to resolve the deferred object. If you have any data that you want to pass into the resolve function, you can pass it as the first argument.

```
angular
    .module('myApp')
    .service('Wait', Wait);

Wait.$inject = ['$q', '$window'];

function Wait ($q, $window) {
    
    var service = {};

    service.waitFor = waitFor;

    function waitFor (ms) {
        var deferred = $q.defer();

        $window.setTimeout(function () {
            deferred.resolve();
        }, ms);

        return deferred.promise;
    }

    return service;

}
```

The service above could be used like this:


```
angular
    .module('myApp')
    .controller('MyController', MyController);

MyController.$inject = ['Wait'];

function MyController (Wait) {
    Wait
        .waitFor(1000)
        .then(function () {
            alerted('I already waited for a second! I\'m bored!');
        });
}
```

<img src="http://djebbz.github.io/async-paris-js/images/why-so-asynchronous.jpg" width="50%" />

### Waiting For Multiple Promises

Sometimes, you have multiple promise you want to resolve, but it doesn't necessarily matter what order the functions are executed in. You just want to execute multiple asynchronous operations and get notified when they are done. For that, we have `$q.all`. The "all" method takes an array of functions and gives you a callback when they are all completed.

Using `$q.all` looks something like this:

```
angular
    .module('myApp')
    .controller('MyController', MyController);

MyController.$inject = ['$q', '$window'];

function MyController ($q, $window) {
    
    $q.all([
        $q(firstThing()),
        $q(firstSecond()),
        $q(thirdThing())
    ])
    .then(function (data) {
        // ...
    });

    function firstThing () {
        var deferred = $q.defer();

        $window
            .setTimeout(deferred.resolve, 1000);

        return deferred.promise;
    }

    function secondThing () {
        var deferred = $q.defer();

        $window
            .setTimeout(deferred.resolve, 2000);

        return deferred.promise;
    }

    function thirdThing () {
        var deferred = $q.defer();

        $window
            .setTimeout(deferred.resolve, 3000);

        return deferred.promise;
    }

}
```

Note that the each function you are passing into the array that is the first argument of `$q.all` method needs to be wrapped in a `$q`. That might seem a little tedious, but it keeps the functions from executing without a proper callback and in turn breaking the chain.

There might be a little learning curve with Angular promises, but it is well worth the effort. Promises can go a long way to make cleaner more maintainable code and I've found that the implementation in Angular is very solid.