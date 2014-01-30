JavaScript is a loosely-typed case sensitive language.  Technically everything in the language is a variable.  Yes, it may be a string, a function, an array or an object, but everything is a variable at its core.  Because you can make your variables all lowercase or all uppercase or anywhere in between, it’s important for the sake of code readability to have a pattern for how the variables will be cased.

<!-- more -->

The following is the best practices for variable casing and is useful to encourage a greater consistency in JavaScript code:

### Variables
For dynamic strings, ints, floats and arrays, use camel casing.

```javascript
var myVariable = 'This is my string';
console.log(myVariable);
```

### Objects
Classes should be camel-cased.

```javascript
var myObject = { hello: 'world' };
console.log(myObject);
```

### Constants
Constants are similar to dynamic variables, but the difference is that they should never change once they are set.  Think of these as configuration variables.  Constants should be upper cased with an underscore between each word.

```javascript
var MY_CONSTANT = ‘I am a constant!’;
console.log(MY_CONSTANT);
```

### Functions and Methods
Functions and methods should both use camel casing.

```javascript
var myFunction = function(){
   console.log(‘I am a function!’);
};
myFunction();
```

### Classes
Classes look quite a bit like functions, but they are initialized using ‘new’. JavaScript classes should use upper casing.

```javascript
var MyClass = function(){
   this.alert = function(){
      console.log(‘I am a Class!’);
   }
}

var getClass = new MyClass();
getClass.alert();
```

Obviously, this isn't going to instantly fix all of the coding issues in the world, but follow these guidelines and your code *will* be just a little more legible!