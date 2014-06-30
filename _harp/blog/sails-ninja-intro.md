<div class="series-placement">

    This is part 1 of the Creating An Application With Sails, Angular and Require.js blog series. It is recommended that you start here. Once you are done reading this, please navigate to the next post below:

    <h4>[Next Post In This Series](/blog/starting_the_sails_project)</h4>

</div>

Since I tend to be a glutton for punishment, I have decided to devote the next several blog post to a series on making a scalable application using Sails.js on the back-end and Angular on the front-end.

<!-- more -->

### So, Why Make A Series On This?

There are a lot of really good client-side and server-side JavaScript frameworks popping up, but there are not many in-depth articles on how they fit together. This series will look at a very specific stack and how it can be used to create an application. Let me break down the main components of the stack.

![Sails.js](https://31.media.tumblr.com/7601a16f1e970bad6717ba5f386466d0/tumblr_inline_mz51cb9Ezv1qfxp6j.jpg)

##### Sails.js

Sails is a server-side MVC framework for Node. The architecture is very similar to Ruby on Rails, which is probably why they chose a name that rhymes with Rails. One of the coolest things about Sails is that it has Socket.io built into it, which makes communicated with the client-side in real time much easier.

![Angular](http://devgirl.org/wp-content/uploads/2013/03/angular-logo.jpeg)

##### Angular

Angular is a client-side MVC framework created by Google. Angular is great at driving views with data and is extremely testable.

![RequireJS](http://ianreah.com/img/requirejs-logo.png)

##### Requirejs

Require is a framework that lets you write modular code for the client-side. All of your modules pull in the modules that they need to function properly and the best part is that you only need to include one JavaScript file in your HTML template, everything else is retrieved with JavaScript.

![](http://penangmonthly.com/wp-content/uploads/2013/07/chalk-outline.jpg)

### The Outline

As I post the new articles, the links on this outline will be filled in, so this post can serve as a jumping off point for everything else. In the meantime, here is what we will cover:

1. [Starting The Sails Project](/blog/starting_the_sails_project)
1. [Sails Server-Side Views](/blog/server-side-views)
1. [Adding dependencies](/blog/adding-dependencies)
1. [Angular Controllers](/blog/angular-controllers-with-sails-app)
1. [Sails Models](/blog/sails-models)
1. [Syncing With The Server](/blog/syncing-angular-with-sails)
1. Form Validation

This is going to be a fun series to write and I hope you have as much fun as me reading it!