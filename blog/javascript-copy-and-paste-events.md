If you have ever wanted to listen for user events like pasting, copying and cutting on the clipboard, you will be glad to know that it's not that hard. As fate would have it, there is already an event for each of the clipboard operations.

<!-- more -->

For example, if you want to listen for data being pasted onto your page, you can do something like this:

```javascript
document.addEventListener('paste', function (e) {
    
    var data;
    
    e.preventDefault();
    
    // IE
    if (window.clipboardData) {
        data = window.clipboardData.getData('Text');
        
    // Standard-compliant browsers
    } else {
        data = e.clipboardData.getData('text');
    }
    
    console.log('paste', data);
    
});
```

As you can see, we are just adding the event listener for paste, preventing the paste from actually occurring by calling `e.preventDefault()` and then getting the content of the paste and logging it.

Of course, the API is a little different for Internet Explorer than it is for other browsers. IE has a clipboard object on the window itself, so you can actually access it at any time. In case you're wondering, that is a pretty bad security hole because it means that as a developer, I can actually grab the contents of your clipboard any time you hit my website without any action from you. If you have sensitive data in your clipboard, your data can easily be compromised. It makes it easier for developers to access the clipboard, but at the expense of the users. But I digress.

There is also a copy event. It's a little harder to work with because standard-compliant browsers don't let you muddle with the data before it is set on the clipboard. Again, that whole security thing.

```javascript
document.addEventListener('copy', function (e) {
    console.log('copying');
});
```

Additionally, you get a cut event. It's the same as copy, but fires when the user cuts data onto the clipboard.

```javascript
document.addEventListener('cut', function (e) {
    console.log('cutting');
});
```

All of these events fire whether the user uses the `cmd+v/ctrl+v` types of keyboard shortcuts or if they select `edit/paste` from their menu. If you want to take more control over getting and setting data on the clipboard, there are some Flash hacks like [Zero Clipboard](https://github.com/zeroclipboard/zeroclipboard) that will let you add buttons to your page to copy and paste, but then the problem is that your buttons may not work on mobile devices.

These aren't necessarily JavaScript events you will need to use on a day to day basis, but they can be useful to have in your bag of tricks.