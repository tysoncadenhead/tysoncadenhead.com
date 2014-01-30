When it comes to building applications quickly that share a ton of code between the client-side and server-side and that excel at real-time communication, there is nothing more awesome than Meteor. Meteor aims to remove all of the busywork from creating single-page applications, and it does a heck of a job at it.

<!-- more -->

The cool thing about Meteor is that it lets you share your server-side and client-side code and it makes synchronizing data a snap. Meteor has a client-side database that it syncs with the server-side database behind the scenes, which lets you actually interface with the server-side database from the client.

To download Meteor and get started using it, you can simply run:

```bash
curl https://install.meteor.com | /bin/sh
```

That will install Meteor on your local machine and you'll be ready to get into the actual app building. Meteor comes with a bit of built in scaffolding, so you can actually just run:

```bash
meteor create myAppName
cd myAppName
meteor
```

and you'll have created an application and started the server to actually see it. By default, meteor is setup to run on port 3000, so if you navigate to http://localhost:3000, you will see a page that looks something like this:

![Meteor Hello World](/images/blog/meteor1.png)

You'll probably notice that tempting little button on the page. Go ahead and open your console and click it. You should get a message telling you that you clicked the button.

![Meteor Hello World Button Click](/images/blog/meteor2.png)

So what is actually happening here? If you go into the `myAppName` directory you created, you should see three files. There is a `myAppName.css`, which is actually empty when you create a new app, `myAppName.html`, which is the templates for your application and finally, the `myAppName.js` which is where both the client-side and server-side JavaScript currently live.

First, let's look at the `myAppName.html` file.

```html
<head>
  <title>myAppName</title>
</head>

<body>
  {{> hello}}
</body>

<template name="hello">
  <h1>Hello World!</h1>
  {{greeting}}
  <input type="button" value="Click" />
</template>
```

As you can see, it's a pretty standard handlebars template. You might be surprised if you go to the page and look at the source, though. Everything inside the `<template />` tag will be missing. The reason is that Meteor automatically parses all of the html files in your project and pulls out all of the templates and stuffs them into a single concatenated JavaScript file. This means that you can actually put as many html files as you need anywhere in your project and they will be available for the JavaScript api to access quickly on the client-side.

Now, let's look at the `myAppName.js`.

```javascript
if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to myAppName.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
```

You might notice that this single JavaScript file is being used on the client-side and the server-side. Meteor has both a `Meteor.isClient` and a `Meteor.isServer` boolean that you can check to see if you are running the code in the browser or on the server. Alternatively, if you put code in a directory called "client", it will only be available in the browser. Code inside of a directory named "server" will only be available to the server-side. Any files in any other folders will be available in both the client-side and the server-side.

The code inside of the `Meteor.isServer` conditional actually isn't doing anything. However, it does show that there is a `Meteor.startup` method. It's worth noting that the client-side has the same method, but it acts like the jQuery `document.ready` function - it just fires when the DOM is finished loading.

Another thing to note is the Template object. Every template automatically gets an object named after it that is namespaced under Template. For example, since we have a template in our html file called hello, there is a `Template.hello` object. We can access any events that happen inside the hello template using `Templated.hello.events`. The events object expects the names to be structured as an event followed by the selector associated with the event.

We can also add any parameters that we want to pass into our template on the `Template.hello` object. For example, there is a greeting defined in our JavaScript file that will be rendered in our "hello" template.

That is the basic setup for Meteor. In my blog post next week, I'll show you how you can deal with data in Meteor.