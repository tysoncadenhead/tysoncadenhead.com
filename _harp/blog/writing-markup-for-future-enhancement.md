We now have HTML5 and CSS3. Browsers are still racing to actually implement them, but the specs are here, whether they are fully realized in the wonderful world of browsers or not.  So the real question becomes, what should we do with the knowledge we have of things to come?

<!-- more -->

What I am going to advocate is that we should start using as much HTML5 markup as we can get away with now, because if we do, we'll be a step ahead of everyone else when people start scrambling to implement things that will become standard practice in the next few years.

For example, in the past if you were going to have an email address input field inside of a form, you would write something like this:

```html4strict
<input type="text" name="email" />
```

But in the HTML5 specs, we have a new input type called "email" that looks like this:

```html4strict
<input type="email" name="email" />
```

On most desktop browsers, the difference between the input type of "text" and the input type of "email" is non-existant.

However, we don't know what UI browsers might implement in the future to make entering an email address easier.  Apple is already using the alternate input type on the iPhone and the iPad to provide the user with an alternate keyboard layout that is more optimized for entering an email address.  The "email" type won't break older browsers that don't support it, they will just treat it like a standard "text" input field.

My feeling is, why would you *not* use the "email" input type for emails?

There are a lot of examples like that where we can use future enhancement to prepare for whatever the future might hold without breaking the internet for users with older browsers.  We can also use browser detection and provide JavaScript alternatives for things like the input field's [placeholder attribute](http://forrst.com/posts/Alternative_label_placeholder-Oih) even for the old browsers that don't support it natively.

The point here is that HTML5 is coming and in some respects HTML5 is already here.  We can either keep writing the same markup that our parents wrote, or we can prepare for the future by writing the markup our children will be proud of.