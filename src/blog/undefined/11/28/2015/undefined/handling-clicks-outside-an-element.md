Sometimes you find yourself solving the same problem over and over again. Usually when that happens, it's a good time to step back and think about a way to have a single reusable solution.

That was exactly what was happening when we were building out a library of custom components in React. For good usability, many of our components needed to have an action occur when a user clicked outside the component. This was the case for many components such as modals, comboboxes, etc...

<!-- more -->

Our answer to the outside click event was to create a small module to make it easy to subscribe to clicks occurring outside a passed-in element.

Our module is called "outside-click" available on [GitHub](https://github.com/Aloompa/outside-click) and [NPM](https://www.npmjs.com/package/outside-click).

The original code for this was written by [Tom Leslie](https://github.com/lomteslie), though the api has gone through a few tweaks and updates over the past couple of months. He should definitely get all of the credit for originating the module and writing it in a clean extendable way.

The idea is that we pass in an element and an event to occur when any element outside of the passed-in element is clicked.

Here is an example usage with React:

```
const outsideClick = require('outside-click');

class MyViewComponent extends React.Component {

    componentDidMount () {
        const element = React.findDOMNode(this);

        // Add the listener
        this.outsideClick = outsideClick(element, this.close.bind(this));
    }

    componentWillUnmount () {
        // Remove the listener
        this.outsideClick.off();
    }

}
```

The API is simple and there is honestly not much code happening, but it is a really useful tool with solid tests behind it.
