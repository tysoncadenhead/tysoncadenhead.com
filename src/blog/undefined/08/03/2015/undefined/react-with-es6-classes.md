With v0.13 of React, we got native support for using ES6 classes. This may not seem like a huge deal since ES6 classes are basically just syntactical sugar over the more laborious inheritance of yesteryears JavaScript. However, it is clear that there was a problem since practically every framework or helper library added their own kind of classical inheritance, often with a different implementation. The unified class syntax for ES6 gives us an easy way to do inheritance that will one day be native to every browser and JavaScript engine. Looking forward to the future, React now gives us the ability to call React.Component as a native class.

<!-- more -->

### But isn't ES6 the future, not the present?

It is true that most browsers today don't support a lot of the awesome new ES6 features, but with a compiler like [TypeScript](http://www.typescriptlang.org/) or [Babel](babeljs.io), you can write in ES6 syntax and get it compiled down to plain old ES5 that will run on any browser out there. Personally, I would highly recommend Babel. I'm using it currently and it is totally awesome.

### How can I use the React ES6 class?

If you're already familiar with the ES6 class syntax and the React component methods, you're pretty well-equiped to use ES6 react components. There are a handful of changes, but they're pretty quick to get the hang of.

A JSX file for your component will look something like this:

```
var React = require('react');

class Profile extends React.Component {

    constructor () {
        this.state = {
            // Set the initial state here instead of using the
            // old setInitialState() method
        };
    }

    render () {
        return (
            <div className="profile">
                <h3>Profile</h3>
                <p>{this.props.firstName} {this.props.lastName}</p>
            </div>
        );
    }

}

module.exports = Profile;
```

Most of the old methods like `setState()` and lifecycle callbacks like `componentWillMount()` and `componentWillUnmount()` are still available, so there won't be a huge new API to learn.

### Why even bother?

There are plenty of good reasons to start using ES6 classes in your React applications today. While there may or may not ever come a day when Facebook totally deprecates the `React.createClass` function, it can be safely assumed that ES6 classes will become the primary syntax going forward. You will probably find more and more code examples online written this way, so it will be easier to follow examples if you are using the same class-based syntax.

Beyond that, it makes your applications slightly less dependent on React. If some new cool framework comes out in the future, chances are it will use ES6 classes as well, so you would probably just need to modify the render method and some of the component lifecycle to get the component running on your new framework of choice.

I am fully confident that most React will be written with ES6 classes as time goes on. Why not jump on the train now?
