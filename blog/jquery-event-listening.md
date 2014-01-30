Several months ago I wrote about [event binding](http://tysonlloydcadenhead.com/blog/sencha-application-event-listening/) using ExtJS or Sencha touch.  Something that you may or may not know is that you can achieve the same thing with jQuery using custom even binding.

<!-- more -->

In case you didn't see my Sencha post about this, or if you don't work with Sencha, let me tell you what I mean by event binding.  Event binding can be used to loosely couple actions so they never break.  Essentially, you broadcast to your entire application "Hey!  I have something to say!  Does anybody want to hear it?"  Your modules can either say "Hey, I'd like to hear what you have to say" or else, they can just ignore it. Either way, nothing breaks.  You can even have several modules respond to the same event in different ways.

So, on to the code... Make sure that you are using an up to date version of the jQuery library.  At some point back in time, this didn't work yet.

To create a custom event with jQuery, you can use the "trigger" function like this:

```javascript
$(document).trigger('my-custom-event', ['hi!  I am a custom variable!']);
```

You can actually bind a custom event to any DOM element, but for the sake of making it available to your entire application, the document object is usually a pretty safe choice.  As you can see, we are also passing a variable.

Now you just need to have a listener at any place in your code that is executed before the trigger event, like this:

```javascript
$(document).bind('my-custom-event', function(event, v) {
  alert(v);
});
```

So your code ends up looking something like this:

```javascript
$(document).bind('my-custom-event', function(event, v1, v2) {
  alert(v1);
});

$(document).bind('my-custom-event', function(event, v1, v2) {
  alert('firing ' + v2);
});

$(document).trigger('my-custom-event',  [
  'Hi!  I am a custom variable!', 
  'Hi! I\'m a different custom variable!'
]);
```

You should now see two separate alerts fired from the same trigger.  Now all you have to do is bind custom events to your individual modules and they will never touch again.  Feel powerful yet?
