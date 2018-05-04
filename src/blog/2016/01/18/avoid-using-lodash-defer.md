We've all be there. You're trying to get a certain block of code to execute after everything else is done. If it executes too soon, you won't get it to do the thing you want it to. Lodash.defer() to the rescue! Just wrap the code that you want to execute last in an `_.defer()` method and it will wait until everything on the current call stack has completed and then execute your desired code. Problem solved. Or was it?

You see, when a `_.defer()` appears in your code, it is usually a code smell. It means that you are putting the code you want to execute too early.

Take this block as an example:

```
doFirstThing();

_.defer(() => {
    doThirdThing();
});

doSecondThing();
```

Obviously, it will execute the first thing, then the second thing and finally the third thing, but it could have more easily been written as:

```
doFirstThing();
doSecondThing();
doThirdThing();
```

This makes sense when we are just executing a bunch of functions in order, but it's not always as straightforward as that when we're using an api that someone else wrote with specific lifecycle hooks. Take this example using React lifecycle hooks:

```
componentWillUpdate () {
    _.defer(() => {
        this.setState({
            name: 'MyName'
        });
    })l
}

render () {
    return (
        <div>{this.state.name}
    );
}
```

Using the `_.defer` here makes the `setState` execute after `render` is executed, but if we had used the correct lifecycle hook, this could have been avoided:

```
componentDidUpdate () {
    this.setState({
        name: 'MyName'
    });
}

render () {
    return (
        <div>{this.state.name}
    );
}
```

You will get better performance from avoiding tacking functions onto the end of the call stack, but it also makes it more clear to see what is getting executed at which point. The pressure, of course, falls on library and framework authors to expose methods at key points in the lifecycle of components and utilities so that we can avoid defer, but it should always raise an eyebrow if we see a `_.defer()` and if there is a way to avoid it, which there often is, you will be a much happier developer.
