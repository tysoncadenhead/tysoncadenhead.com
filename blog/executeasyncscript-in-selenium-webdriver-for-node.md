If you aren't familiar with it, the [NodeJS version of the Selenium WebDriver](https://code.google.com/p/selenium/wiki/WebDriverJs) is a great way to write functional tests in JavaScript and automatically run them in your browsers.

<!-- more -->

The NodeJS WebDriver uses the [Selenium Server](https://code.google.com/p/selenium/downloads/list) Java jar under the covers to work its magic.

The main downside of the WebDriver is that the documentation is inconclusive at best. I haven't been able to locate a unified list of the WebDriver methods anywhere on the internet. I'm not even kidding. The best that I have been able to do is look at the Java documentation and make assumptions based it.

My main struggle was finding a way to execute asynchronous JavaScript in a browser and send a callback to the server-side testing suite once the script had finished manipulating the DOM or running Ajax calls. The solution I was finally able to locate was the executeAsyncScript() method.

I wrote my unit tests using [Mocha](http://visionmedia.github.com/mocha/). The code below is what I used to kick off the testing suite. Note that you will need to install the [Java jar file](https://code.google.com/p/selenium/downloads/list) and open it, install the [Crome driver](https://code.google.com/p/selenium/downloads/list) and open it and of course install the ["selenium-webdriver"](https://npmjs.org/package/selenium-webdriver") and ["assert"](https://npmjs.org/package/assert) packages with npm before any of this will work.

```javascript
var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    driver;

driver = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities({
   'browserName': 'chrome'
}).build();
```

Now that our webdriver is working, we just need to kick off our tests.

```javascript
// describe() is from Mocha
describe("Open the webpage", function () {

   // This makes the WebDriver navigate to the page you want to test
   driver.get("http://mywebsite.com/mypage");
   
   // it() is for Mocha testing
   it("Should open do my asynchronous bidding", function (done) {

      // By default, Mocha's timeout is only a couple of seconds,
      // which is usually too short for asynchronous calls
      this.timeout(500000);
      
      // driver.executeAsyncScript() allows us to run a script in the browser
      driver.executeAsyncScript(

      // Everything inside here will be executed by the browser, not the server
      function (secondValue) {

        // This is the callback function we can call when everything is done
        var cb = arguments[ arguments.length - 1 ];

        // We'll use setTimeout() to make the script
        // wait before calling the callback
        setTimeout(function () {
           cb({
              firstValue: 1,
              secondValue: secondValue
           });
        }, 3000);

      },
      
      // You can pass variables from the server-side to the client-side 
      // by making them additional arguments
      'My Second Value'

      // This is the callback that is fired when the
      // script is done executing in the browser
      ).then(function (obj) {
         assert.equal(obj.firstValue, 1);
         assert.equal(obj.secondValue, 'My Second Value');
         done();
      });

   });
});
```

As you can see, using the executeAsyncScript() method can be invaluable.

Have you played around with the Node Selenium WebDriver yet? What do you think of it?