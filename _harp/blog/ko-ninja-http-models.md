This is a part of a larger series about the [ko.ninja framework](/blog/ko-ninja) that I helped to create to make Knockout development more awesome. Previously, I showed how you can create a model to save data to localStorage. Today we are going to look at how you can save data to a server using Ajax using the ko.ninja model abstraction layer.

<!-- more -->

The ko.ninja HTTP model can be defined like this:

```js
ko.ViewModel.extend({
  model: {

      // The root that all ajax calls are made relative to
      urlRoot: function () {
          return '/list/'
      },

      // If you have a suffix appended to each URL, this can 
      // be used. It defaults to an empty string.
      suffix: '.json',

      // For HTTP, this should always be http
      storage: 'http',

      // The name of your model. If the urlRoot is not specified,
      // this will be used to build the urlRoot as well.
      name: 'list'

  },
  ...
});
```

The suffix and urlRoot are both optional, but depending on your API, they might be needed. For example, if you define the urlRoot as '/people/favorites/' and your suffix as '.json', when you do a `findOne(123)` on the model, it would resolve to a GET request like this: `/people/123.json`.

If your urlRoot is set to "/list/", ko.ninja will make the following HTTP requests when a viewModel changes:

- GET /list - find()
- GET /list/:id - findOne()
- POST /list/:id - update()
- PUT /list - insert()
- DELETE /list/:id - remove()

In a nutshell, it is the standard REST API definition. That's really all there is to it.

In my next post, we'll be looking at how to use ko.ninja to sync data with a server using socket.io.

Ready to get started? [Add ko.ninja to your project](https://github.com/jcreamer898/ko.ninja) and make awesome applications today!