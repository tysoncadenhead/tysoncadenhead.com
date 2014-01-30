If you haven't seen any of the rich interfaces that have been built with EXT JS and Sencha Touch on web applications, Adobe Air applications or native smart phone apps, you will.  The Sencha family gives us everything we need to build large applications, but it doesn't limit us on how we can write them.

<!-- more -->

I've seen first-hand how seemingly small amounts of Javascript grow over time to become unmanageable and monstrous. The best way to avoid that is to have some sort of framework so you know where your code will be going.  I've written in the past about the need for separating Javascript using MVC patterns.  MVC was created around server-side languages, but the same logic applies.  In Javascript, the Ajax calls and store creation are the model, the event listeners are the controllers and the display logic and DOM manipulation are the view.

This is most likely going to be a 5 or 6 part series that I create over the next couple of weeks, but I though I would begin here with a brief introduction to the whole idea.  I'll be delving more into the particulars of this approach, but this is basically what your folder structure will look like for your application:

![Directory](/images/blog/1-folder.jpg)

You will never directly manipulate the production folder, it is going to be a combination of all of your JavaScript files compressed with YUI or Google Closure.  As far as the files under development, you will be working with them.  My next entry will be about setting up your Config.js (and Application.js if I get to it.)