JavaScript has seen a ton of development even in the past 5 years. The changes haven't been so much in the language itself, but in how the language is being used. This has been a product of the host of libraries and frameworks that have been created that allow developers to consume them and do just about anything. Need a library to build robots to assist you in your evil plot to take over the world? It probably already exists.

<!-- more -->

If I had to pinpoint the biggest shift in the JavaScript world in the past few years, it would be the transition from imperative to declarative.

![](http://i.dailymail.co.uk/i/pix/2009/03/16/article-1162451-03BD9EBE000005DC-863_468x286.jpg)

### Imperative JavaScript

Back in the day, all we had was jQuery and a handful of UI plugins. Creating a well-structured app was a very difficult task. Sure, there were well-written applications before the slew of MV* frameworks came on the scene, but for the most part, JavaScript applications were like a big bowl of jQuery spaghetti code with little or no separation between the data and the UI.

I have to admit to writing code like this when I was first learning JavaScript:

```js
$('.my-buttons').click(function (e) {
    $.ajax({
        url: 'some/url',
        data: {
            id: $(e.target).id()
        },
        success: function (data) {
            $('#my-list').append('<li id="' + data.id + '">' + data.name + '</li>');
        }
    })
});
```

I could spend an entire post critiquing the code in the snippet above, but its probably enough to say that the root of the problem is that there is no persistent model layer. All of the data is managed in the DOM itself. Because this is the case, it makes it really hard to keep the state of the DOM in sync with the data that is saved to the server. Worse yet, the JavaScript code is not testable without testing the elements in the DOM.

Even closer to the root of the problem is the imperative nature of the code. Imperative programing is when your code specifies not just *what* you want to happen, but *how* you want it to happen. In other words, imperative programming means that you are dealing with many internals to make your code function properly.

In the code example above, we are essentially saying "when someone clicks on one of my buttons, I want to make an Ajax request to `some/url` passing in the ID of my targeted element. When the Ajax request comes back successfully, I want to update my UI by appending an item to my list with the data that is returned from my Ajax request."

The process is very fragile. What if the name of the list element changes? What if we need to do something else with the data in addition to our current DOM manipulation? What if other parts of the UI need to be updated as a result of the button being clicked? How can we make the application aware of the data at a higher level? These are all important questions that could take us down a rabbit hole of complex UI changes, deeply nested callbacks and the terrible feeling of anxiety and depression each time someone wants us to update the application.

There has to be a better way!

![](http://machoarts.com/wp-content/uploads/2012/08/The+Cingularity+cg+robot.jpg)

### Declarative JavaScript

Fortunately, there is a better way. In contrast to imperative, with declarative programming you only describe *what* you want to happen, and leave the question of *how* it will happen up to your framework of choice.

Certain frameworks do a better job of managing the internals than others, but I have found that [Angular](https://angularjs.org/), [Knockout](http://knockoutjs.com/), [Ember](http://emberjs.com/) and [React](https://facebook.github.io/react/) all do a good job of it thanks to their various concepts of two-way binding.

With the framework of your choice, you should be able to update the data in a model layer and have the UI automatically update without ever writing any code to change anything in the DOM. Make no mistake, all of these frameworks are changing the DOM, but that has been abstracted away to the point where you should never have to manipulate it directly or with jQuery.

The above example written in Angular might look something like this:

```js
var myServices = angular.module('myServices', ['ngResource']);

myServices.factory('List', ['$resource', function ($resource) {
    return $resource('some/url');
}])

var myControllers = angular.module('myControllers', []);

myControllers.controller('MyAwesomeCtrl', ['$scope', 'List', function ($scope, List) {
    $scope.list = List.query();
    $scope.buttonClick = function () {
        $scope.list = List.query();
    }
}]);
```

The binding of the data to the DOM is done directly in the template. Everything is totally testable and best of all we are no longer writing imperative code. Our application doesn't need to know how the elements are being updated in the DOM. The controller doesn't even care whether or not anything in the DOM is bound to it, only that data is being set in the its scope.

This is the big shift that has been occurring in JavaScript application development over the past few years and it is making JavaScript a much better environment to write in. As a JavaScript developer, I think the next few years will be an exciting renaissance as we continue to move complex internals into our libraries and frameworks, which will make life for the everyday developer a lot easier.