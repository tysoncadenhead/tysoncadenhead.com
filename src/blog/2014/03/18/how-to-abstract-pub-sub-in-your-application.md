If you have worked on a large scalable web application, I probably don't have to tell you how important it is to keep your modules from directly referencing each other. There are several Pub/Sub libraries that have emerged to solve that problem. Some of the main contenders are [PubSubJS](https://github.com/mroderick/PubSubJS), [Postal](https://github.com/postaljs/postal.js) and [Amplify](http://amplifyjs.com/).

With several options to chose from, there is certainly value in abstracting away whichever choice you make so that you could easily switch the Pub/Sub library out without impacting the application. There are various reasons for switching libraries. Your library of choice might become unmaintained, or perhaps it will evolve in a way that doesn't suite your needs, or perhaps a better solution will emerge. Whatever the case, you certainly don't want to be locked in and have to change every file of your application if you do make the choice to switch at some point. Additionally, if you are using an AMD loader, you get the added benefit of not needing to require the pub/sub library in every module that uses it. This is how I have gone about abstracting my pub/sub libraries in applications in the past.

<!-- more -->

### Create a Pub/Sub Mixin

I would start by creating a mixin to use with my classes. This is basically just an object that extends methods to publish and subscribe to topics. Your methods might look something like this:

```js
var PubSubMixin = {

    publish: function (topic, data) {

    },

    subscribe: function (topic, callback) {

    },

    unsubscribe: function (topic) {

    },

    unsubscribeAll: function () {

    }

}
```

To flesh this out, the mixin might look something like this if we are using Postal:

```js
var PubSubMixin = {

    _subscriptions: {},

    publish: function (topic, data) {
        postal.publish({
            topic: topic,
            data: data
        });
    },

    subscribe: function (topic, callback) {
        this._subscriptions[topic] = postal.subscribe({
            topic: topic,
            callback: callback.bind(this)
        });
    },

    unsubscribe: function (topic) {
        this._subscriptions[topic].unsubscribe();
        delete this._subscriptions[topic];
    },

    unsubscribeAll: function () {
        var self = this;
        for (var subscription in this._subscriptions) {
            this.unsubscribe(subscription);
        }
    }

}
```

I basically just save a reference to all of the subscriptions in the `_subscriptions` object so that I can use the references to unsubscribe from any of the topics if I need to.

### Mix the Mixin Into Your Classes

I typically don't just use the classes that my MV* framework gives me out of the box. Instead, I wrap them up so that I can extend them and add functionality for all of my modules.

For example, instead of just extending Backbone's View, I might have an abstraction like this:

```js
myApp.View = function (options) {
  
    return Backbone.View.extend(
        _.extend(options, PubSubMixin)
    );

};
```

### New Up Your Classes and Enjoy Pub / Sub

With the backbone view abstraction using my PubSubMixin, I can call the `this.publish()`and `this.subscribe()` methods where I need them.

```js
var documentRow = new myApp.View({

    initialize: function () {

        this.publish('document-rendered', {
            rendered: true
        });

        this.subscribe('some-subscription', function (data) {
            console.log(data);
        });

    }
    
});
```

While this example uses Backbone, it works just as well with most of the other popular frameworks. It is a great way to abstract your pub / sub calls so that you can use them when you need them to communicate messages across your application.