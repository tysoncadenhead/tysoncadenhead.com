I remember when I first started playing with JavaScript in high-school. The first thing I loved about it was that I could change things without the browser even refreshing. It was like I was a magician moving elements around, hiding and showing things, totally in control of what the user could see. All I had to do was directly modify elements in the DOM and they would instantly react. But that was in the late 90s and early 2000s, now I have found reasons for abstracting away DOM interaction. That's not to say that DOM manipulation shouldn't happen, it just shouldn't be the glue that holds your application together.

<!-- more -->

Here are a few reasons why:

![](http://www.memecreator.org/static/images/memes/46827.jpg)

### Changes in the DOM are hard to test

Yes, writing unit tests against the DOM is possible, but it is not ideal. A good unit test should basically say "if I put X into method Y, it should do Z." When you have a bunch of DOM manipulation happening, tests slow down and become more and more difficult to write.

![](http://s2.quickmeme.com/img/00/00de3fb939ccf2b8c24f77c31cdd19ecff9bc677fac080617c185403bdbd8e93.jpg)

### Scattered logic

If you have several places throughout your code that are doing basically the same thing, fixing bugs across browsers can become more of an issue. This is the case even for DOM manipulation that is just a one-liner. If you have a central place in your code to handle this, you can do feature detection as needed to support differing browser implementations.

![](http://assets.diylol.com/hfs/21c/b1c/a9e/resized/procrastination-panda-meme-generator-should-do-something-about-it-never-mind-cant-do-it-ad6b8f.jpg)

### So, what should I do?

One solution is to implement a DOM abstraction layer like jQuery or MooTools. That will handle most of your issues with scattered logic, but your code will still be fairly untestable without actually writing tests against the DOM.

The good news is that the approach newer frameworks like Knockout, Ember or Angular are taking with data-binding can actually make this an easier task. You simply update the underlying observable data structure and the DOM will be updated automatically to reflect the changes.

For example, compare these two approaches:

```js
// With Just jQuery:
$('#my-id').css({
   'color': 'red',
   'font-size': '24px' 
});

// jQuery Test - Using the DOM
console.log($('#my-id').css('color') === 'red');

// With Knockout:
var css = ko.observable({
    'color': 'red',
    'font-size': '24px'
});

// Knockout - No DOM Required
console.log(css().color === 'red');
```

That is much better. You can spin your own abstraction layer to make testing easier or you can take advantage of framework that can handle it for you. Either way, it will make things much easier.