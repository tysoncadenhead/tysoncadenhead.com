In the old days, if you wanted to get up-to-date data from the sever, you would need to set an interval on the client-side and continuously make Ajax calls to see if new data was available. The problem is that the data was never exactly real time. It was just what had been fetched every fifteen seconds or so. If you pinged the server too often, you would create needless overhead and there may or may not even be new data for the client to consume. The problems with this sort of approach are obvious.

<!-- more -->

The answer to the old data pinging method is Socket.io. With Socket.io, the client and the server are able to communicate in real   time by sending messages back and forth. Because of its real-time nature, Socket.io has some awesome implications for chat, instant collaboration and game development. In fact, anything that could benefit from being real time would do itself a service to be using Socket.io.

### So how can you get started using Socket.io?

First of all, you'll need to have [NodeJS](http://nodejs.org) installed. Once you have Node, you can install Socket.io with npm.

```bash
npm install socket.io
```

For the sake of setting up a server quickly, we'll also install Express. You can obviously run Socket.io on a server you create yourself, but Express makes it much easier.

```bash
npm install express
```

### server.js

Since Socket.io uses the server-side and the client-side to communicate, you will need to set it up on both sides. The `server.js` file might look something like this:

```javascript

var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server),
      messages = [],
      sockets = [];

app.use( express.static(__dirname + '/public'));

server.listen(4000);
```

If you're not familiar with Express applications, all we've done so far is set up the express server to serve up static files from the /public directory. We've also imported Socket.io and created an array to hold the messages we'll get from the client-side and another array to hold the socket connections we make.

Now, let's set up the server-side socket.io listeners.

```javascript

io.sockets.on('connection', function (socket) {

  sockets.push(socket);

  socket.emit('messages-available', messages);

});
```

Every time a client-side connection is made, the "connection" event is fired. The socket that has been connected is passed in as the first argument of the callback. We'll store a reference to the new socket in the array of sockets we have already set up. Then we will use `socket.emit` to emit a message to the client-side with an array of all of the messages that are currently available. Of course, it will initially be an empty array, so we will switch over to the client-side so we can start actually saving messages to the server.

If you save your file as `server.js` and run `node server`, you should be able to access it by going to http://localhost:4000. Nothing will be there yet because you need to put an index.html file in your public directory.

### /public/index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Socket.io Messages</title>
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/css/bootstrap.min.css" rel="stylesheet" />
  </head>
<body>

  <!-- The form -->
  <form id="create-message" class="well row">
    <fieldset class="col-lg-8 col-offset-2">
      <legend>Socket.io Messages</legend>
      <input type="text" placeholder="Name" id="name" name="name" class="col-lg-12" />
      <textarea placeholder="Message" id="message" name="message" class="col-lg-12"></textarea>
      <input type="submit" value="Create Message" class="btn btn-default col-lg-12" />
    </fieldset>
  </form>

<!-- The Messages -->
<div class="col-lg-8 col-offset-2 row">
  <ul id="messages" class="list-group">
    <!-- Messages go here -->
  </ul>
</div>

<!-- Third Party Dependencies -->
<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="http://netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/js/bootstrap.min.js"></script>

<!-- Socket.io -->
<script src="/socket.io/socket.io.js"></script>

<!-- Our app.js file -->
<script type="text/javascript" src="/js/app.js"></script>

</body>
</html>
```

The main thing to note here is that the `/socket.io/socket.io.js` file was automatically generated when you installed socket.io into your application. There is no /public/socket.io directory and there doesn't need to be one. Don't worry about it; it's automagic.

### /public/js/app.js

Next, let's jump into the `/public/js/app.js` file that we are including at the bottom of the page. That's where we'll get our client-side and server-side talking.

We'll start out by connecting to the socket. Since we set the socket to run on port 4000 in our `server.js` file, we'll pass the string http://localhost:4000 into io.connect.

```javascript
var socket = io.connect('http://localhost:4000');
```

Everytime that the server tells us that there is a new message, we'll need to add it to the DOM. We'll just create a reusable function to use jQuery to prepend the newest message at the top of the messages list.

```javascript
function addMessage (data) {
  $('#messages').prepend('<li class="list-group-item">' +
    '<h4 class="list-group-item-heading">' + data.name + '</h4>' +
    '<p class="list-group-item-text">' + data.message + '</p>' +
  '</li>');
};
```

Now, we can create a listener to render all the messages that are already in the messages array on the server-side when the page is rendered. Remember, we are already emitting a "messages-available" event in `server.js` when the page is loaded. This will make use of that event.

```javascript
// This will be fired
socket.on('messages-available', function (data) {
  for (var i = 0; i < data.length; i++) {
    addMessage(data[i]);
  }
});
```

We will also add a listener for each time an individual message is added. We will write the server-side portion of this in just a moment.

```javascript
// This listens for any individual messages coming back from the server
socket.on('message-added', addMessage);
```

Last of all, we will need to send the form data to the server whenever someone submits it. We'll just attach a jQuery submit event to the form and emit an "add-message" event to the server-side. We'll pass in the data as the second argument of the socket.emit method.

```javascript
// When someone clicks the "Create Message" button, we'll emit the data to the server
$('#create-message').submit(function (e) {

  // Don't let the form actually post to the server
  e.preventDefault();

  // Send the "add-message" message to the server with our values
  socket.emit('add-message', {
    name: $('input[name="name"]').val(),
    message: $('textarea[name="message"]').val()
  });

  // Clear out the message value
  $('textarea[name="message"]').val('');

});
```

You might notice that Socket.io looks the same on the client-side and the server-side. Both places use the socket.on and socket.emit methods.

At this point, our `public/js/app.js` file is done. It should look like this:

```javascript
var socket = io.connect('http://localhost:4000');

function addMessage (data) {
$('#messages').prepend('<li class="list-group-item">' +
    '<h4 class="list-group-item-heading">' + data.name + '</h4>' +
    '<p class="list-group-item-text">' + data.message + '</p>' +
  '</li>');
};

// This will be fired
socket.on('messages-available', function (data) {
  for (var i = 0; i < data.length; i++) {
    addMessage(data[i]);
  }
});

// This listens for any individual messages coming back from the server
socket.on('message-added', addMessage);

// When someone clicks the "Create Message" button, we'll emit the data to the server
$('#create-message').submit(function (e) {

  // Don't let the form actually post to the server
  e.preventDefault();

  // Send the "add-message" message to the server with our values
  socket.emit('add-message', {
    name: $('input[name="name"]').val(),
    message: $('textarea[name="message"]').val()
  });

  // Clear out the message value
  $('textarea[name="message"]').val('');

});
```

Now, we'll revisit our `server.js` file.We'll add a listener for the "add-message" event. When the message is added, we'll push it into the messages array and emit an event with the data.

```javascript
socket.on('add-message', function (data) {
  messages.push(data);
  sockets.forEach(function (socket) {
    socket.emit('message-added', data);
  });
});
```

Notice that we are looping over all of the sockets in our array. The reason for this is that each time a socket is connected, we only get a reference to that individual socket. If we want everyone to get the messages, we will need to emit our events to every socket that is available.

Now that we've got that in place, the `server.js` file should look like this:

```javascript
var express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require('socket.io').listen(server),
      messages = [],
      sockets = [];

app.use( express.static(__dirname + '/public'));

server.listen(4000);

io.sockets.on('connection', function (socket) {

  sockets.push(socket);

  socket.emit('messages-available', messages);

    socket.on('add-message', function (data) {
      messages.push(data);
      sockets.forEach(function (socket) {
        socket.emit('message-added', data);
      });
   });
});
```

As you can tell, there is really not much to it. Obviously, we aren't saving the data to a database. That means that if you stop running your server and restart it, the arrays of messages and sockets will actually be empty again. In a production scenario, you would probably be saving your data off to a database as the server receives it.

Now that all of our code is written, we can start the server up and give it a try.

```bash

node server

```

Now, when you go to `localhost:4000` in your browser, you should see something like this:

![](http://content.screencast.com/users/tysoncadenhead/folders/Jing/media/211b507d-7fea-4eb3-8a15-9d332204f540/00000010.png)

The best way to see this in action is to open the page in two separate browsers at the same time and start chatting with yourself. As soon as you post something, it will show up in both browsers immediately.

![](http://content.screencast.com/users/tysoncadenhead/folders/Jing/media/158fd662-eb89-4892-8dee-59a9988af35a/00000009.png)

Amazing, right?

There are definitely things that Socket.io can be used for beyond just chat. For example, I used it in a project recently to send status messages to the client while files were being uploaded.

Of course, one of the more interesting applications of this technology is the ability it provides for collaboration in real time. We now have the ability to write applications that give people the power to interact with content seamlessly. Socket.io has the ability to bring people together in a way that no other coding technology ever has. And at the end of the day, isn't bringing people together what good technology is all about?

[Download the full demo on GitHub](https://github.com/tysoncadenhead/socket.io-chat-demo)