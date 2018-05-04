JavaScript is different from other programming languages because it is asynchronous. That means that there is a possibility that several things can be happening at the same time. In other words, JavaScript doesn't wait for one thing to execute before going to the next. If you are waiting for a timeout to fire, or a response from an Ajax call or a database transaction, while the process completes, JavaScript silently moves on.

<!-- more -->

For example, this will result in the function returning "undefined":

```javascript
function doSomething () {
  var something;
  setTimeout(function () {
    something = "a response";
  }, 1000);
  return something;
}

// This will be undefined
console.log(doSomething());
```

This can be solved by passing a callback function into the function you are calling. That's right, we're passing a function as a parameter into a function. This is JavaScript meeting Inception.

```javascript
function doSomething (done) {
  setTimeout(function () {
    done("a response");
  }, 1000);
}

doSomething(function (something) {
   // "a response"
   console.log(something);
});
```

When the process has been completed, the callback function can be fired with all of the needed data inside of it.

I keep running into instances where I need to fire several functions and then do something after they have all completed. That is trickier because there has to be a way to know when they are all done. You can do something like this:

```javascript
function thingOne (done) {
  setTimeout(function () {
    done("1st response");
  }, 1000);
}

function thingTwo (done) {
  setTimeout(function () {
    done("2nd response");
  }, 1500);
}

function thingThree (done) {
  setTimeout(function () {
    done("3rd response");
  }, 2000);
}

thingOne(function (one) {
  thingTwo(function (two) {
    thingThree(function (three) {
      // ["1st response", "2nd response", "3rd response"]
      console.log([one, two, three]);
    });
  });
});
```

That will work, but nesting callback functions inside of each other can get really messy. It also ignores one of the main benefits of JavaScript, which is the ability to perform multiple operations at the same time. The example above will take 4 1/2 seconds to complete because the functions aren't running at the same time.

A more efficient way to get the same sort of results would be to keep track of how many functions have finished executing. If the number matches the number we are expecting to finish, we know everything is done.

```javascript
var numberOfFunctions = 2, // This is a 0-based index, so 2 really means 3
    data = [];

function finished () {
  // ["1st response", "2nd response", "3rd response"]
  if (data.length === numberOfFunctions) {
    console.log(data);
  }
}

function thingOne (done) {
  setTimeout(function () {
    done("1st response");
  }, 1000);
}

function thingTwo (done) {
  setTimeout(function () {
    done("2nd response");
  }, 1500);
}

function thingThree (done) {
  setTimeout(function () {
    done("3rd response");
  }, 2000);
}

thingOne(function (one) {
  data.push(one);
  finished();
});

thingTwo(function (two) {
  data.push(two);
  finished();
});

thingThree(function (three) {
  data.push(three);
  finished();
});
```

That should run in about two seconds, so we've made a big improvement. The downside is that there can be a little overhead in making sure all of the functions have fired.

Today, I released a plugin for [underscore](http://underscorejs.com) that fires multiple functions at the same time and responds with a single callback once all of the functions have completed.

It basically uses the same concept as the last example, but it wraps all of the tedious code in a simpler method. It allows you to do the same thing as in the example above like this:

```javascript
var things = [
  function (done) {
    setTimeout(function () {
      done("1st response");
    }, 1000);
  },
  
  function (done) {
    setTimeout(function () {
      done("2nd response");
    }, 1500);
  },

  function (done) {
    setTimeout(function () {
      done("3rd response");
    }, 2000);
  }
];

_.fire(things, function (data) {
  // ["1st response", "2nd response", "3rd response"]
  console.log(data);
});
```

As you can see, using underscore fire requires significantly less code and is very readable. It's available on [GitHub](https://github.com/tysoncadenhead/underscore-fire) and [NPM](https://npmjs.org/package/underscore-fire) and the only dependency is either [Underscore](http://underscorejs.com) or [Lodash](http://lodash.com/).

Check out the readme on Github to see what it can do. Let me know what you think.