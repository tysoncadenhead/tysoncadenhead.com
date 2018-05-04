When I first started moving my blog over to [Poet](/blog/poet-js), one of the most frustrating things for me was the fact that all of the blog posts are cached, meaning that every time you edit a file, you literally have to restart the server to see the changes. Luckily, I have implemented a neat little trick to refresh the blog posts any time they are updated.

<!-- more -->

Poet gives you a `watch` method that is fired anytime the markdown files in your posts directory are changed, so I tapped into that.

```javascript
poet.watch(function (poet) {
  console.log('A file was updated!');
});
```

Poet also provides a method called `clearCache` that literally wipes out the cached blog posts and replaces them with the updated versions.

```javascript
poet.clearCache();
```

Putting both methods together, we can do something like this:

```javascript
poet.watch(poet.clearCache);
```

Now every time a blog post is changed, the clearCache method is fired, which means that the blog posts will always be up to date. It wasn't the most challenging thing to do, but it definitely made writing blog posts much more enjoyable.