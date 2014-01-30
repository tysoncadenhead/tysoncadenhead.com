[Amplify](http://amplifyjs.com/) is JavaScript component library from appendTo. It has a ton of useful features and one of them is the storage piece. If you have ever worked with storage in the browser, you probably know that there are various APIs and storage types with varying degrees of browser support.

<!-- more -->

Amplify store is handy because it abstracts away some of the lower-level storage API interaction so that you can focus on what really matters - storing and retrieving data.

Using Amplify is really straightforward. Here are the basics.

### Saving Data

To save data, you just give it a key and the value you want to store.

```javascript
amplify.store('name', 'Tyson Cadenhead');
```

It will accept more complex data structures as well:

```javascript
amplify.store('tyson', {
    name: 'Tyson Cadenhead',
    age: 28,
    friends: ['Arthur']
});
```

Arthur is my dog. He isn't my only friend, but I didn't want any of my real friends feel left out if I started listing them...

### Finding Data

You can retrieve data using the key that you used to save it.

```javascript
var myName = amplify.store('name');
console.log(myName); // Tyson Cadenhead
```

### Listing Data

To get all of the data that you have saved with amplify, you can call amplify.store() without any parameters.

```javascript
var myStoredItems = amplify.store();
console.log(myStoredItems); // [...]
```

### Removing Data

To delete data, just pass a null as the second argument.

```javascript
amplify.store('name', null);
var myName = amplify.store('name');
console.log(myName); // undefined
```

Working cross-browser with amplify store is really that easy. Just think, you could have wasted time rolling your own abstraction layer. With all of that time I've saved you, maybe you can have a chance to read a few more of my blog posts.