I had been meaning to start playing around with React for quite a while now. There is a lot of buzz around React and I really wanted to see what it was all about. I had looked at a little code written with React and JSX and I was frankly a little taken aback by the syntax. But last week, I was at devLink and I saw a presentation by [Jim Cowart](https://twitter.com/ifandelse) on the React framework and several things clicked for me. I've started playing around with it this week and I thought I'd write an introductory post to cover what I've learned so far.

<!-- more -->

### What Is React?

React is a client-side JavaScript framework created by Facebook and Instagram. React takes a radically different approach to many problems than other client-side frameworks, which makes it interesting to learn.

The React library only focuses on the UI and it has even been implemented as the `view` layer for many MV* frameworks.

Here are a few things that set React apart.

### JSX

React works best when it is paired with a language extension to JavaScript called JSX. At first glance, JSX may look a little strange. Here is an example:

```
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});
React.renderComponent(<HelloMessage name="John" />, mountNode);
```

You might notice the markup inside the JavaScript code. That took me aback at first too. What is really interesting is that the markup is actually not a string. It's also not even HTML. It gets compiled to look like this:

```js
var HelloMessage = React.createClass({displayName: 'HelloMessage',
  render: function() {
    return React.DOM.div(null, "Hello ", this.props.name);
  }
});
React.renderComponent(HelloMessage({name: "John"}), mountNode);
```

### One-Way Binding

If you are accustomed to writing Angular or Knockout applications, you're probably pretty familiar with the concept of two-way binding. Two-way binding is a central tenant of MVVM frameworks. It means that any data changes in the model are immediately propagated to the view or views and any changes that occur on the view are immediately propagated back to the underlying model.

The approach with React is to bind the view to the model and then push data back into the model as needed. For more light on the subject of why React uses one-way binding instead of two-way binding, check out this discussion by [Pete Hunt](https://www.youtube.com/watch?v=h3KksH8gfcQ).

Instead of data being automatically sent back to the model, you have to do the work yourself using event listeners in the JSX "markup". Here is an example of submitting a form using the `handleSubmit` event:

```
var CommentForm = React.createClass({
    handleSubmit: function (e) {
      e.preventDefault();
      var author = this.refs.author.getDOMNode().value.trim(),
          text = this.refs.text.getDOMNode().value.trim();
      this.refs.author.getDOMNode().value = '';
      this.refs.text.getDOMNode().value = '';
      return;
    },
    render: function () {
      return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Your name" ref="author" />
          <input type="text" placeholder="Say something..." ref="text" />
          <input type="submit" value="Post" />
        </form>
      );
    }
});
```
### Flus Application Architecture

Instead of the traditional data flow that you will see in MVC applications, React works best when paired with a [Flux](https://github.com/facebook/flux) architecture.

The flow of a traditional MVC application would look something like this:

```text
Controller --> Model --> View
```

Whereas the flow of a Flux application would look like this:

```text
Action --> Dispatcher --> Store --> View
```

Using Flux, an action comes into the system and gets passed into the dispatcher. The dispatcher acts as a sort of traffic controller, it ensures that until the current state is rendered, another action cannot be passed into the system. The store is a data layer that updates when you get a new action, and the view, which re-render whenever the stores say something has changes. The view can throw another action into the system and restart the rendering process.

Using one-way binding, the Flux architecture makes a lot more sense because everything is flowing in a single direction without any cascading effects

### Virtual DOM

React is very quick and responsive. It uses the virtual DOM to create a diff with the current DOM, so only the things that change are updated. There is no needless re-rendering. React can also be rendered on the server-side using Node.js.

### My Thoughts

React is a really cool concept. It tends to create faster and more responsive interfaces than most of the other libraries I've worked with.

On the other side of the coin, React isn't as fully featured as something like Angular. Here is a comparison of the amount of code each one requires to create a [TODO MVC application](http://www.benmccann.com/blog/todo-mvc-angular-vs-react/). Obviously, Angular is a complete library for managing front-end applications and React on focuses on the view, but it is important to note that if you use React by itself, you will end up writing more boilerplate code to glue the application together. When paired with Flux or any MV* framework, you will see the amount of boilerplate drastically reduced.

I'm definitely looking forward to using React and Flux more in the future. It's a really cool and interesting approach and I've been really impressed by the responsiveness it provides. What have been your experiences with React?

*edit - Many thanks to [Jim Cowart](https://twitter.com/ifandelse) for pointing out some things I said that didn't make sense. Hopefully some of the changes I made will make this a better introduction.*