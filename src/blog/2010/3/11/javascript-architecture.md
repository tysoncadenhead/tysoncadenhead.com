As the web has grown, the Javascript programming language has grown with it to become rich and robust.  Whereas websites used to have only a couple of lines of Javascript code used in them, Javascript has evolved to a point where it often does a large part of the heavy lifting in Internet Application development.  With the evolution of Javascript, the code typically used on a site can often grow to a point where it is bulky hard to maintain if it is not properly constructed.  That's why the topic for today is on how to architect Javascript in such a way to make it easy to maintain. Javascript is a programming language, after all, so we should treat it with the same care and respect we would treat server-side code.

<!-- more -->

### Why do I need Javascript Architecture?

If you are the only person who will ever work with the code you are writing, you will at some point have to modify it.  It's a fact.  Code that never gets modified is a sign of a dead website.  In order to modify your code, you need to write it to be easily modified without breaking other things and it needs to be easy to find what you are looking for in order to change it.  If other people will be looking at your code, whether in a development environment or if you ever leave your current job and someone else has to pick up where you left off, it is crucial that your code be pristine.  So where do you start?  Glad you asked.

### Pick a library

I recently saw a poll that said that 95% of developers were using jQuery, but there are several other Javascript libraries out there that are fast gaining popularity like DOJO, YUI, Prototype, EXTJS and Moo Tools to name just a few.  Why do you need a Javascript library?  Of course, you can do anything with plain Javascript that you can do with a library, but these libraries extend functions and methods that help you to do it using far less code.  Instead of reinventing the wheel every time you sit down to write your code, you can work have a starting place created by programmers who have devoted their time to give you the cleanest code possible.

### Use a connection object

Think of the connection object as the central hub or location where your application gets, stores and updates it's data.  The key responsibilities of the connection object include initializing the modules and passing information between modules.  This creates what we call "Loose Coupling" between the modules, which allows the modules to be dumb to each others existence.  When a module object is updated it passes the connection object the new data and the connection object essentially shouts out to the other modules "Hey!  Over here!  I've got some new updates!" The other modules may ignore the announcement or they may act on the new information, but the connection object doesn't care either way, it just takes in information and sends it out.

### Think in modules

If you have a Google or Yahoo homepage, you know what I mean by modules, take any web application and imagine breaking it down into small pieces.  For example, on this website, you could break it down into a header, a sidebar and a footer.  The content portion could be broken down even further.  The comments could certainly be a module, for example.  Determine where the breakdowns occur and write your code completely separately for each individual module.  This can be broken down even further by using MVC design patterns to separate the modules even further.  The two best Javascript MVC frameworks that I have seen are [Trimpath](http://code.google.com/p/trimpath/) and [JavaScriptMVC](http://javascriptmvc.com)JavascriptMVC. If you spend a large amount of time talking to me about Javascript architecture, you probably hear me drooling over JavascriptMVC.  I'm planning to write an entire post covering the rich complexities of the JMVC framework in the future, but for the sake of this post, just let it be known that I like it because it assists in writing large-scale ajax projects.

One thing to keep in mind whether you use an MVC framework or you just write modular code individually is that modules should never interact directly with each other.  For all purposes, a module should be dumb to another modules existence.  When a module needs to apply something other modules, it should be passed to the connection object that informs all of the modules that a change has occurred.  If any of the modules need the change, they will grab it from the connection object, not from the effected module itself.  This keeps the actions separate and keeps modules from being broken due to changes in other modules.  This greatly reduces the chance that your entire application will ever be effected by changing a single element of it.

### Build a library connection object

A fourth measure of separation that I have read about but have to admit I've never used is to write an object that acts between the library and the modules create loose coupling to the library.  This object only extends methods that are used by the modules from the library.  The idea behind the library connection object is that if the library is ever replaced, (for example, if you need to switch from Moo Tools to Prototype because it offers functionality that isn't available in Prototype), you can easily transition to the new library without having to re-write all of your modules.

If you're anything like me, you probably need something visual to show the work-flow I'm proposing.  Here's a simplified example of what this might look like.  The arrows show what is being send in and what is being received by each object and module.

![Illustration](/images/blog/javascriptarchitecture2.jpg)

As always, I'm only skimming the surface of this topic.  I will try to revisit it soon.  How do you architect your Javascript applications?