In my opinion, one of the coolest things about Angular as a JavaScript framework is its rich testing story. With Angular, you can easily create rich and complex interfaces that separate the concerns of DOM interaction and actual code to the point where you can write tests against everything.

<!-- more -->

Unfortunately, when I was getting started with Angular, I did run into a little bit of a learning curve. I had heard that dependency injection was a key concept for making unit testing easier, but there were several things I had to get my head around to make that stand up in practice.

Today, I'm going to demonstrate how I wrote unit tests for my controllers. I may follow this up with future explorations of how to test providers, services and directives, but I thought controllers would be a good place to start.

<img src="http://louisearmstrong.com/wordpress/wp-content/uploads/2014/01/Karma.jpg" width="200px" />

### Getting Karma Running

I have been really happy with the [Karma](https://karma-runner.github.io/0.8/index.html) test runner for Angular applications. Karma was written for Angular, although you can use it to test anything. You can run it with their CLI tool or add to your Grunt or Gulp build process.

You can install the CLI tool by running this:

```bash
npm install karma -g
```

Once it is installed, just run `karma init` to generate a `karma.conf.js` file for your project. Karma will use that file to determine which directories to load your JavaScript files from, the testing framework you want to use and which browsers you want to run your tests against.

Typically, I'll write my tests using Mocha and use PhantomJS as my browser. That way, my tests can run completely in the terminal without needing to invoke a graphical browser.

Once you've got Karma installed and it is including both your application and test files, you are ready to write a test for your controller.

<img src="https://img0.etsystatic.com/000/1/6449810/il_570xN.265505392.jpg" width="200px" />

### A Simple Controller

Writing a test for your controller is actually a pretty simple process. Let's look at a contrived example of what an Angular controller might look like:

```js
// The application
angular.module('myApp', []);

// The controller
angular.module('myApp')
    .controller('MyFirstThingCtrl', ['$scope', function($scope) {
        
        $scope.things = [];

        $scope.addThing = function (thing) {
            $scope.things.push(thing);
        };

        $scope.removeThing = function (i) {
            $scope.things.splice(i);
        };

    }]);
```

Basic stuff, right? We are exposing an array to the `$scope` along with a method to add and a method to remove items from the array.

So, let's get started writing our tests.

<img src="http://www.stannsacademy.com/images/wed_cr_chairs.jpg" width="200px" />

### Setting Up The Tests

When you are testing angular modules, the first thing you will need to do is inject your own scope into it. With Mocha, we can use the `beforeEach` method and pass in your application like this:

```js
beforeEach(module('myApp'));
```

Next, we need to grab our controller using the `inject` method. To use inject, you will need to add [Angular Mocks](https://github.com/angular/bower-angular-mocks) to your `karma.conf.js` files array. Trust me, it will make unit testing Angular a lot easier.

The inject method will allow us to accept any params that we would use if we were injecting into any other angular module. Since there is no reason to minify the code for unit tests, we can safely inject without worrying about wrapping the function in an array to deal with the issues we might see when we minify our other code.

We will inject the `$rootScope`, which we can use to create a new scope to pass into our controller, and `$controller`, which will give us access to the controller we created previously.

We can expose the scope globally to all of the methods inside the controller test suite, so that we can access it when we need to.

```js
describe('The First Thing Controller', function(){

    var scope;

    beforeEach(module('myApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('MyFirstThingCtrl', {
            $scope: scope
        });
    }));

    ...

});
```

This may seem like a lot of setup, but it is all you need to do to easily add and modify things withing the scope of your Angular controller

<img src="http://us.talentlens.com/wp-content/uploads/accountant-adj.jpg" width="200px" />

### Writing the Tests

With the suite set up and ready to go, we just need to write our unit tests. If you are familiar with Mocha and the `assert` library, this should all look pretty familiar to you and it probably doesn't need much explanation:

```js
describe('The First Thing Controller', function(){

    var scope;

    beforeEach(module('myApp'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('MyFirstThingCtrl', {
            $scope: scope
        });
    }));

    describe('when we add a thing', function () {
        it('should update the array of things', function () {
            scope.addThing({
                name: 'My First Thing'    
            });
            assert.equal(scope.things[0].name, 'My First Thing');
        });
    });

    describe('when we remove a thing', function () {
        it('should update the array of things', function () {
            scope.things = [{
                name: 'My First Thing'
            }];
            scope.removeThing(1);
            assert.ok(!scope.things.length);
        });
    });

});
```

Since the scope is available everywhere inside our test suite, we can easily access it and write tests against it. To run your tests, just use:

```bash
karma start
```

Or kick it off with the build tool of your choice.

In my opinion, unit testing is where dependency injection in Angular really shines through. If you have spent much time writing JavaScript tests for applications using a framework other than Angular, you probably know how much better this approach is. Happy testing!