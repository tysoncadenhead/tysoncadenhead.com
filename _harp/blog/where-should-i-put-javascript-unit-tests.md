Over the years, I have experimented with putting my JavaScript unit tests in several different locations in my applications. A few years ago, I was very into trying to make an MVC paradigm work in my client-side code, so I would have a top-level directory called `tests` that would mimic the folder structure of the non-test code, so it would have a folder called `models` and a folder called `controllers`, etc...

<!-- more -->

## The Less Good Approach

To give an example, my *old* folder structure was something like:

```
/src
    /models
        Person.js
        ...
    /views
        ShowPerson.ejs
        ...
    /controllers
        ShowPersonController.js
        ...
/tests
    /models
        Person.spec.js
        ...
    /controllers
        ShowPersonController.spec.js
        ...
```

As you'll see in a moment, component-driven architecture lends itself to a very different structure for tests.

## The Better Approach

These days, I am writing my applications more as small components and utilities that are stitched together to make a larger application. Every component should be fluid enough that I could pull it out of my current application and stick it into a different application by just copying the directory and perhaps updating the paths to some dependencies.

This sort of strict modularity doesn't lend itself to my old approach of keeping the unit tests as island on their own. I see them as a part of the component, model or utility function. If I want to keep my pieces of the application as modular as possible, I need to have the tests as close to the real code as a can. An example folder structure for a component might look like this:

```
/DatePicker
    /__tests__
       DatePicker.spec.js
    index.js
    _DatePicker.scss
    DatePicker.jsx
```

The structure for our models might look something like this:

```
/models
    /__tests__
       Person.spec.js
       Place.spec.js
    Person.js
    Place.js
```

There are plenty of advantages to keeping our tests close to our code.

It is easy to move our code around without changing where the tests should go. If we move a folder, the tests go with it.

It's easier to keep tests in sync with code when they are physically close together. It's much easier to update a test when you don't have to navigate across multiple folders to find it. This means less cognitive overhead, which is always important to keep in mind when architecting an application.

## How To Make It Happen

The folder structure I've shown is actually *exactly* how the Facebook [Jest](https://facebook.github.io/jest/index.html) library expects you to architect your application. However, not everyone is using Jest for unit testing. I've found that in a lot of applications, Jest is overkill.

For example, we're using Mocha for testing our model layer. By default, if you run `mocha`, it will look in the `tests` folder of your project and run any JavaScript files inside it. I wrote a little JavaScript library called [Questy](https://github.com/Aloompa/questy) that that you can stick in your `test` folder that will traverse your application for `__tests__` directories at any depth in your application. When it finds a test, it requires it. This means that you just have to require Questy in one file in your tests and it will discover all of the tests you have throughout your application.

If your application is in a directory named `/src` and your tests are named `**.spec.js` in `__tests__` directories, Questy will not require any configuration. It will look like this:

```
const questy = require('questy')();
```

Obviously, this is not a huge library and you could easily write this sort of thing on your own, but it's always nicer to have one of line of code instead of 25 lines.

Keeping my tests in this sort of structure has been really nice for my productivity. It's not a make-or-break sort of thing, but every minor improvement is adds up over time. How do you architect the file structure of your test?
