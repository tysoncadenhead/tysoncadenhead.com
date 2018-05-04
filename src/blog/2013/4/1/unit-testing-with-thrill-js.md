Functional testing the DOM can be a daunting task. Tools like [Qunit](http://qunitjs.com/) and [Mocha](http://visionmedia.github.com/mocha/) make it easier, but the real trick is automating the testing process from the Terminal so that it can run continuous integration in the background and throw errors when a test fails.

<!-- more -->

[Thrill.js](http://thrilljs.com/) has turned out to be just the tool I was looking for. There are a few similar libraries out there. One of the more popular similar testing frameworks is [Karma](http://karma-runner.github.com/0.8/index.html). In my opinion, the real win for Thrill is that it can kick off and run tests in multiple browsers extremely quickly. The reason for the speed is that Thrill uses [Queen](http://queenjs.com/) which lets you open a single page in all of your browsers that sits and waits for tests to be kicked off via a hidden iframe. The Queen server communicates with Thrill using Socket.io as the tests are completed.

### Getting started with Thrill

##### Install Queen

```bash
sudo npm install -g queen
```

##### Start Queen

```bash
queen -c localhost:9000
```

Now, open a browser and go to localhost:9000

##### Install Thrill

```bash
sudo npm install -g thrill
```

##### Write your tests
```html4strict
<!-- /spec/test.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit Example</title>
  <link rel="stylesheet" href="http://code.jquery.com/qunit/qunit-1.11.0.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="http://code.jquery.com/qunit/qunit-1.11.0.js"></script>
  <script>
  test( "hello test", function() {
    ok( 1 == "1", "Passed!" );
  });
  </script>
</body>
</html>
```

##### Run your tests

Run your tests by navigating to your app directory and running:

```bash
thrill spec/test.html
```

Thrill will typically do fine running your existing QUnit or Mocha tests right out of the box.

I've been really happy with Thrill so far. It requires very little configuration and it just works. Have you tried Thrill.js yet? What do you think of it?