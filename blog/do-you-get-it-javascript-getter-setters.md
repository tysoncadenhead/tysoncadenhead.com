In JavaScript, it is often useful to have a place to set and get configuration options.  You can do this by just creating an object and updating it, but a global object is less secure because anyone using Firebug can log the object and see the entire thing.  A getter / setter gets around that issue because it doesn't expose any values unless they are specifically requested.

<!-- more -->

Another advantage of using a getter / setter is that it puts variables inside the local variable scope instead of exposing them to the global variable scope.  Keeping the variables in the local scope speeds up the execution of the code because there is less to parse through in the global scope.

So, let's make a reusable getter / setter class, shall we?  Our class should look something like this:

```javascript
/**
* @class
* @description A reusable class that extends a basic getter / setter
*/
var getterSetter = function () {

   var items = {};

   /**
   * @function
   * @param {String} get
   * @description Gets a param option and returns it
   */
   this.get = function (name) {
      return item[name];
   };

   /**
   * @function
   * @param {String} get
   * @param {Object} value
   * @description Sets a config option
   */
   this.set = function (name, value) {
       item[name] = value;
   };

};
```

To use the getter / setter we just created, we just need to do something like this:

```javascript
// Create a new getter/setter called "config"
var config = new getterSetter();

// Set a config item called "myOption"
config.set('myOption', 'This is my option');

// Get the config option (this will alert the message "This is my option")
alert(config.get('myOption'));
```

There you have it.  Now you have a getter / setter that you can use across your entire application.