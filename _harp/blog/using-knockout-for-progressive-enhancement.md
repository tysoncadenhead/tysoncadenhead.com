One of the great things about all of the best MV* frameworks is that they allow you to hardly render any templates on the server-side. That means that you only need to hit the server for data. Of course, that is great if your users have JavaScript enabled, but what if they don't?

<!-- more -->

Lately, I have been thinking about how a framework like Knockout might perform for progressive enhancement. I've been wondering if it is possible to make a page with robust client-side validation, for example, that will work on some level whether JavaScript is enabled or not.

The real challenge is with how Knockout data-bindings work. It is a very different paradigm than the old "get HTML from the server and render it" mentality.

![](http://i2.cdnds.net/11/41/618_movies_rocky_10.jpg)

### Let's Knock It Out

Let's start off with a plain form. Something like this:

```html
<form action="#">
    <div>
        <label>Name</label>
        <input type="text" value="couch" name="name" />
    </div>
    <div>
        <label>Size</label>
        <input type="text" value="big" name="size" />
    </div>
    <div>
        <label>Width</label>
        <input type="text" value="6" name="width" />
    </div>
    <div>
        <label>Height</label>
        <input type="text" value="2" name="hegiht" />
    </div>
</form>
```

The form already has some values set on each field as if we are on an editing page. Our mission is to use Knockout to enhance the form and maintain the current values.

A well structured Knockout application typically separates the model layer from the viewModel layer, so you might have a model that looks something like this:

```js
var Chair = function (obj) {
    if (typeof obj === 'object') {
        this.name(obj.name);
        this.type(obj.type);
        this.width(obj.width);
        this.height(obj.height);
    }
};

_.extend(Chair.prototype, {
    name: ko.observable(''),
    type: ko.observable(''),
    width: ko.observable(0),
    height: ko.observable(0)
});
```

To complete our tiny little application, we might have a viewModel that looks something like this:

```js
var ChairView = function () {
    this.chair = new Chair();
};

_.extend(ChairView.prototype, {
    submit: function () {
        console.log('submitted the form', this.chair);
    }
});

ko.applyBindings(new ChairView(), document.body);
```

In a typical application, you would get the model data through an ajax or websocket request. For the sake of our example application, that would be redundant because we already have the data passed in with the server-side template. It would also slow down the application because it wouldn't really work with our enhancements until the xhr request returns.

This means that there are two ways we can get the data into the model to manipulate it.

![](http://static.indianexpress.com/m-images/Fri%20Sep%2006%202013,%2014:38%20hrs/M_Id_417124_Planet_Earth.jpg)

### Global Data Variable

The first way is to create a global variable from the server-side template that basically provides all of the data as an object. Something like this might work:

```html
<script type="text/javaScript">
window.chairData = {
    'name': 'couch',
    'size': 'big',
    'width': 6,
    'height': 2
};
</script>
```

Then we would just modify the model instantiation in the viewModel like this:

```js
var ChairView = function () {
    this.chair = new Chair(window.chairData);
};
```

Finally, we will need to modify our template to accept the new bindings:

```html
<form action="#" data-bind="submit: submit">
    <div>
        <label>Name</label>
        <input type="text" value="couch" name="name" data-bind="value: chair.name" />
    </div>
    <div>
        <label>Size</label>
        <input type="text" value="big" name="size" data-bind="value: chair.size" />
    </div>
    <div>
        <label>Width</label>
        <input type="text" value="6" name="width" data-bind="value: chair.width" />
    </div>
    <div>
        <label>Height</label>
        <input type="text" value="2" name="hegiht" data-bind="value: chair.height" />
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
<script type="text/javaScript">
    window.chairData = {
        'name': 'couch',
        'size': 'big',
        'width': 6,
        'height': 2
    };
</script>
```

It works, but we're stuck with using a global variable, which is something we generally want to avoid as JavaScript developers. We also have to include inline JavaScript to get our data into the viewModel. There has to be a better way!

![](http://images.blog.autoshopper.com/270_125-Anonymous.jpg)

### Using a Custom Binding

It finally hit me that a custom binding would make a ton of sense for this problem. If we know that the original data is in the DOM, we just need to use a binding to extract it out and apply it to the observable. Something like this should work:

```js
ko.bindingHandlers.initialValue = {
    init: function(element, valueAccessor, allBindings) {
        var bindings = allBindings();
        if (bindings.value) {
            bindings.value($(element).val());
        }
    }
};
```

As you can see, we're looking to see if there is a "value" binding applied to the element. If there is, we are using that binding accessor to push in the current value of the element.

Applying this to our template will look something like this:

```html
<form action="#" data-bind="submit: submit">
    <div>
        <label>Name</label>
        <input type="text" value="couch" name="name" data-bind="initialValue, value: chair.name" />
    </div>
    <div>
        <label>Size</label>
        <input type="text" value="big" name="size" data-bind="initialValue, value: chair.size" />
    </div>
    <div>
        <label>Width</label>
        <input type="text" value="6" name="width" data-bind="initialValue, value: chair.width" />
    </div>
    <div>
        <label>Height</label>
        <input type="text" value="2" name="hegiht" data-bind="initialValue, value: chair.height" />
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
```

It looks pretty unobtrusive in the markup and it get the job done without needing to hit the server to get the data that is already available. That's pretty good mileage for a 3-line custom binding!

If you want to see it in action, I put together a [fiddle](http://jsfiddle.net/UT73F/1/) showing how it works.

What do you think? Is it even worth optimizing for people who have JavaScript turned off? Is there a better approach to pass non-Ajax server-side data into a client-side model? Leave a comment and tell me what you think.