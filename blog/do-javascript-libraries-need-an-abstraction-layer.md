This is something that I have been trying to make up my mind on over the past year and a half at least.  The question?  Do JavaScript libraries need an abstraction layer?

Just to clear the air a little before we jump into the discussion, if you are making a small website, this doesn't apply.  I'm talking about large, scalable JavaScript applications.

<!-- more -->

An abstraction layer is basically code that extends the functions that do the heavy lifting.  It is used so that you don't call the code that is doing the work directly.  For example, if you are using jQuery, and you want to make an Ajax call, instead of firing the $.ajax() function, you would call a different function, like `myApplication.ajax()` which turns around and calls `$.ajax()`.

There are obviously some drawbacks to this approach, but there are also benefits.  Here are the benefits as I see them:

- Your JavaScript modules become dumb to the JavaScript library you are using.  For all your modules know, you could be using jQuery or you could be using YUI, and frankly, they don't care.  All they care about is that they are calling `myApplication.ajax()` and they expect to do an Ajax call.
- Since the modules don't know what library is being used, you can easily switch out the library that you are using.  Is Prototype not cutting it for you?  Just switch out the code in the abstraction layer and you are suddenly using jQuery... and your modules are never the wiser!
- You get more control over individual library functions.  Let's say that the jQuery DOM manipulation is exactly what you need, but you need something a little different for Ajax calls.  You could even use the abstraction layer to point to your own homespun solutions.
- This approach makes your code more loosely coupled, which is typically a good thing.

However, with the benefits come the drawbacks.  Here are some of the drawbacks I've though of:

- In a way, JavaScript libraries are already an abstraction themselves for the native JavaScript.  How deep does it need to go?  We could be getting into a ridiculous Russian doll situation here...
- Speed is always a concern.  Every time you create a function, it takes another fraction of a second to execute.  That's why you should never instantiate a function inside of a loop.  This probably isn't a huge concern when it comes to JavaScript library abstraction layers.  It may not even be worth mentioning, but when you are adding a function to call another function, it raises these sorts of thoughts.
- There is always the chance that things will get messy.  When you write your code, you may know that myApplication.save() does an Ajax call to save the information inside a form to the server, but what about the developers who come after you?  Also, without proper training, other developers will just write code the "normal" way on top of yours, making you have an ugly mixture of abstracted code and direct calls to the library functions.
- What is the chance that you are actually going to replace your library?  It does sometimes happen, but people who write in jQuery usually stay in jQuery.  The ability to switch out the underlying library one piece at a time is pretty awesome, but it causes one to wonder how often it is really a concern.  This same sort of dilemma happens on the client-side when Coldfusion companies decide to switch to .NET, but there's no way to facilitate the change so easily as you can with a JavaScript library abstraction layer.  Is it really even necessary on the client-side

What do you think?  Do JavaScript libraries need an abstraction layer?  You tell me.
