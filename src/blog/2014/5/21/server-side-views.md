<div class="series-placement">

    This is part 3 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/starting_the_sails_project) | [Next Post In This Series](/blog/adding-dependencies)</h4> 

</div>

Today, we are going to look at how Sails.js handles server-side templating. Sails lets you use whatever type of templating you want want, but out of the box, it uses EJS, which is based off of Ruby's ERB.

<!-- more -->

Lets start by going into our project directory and starting our server using:

```bash
sails lift
```

All of the views will be served from the `/views` directory. If you go to localhost:1337, you can see that there is already a template that comes with Sails. That template can be found in `views/home/index.ejs`. The individual pages are all wrapped with a layout template as well. The layout is located in `/views/layout.ejs`.

### The Layout

Let's replace the layout with our own markup:

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%- title %> | TODOIT</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="/styles/app.css">
  </head>

  <body>
    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#"><i class="fa fa-check"></i> TODOIT</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/list">My List</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container">
        <div class="row featurette">
            <div class="col-md-7">
              <h2 class="featurette-heading"><%- title %></h2>
              <%- body %>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="/js/socket.io.js"></script>
    <script type="text/javascript" src="/js/sails.io.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/app.js"></script>
  </body>
</html>
```

You may notice that we aren't using RequireJS to load our modules yet. Don't worry, we'll be covering that in the future. You may also notice that we are referencing a `styles/app.css` file, we will need to create that:

```css
body {
  padding-top: 50px;
}
.starter-template {
  padding: 40px 15px;
  text-align: center;
}
```

You will need to restart your server to see the stylesheet show up. I know it is annoying to have to restart your server when you change a style or script, but we'll be looking at a solution for that soon.

### Home Page

Now let's replace the markup in the `home/index.ejs` file:

```html
<p class="lead">Check it out. Check it off.</p>
<img src="http://cdn2.content.compendiumblog.com/uploads/user/4268c6b6-ce2f-102a-80e3-0015c5f70ec2/aa4211a4-bb44-46d7-8e55-e2bf85cbb4a4/Image/01056b67869d6ad5848d9df376132aa5/questions_to_ask.jpg" />
```

### Passing Data To Your Views

You might notice that in the layout template, we are referencing a `<%- title %>` attribute. By default, the title will be "Sails". You can override that globally by creating a config file like this one I made in `config/app.js` and adding your own appName:

```js
module.exports = {
    appName: 'TODOIT'
};
```

If you want a different title on each page, you can also control the title from your controller. If you look at your `config/routes.js` file, you will see that the `/` route is currently just rendering a view instead of being driven by a controller. Why don't we generate a controller to drive the home page?

```bash
sails generate controller home
```

The command above will generate a new empty controller in your `api/controllers` directory called `HomeController.js`. We can add a method to the `module.exports` called "index."

```js
index: function (req, res) {
    res.view(null, {
        title: 'Home'
    });
},
...
```

The first argument in the res.view() method is the template name. If it is a string, a template with that name will be rendered. If it is blank, the controller uses the controller name and the method name to create the path to the view. The second argument is an object of data that the controller is passing into the view. That is where we can add the title.

Now we will need to update the routes to use the home controller instead of just rendering the home view with no controller.

Find this line:

```js
'/': {
    view: 'home/index'
}
```

and change it to:

```js
'/': {
    controller: 'HomeController',
    action: 'index'
}
```

Once you restart your server and go to the home page, you should see the title "Home" displaying correctly. It should look like this:

![](/images/blog/sails-server-views1.png)

### About Page

Now, let's go ahead and create an about page:

```bash
sails generate controller about
```

In the module.exports for `api/controllers/AboutController.js`, add this method:

```js
index: function (req, res) {
    res.view(null, {
        title: 'About'
    });
},
...
```

Now open your `config/routes.js` file and add a this route underneath the previously created home page route:

```js
'/about': {
    controller: 'AboutController',
    action: 'index'
}
```

Last of all, we will need to create the view for our about page. We will create a file name `/views/about/index.ejs` with this markup:

```html
<p class="lead">This is an example application to show how to use Sails.js with Angular. If you would like to follow along with how it was created, check out this <a href="http://www.tysoncadenhead.com/blog/sails-ninja-intro">blog series</a> that walks you through step by step.</p>
```

Now, when you go to localhost:1337/about, you should see this:

![](/images/blog/sails-server-views2.png)

### URL Helpers

Sails ships with just the standard EJS implementation. There are [some handy helpers](https://code.google.com/p/embeddedjavascript/wiki/ViewHelpers) that Sails doesn't take advantage of. Luckily, it's easy to add them to your app.

First, just install the dependency:

```bash
npm install express-helpers --save
```

and then add this to your `config/bootstrap.js` file:

```js
require('express-helpers')(sails.express.app);
```

With that update in place, we can change the layout.ejs file to use the `link_to()` helper like this:

```html
<ul class="nav navbar-nav">
  <li class="active">
    <%- link_to('Home', '/') %>
  </li>
  <li>
    <%- link_to('About', '/about') %>
  </li>
</ul>
```

When you restart your server and refresh the app, it should still display correctly, but it is using the view helpers now.

### Active Section

Because the controllers are already sending the title to the views, we can use that to determine what page we are on. We'll apply an "active" class to the page name in the navigation that we are currently on:

```html
<ul class="nav navbar-nav">
  <li class="<% if (title === 'Home') { %>active<% } %>">
    <%- link_to('Home', '/') %>
  </li>
  <li class="<% if (title === 'About') { %>active<% } %>">
    <%- link_to('About', '/about') %>
  </li>
</ul>
```

That is the quick rundown of Sails templates and how they work. If you want to see all of this code together, check out the repository [at this point](https://github.com/tysoncadenhead/sails-angular-example-app/tree/07db5eb5457b4cd2209691c5e2c32ea22c54e5f0).