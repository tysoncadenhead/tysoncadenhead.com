One thing I've been doing over the past few months that has both made my object traversal more readable and less lengthy is using `Object.keys()` to get an array of the keys on my object and then looping with the array.

<!-- more -->

In the olden days, I would typically use a `for in` loop like this:

```
const obj = {
    name: 'Gandalf',
    job: 'Wizard',
    nicknames: [
        'The Gray',
        'The White'
    ]
};

for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        console.log(obj[key]);
    }
}
```

Not the best, but not the worst. The silly part was that I had to wrap each iteration of the loop an `if` statement because it was possible that I might be looping over a key on the object prototype and not on the object itself.

Luckily, with a combination of `forEach()` and `Object.keys()`, looping over keys in an object can be much nicer:

```
Object.keys(obj).forEach((key) => {
    console.log(obj[key]);
});
```

You see, `Object.keys()` creates an array of the object keys, and then we can loop over the keys or do any array operations on it we like. It's also nice to be able to take a more functional approach when dealing with iterations over an object.

For example, we could use this methodology to filter out on the keys on the object that contain a string type and map the results into an array:

```
const strings = Object.keys(obj).filter((key) => {
    return typeof obj[key] === 'string';
}).map((key) => {
    return obj[key];
});

console.log(strings); // ['Gandalf', 'Wizard'];
```

That is much more readable than using a for in loop:

```
let strings = [];
for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'string') {
            strings.push(obj[key]);
        }
    }
}
```

As you can see, it's almost always preferable to make an array of keys for iterating over an object. It makes code a lot more maintainable and readable.
