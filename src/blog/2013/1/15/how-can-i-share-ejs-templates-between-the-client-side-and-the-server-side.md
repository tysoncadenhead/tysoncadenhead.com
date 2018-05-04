The release of Node.js in 2009 ushered in discussions about the endless possibilities for sharing code between the client-side and the server side. While there are several good examples of entire libraries working very well on both ends, most of the projects that are written in Node tend to shy away from sharing the meat of the application with the browser. I think that the real issue is developers being stuck in our ways. We are trying to write traditional web apps in a language that can actually go beyond what traditional scripting languages were even capable of.

<!-- more -->

The way I am going to propose we build a Node web application isn't a typical MVC setup. However, if we are trying to be purposeful about sharing components, I feel like it really works.

For the sake of this discussion, I'll be using [Express.js](http://expressjs.com/) and [Underscore](http://underscorejs.org/). I will also assume that you are familiar with Node and have it running locally on your machine.

This is what our folder structure will look like:

```
/app
   /config
   /controllers
   /shema
/public
   /css
   /images
   /js
      /models
      /collections
      /controllers
      app.js
   /templates
server.js
```

We will need to start by creating a project.

```
mkdir myProject
cd myProject
npm init
npm install express
npm install underscore
npm install express-ejs-layouts
```

Now that we've create our project and installed our dependencies, we can create our server.js file.

```javascript
var express = require( 'express' ),
    expressEjsLayouts = require('express-ejs-layouts'),
    app = express();

// Express EJS views
app.set('views', './public/templates"');
app.set('view engine', 'ejs');
app.set('layout', 'layout');
app.use(expressEjsLayouts);

app.listen(8080);
app.use(express['static']('./public'));
```

Note that we're pointing our views to the public templates directory. We are also making the public directory serve up static files. That way, it can be entirely used by the client side.

Next, we'll need to create our templates. We'll throw them into the /public/templates/people directory. We will add an index.ejs file that lists all of the people.

```html4strict
<ul id="people">
   <% people.forEach(person) { %>
      <%- include show.ejs %>
   <% }) %>
</ul>
<h1>Add a Person</h1>
<form id="add">
   <input id="name" name="name" placeholder="Name" />
   <input type="submit" value="Add" />
</form>
```

The include tag is unique to the server-side implementation of EJS, so we won't be able to use /people/index.ejs on the client-side.

Now, we will include a show.ejs in the same directory. It will render the individual people in the list.

```html4strict
<li><%= person %></li>
```

You may have also noticed that we have a layout listed in our server.js file. We will need to create a  /public/templates/layout.ejs file to provide our layout. The client-side won't need to use layout.ejs, but it doesn't hurt anything for it to be public.

```html4strict
<!DOCTYPE html>
<html>
   <head>
   </head>
   <body>
      <%- body %>
      <script type="text/javascript" data-main="/js/app.js" src="http://requirejs.org/docs/release/2.1.2/minified/require.js"></script>
   </body>
</html>
```

If we were going to flesh out the entire folder structure I presented in the beginning, the next part would be split out between a model and a controller. However, we can just add it to the bottom of server.js file for the sake of simplicity. It will take any request to /people and render the index.ejs template with the fake data we pass into it.

```javascript
app.get('/people', function (req, res) {
   var people = [{
      name: 'Pooh'
   }, {
      name: 'Tigger'
   }, {
      name: 'Rabbit'
   }, {
      name: 'Piglet'
   }];
   res.render('people/index', { people: people });
});
```

The last piece is our client-side JavaScript. A real application should split this out into more pieces as well, but we will just put everything in our js/app.js file for this demonstration.

```javascript
requirejs.config({
   paths: {
      'jquery': 'http://code.jquery.com/jquery-1.8.3.min.js',
      'underscore': 'http://underscorejs.org/underscore-min.js',
      'text': 'https://raw.github.com/requirejs/text/latest/text.js'
   }
});

define([
   'underscore',
   'jquery',
   'text!/templates/people/show.ejs'
], function (_, $, Template) {

   $('#add').bind('submit', function () {

      var template = _.template(Template),
          data = { person: {
             name: $('#name').val()
          }};

      $('#list').append(
         template(data);
      );

      return false;

   });
});
```

As you can see, the above example reuses our template partial to update the display. This is obviously a very simple and contrived example of how templates can be shared, but the concept can be used much more broadly. There is probably no legitimate reason for any sensitive data to be openly viewable in a template, so making all the templates public should never be a problem.

In the next few weeks, I'm going to expand this discussion to address how this same concept can be applied to create a fully functional Backbone app that also shares models and collections between the client-side and the server-side. The main thing to remember when we are taking this approach is to not include anything that is sensitive in the public folder. If people can read your source code, they probably will.

Has anyone else experimented with sharing code between the Node and the browser? What are your thoughts on it?