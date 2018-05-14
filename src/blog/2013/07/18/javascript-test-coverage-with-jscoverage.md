Knowing what parts of your code to test can sometimes be tricky. If you have a large application, it can be challenging to know what has already been tested and what still needs testing. That is why the world needs JSCover.

<!-- more -->

JSCover is a really great tool that looks through all of your code to determine what parts have unit tests and what parts don't.

To get started, you will need to download the JSCover jar file and then start the JSCover server like this:

```bash
java -jar path/to/JSCover-all.jar -ws --document-root=./ --report-dir=coverage
```
There are also tons of configuration options you can pass in. Refer to their api documentation for everything, but some of the highlights are:

- **--document-root={Value}** - The root where all of the JavaScript files are located
- **--port={Value}** - The port to run the server on
- **--no-instrument={Value}** - A path to ignore JavaScript files inside of and not test. This can be helpful to avoid testing third party scripts.

Next, you will need to use PhantomJS to actually run the tests so that you can determine what has been covered.

```bash
phantomjs path/to/run-jscover-qunit.js path/to/qunit.html
```

The `run-jscover-qunit` file is part of the JSCover download. They also have a testing bridge for Jasmine if that is your cup of tea.

The second argument is the path to your testing html file. JSCover will inject their script into your test file to work its magic.

The result will look something like this:

![JSCover Results](/images/blog/jscover.png)

You can even drill down into the individual files and see which lines need test coverage. 

![JSCover Results](/images/blog/jscover2.png)

As you can tell, JSCover is a really useful tool to know how awesome and unbreakable your application is. I have been really impressed with it.