Since I tend to be a glutton for punishment, I have decided to devote the next several blog post to a series on making a scalable application using Sails.js on the back-end and Knockout with ko.Ninja on the front-end.

<!-- more -->

### So, Why Make A Series On This?

There are a lot of really good client-side and server-side JavaScript frameworks popping up, but there are not many in-depth articles on how they fit together. This series will look at a very specific stack and how it can be used to create an application. Let me break down the main components of the stack.

![Sails.js](https://31.media.tumblr.com/7601a16f1e970bad6717ba5f386466d0/tumblr_inline_mz51cb9Ezv1qfxp6j.jpg)

##### Sails.js

Sails is a server-side MVC framework for Node. The architecture is very similar to Ruby on Rails, which is probably why they chose a name that rhymes with Rails. One of the coolest things about Sails is that it has Socket.io built into it, which makes communicated with the client-side in real time much easier.

![Knockout](http://learn.knockoutjs.com/Content/App/icon.png)

##### Knockout

Knockout is a MVVM binding framework for the client-side. It does a great job of observing data and updating the DOM when the data changes.

<img src="https://raw.github.com/jcreamer898/ko.ninja/master/ko-ninja.gif" width="200px" />

##### Ko.Ninja

Ko.Ninja is a framework for Knockout that abstracts away some things and makes it easy to create structured applications with Models, Collections and ViewModels. In the interest of full disclosure, I have been one of the major contributors to Ninja, but it is still an awesome framework worth using.

![RequireJS](http://ianreah.com/img/requirejs-logo.png)

##### Requirejs

Require is a framework that lets you write modular code for the client-side. All of your modules pull in the modules that they need to function properly and the best part is that you only need to include one JavaScript file in your HTML template, everything else is retrieved with JavaScript.

![](http://penangmonthly.com/wp-content/uploads/2013/07/chalk-outline.jpg)

### The Outline

As I post the new articles, the links on this outline will be filled in, so this post can serve as a jumping off point for everything else. In the meantime, here is what we will cover:

* Starting The Sails Project
* Adding dependencies
* Scaffolding
* Requesting Client-Side Modules Through The Controller
* Serving Modules With RequireJS
* Ninja Architecture
* Unit Testing Sails
* Unit Testing Ko.Ninja Modules
* Server-Side Views
* Client-Side Views
* Sails Models
* Ninja Collections
* Ninja Models
* Username / Password Authentication
* Facebook Authentication
* Form Validation
* Making Ajax Calls
* Using Socket.io
* Integration Testing
* Building and Deploying

This is going to be a fun series to write and I hope you have as much fun as me reading it!