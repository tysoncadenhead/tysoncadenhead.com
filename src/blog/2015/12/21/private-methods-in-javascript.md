There are many reasons to not expose certain methods to the outside world in your JavaScript code. Your APIs will be cleaner and easier to reason about when there are fewer options available and you aren't exposing your internals. Sometimes it is important to hide implementation details for the sake of privacy. Whatever your reason, there will be times when you want to use private methods in your JavaScript code. Here are a few ways to accomplish that.

<!-- more -->

## The Revealing Module Pattern

The revealing module pattern is a time-tested way to handle privacy in JavaScript functions. The idea is that you call a function that returns an object with all of the functions that are publicly available from within the parent function. Everything inside the parent function that is not returned is simply not accessible to the outside world. This definitely works to keep private functions private and is a great approach when you are doing purely functional programming.

```
function coffeeMachine () {

    var cup = {};

    function addGrounds () {
        cup.grounds = true;
    }

    function addWater () {
        cup.water = true;
    }

    function brew () {
        cup.brewed = true;
    }

    return {
        makeCoffee: function () {
            addGrounds();
            addWater();
            brew();

            return cup;
        }
    };
}
```

## The Revealing Module Pattern In An ES5 "Class"

The same approach that we saw above can also be used in an ES5 "Class". We can create a new instance of the CoffeeMachine and only the methods attached to `this` will be accessible. The problem is that when we add methods to the prototype of the class, they can't access any of the private functions that we defined in our constructor and it would be pretty hacky to write all of our methods inside our constructor.

```
function CoffeeMachine () {

    var cup = {};

    function addGrounds () {
        cup.grounds = true;
    }

    function addWater () {
        cup.water = true;
    }

    function brew () {
        cup.brewed = true;
    }

    this.makeCoffee = function () {
        addGrounds();
        addWater();
        brew();

        return cup;
    };
}
```

## Using Underscores To Denote "Private" Methods

A common practice in the JavaScript world is to prefix methods that are meant to be "private" with an underscore. This informs the users of an API that the methods are not to be used by the outside world. There are a few problems with this approach. For one, not every developer is aware of this standard, so when they need a method and they find it prefixed with an underscore, they may just used it in ignorance. For another, we aren't able to achieve real privacy this way. The methods are still available on the public API and can be accessed by anyone with a JavaScript console.

```
class CoffeeMachine {

    constructor () {
        this._cup = {};
    }

    _addGrounds () {
        this._cup.grounds = true;
    }

    _addWater () {
        this._cup.water = true;
    }

    _brew () {
        this._cup.brewed = true;
    }

    makeCoffee () {
        this._addGrounds();
        this._addWater();
        this._brew();

        return this._cup;
    }

}
```

## Using Symbols As Private Method Names

The ES6 `Symbol` gives us an interesting way to create private methods in ES6 classes. The Symbol is a function that you call that returns a random unguessable type that you can use as a name for things that you don't want to keep private. The only way to access a key that is named from a symbol is to use the symbol variable itself. This creates a private method, but you will have a few funny looking methods when you log your class. In my opinion, this is the best way to add a private method to a class in JavaScript at the moment.

```
const addGrounds = Symbol();
const addWater = Symbol();
const brew = Symbol();
const cup = Symbol();

class CoffeeMachine {

    constructor () {
        this[cup] = {};
    }

    [ addGrounds ] () {
        this[cup].grounds = true;
    }

    [ addWater ] () {
        this[cup].water = true;
    }

    [ brew ] () {
        this[cup].brewed = true;
    }

    makeCoffee () {
        this[addGrounds]();
        this[addWater]();
        this[brew]();

        return this[cup];
    }

}
```

## Proposal For Private Methods In ESNext

So at this point, you are probably wondering why JavaScript doesn't have a `private` keyword for methods on classes. After all, most programming languages do. Of course, it's still early days for real JavaScript classes and we can expect more useful things to get added to the spec as time goes on. One [interesting proposal](https://github.com/zenparsing/es-private-fields) is to use a hashtag to denote private methods. I personally like the idea of using a character to denote privacy rather than prefixing `private` to a method name because it would be less typing.

```
class CoffeeMachine {

    #cup = {};

    #addGrounds () {
        this.#cup.grounds = true;
    }

    #addWater () {
        this.#cup.water = true;
    }

    #brew () {
        this.#cup.brewed = true;
    }

    makeCoffee () {
        this.#addGrounds();
        this.#addWater();
        this.#brew();

        return this.#cup;
    }

}
```

Those are some of the best ways to create or simulate private methods in JavaScript right now. What is your preference? How are you hoping the API will look in ES7?
