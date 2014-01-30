A few weeks ago, I started using SASS.  What is SASS?  It's an acrostic that stands for "Syntactically Awesome Style Sheets."  SASS is run from the command line and essentially lets you write stylesheets with things like variables, nesting and mixins (which are pretty much the equivalent of the functions in a real programming language).  

<!-- more -->

If you're like me and you've spent a lot of time writing CSS, you probably find yourself making a lot of style declarations that are basically the same with only some minor variations.  In the past, the only way to really make CSS maintainable was to give DOM elements a long list of classes like:

```html4strict
<div class="yellow-background 
round-corner-5px-radius large-text"> 
   This is large text on a yellow background 
   with rounded corners and a 5px radius! 
</div>
```

Of course, the problem with that is if you needed to make a change, say you needed to remove the 5 pixel radius on the example above, you would need to make the change to the HTML, not the CSS.  Obviously, that model is not the best, because you want to be able to style with CSS, not with HTML, right?

The answer that SASS provides is that styles can inherit other styles.  That way, you can make a style declaration once and have multiple classes and ids inherit it.

SASS style is compiled down to CSS, but you never have to touch the actual CSS files again, making it easier to maintain.

If you haven't given SASS a shot yet, I would urge you to [download it](http://sass-lang.com) and see how much easier it makes the styling process.

Anyway, the point I've been working my way to is that with all the cool new things that CSS3 has brought us like rounded corners, gradients and shadows, the problem is that different browsers expect them to be presented differently.

For example, in the case of rounded corners, Google Chrome and Safari both look for

```css
-webkit-border-radius: 5px 5px 5px 5px;
```

while Firefox, up until Firefox 4 looked for

```css
-moz-border-radius: 5px 5px 5px 5px;
```

and Firefox 4 and IE10 along with every browser in the future will simply look for 

```css
border-radius: 5px 5px 5px 5px;
```

This can create a huge mess in your stylesheets if you have a lot of rounded corners and eventually, you'll probably want to take out the Mozilla and Webkit specific declarations once they start supporting the non-specific declaration.

With SASS, you can make a single mixin that will handle any rounded corner like this:

```css
@mixin rounded($top: 5px, $left: 5px, $bottom: 5px, $right: 5px) {
   border-radius: $top $left $bottom $right;
   -moz-border-radius: $top $left $bottom $right;
   -webkit-border-radius: $top $left $bottom $right;
}
```

The above example lets you pass in four variables for the top, left, bottom and right border radius.  If you don't pass anything in, it assumes each one is 5px.   When you need to have a rounded corner now, all you have to do is:

```css
.myClass { @include rounded; }
```

Or if you want to have a 10 pixel radius:

```css
.myClass { @include rounded(10px, 10px, 10px, 10px); }
```

The same principle applied to a drop shadow would look like this:

```css
@mixin shadow($type: inset, $top: 0, $left: 0, $blur: 1px, $color: #FFFFFF) {
   box-shadow: $type $top $left $blur $color;
   -moz-box-shadow: $type $top $left $blur $color;
   -webkit-box-shadow: $type $top $left $blur $color;
}
```

Gradients are a little more complicated and your mixin for a gradients really depends on your needs.  Here is what I've been using to handle a gradient with either two stops or three stops.  It uses an if statement to determine whether a third stop has been provided.

```css
@mixin gradient($first, $second, $third: false) {
  background: $second;
  @if $third {
   filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$first', endColorstr='$second');
   background: -webkit-gradient(linear, 0% 0, 0% 100%, from($first), color-stop(0.5, $second), to($third));
   background: -moz-linear-gradient(linear, 0% 0, 0% 100%,  $first,  $second, $third);
  }
  @else {
   filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='$first', endColorstr='$second');
   background: -webkit-gradient(linear, left top, left bottom, from($first), to($second));
   background: -moz-linear-gradient(top,  $first,  $second);
  }
}
```

Using the mixin above is as easy as this:

```css
.myClass { @include gradient(#cccccc, #dddddd, #cccccc) }
```

Of course, the example above doesn't provide for every possible senario with the CSS3 gradient, but it served the needs for the project I was working on at the time.

As you can see, SASS can be a real life-saver as stylesheets get more and more complex and the need for browser-specific declarations becomes more of a reality in the ever-changing world of web development.