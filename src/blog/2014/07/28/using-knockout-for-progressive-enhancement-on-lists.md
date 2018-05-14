In my [previous blog post](/blog/using-knockout-for-progressive-enhancement), I talked about how you can use Knockout to enhance forms that are rendered from the server. This led to my next challenge - creating lists that are rendered from the server and then managed with Knockout on the client-side in instances where JavaScript is enabled.

<!-- more -->

![](http://elitedaily.com/wp-content/uploads/2013/04/pote2.jpg)

### One Potential Approach

Okay, let's say for example that you have a list of animals that are being rendered from the server-side like this:

```html
<ul>
    <li>Dog</li>
    <li>Cat</li>
    <li>Goldfish</li>
    <li>Chicken</li>
</ul>
```

The problem with binding that list with a Knockout `foreach` is that there are multiple items inside the list that the server is rendering and a foreach would typically only require a single list item to represent everything in an observable array like this:

```html
<ul data-bind="foreach: animals">
    <li data-bind="text: name"></li>
</ul>
```

If our goal is to to create a single list that can even be used when JavaScript is disabled, but enhanced with Knockout, what we need to do involves creating a custom binding that loops over the existing elements inside the `<ul>` and applies the data in it to an observable array. Once our data is in the array, we can replace the `<li>` elements that came back from the server with our own Knockout template, which can re-render the list items from the client-side.

```js
ko.bindingHandlers.initialForEach = {
    init: function (element, valueAccessor, allBindings) {
        var $el = $(element);
        $el.children().each(function () {
            if (allBindings().foreach) {
                allBindings().foreach.push(JSON.parse($(this).attr('data-options')));
            }
        });
        $el.html(valueAccessor().template);
    }
};
```

![](http://www.allure.com/beauty-trends/blogs/daily-beauty-reporter/2013/05/23/sunscreen-being-applied-to-child.jpg)

### Applying My Approach

Applying our new binding would look something like this:

```html
<ul data-bind='initialForEach: {
    template: forEachTemplate
}, foreach: animals'>
    <li data-options='{ "id": 1, "type": "Mammal", "name": "Dog" }'>Dog</li>
    <li data-options='{ "id": 2, "type": "Mammal", "name": "Cat" }'>Cat</li>
    <li data-options='{ "id": 3, "type": "Fish", "name": "Goldfish" }'>Goldfish</li>
    <li data-options='{ "id": 5, "type": "Bird", "name": "Chicken" }'>Chicken</li>
</ul>
```

You might notice that I'm passing all of the data for each list item into a `data-options` attribute. I've been thinking long and hard about how to accomplish this by looking inside the list elements and grabbing the content inside of each element, but there may be any number of properties that you'll want to pass into your observable array and to be able to keep this binding reusable and generic, passing in a string of JSON seems the most efficient.

I'll go ahead and put a viewModel behind the template. The animals observableArray will hold all of the data we need. I added another animal to demonstrate how the client-side and server-side data can be merged together. We also have a string template that will replace the server-rendered list items with the ones coming from the client. Just for fun, I additionally added a click event that tells us which animal was clicked.

```js
var viewModel = {
    animals: ko.observableArray([{
        id: 4,
        type: 'Mammal',
        name: 'Mouse'
    }]),
    clickAnimal: function (animal) {
        alert('Name: ' + animal.name + ', Type: ' + animal.type);
    },
    forEachTemplate: '<li data-bind="text: name, click: $parent.clickAnimal"></li>'
};
```

If you want to see this in action, I've created a [JSFiddle](http://jsfiddle.net/QPrPW/) that combines all of the steps together.

![](http://petapixel.com/assets/uploads/2009/07/7motivated-critique.jpg)

### Criticizing My Approach

This approach is far from perfect. For one thing, you are rendering everything in the list twice. It may not be the end of the world for a short list, but if you have a ton of items complete with images or other media, you may take a performance hit. Another issue is the awkwardness of needing to write a template for the `<li>` tags for the server and the client. There could certainly be more room for mistake when you have to write basically the same functionality twice.

If you have a better approach, I'd be interested to hear it. This is the best I could come up with, but its far from ideal.