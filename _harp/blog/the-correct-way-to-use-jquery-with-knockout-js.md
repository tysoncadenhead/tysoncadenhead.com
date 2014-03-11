There has been a lot of buzz around whether or not jQuery is needed for building web applications anymore. Many blog posts have sprung up about how to do common things that are typically done with jQuery just using vanilla JavaScript. While it is important to know where jQuery is needed and where a leaner solution could provide a quicker load time and less complexity, for most large-scale projects, the last thing you want to be worrying about is optimizing against various browser types and nuances.

Reactive frameworks such as Knockout may seem on the surface to work pretty well without needing jQuery at all, but as you get deeper into complex interfaces, you might find yourself needing something such as a jQuery UI component. So where should jQuery and DOM interaction go in a well-structured Knockout application?

<!-- more -->

## Don't Do DOM Manipulation On Observables

A rookie mistake is to treat Knockout like other frameworks and try to change the DOM elements without it. For example:

```js
var person = {
    name: ko.observable('Tyson Cadenhead')
};
var $person = $('<div />', {
    'data-bind': '{ text: name }'
})
ko.applyBindings(person, $person[0]);
```

Will work fine, but if you do something like:

```js
$person.html('Batman');
```

you are basically overwriting the Knockout functionality. That is no good.

## jQuery Doesn't Belong In Your ViewModels, Models or Collections

One of the best selling points of Knockout besides getting developers out of the humdrum of repetitive DOM manipulation is that when it is written well, it is very easy to unit test. As you probably know, unit testing the DOM is not just difficult, it is also slow and unproductive. A viewModel like this would be easy to test:

```js
var person = {
    firstName: ko.observable('Tyson'),
    lastName: ko.observable('Cadenhead'),
    save: function () {
        var json = {
            firstName: this.firstName(),
            lastName: this.lastName()
        };
        return json;
    }
};
```

However, this is difficult to test:

```js
var person = {
    firstName: ko.observable('Tyson'),
    lastName: ko.observable('Cadenhead'),
    openDate: function () {
        $('#datepicker').datepicker();
    }
};
```

The only way to test whether the datepicker was opened or not is to query the DOM. There must be a better way!

## Custom Bindings To The Rescue!!!

Knockout allows you to write your own custom bindings. These bindings work just like any of the bindings Knockout gives you out of the box such as `text`, `value`, etc...

It might seem a little intimidating to write your own bindings, but let me assure you that it is actually a breeze. So, let's take our datepicker example above and refactor it into a custom binding. The binding itself would be as simple as this:

```js
ko.bindingHandlers.datepicker = {

    init: function(el, valueAccessor, allBindings, data, context) {
        $(el).datepicker(data.modalOptions);
    }
    
};
```

Now, you just need to update your template to use the new datepicker custom binding:

```html
<div>
    <input data-bind="{
        datapicker: {}
    }" />
</div>
```

You can also pass in data to the custom binding like this:

```html
<div>
    <input data-bind="{
        datapicker: {
            numberOfMonths: 3
        }
    }" />
</div>
```

That's really all there is to it. Using this approach, you can get the jQuery out of your viewModels and make your viewModels more testable and more clean.

As it turns out, jQuery works really well with Knockout as long as it is done right.

If you want to see an example of this, checkout this [JSFiddle](http://jsfiddle.net/22f2z/).