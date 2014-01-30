Knockout JS is a fairly simple MVVM framework that aims to make data binding easier.

The cool thing about Knockout is that you can essentially subscribe an element to a piece of data. When that data is updated, the DOM magically updates as well. To be more precise, its not really magic that's happening... it's JavaScript.

<!-- more -->

As a simple example, lets say you want to bind an element to a variable called "randomNumber". The HTML template should look very familiar if you've been using the HTML5 data sudo-attribute.

```html4strict
<p>Random Number: <span data-bind="text: randomNumber"></span></p>
```

In our JavaScript, all we need to do is apply the RandomNumberViewModel and add a randomNumber observable inside of it. We'll call getNumber() to generate a random number. Now when the script is executed, the template is automatically updated with a fresh new random number.

```javascript
function RandomNumberViewModel () {
   function getNumber () {
      return Math.random();
   };

   this.randomNumber = ko.observable(getNumber());

};

ko.applyBindings(new RandomNumberViewModel());
```

But what if we want to update the number to a new random number every second? Once you assign a Knockout observable, that observable becomes a method that you can call to update the value. We'll set an interval to update to a new random number.

```javascript
function RandomNumberViewModel () {
   function getNumber () {
      return Math.random();
   };

   this.randomNumber = ko.observable(getNumber());
   
   setInterval(function () {
      this.randomNumber(getNumber());
   }.bind(this), 1000);

};

ko.applyBindings(new RandomNumberViewModel());
```

Knockout also has a series of bindings that make calling events and updating data easier. We can use "click" to  bind a click event to buttons. Let's use that to create a stop and start button.

```html4strict
<p>Random Number: <span data-bind="text: randomNumber">0</span></p>
<button data-bind="click: startInterval">Start!</button>
<button data-bind="click: stopInterval">Stop!</button>
```

We'll also need to add stop and start methods to our ViewModel.

```javascript
function RandomNumberViewModel () {
   var interval;

   function getNumber () {
      return Math.random();
   }

   function startInterval () {
      interval = setInterval(function () {
         this.randomNumber(getNumber());
      }.bind(this), 100);
   }

   this.randomNumber = ko.observable(getNumber());

   this.stopInterval = function () {
      clearInterval(interval);
   }.bind(this);

   this.startInterval = startInterval.bind(this);

};

ko.applyBindings(new RandomNumberViewModel());
```

Knockout is a pretty awesome tool. The observables really make it useful for building complex single-page apps. I'm looking forward to digging deeper into the framework in the near future.