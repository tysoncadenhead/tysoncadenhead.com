Has anyone ever told you that your application is too slow?  What can you do about it?   You can always point the finger at the server-side people and mumble something about the database being the problem, but is there anything you can do to speed up the loading time? Can you speed up the browser's reaction to user-activated events?

<!-- more -->

Here are a few things I've observed that can seriously improve application performance.

### Minify and combine your code
This should be a no-brainer.  It takes longer to load multiple files than it does to load a single file because we are making fewer http requests.  Minifying your code removes unnecessary spaces and line breaks and removes comments.  All of those things are essential for the developer, but not essential for the user.

### Keep the DOM light
True story.  I was working on a Sencha Touch project that was in its final stages.  The performance was decent in a computer browser, but when it was run as an app on an iPhone, after the user hit about 5 screens, the app would just stop responding.  I went back and made sure that every time the user left a screen, that screen view was removed from the DOM.  The results were amazing!

The truth is that if your application has clean separation of business logic and display code, it shouldn't be too hard to continually remove views from the DOM without losing important information.  If you can't do that, you are relying too much on the DOM to do things that it was never intended to do.  A good rule of thumb is to always remove anything that isn't currently being displayed.

### Minimize calls to the server
Every time you hit the server for data, your application has to wait to retrieve it.  If you can get all the data you need in one Ajax call, don't waste your users time making two calls.

Once you get data, if it is appropriate, have your application remember it.  That way, it doesn't have to ask for it again during the same session.  Of course, that won't work if you need to retrieve live data, but otherwise, it makes sense.

### CSS3 is cool... but don't overdo it
This is especially applicable to the CSS that relies on transparencies.  Depending on the browser, things like drop shadow and  opacity can slow things down considerably.

Animations that rely on these can be costly too.  I wouldn't say to totally avoid them, but be mindful of the blow that these cool effects have to performance.

### Follow the rules
JavaScript is a very flexible language, but some choices are better than others.  There are sites out there outlining things not to do with JavaScript, so read up on them and avoid bad choices like using the eval() function or creating functions inside of a loop.  You can do better than that!

This just skims the surface, but I hope that it helps to start thinking in the direction of writing JavaScript for speed.  Your users will appreciate it!