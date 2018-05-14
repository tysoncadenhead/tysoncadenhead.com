<div class="series-placement">

    This is part 4 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/server-side-views) | [Next Post In This Series](/blog/angular-controllers-with-sails-app)</h4>

</div>

As I promised at the beginning of this series, we are going to be using [RequireJS](http://requirejs.org/) to manage our client-side modules. If you haven't used RequireJS or a similar AMD loader before, let me just say that you are really missing out. RequireJS lets you write your code in small modules that only expose the parts of the API that you want to show and as an added bonus, it uses JavaScript to load your JavaScript modules.

<!-- more -->

<img src="http://bower.io/img/bower-logo.png" width="250px" />

#### We Can Use Bower, Right?

Before we get started, I wanted to give a quick rant about why using bower in a Sails project hasn't worked very well for me. [Bower](http://bower.io) is a package manager for client-side JavaScript much like [NPM](http://www.npmjs.com/) is for server-side JavaScript. Typically, I would use bower to manage my dependencies for any project. The issue is that Sails doesn't run your assets right out of the folder you create them in. Instead, it packages them up with Grunt and runs them out of `.tmp/public`. That approach is really helpful if you have a compilation step such as converting SASS or LESS stylesheets to CSS or minifying your JavaScript. The issue is that it if you have a ton of files in your assets directory, as is often the case when you have installed bower packages, you will inevitably either get errors complaining about the number of files being processed or it will be painfully slow. Either way, I've come to the painful conclusion that using Bower with Sails is more trouble than it is worth.

My compromise is typically to load my vendor files from a CDN whenever there is one instead of junking up my project with code that I didn't write.

![RequireJS](http://ianreah.com/img/requirejs-logo.png)

#### RequireJS

There is actually some debate about whether or not RequireJS has value in an Angular project. Angular has a dependency injection concept that makes running the code itself pretty modular. However, it doesn't load specific files for you out of the box. There are a few ways to leverage the Angular library to load your files for you. To me, though, it seems simpler to follow a set standard like what RequireJS provides by closely following the AMD spec. That way, developers in the future will have a clearer idea of where the code is coming from and how it is being loaded.

So, let's get RequireJS working.

Let's open the layout.ejs file and add a line to instantiate our Angular application. We will replace the body tag with this:

```html
<body ng-app="todoIt">
```

The name of the app can be whatever you want to call your application, but just be aware that you will be referencing it later in your javaScript.

Next, we need to go to the bottom of the layout.ejs file and replace all of the JavaScript files with this:

```html
<script src="//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.11/require.min.js" data-main="/js/main"></script>
```

That will load the require.min.js file from a CDN and then immediately require your `/js/main.js` file. Don't have a main.js file yet? No problem. Let's go ahead and build that.

```js
window.name = 'NG_DEFER_BOOTSTRAP!';

require.config({
  'baseUrl': '/js',
  'paths': {
    'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular',
    'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
    'bootstrap': '//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min'
  },
  'shim': {
    'angular': {
      'exports': 'angular'
    },
    'bootstrap': {
      'deps': ['jquery']
    },
    'socket.io': {
      'exports': 'io'
    },
    'sails.io': {
      'deps': ['socket.io'],
      'exports': 'io'
    }
  }
});

require([
  'angular',
  'app',
  'bootstrap'
], function (angular, app) {

  angular.element(document.getElementsByTagName('html')[0]);

  angular.element().ready(function() {
    angular.resumeBootstrap([app.name]);
  });

});
```

Notice at the top where we set the `window.name` to "NG_DEFER_BOOTSTRAP!". That will keep angular from initializing until we tell it to. Near the bottom after everything is loaded, we call angular.resumeBootstrap(). That is where angular picks back up and finishes initializing.

The socket.io and sails.io files that come with Sails are not wrapped as AMD modules, so we need to shim them both and export the io variable.

Otherwise, the main.js is pretty standard for a requireJS config file. 

We will also need to update the app.js file to this:

```js
define([
  'angular',
  'sails.io'
], function (angular, io) {

  var socket = io.connect(), app;

  socket.on('connect', function socketConnected() {
    console.log('Socket is now connected');
  });

  app = angular.module('todoIt', []);

  return app;

});
```

We are leaving the socket.io connection. We'll be working with that later on. For now, we mostly just want to return our app as a new angular module. Notice that the name "todoIt" is the same as the `ng-app` that we added to our layout.ejs file.

Now the main.js file will take the app that is returned from app.js and create an angular application.

When you look at your console at this point, you should get a message that says:

```bash
Socket is now connected 
```

If you see that and don't get any errors, you have successfully added an angular application on top of Sails. Stay tuned next time when we make the application actually do something.

If you want to see the code in action, check out the example repository [here](https://github.com/tysoncadenhead/sails-angular-example-app/tree/ffc98437c91b4bf154c9619fd50b103c9549a465).