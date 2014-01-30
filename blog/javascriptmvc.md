Nearly a year ago I was working for a company in the financial services industry that had need for a scalable, secure, AJAX application.  It was extremely large in scale and scope and it quickly became clear that I was going to have to have some sort of organizational structure to build the application upon.  My server-side experience at this point was primarily in writing C#, and I had fallen in love with the organization of the .NET MVC design pattern.  From there, I had been doing some contract work using CakePHP, which is also an MVC framework.  While I had written JavaScript for my websites, an entire application is completely different.  I looked around at frameworks and eventually settled on [JavaScript MVC](http://javascriptmvc.com) for its basis in the MVC framework as well as its rich feature set.  So what does JavascriptMVC come with "out of the box?"

<!-- more -->

### A great architecture using Model-View-Controller

The model handles all of the AJAX calls and post requests, the controller handles all of the events and the view handles the display and DOM manipulation.  The view uses EJS templates, which look very much like XHTML, but you can actually pass JavaScript variables into them and use variables, conditionals and loops not unlike a server-side language.

### Scaffolding

You can essentially create a client-side mockup of you database interactions and work independently of the server when needed.  This is especially handy if the server-side guys are working out a bug and you need to keep pushing forward.

### Development, Testing and Production modes

Development is great for quick and easy modification, but when you actually launch a project, you can minimize and combine all of your files into one HTTP request just by typing a line into the command line via Rhino.  You can easily switch between modes just by changing one line of code.  There is functional and unit testing offered through [Selenium](http://seleniumhq.org/) and [Rhino](http://www.mozilla.org/rhino/).

### Easy Documentation

Writing documentation is a breeze because it is generated based on the comments in your code!

### Error handling.

It plugs into [DamnIt](https://damnit.jupiterit.com/) to provide error handling and reporting.

I could go on and on about JavascriptMVC, and I just may end up doing that in the future.  It is incredible, after all.  It's built around jQuery, so most of the conventions should be familiar to the vast majority of JavaScript people.

I would encourage you to download it and give it a try.  There is a bit of a learning curve, but there is documentation as well as an introductory video on the [JavaScriptMVC](http://javascriptmvc.com) website to get you going.