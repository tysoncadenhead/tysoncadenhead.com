Sometimes when you are developing applications, it can be handy to know how long it takes for an operation to complete. For example, you might want to know how long an element takes to render or how long it takes for an Ajax call to resolve. Luckily, most of the modern web browsers have a `console.time` function that makes that easier.

<!-- more -->

As far as I can tell, `console.time` works in Chrome, Firefox and Safari. The api couldn't be simpler. You tell the console to start keeping track of the time be invoking console.time and passing in any arbitrary name you would like to call the time. In the example below, we're just calling it "my time."

```javascript
console.time('my-time');
```

Once we're done with the operation, we can call `console.timeEnd` and pass in the name again.

```javascript
console.timeEnd('my-time');
```

The console will display something like:

```
my-time: 1617.349ms
```

You can have up to 10,000 timers running at the same time, but you probably would be hard pressed to find a reason to be logging 10,000 unique times at once.