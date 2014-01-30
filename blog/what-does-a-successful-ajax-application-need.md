Having worked on several large scalable JavaScript and Ajax application over the past couple of years, I've started to form a definite opinion about what an application needs in order to be truly scalable and ultimately successful.  So what does your application need?

<!-- more -->

### Multiple Files that compress down
While you are developing and debugging your application, it is helpful to have many external JavaScript files.  You wouldn't try to make a large server-side project with just one file would you?  So why would you have a JavaScript file that is hundreds if not thousands of lines long?  Long files are harder to work with because you end up doing a lot of scrolling up and down the file rather than flipping between files.  Of course, in the end, you will want a process that minifies, combines and compresses your files because they will load faster that way.

### Namespacing
You don't want a bunch of global variables and functions floating around waiting to be overwritten.  I usually start by having an object name after the project and putting everything inside it in a logical way.  It also is helpful to namespace your functions and variables because it makes it easier to literally log all of your variables with Firebug in order to see what is available.  The idea of variable scopes is something that I've stolen from Coldfusion, because I've always loved the way that you can literally dump all of your variables.  If you structure your JavaScript the same way, you can do the same thing.

### Make Comments
Comments are helpful not only to help to debug code later on, but also to help you think through what the code is actually doing.  I often write comments for my code before I write it in order to think through what I intend for it to do.  Another great thing about comments is that you can use an application like [JSDoc-Toolkit](http://code.google.com/p/jsdoc-toolkit/) to extract the comments in the files into documentation.

### Separate code into Model, View and Controller
Nothing makes for code that is hard to work with like mashing data, event listening and view logic together.  I would recommend using some sort of (templating system)[http://blog.reybango.com/2010/07/09/not-using-jquery-javascript-templates-youre-really-missing-out/] for your views.  If you haven't seen what they can do, it's definitely worth checking out.

### Use External JavaScript
JavaScript belongs in external files.  When it's external, you will have more control over the files for things like compression and documentation. The only exception to this should be cases where you have to get something from the server to pass into your JavaScript when the page loads.  That's it.  The performance of external JavaScript is also better because it can be cached by the browser.

### Don't let your modules talk to each other
I try to break my code into small modules that absolutely never call each other.  In practice, the modules should never even be aware of each others existence.  That way if something changes in one module, it will never effect the other modules.  When a module does make a change that everyone should be aware of, it announces it to the application.  The modules that are listening for that particular event react to it. Again, modules should never be aware of each other.

These are a good starting point.  What do you do to make your JavaScript applications scalable?
