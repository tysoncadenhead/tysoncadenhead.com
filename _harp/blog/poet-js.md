I have recently moved this entire blog over from using the Wordpress CMS to running on completely on Node. The library I eventually ended up choosing is called [Poet](http://jsantell.github.io/poet/). 

<!-- more -->

Poet is a light-weight blogging platform that runs on top of [Express](http://expressjs.com/). It doesn't require a database, and allows you to write all of your posts in static [Markdown](http://daringfireball.net/projects/markdown/) files. For me, the database-free approach makes sense because if I want to totally move to a different programing language ten years from now, the transition should be seamless. Don't worry though, I have no plans to abandon Node any time soon.

I'm also excited about using Poet, because if I have needs that arise out of using it, I will be able to contribute back to the project. I never felt comfortable publishing patches or plugins for Wordpress because PHP isn't my native language. Of course, Node is a totally different story for me.

Getting started with Poet is really easy. It is available on NPM, so you can just run:

```bash
npm install poet
```

and then install Express:

```bash
npm install express
```

and finally create a server.js file that looks something like this:

```javascript
var
  express = require('express'),
  app = express(),
  Poet = require('poet');

var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.init().then(function () {
  // ready to go!
});

/* set up the rest of the express app */
```

By default, you can just write blog posts in your `_posts` directory as long as they have a `.md` extension.

The only weird thing about the actual posts is that they can include metadata at the top of the file. The data can be whatever you want or need in your posts. It will automatically get added to the post object and the posts array that Poet passes around.

```html4strict
{{{
  "title": "Hello World!",
  "tags": ["blog", "fun"],
  "category": "javascript",
  "date": "7-5-2013"
