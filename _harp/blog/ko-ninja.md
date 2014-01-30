Over the past year, I have been doing a ton of work on Knockout applications. There is a lot to love about Knockout. The declarative bindings allow you to keep your UI data-driven and synced at all times, which is a huge win when you are working on large scalable applications. However, one place where the Knockout core is lacking is that it is not prescriptive about how code should be written for it. That was the beginning of the idea behind ko.ninja. If we could put some structure around our viewModels, we could do some really cool things.

<!-- more -->

Ko.ninja is a collaborative open-source project written by [Jonathan Creamer](http://jonathancreamer.com/) and myself. It is still in its infancy, and I would really like to get some feedback about tweaks and improvements that could be made to make it more awesome.


### So, what does ko.ninja do?

The big win with ko.ninja is that it gives you a prescriptive framework for building well-structured applications. The Knockout documentation tells you to write your viewModels like this:

```html
<div id=“person”>
   <div data-bind=“text: name”></div>
  <h5>Friends:</h5>
  <div data-bind=“foreach: friends”>
     <div data-bind=“text: name”></div>
  </div>
</div>
```

```js
var person = {
   firstName: ko.observable(“Darth”),
   lastName: ko.observable(“Vader”),
   name: ko.computed(function () {
      return this.firstName() + “ “ + this.lastName()
   }),
   friends: ko.observableArray([])
};

person.friends.push(person);

ko.applyBindings( document.getElementById(“person”), person );
```

The issue with this approach is that there is no inheritance. If you want to create multiple people, you have to wrap the person in a “class” that returns new people. That means that our person code will actually need to look more like this:

```js
var Person = function (obj) {
  this.firstName = ko.observable(obj.firstName);
  this.lastName = ko.observable(obj.lastName);
  this.name = ko.computed(function () {
     return this.firstName() + “ ” + this.lastName();
  });
  this.friends = ko.observableArray([]);
};

var person = new Person({
   firstName: “Darth”,
   lastName: “Vader"
});

person.friends.push(new Person({
   firstName: “Storm”,
   lastName: “Trooper"
}));

ko.applyBindings( document.getElementById(“person”), person ); 
```

That approach is very close to what ko.ninja does, but it does most of the work for you. Here is a much cleaner version using ko.ninja:

```js
var Person = ko.ViewModel.extend({
   observables: {
      firstName: “”,
      lastName: “”,
      name: function () {
          return this.firstName() + “ “ + this.lastName();
      }
   }
});

var person = new Person({
   firstName: “Darth”,
   lastName: “Vader"
});

person.friends.push(new Person({
   firstName: “Storm”,
   lastName: “Trooper"
}));

ko.applyBindings( document.getElementById(“person”), person );  
```

As you can see, instead of needing to create a new ko.observable() for each observable you want in your viewModel, you can just add all of your observable names to the `observables` object on the ko.ViewModel. Instead of referencing the `ko` namespace several times to create a new viewModel, we are now only referencing it once. Ninja is also smart enough to create a ko.observable if you pass in a string, a ko.observableArray if you pass in an array and a ko.computedObservable if you pass in a function.

Ko.ninja emits events anytime an observable changes. This is basically shorthand for doing a `myObservable.subscribe()`, but it also abstracts it to the point where you could remove your observables and keep the events and the application would not break.  Events in ko.ninja work like this:

```js
var Person = ko.ViewModel.extend({

   observables: {
      firstName: “”,
      lastName: “”
   },

   // This method is called when a viewModel is instantiated
   initialize: function () {

      // This listens for the firstName to change
      this.on(‘change:firstName’, function (value) {
            console.log(value); // Jason
      });
      
      // After the viewModel is initialized, we’ll change the firstName to Jason
      this.firstName(‘Jason’);
   }
});
 
var me = new Person({
   firstName: “Han”,
   lastName: “Solo”
});
```

Cleaning up the syntax and adding more inheritance is definitely nice, but the real power of ko.ninja is in the validation. We’ll look at that in my blog post next week.

Ready to get started? [Add ko.ninja to your project](https://github.com/jcreamer898/ko.ninja) and make awesome applications today!