There has been much discussion in the JavaScript community about  JavaScript loaders, whether they are needed, what they do and whether it  should be a function of the browser.  I figured while there is so much  buzz around the topic, it's a good time to put in my own thoughts.

<!-- more -->

### What is a script loader?

Before I get too deep into this, I should probably define what a  script loader actually does.  You see, a script loader is a bit of  JavaScript that loads other JavaScript files.  Using a script loader can  have many advantages:

- All of the JavaScript files can be found in one place instead of being scattered across the page as it loads.
- The code can be loaded and saved and then executed later.
- Script loaders allow you to load your scripts either asynchronously (at the same time) or synchronously (one after another.)

There are many script loaders that are out there now.  These include [ControlJS](http://stevesouders.com/controljs/), [StealJS](http://jupiterjs.com/news/stealjs-script-manager), and [LabJS](http://labjs.com/) among many other script loader alternatives.

### Arguments against script loaders

There are some arguments that could be voiced against script loaders.  This could include:

- Script loaders require additional client-side code just to load more  code.  The more client-side code there is on a page, the longer it  takes to load.  This doesn't even take the hit to the web server into  account.
- Production Client-side code should be compressed into as few files  as possible to maximize load times.  Using a loader encourages more  files, not less.
- Good developers will not use too many global functions and  variables, but will only execute functions as they are needed, so the  ability to grab code and execute it later may not be that big of a deal.
- Traditional JavaScript executes as it loads in the order that it  loads.  Loaders could make complicate something that already works well  as long as it is understood.

There is an argument that the new HTML5 specifications should include  the ability to group scripts and to chose whether they load  synchronously or asynchronously.  It's a nice thought, but we should be  realistic about how long it could take to actually get something like  that to a point where browsers are actually supporting it.  We all know  that there are certain browsers out there who still don't even come  close to supporting the current HTML specifications.

There are definitely some uses for script loaders, but I don't think  the use of them or the lack of them is going to make or break a web  application anytime soon.

﻿