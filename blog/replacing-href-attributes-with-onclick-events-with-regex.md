I recently had the need to override all of my links on a Sencha Touch app with an onClick event.  I needed to be able to open the links using the ChildBrowser plugin for PhoneGap.  The problem was that I needed to grab the links before I rendered the content to the page and apply the onClick event instead of the href.

<!-- more -->

Essentially, I wanted to turn this:

```html4strict
<a href="myLink.html">My Link</a>
```

Into this:

```html4strict
<a onClick="myFunction('myLink.html')">My Link</a>
```

So how did I do it?  I wrote a function to parse the string using Regex before I rendered it to the page.  I thought that the whole operation my be fairly common, so I Googled how to do it, and to my surprise, there was literally nothing on the internet about how to do it, so I naturally thought it was worth posting.

```javascript
// This is the function
var overrideLink = function(functionName, str){

        // Remove links with blank href tags
        // For exampe: &lt;a href=""&gt;<a>This would break everything!&lt;/a&gt;</a>
        str = str.replace(/href=""/g, '');

        // Replaces links with onclick events
        return str.replace(/href=\"(.+?)\"/, 'onclick="' + functionName + '(\'$1\');"');

};

var myString = 'This is a string that contains &lt;a href="myLink.html"&gt;My Link&lt;/a&gt; inside of it.';

// This is how you call it
overrideLink('myFunctionName', myString);

```

I'm still pretty new to Regex, so there may well be a better way to do this.  If you know of one, don't hesitate to put me in my place.  Enjoy!