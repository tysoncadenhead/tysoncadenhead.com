This post is directly related to my previous post on [MVC and EXTJS](/blog/mvc-and-extjs-1-introduction/).   If you haven't read it yet, I'd suggest that you take a look at it before diving into this one.

<!-- more -->

For the purpose of demonstration, we'll be building a simple application that displays photos from various APIs.

The first thing you'll need is an HTML file that all of your JavaScript and CSS files will be loaded through.  If you are using a server-side technology such as Coldfusion or ASP.NET, you can use a URL parameter to distinguish whether to render your code in "production mode" or "development mode."  I usually do something like `http://mySite.com/index.cfm?mode=d`. If the mode parameter is "d", I show the uncompressed and uncombined scripts and styles.  Otherwise, I will assume that it is in production mode and show only one JavaScript file, which is a compressed and combined file of all of the other JavaScript files and only one CSS file, which is a compressed and combined version of all of the development styles.  Here is a bare-bones version of what an index page will look like.  I'll write it in Coldfusion, but it can be translated to whatever technology you use.

```html4strict
<!DOCTYPE HTML>
<html>
   <head>
      <title>My MVC EXTJS Application</title>
         <cfif URL.mode EQ 'd'>
            <link rel="stylesheet" type="text/css" href="js/com/ext/resources/css/ext-all.css" />
            <script type="text/javascript" src="js/com/ext/adapter/ext/ext-base.js"></script>
            <script type="text/javascript" src="js/com/ext/ext-all-debug.js"></script>
            <script type="text/javascript" src="js/org/development/Config.js"></script>
            <script type="text/javascript" src="js/org/development/Application.js"></script>
         <cfelse>
            <link rel="stylesheet" type="text/css" href="css/org/production/Application.css" />
            <script type="text/javascript" src="js/org/production/Application.js"></script>
         </cfif>
         <script type="text/javascript">
            Ext.onReady(function(){
               // This code will be executed when the page is ready.
            });
      </script>
   </head>
   <body></body>
</html>
```

As you can tell, I'm just adding a few files at this point.  We'll be referencing this file later on and adding to it.  Next we need to set up the Config.js file.  The purpose of the Config.js file is build an object that will hold all of the models, views and controllers as well as set configuration options to access globally.  In our case, this is what the Config.js file will look like.

```javascript
var PhotoViewer = {
   model: {},
   view: {
      Flickr: {}
   },
   controller: {},
   config: {},
   functions: {}
};
```

Remember that the Config file is always included first.  Basically all we are doing here is creating objects to hold all of our data in.  The model will do all of the Ajax calls, the view will do display code, the controllers will do event listening, the functions will hold reusable functions for the application and the config object will hold global variables.  Notice that we have a Flickr object in the view object.  Typically any controller that you create will need to have a matching view object to hold all of it's views in.  More on that later.

The next post in this series will be about building the Application.js file, which is where the fun really begins.  See you then!