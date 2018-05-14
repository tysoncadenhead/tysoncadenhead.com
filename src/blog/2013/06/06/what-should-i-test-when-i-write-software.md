Testing is really important when you write software. That is a fact. But the real question is what you should test. The simple answer is "everything possible."

<!-- more -->

A more fleshed out answer is that you should also avoid testing the same things multiple times.

For example, if you are testing your server-side API on the server, it would be redundant to test the entire API with client-side ajax calls as well.

Here are some of the basic places where tests are most important during the application life-cycle.


<br /><br />
<h3>Server-side unit tests</h3>

Your server-side code is the building block of your application. If the server-side breaks, everything breaks.

You will definitely need to write tests to cover any place where you are taking parameters and returning a value or an array of values. The specific implementation will depend on your server-side stack, but if you are writing code with an MVC structure, all of your models, controllers and helpers should definitely have extensive test coverage.

<img src="/images/blog/test-dummy1.png" alt="Mocha JS" />

My server-side language of choice is Node.js, and I would recommend using <a href="http://visionmedia.github.io/mocha/">Mocha</a> and <a href="http://chaijs.com/">Chai</a> as a testing suite.


<br /><br />
<h3>Client-side JavaScript unit tests</h3>

It has become increasingly important to cover your client-side code with unit tests. Like the server-side tests, client-side JavaScript unit tests should cover any method that returns a value of any type.

<img src="/images/blog/test-dummy2.png" alt="QUnit" />

There are a ton of great options for unit testing your JavaScript, but a flow that I've found works really well for me is to write my tests in <a href="http://qunitjs.com/">QUnit</a> and then run them from the terminal using a cool utility called <a href="http://thrilljs.com/">Thrill</a>. Thrill sits in your browser and waits for a testing worker to spawn. The really cool thing about Thrill is that you can test multiple browsers really quickly and painlessly without even looking at anything but the terminal.

<img src="/images/blog/test-dummy3.png" alt="Terminal" />


<br /><br />
<h3>UI tests</h3>

Testing the user interface can be a tricky. As hard as I've tried, I haven't found a better solution than <a href="http://docs.seleniumhq.org/">Selenium</a>. Luckily, there is a <a href="http://www.onezerozeroone.com/nodejs/webdriverjs-nodejs-binding-for-selenium-2-0webdriver-protocol/">Node.js api for Selenium</a>, so you don't have to write in Java to run your tests in multiple browsers.

<img src="/images/blog/test-dummy4.png" alt="Selenium" />

The main things that you'll want to write tests for is the ability to read, write and update data in your UI. If your selenium tests break, you'll know that users aren't able to experience your application in the way it was intended.


<br /><br />
<h3>Manual tests</h3>

Unfortunately, you can't rely solely on your unit tests to insure that your application works. You will actually need to look at it in a browser.

<img src="/images/blog/test-dummy5.png" alt="Live Reload" />

The best tools to streamline the manual testing process are a combination of <a href="http://livereload.com/">LiveReload</a>, which automatically updates the content of your browser when you change your code, and <a href="http://html.adobe.com/edge/inspect/">Adobe Edge Inspect</a> which can sync your mobile devices with what you are seeing in your desktop browser so that you can insure that your application looks good on multiple screen sizes and device types.


<br /><br />
<h3>Usability tests</h3>

Usability tests are probably the most tedious because they can't be automated. The idea is to put a real person in front of your application and see whether or not they can easily perform basic actions. 

There is a really good book called "Rocket Surgery Made Easy" by Steve Krug that walks you through how to conduct usability tests. I highly recommend it.

<iframe src="http://rcm.amazon.com/e/cm?t=tysolloycade-20&o=1&p=8&l=as1&asins=B002UXRGNO&ref=qf_sp_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=111111&bc1=EFEEEE&bg1=EFEEEE&f=ifr" style="width:120px;height:240px;" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe>


<br /><br />
Getting good test coverage on your application is not a small undertaking, but I have found that it actually saves time in the long-run, because it keeps you from breaking things in the process of fixing other things.