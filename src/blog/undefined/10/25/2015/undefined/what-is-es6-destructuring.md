One interesting new feature that ES6 brings us is something called "destructuring." Destructuring can be used to pull certain parts of an object out of an object and assign those parts to a new variable or multiple variables. Lest you think that this is a useless part of the ES6 spec, let me show you some examples of how destructuring can be used in a JavaScript application.

<!-- more -->

### Using Destructuring

Destructuring is not in most browsers yet. It is part of the ES6 spec which began to get implemented this year in browsers, but there is still a long way to go for full browser-support. To get this to work in the browser, you'll need to install a transpiler. I highly recommend [Babel](https://babeljs.io/). We are using it for some large production applications and it is a solid choice. If you're running Node, you'll either want to use 4.0 or up or run it with the `--harmony` flag on.

### Destructuring Array Assignments

Before we had destructuring, when we wanted to get elements out of an array, we had to individually create new variables for each item we wanted to have easier access to, like this:

```
const arr = ['Hank Rearden', 'Dagny Taggart', 'Eddie Willers'];

const first = arr[0];
const middle = arr[1];
const last = arr[2];

console.log(first); // Hank Rearden
console.log(middle); // Dagny Taggart
console.log(last); // Eddie Willers
```

The syntax for this is much easier with ES6 destructuring as you can see below:

```
const [first, middle, last] = ['Hank Rearden', 'Dagny Taggart', 'Eddie Willers'];

console.log(first); // Hank Rearden
console.log(middle); // Dagny Taggart
console.log(last); // Eddie Willers
```

In the example above, we created three constants, `first`, `middle` and `last`. Since those constants are surrounded by array brackets, JavaScript knows that the item on the other side is an array and that we are getting items out of it.

### Getting the last item in an array

Before, to get the last item in an array, we had to create the array first so that we could get its length and return the item at the end of it, like this:

```
const arr = [1,2,3];
const last = arr[arr.length - 1];
```

With destructuring, we can use the `...` syntax to pull out the last item in the array and assign it to the `last` constant name, like this:

```
const [..., last] = [1,2,3];
```

The `...`, basically lets us skip to the end of the array so we don't have to name every record.

### Destructuring Object Assignments

Setting variables from objects in JavaScript has always been rather tedious. Say for example, that we want to set the name and employer from the object below into their own variables for easier access:

```
const person = {
    name: 'John Galt',
    employer: 'Twentieth Century Motor Company'
};
```

We would have to make new variables for each of the items we want to abstract from the object like this:

```
const name = person.name;
const employer = person.employer;
```

This becomes much less tedious when we employ destructuring:

```
const { name, employer } = person;
```

The nice thing here is that we are simultaneously saying that we want to get the values of "name" and "employer" from the person object and that we want to create constants with those names from the extracted data.

ES6 has given us another great feature by letting us set defaults on function parameters and destructuring assignments. That means that instead of doing this:

```
let { name, employer } = person;

if (!employer) {
    employer = 'Rearden Metal';
}
```

We can simply do this:

```
let { name, employer = 'Rearden Metal' } = person;
```

### Better APIs!

We learned long ago that building APIs with multiple arguments like the example below is very fragile because it is difficult to remember what order arguments should go in and it also locks the API into an un-changable structure.

```
myAPI.doSomething(id, name, place, color);
```

That's what most APIs expect and object to get passed in with all of the parameters as keys:

```
myAPI.doSomething({
    id: id,
    name: name,
    place: place,
    color: color
});
```

As it turns out, destructuring can work directly on our method arguments, so we can easily pull out the arguments we need:

```
myAPI.doSomething = ({ id, name, place, color }) => {

};
```

Oh, and the call to the function can become simpler if the arguments we are passing have the same name as the keys we are setting them to:

```
myAPI.doSomething({
    id, name, place, color
});
```

As you can see, using destructuring can make a lot of code more concise and easier to work with. It is definitely not a hammer for every job though. If you are going to use it, you will need to work to make sure your team knows what it is and how it works or it could be extremely confusing for other programmers to read and work with. I've started using it for certain things and I've had no issues so far, but be warned.

Are you using destructuring in your code? What do you think about it?
