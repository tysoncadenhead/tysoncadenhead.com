This is a part of a larger series about the [ko.ninja framework](/blog/ko-ninja) that I helped to create to make Knockout development more awesome. Previously, we looked at how we can automatically save ko.ninja data with ajax, but today we're going to look at how to use Socket.io with ko.ninja. Since I love socket.io so much, I had to include it as one of our model options in ko.ninja. This is not a primer on how to use socket.io, so if you haven't used it before, I suggest checking out my blog post on [getting started with socket.io](/blog/getting-started-with-socket-io).

<!-- more -->

To use socket.io for saving your ko.ninja data, you will need to include the socket.io javaScript file in your document just like normal. Once that's done, you can set up a viewModel like this:

```js
ko.ViewModel.extend({
  model: {

    // For socket.io, the storage should always be set to socket.io
    storage: 'socket.io',

    // The name of the model. If message names are not specified, this will be used to generate the message names. This is required.
    name: 'list',

    // The http protocol to use for socket.io messages. This is set to "http" by default, but you could change it to https
    protocol: 'http',

    // The domain name to use for socket.io messages. This is set to "localhost" by default
    domainName: 'localhost',

    // The port number to use for socket.io messages. This is set to 8080 by default
    port: 3000,

    // The message names can be updated to be anything you want. These are all defaulted and not required.
    messageNames: {
      'update': 'update-myList',        // Defaults to {{name}}-update
      'insert': 'insert-intoMyList',    // Defaults to {{name}}-insert
      'find': 'find-stuffInMyList',     // Defaults to {{name}}-find
      'findOne': 'find-aThing',         // Defaults to {{name}}-findOne
      'remove': 'remove-aThing'         // Defaults to {{name}}-remove
    }

  },
  ....
});
```

As you can see, there is a fair amount of configuration here. The good news is that if you want to go with the defaults, configuring the socket.io model is as simple as this:

```js
ko.ViewModel.extend({
  model: {
    storage: 'socket.io',
    name: 'list'
  },
  ....
});
```

Using the default configuration, the server should have the following subscriptions:

```js
io.sockets.on('connection', function (socket) {

    socket.on('list-findOne', function (data, done) {
        console.log(data.id); // Do something with the id
        done({}); // Return the data for the id
    });

    socket.on('list-find', function (data, done) {
        console.log(data.query); // The query
        done([]); // Return an array
    });

    socket.on('list-insert', function (data, done) {
        console.log(data.data); // The data
        done({}); // Return the new record
    });

    socket.on('list-update', function (data, done) {
        console.log(data.id); // The id
        console.log(data.data); // The data
        done({}); // Return the record
    });

    socket.on('list-remove', function (data, done) {
        console.log(data.id); // The id
        done({
            success: true    
        }); // Return a message
    });

});
```

You can then hook up to your favorite database and store the data on your server.

This concludes this series introducing ko.ninja. I'll be returning less long-term posts in the coming weeks. I just felt that there was too much content to put in a single post with ko.ninja.

Are you convinced yet that ko.ninja is a cool little framework? If not, what do you think it is missing that could make it better? Ko.ninja is totally open-sourced and we welcome any ideas or pull requests that might add value to the framework.

Ready to get started? [Add ko.ninja to your project](https://github.com/jcreamer898/ko.ninja) and make awesome applications today!
