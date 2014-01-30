When I started writing JavaScript (and code in general, for that matter), one of toughest things for me to wrap my head around was what variables and functions I could access from where.

<!-- more -->

For example, I would try things like this:

```javascript
alert(MyVariable);
var MyVariable = 'This is a variable!';
```

The previous code would fail because the variable hadn't been set yet when it was called.  Instead, it should look more like this:

```javascript
var MyVariable = 'This is a variable!';
alert(MyVariable);
```

The previous code will work because the variable had been set before it was called.  You see, JavaScript is a linear language.  Even files have to be loaded in a linear fashion to guarantee that you aren't calling any variables that are not already set.  That's why if you're using jQuery, you have to load it into the DOM before you load any scripts that use the jQuery library.  I know that's pretty basic, but it's the starting point for the rest of this.

How about this example?

```javascript
function MyFunction(){
    var myVariable = 'Test';
}
MyFunction();
alert(myVariable);
```

That example will also fail because the variable is created inside the function and the variable is being called outside of it.  There are a few of ways to access variables that are set inside of functions, however.  The code below will work because the variable is already defined outside of the function.  The variable is updated inside the function, but it is updated before we alert it and so it is still accessible.

```javascript
var myVariable;
function MyFunction(){
    myVariable = 'Test';
}
MyFunction();
alert(myVariable);
```

Another way to retrieve variables set inside a function is to return them.

```javascript
function MyFunction(){
var myVariable = 'Test';
    return myVariable;
}
var myVar = MyFunction();
alert(myVar);
```

The code above will work because the function doesn't rely on any global variables and it simply returns the variable that is set inside of it.  In this case, you could literally say that MyFunction equals 'Test.'  You can also return the variable using the 'this' associated with the function:

```javascript
function MyFunction(){
    this.myVariable = 'Test';
}
var myVar = MyFunction().myVariable;
alert(myVar);
```

When trying to figure out if a variable will be accessible, ask yourself if it is on the same level (not nested in a function) as the place you are attempting to call the variable or if it is a parent (a function or more higher than the variable you are attempting to call.)  If the answer is yes, then you will be able to get to the variable.  That's why something like this won't work:

```javascript
function MyFirstFunction(){
    var myVariable = 'Test';
}
function MySecondFunction(){
    alert(myVariable);
}
MyFirstFunction();
MySecondFunction();
```

But this will:

```javascript
var myVariable;
    function MyFirstFunction(){
    myVariable = 'Test';
}
function MySecondFunction(){
    alert(myVariable);
}
MyFirstFunction();
MySecondFunction();
```

Any questions?