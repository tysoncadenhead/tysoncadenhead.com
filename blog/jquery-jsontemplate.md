This is entirely experimental, but I've created a purely JSON-based templating system called jQuery.jsonTemplate.

The idea is to have a completely JSON-based nested markup language that compiles to HTML and back again.

<!-- more -->

Using it is pretty simple. You just need to add all of the properties you would typically use in HTML to the JSON structure like this:

```javascript
$("#my-element").jsonTemplate(
    [{
       type: 'h1',
       content: 'Hello World'
    }]
);
```

The code above would append this to the element with an id of "my-element":

```html4strict
<h1>Hello World</h1>
```

You can even do nested elements inside of each other like this:

```javascript
$("#my-element").jsonTemplate(
    [{
       type: 'div',
       items: [{
            type: 'p',
            items: [{
                type: 'strong',
                content: 'Hi there!'
            }]
       }]
    }]
);```

You can easily convert HTML to the jsonTemplate format as well:

```html4strict
<h1>Hello World</h1>
<script type="javascript">
  var template = $("h1").jsonTemplate();
  console.log(template); // { type: 'h1', content: 'Hello World' }
</script>
```

The basic idea behind a templating language like this is that it could be primarily driven by JavaScript and you could use all of the methods in JavaScript to manipulate the data before you render it with jsonTemplate. I'm not sure that it necessarily has an advantage over the string-based templating languages like EJS or Mustache, but it was a fun little project to knock out. I'm considering porting this for Node too, if there's any interest in it.

Since I used all of the attributes that HTML gave me out of the box and only tacked on a few attributes like "content" to render the HTML, "items" to render an array of items in an element and "type" to determine the element type, the code is only a couple hundred lines long even when it's uncompressed.

I'd be interested to see what other people think of this little jQuery plugin and whether anyone is able to find practical uses for it.

If you'd like to check it out, [here is the project on Github](https://github.com/tysoncadenhead/jquery.jsonTemplate).