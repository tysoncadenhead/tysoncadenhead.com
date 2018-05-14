I have recently been thinking through the best way to unit test React components. The interesting thing about React components is that they are a container for a combination of state and rendering logic. This should make them easier to test than most view layers in other frameworks because we can easily change the state of a component and make assertions based on what we expect the state changes to do to modify the rendered output.

<!-- more -->

Luckily, React has a really nice add-on called [React Test Utils](http://facebook.github.io/react/docs/test-utils.html). The team at Facebook uses Jest for testing, but since the test utilities are provided modularly, we can just as easily use any other testing framework in its place.

Let's start by installing the test utils:

```npm install react-addons-test-utils```

Now, let's take a simple component as an example:

```
const React = require('react');

class App extends React.Component {

    constructor () {
        super();

        this.state = {
            timesClicked: 0
        };
    }

    incrementTimesClicked () {
        const { timesClicked } = this.state;

        timesClicked++;

        this.setState({
            timesClicked
        });
    }

    pluralizeTimes () {
      if (this.state.timesClicked === 1) {
          return 'times';
      }

      return 'time';
    }

    render () {
        const times = this.pluralizeTimes();

        return (
            <button onClick={this.incrementTimesClicked.bind(this)}>
                You clicked me {this.state.timesClicked} {times}
            </button>
        );
    }

}

module.exports = App;
```

This basically just renders a message with the number of times the button has been clicked.

So, how do we test an implementation like this that relies so heavily on the state of the display changing? That's where the React Test Utils come in.

We will need to make a new file for our Mocha tests. The wrapper will basically just be something like this:

```
const Component = require('/path/to/App.jsx');
const assert = require('assert');
const React = require('react');
const ReactTestUtils = require('react-addons-test-utils');

describe('The fake application', () => {
    // Our tests will go here
});
```

Great, now to write actual tests.

React Test Utils comes with a `createRenderer()` method that allows us to render our component output to a json object that we can use without a browser. This is great for checking the children or classNames to make sure they are rendered correctly. We can use the renderer to render our little component and dive into the rendered output to make sure that it is rendering what we would expect. Since we haven't yet mutated the state of the component, it should say that we haven't clicked the button yet. The `children` off of the props will either be an array or if we are directly rendering some text instead of elements inside the component, it will be a simple string.

```
describe('When we render the initial state', () => {
   it('Should have not have been clicked', () => {
       const renderer = ReactTestUtils.createRenderer();

       renderer.render(
           React.createElement(Component)
       );

       const { children } = renderer.getRenderOutput().props;

       assert.equal(children, 'You clicked me 0 times');
   });
});
```

This is awesome, right? We can test rendered output without a DOM. That means we can run our tests in Node and leave browser testing out of our unit tests. But what about simulating user interactions in our component?

The test util come with a `Simulate` object that allows us to specify a type of user even we want to simulate (click, change, keyDown, etc). We pass our target element in with the event and React Test Utils will simulate the user interaction without the need of a DOM.

```
describe('When we click the button once', () => {
   it('Should use a singular message', () => {
       const renderer = ReactTestUtils.createRenderer();

       renderer.render(
           React.createElement(Component)
       );

       ReactTestUtils.Simulate.click(renderer);

       const { children } = renderer.getRenderOutput().props;

       assert.equal(children, 'You clicked me 1 time');
   });
});
```

There are a few other methods that come with the React test utils, but I've found that the renderer and simulate are hands down the most useful for checking the rendered state of a component and simulating user interactions.

Have you used Mocha for testing React Components? What has been your experience?
