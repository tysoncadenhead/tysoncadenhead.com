Unit testing in JavaScript can be difficult sometimes. Typically, you only want to test the behavior of a single module, but if you are using an AMD loader like RequireJS, you may be pulling in several other libraries and modules just to test a single module. The point of the unit test is to test an individual unit, not to test how it works with other dependencies.

If only there was a way to trick the test runner into thinking that the other modules were loaded by providing simplified stubs of the methods they actually performed! Good news, that is totally possible using [Squire](https://github.com/iammerrick/Squire.js/). Don't run away when you see the creepy looking mascot on the GitHub page, Squire is totally worth your time.

<!-- more -->

If you have used Angular, you are familiar with how dependency injection can work in JavaScript. Squire has extended this ability to work with any AMD module. The basic idea is that the module says that it needs "x dependency", but Squire steps in and says "well, actually I'm going to give you y dependency instead, but you can still go on believing that it is x dependency. Silly you."

Let's say that you have a module that looks like this:

```js
// Person Module

define([
    'underscore',
    'friends'
], function (_, Friends) {

    var Person = function (data) {
        this.init(data);
    };

    _.extend(Person.prototype, {

        addFriend: function (data) {
            this.friends.add(data);
        },

        getId: function () {
            return this._id;
        },

        init: function (data) {
            this.friends = new Friends(data.id);
            this.addFriend({ id: 223 });
        }

    });

    return Person;

});
```

Obviously, it would have a friends dependency. That might look something like this:

```js
// Friends Module

define([
    'underscore'
], function () {

    var Friends = function (id) {
        this.init(id);
    };

    _.extend(Friends.prototype, {

        add: function (friend) {
            this._friends.push(friend);
        },

        init: function (id) {
            this._friends = [];
            this._id = id;
        }

    });
    
});
```

Now, lets say we want to test the Person module, but we want to test Friends separately. First lets look at how that might be done without dependency injection:

```js
define([
    'person'
], function (Person) {

    describe('the person module', function () {

        beforeEach(function () {
            this.person = new Person({
                id: 213
            });
        });

        describe('when adding a new friend', function () {
            it ('should add the friend to the the person', function () {
                assert.equal(this.person.getId(), 213);
            });
        });

    });

});
```

Not too terrible, but we are just requiring one module from the person and there aren't any weird side effects like there might be in a real-world example.

To stop actually using the friends module, we can do this:

```js
define([
    'squire',
    'sinon'
], function (Squire, sinon) {

    var injector = new Squire();

    injector.mock({
        'friends': {
            add: sinon.stub()
        }
    });

    injector.require([
        'person'
    ], function (Person) {

        describe('the person module', function () {

            beforeEach(function () {
                this.person = new Person({
                    id: 213
                });
            });

            describe('when adding a new friend', function () {
                it ('should add the friend to the the person', function () {
                    this.person.addFriend(new Person({
                        id: 222
                    }));
                    assert.equal(this.person.find().length, 1);
                });
            });

        });

    });

});
```

Sure, it is a little more code, but here is what we have gained:

- We are no longer loading the friends dependency, so the test will run faster
- We are testing the person module in isolation

Not bad, huh?

Let's walk through how we did that.

First of all, we created a new injector by instantiating Squire. 

Next, we gave Squire an object of dependencies that we wanted it to replace by using `injector.mock`. You might also noticed that we used a library called [Sinon](http://sinonjs.org/) to create an empty function that could take the place of friends.add(). If you haven't used Sinon, you are missing out, it allows you to fake methods and return anything you want from them, which makes it a perfect companion for Squire.

Last, we required our module using `inject.require()`. While the API does look exactly like RequireJS, it is passing the call through Squire for dependency injection instead of requiring the dependencies.

Pretty cool, huh?