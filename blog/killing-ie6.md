Microsoft released Internet Explorer 6 nearly eight years ago in August of 2001. Since then, they have released two new versions of their web browser, IE7 and IE8 and have officially stopped supporting the outdated cousin, IE6. So why is it that most web developers are still supporting a browser that even Microsoft itself has turned its back on?

<!-- more -->

Here are some interesting statistics on the use of Internet Explorer 6 according to [w3schools.com](http://www.w3schools.com):

- In May of 2008, 27.3% of Internet users were using the IE6 browser
- By May of 2009, the number had dropped to 14.5%

The number is still significantly higher than those using Google Chrome, Safari, Opera or even IE8 at this time, but it is rapidly decreasing and it is my suggestion that we as web developers continue to aid in its decline. What's wrong with IE6? You might ask. Here are a few things I've noticed in developing web pages:

### There is no support for PNG images built in to the browser.

For those of you who don't know, PNG images allow web designers to have clean transparencies and shadows in their designs in a way that a GIF image never could. Each pixel in a GIF image is either completely transparent or it is completely a color – there is no way to have an image gradually become transparent semi-transparent. This often results in transparencies that appear grainy and are unusable for good web design. There are Javascript and CSS workarounds that “fix” PNG files, but every one that I've had experience with takes a little longer to load and looks bad during the process of loading.

### Bad rendering of style sheets.

IE6 renders several tags such as float, padding and margin completely differently than any other browser. Many of these issues were resolved in Internet Explorer 7. This is one of the reasons why most websites either use IE6 hacks or IE6 conditional stylesheets to correct the little abnormalities that plague the IE6 styling.

### Flickering rollover images.

When you use background images as rollovers with the :hover property in CSS, the image will flicker. This can be solved using Javascript, but who wants that?

### Min-Height.

The Min-Height CSS property doesn't work at all.

### Crashing.

The IE6 browser is extremely buggy and there have been many instances of simple code crashing it.

### Fixing time.

Most developers use 1/4 to 1/3 of their time fixing stylesheets and Javascript for Internet Explorer 6. Isn't there a better way to spend our time?

So what should be done about the IE6 browser? How can we bring down the number of users from 14.5% to 0%? My solution is to use a simple Javascript script targeting the IE6 browser and calling the users to upgrade their browser to IE8 or Firefox. If the IE6 users begin to find that they are unable to navigate the web effectively because every other site is calling them to upgrade, they just might decide that they can spare 30 minutes and install a browser that wasn't produced eight years ago.