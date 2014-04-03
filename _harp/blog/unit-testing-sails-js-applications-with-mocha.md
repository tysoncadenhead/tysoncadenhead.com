In my opinion, [Sails](http://sailsjs.org/) is one of the best Node MVC frameworks out there. It provides a really clean architecture and is completely customizable. The Socket.io integration also gives it an edge over many of the competitors.

I only recently started playing around with Sails, and I wanted to add a unit testing suite to the application I was working on. I searched for other people who were doing test driven development in Sails, but I wasn't satisfied with the results. As it turns out, getting tests in place for Sails was one of the easier things I've done in my life and I was able to get a few unit tests running withing 30 minutes of sitting down to do it.

<!-- more -->

To get my tests running, I used NPM to install Mocha, Grunt Mocha Test, Sinon and the Assert library:

```bash
npm install mocha --save-dev
npm install grunt-mocha-test --save-dev
npm install sinon --save-dev
npm install assert --save-dev
```

That being done, I modified the Gruntfile.js at the root of the project to use Grunt Mocha Tests. Sails uses Grunt in the background, so when you open the Gruntfile, you'll notice that there is already quite a bit of code in there. I just added three lines.

Inside of the `grunt.initConfig` object, I added:

```js
grunt.initConfig({

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['tests/**/*.spec.js']
      }
    },

    ...

});
```

Next, I added this line after all of the Sails tasks are loaded:

```js
grunt.loadNpmTasks('grunt-mocha-test');
```

Last of all, I registered a task to run the tests:

```js
grunt.registerTask('test', ['mochaTest']);
```

That being done, I created a `tests` directory in the root of the project. The grunt task will grab any JavaScript files in that directory that include "spec.js" in the filename, but this is how I organized it:

- tests
    - adapters
    - controllers
    - models
    - policies
    - services

If you run `grunt test` at this point, it will run and should even pass, but there are no actual assertions being made, which means we need to write some tests.

As a contrived example, let's say we have a basic controller that just renders a view (obviously there are better ways to handle rendering a view that no data is being passed to than even dealing with a controller, but this is just an example.) Our controller `AboutController.js` might look like this:

```js
module.exports = {

    index: function (req, res) {
        return res.view();
    },

    _config: {}
  
};
```

If we put our test inside `tests/controllers` and name it `about.spec.js`, the path to load the controller should be `../../api/controllers/AboutController`.

We will use Sinon.js to add a spy and determine whether the view method has been called. We will also import the assert library so that we can make assertions and see if our tests pass.

Once we get everything in place, the actual test might look something like this:


```js
var AboutController = require('../../api/controllers/AboutController'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The About Controller', function () {
    describe('when we load the about page', function () {
        it ('should render the view', function () {
            var view = sinon.spy();
            AboutController.index(null, {
                view: view
            });
            assert.ok(view.called);
        });
    });
});
```

But that example was a little simplistic. Let's take something more complex like a method on a model that hashes the password before the user can be saved. Our User.js model looks like this:

```js
var bcrypt = require('bcrypt');
 
module.exports = {
 
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
 
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
 
};
```

So, how would we test that the password that is passed into the beforeCreate method is getting hashed? It is as easy as making an asynchronous test that compares the user's password against the password that is passed in. If they are different, we can assume that the password was hashed. We could definitely do more to make sure that the password is not null and that the length seems to be right for a bcrypt-encoded password, but this will at least guarantee that the password created is different.

```js
var User = require('../../api/models/User'),
    sinon = require('sinon'),
    assert = require('assert');

describe('The User Model', function () {
    describe('before the user is created', function () {
        it ('should hash the password', function (done) {
            User.beforeCreate({
                password: 'password'
            }, function (err, user) {
                assert.notEqual(user.password, 'password');
                done();
            });
        });
    });
});
```

As you can see, unit testing Sails applications is really easy and straightforward. As long as you are just testing the units themselves and not the framework, this approach works really flawlessly.