Ajax is awesome for things like rich internet applications that don't require SEO because of their internal nature, or for on-page events like form validation and submitting, but from an SEO standpoint, adding content to the DOM is illegible. But you still want the increased usability of not having to reload the page every time an element or two is changed, right?  The fact is that users don't like waiting on your page to load, and the more you can do to keep from reloading the whole thing, the better.  But still, there's the problem of JavaScript DOM manipulation not jiving with Search Engine Optimization.  What's a person to do?

<!-- more -->

### Start with a normal link
Start with a link on your page linking to the actual file you want to link to.  This version of the file should include everything that it needs to look good.  This includes the header, footer and any other page elements.  It is what your users will see if they turn off their JavaScript.  It should look something like this:

```html4strict
<a title="My File" href="myFile.php">My File</a>
<div id="container"></div>
```

### Don't actually go to the file you are linking to
Instead of actually going to the link, you are going to use some JavaScript to load the element through Ajax.  My example is in jQuery, but if you prefer a different library, the concept is still applicable.  Please note that if you are going to use the bind method, you'll need to be using jQuery 1.4 or higher.

```javascript
$('a').bind({
   click: function(){
      $.ajax({
         url: $(this).attr('href'),
         data: { display: 'ajax' },
         success: function(view){
            $('#myContainer').html(view);
         }
      });
      return false;
   }
});
```

Basically what's happening here is that we're returning false on the click function so that the link isn't actually fired.  We're looking at the href property of the &lt;a&gt; tag but we're also adding `?display=ajax` to the query string.  We're taking the content that is returned and putting it into the container div.  The key here is that we use the query string parameter to tell our server-side script to not include the page elements that it doesn't need.  Things like &lt;html&gt;, &lt;head&gt; and &lt;body&gt; tags should be excluded along with page elements that are already there like the header and the footer.  Using this method will insure that the linked page loads quickly and that it is completely SEO-friendly.  Obviously, you'll need to make some modifications to the selectors and the targeted DOM element, but the concept should be able to remain pretty consistent.

### Change the location bar in the browser
Changing the location bar in the browser accomplishes two things from a usability standpoint.  First, it allows the user to navigate with the back button, and second it allows the user to bookmark a particular state of your page.  There is a jQuery plugin called the [jQuery URL Parser](http://projects.allmarkedup.com/jquery_url_parser/) that does an excellent job of parsing  URLs, query strings and hash tags.  You can use it to get your new hash tag state when the page is loaded and initialize the appropriate functions.  Changing the hash tag is as easy as this:

```javascript
$('a').bind({
   click: function(){
      window.location.hash = $(this).attr('url');
   });
});
```

As you can see, with the jQuery library, it's really not hard at all to create an experience that is user-friendly and optimized for search engines.