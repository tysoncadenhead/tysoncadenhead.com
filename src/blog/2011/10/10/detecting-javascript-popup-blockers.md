Most of us can agree that spawning popups with JavaScript is usually a user experience FAIL.  We've all been to websites that opened several popup ads. That is always something to avoid.  Malicious and ad-happy sites have made it necessary for browser plugins and some browsers to block JavaScript popups altogether.

<!-- more -->

But there are some examples where popups are actually necessary. The main thing to remember when it does become necessary is to make the popup window a response to a user action.  Usually a popup should be triggered by a clicking a link or a button rather than opening it on page load.  That way the popup is not instantly perceived as an ad and closed by your user.

When using a popup does become necessary and you have exhausted every other options including more attractive modal windows and nothing works for the user interaction, the next concern becomes what to do when the popup is inevitable blocked.

The answer may look very similar to a progressive enhancement technique, but I wouldn't consider it one since the browsers with a popup blocker enabled are often more advanced than those without.

We'll start out making a very normal-looking link that targets a blank window to open the site inside of.  That should look something like this:

```html4strict
<a href="http://google.com" id="googleLink" target="_blank">Go To Google!</a>
```

The link will totally work on its own without the aid of JavaScript, it will just open in a new window instead of a popup.  Now let's add the JavaScript.  The event listener is written in jQuery, but feel free to rewrite it using your library of choice or none at all.

```javascript
$('#googleLink').bind('click', function () {
   var popUp = window.open($(this).attr('href'), 'googleWindow', 
   'width=600, height=300, scrollbars, resizable');
   if (!popUp || typeof(popUp) === 'undefined') {
      return true; 
   } else {   
     popUp.focus();
     return false;
   }
});
```

Popup blockers work by redefining the window.open() function.  Part of the beauty of Javascript is that you can redefine literally any variable or object.  If you even wanted to redefine the document object or the window object, you actually could.  So the popup blockers will typically make the window.open() function return either null or undefined, which means that we can create the popup as a variable and then test to see if the variable actually returns as anything.  If it does, we can assume that the popup opened and return false so that the link doesn't fire off.  If it doesn't, we can return true to let the link do its work.

Here is a working example of the code above:

```html4strict
<a href="http://google.com" id="googleLink" target="_blank">Go To Google!</a>
<script type="text/javascript">
$('#googleLink').bind('click', function () {
   var popUp = window.open('http://google.com', 'googleWindow', 
   'width=600, height=300, scrollbars, resizable');
   if (!popUp || typeof(popUp) === 'undefined') {
      return true; 
   } else {   
     popUp.focus();
     return false;
   }
});
</script>
```

As you can see, it's fairly easy to detect popup blockers and react to them.  Be careful with your new-found power.  If I haven't made myself clear, there's nothing worse than a site with a bunch of popups.