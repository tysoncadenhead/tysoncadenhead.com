When I first started writing JavaScript, most of the libraries that are around today weren't available, which meant that there were basically a few low-level ways to loop over an array of content. Now that there are many more options, I wanted to take a moment to examine what they are and how each option might affect readability of code as well as performance.

<!-- more -->

We will start with the native looping that JavaScript gives you without any additional libraries or frameworks. For the rest of this discussion, we will assume that we are looping over an array that looks like this:

```js
var cats = [
    'Shy One',
    'Horatio',
    'Nestor le Freep',
    'Muon',
    'Barry Mundee',
    'Orange Juice',
    'Cali',
    'Baby Boo',
    'G Whillikers',
    'Uma',
    'Scud',
    'Mitaine',
    'Suki',
    'Mallorey',
    'Princess Sarah',
    'Pogo',
    'Baby Kitten',
    'Sweety'
];
```

These cat names all came out of a [random cat name generator](http://www.alistair.com/catname/) so don't judge. I'm sure they would be better names if they were for dogs.

So, one way to loop over the cats is this:

```js
for (var i = 0; i < cats.length; i++) {
    if (cats[i].indexOf('Baby')) {
        console.log(cats[i]);
    }
}
```

This is a pretty common pattern. If you've been using JavaScript for a while, you will be familiar with it, but it might be hard for a beginner to break down that we are creating a variable called `i` that is equal to 0 and we are incrementing the number again and again until `i` is no longer less than the length of all of the cats.

Another way to approach this is to use a while loop:

```js
var i = 0;
while (cats.length < i) {
    if (cats[i].indexOf('Baby')) {
        console.log(cats[i]);
    }
    i++;
}
```

You could argue that the while loop is a little easier to read than the for loop because it doesn't handle all of the logic of the loop in the head. [Performance differences](http://jsperf.com/while-vs-for-00001/13) are all over the board.

The while loop tends to be faster in most current browsers, but there are plenty of instances where they are dead-even and even a couple of times when `for` measures marginally faster. However, if you're looking for a general rule, the while loop typically comes out ahead.

To round out our discussion of native looping options, there is the `for-in` loop:

```js
cats.forEach(function (cat) {
    if (cat.indexOf('Baby')) {
        console.log(cat);
    }
});
```

Obviously, this is the most clean and readable native way to loop over an array. The `forEach` method is a prototype of the Array, which makes it very simple to use. The main issue with forEach is browser support. Any versions of Internet Explorer before IE9 do not support it. If you are supporting IE8 and below, you can easily polyfill forEach, but that is another discussion for another time.

Depending on what perfs you look at, `forEach` typically comes out behind the `for` loop. I have seen instances where this is the opposite as well, so take that with a grain of salt.

Now, to throw in the library looping methods. JQuery has a `$.each` method that looks like this:

```js
$.each(cats, function (cat) {
    if (cat.indexOf('Baby')) {
        console.log(cat);
    } 
});
```

The underscore and lodash version looks pretty similar:

```js
_.each(cats, function (cat) {
    if (cat).indexOf('Baby') {
        console.log(cat);
    } 
});
```

[According to the perfs](http://jsperf.com/jquery-each-vs-for-loop/7), the underscore version is two or three times faster than the jQuery version. The lodash version, which looks exactly the same as the underscore version is about 4 times as fast as jQuery in most browsers.

My personal preference is not to use jQuery for utility methods. JQuery does a great job with traversing the DOM and normalizing browser interaction, but I personally prefer to leave lower-level utilities to something else, such as lodash that only focuses on providing utility fast methods. End of rant.

In the end, I would say that the native `forEach` and the lodash `_.each` method are the most readable. ForEach is problematic in the browser because of backwards compatibility. `_.each` is not quite as fast because it is not native and every level of abstraction inevitably gives you a performance hit.

In most smaller apps, `_.each` should be sufficient. If you are working on something with a ton of looping where performance is vital, the while loop is a pretty solid choice, although you may take a small maintainability hit with it. When I'm working on a server-side service, I usually go with `forEach` because it works everywhere and it is readable and pretty fast.

In the end, the main thing is consistency. All of these options have their pros and cons, but the last thing you want is to randomly select different choices throughout a project. When you use one of these methods, make sure you know why one is better than the others.

What do you think? How do you weigh the options when it comes to deciding between maintainability, performance and browser support?