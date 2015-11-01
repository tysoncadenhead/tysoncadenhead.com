Like nothing else out there, React has gotten me thinking of my code as a series of modules that are glued together to make a larger application. This has always been an ideal to reach for, but their focus on unidirectional data-flow has forced me to rethink the way I structure my code in a really positive way. It's no wonder that even Angular 2.0 is using a similar component-based architecture for rendering UI. It just makes sense! Today, I'm going to walk through how I have been organizing my components. This approach makes each module easy to find when I need it.

<!-- more -->

## We're Just Talking About Components

I want to make it clear from the beginning that this is not a post on how I organize my data models. I feel that this is way outside of the scope of this article.

## A Place For Everything and Everything In Its Place

Keeping an organized code base is not unlike organizing a room in real-life. The secret is to have a place where every type of thing goes. If I know that my keys go in a bowl on my dresser and my clothes go in the closet, I don't have to deal with the cognitive overhead of figuring out where to put them each time I need to set down my keys or put away my clothes.

In the same way, if I know that components of one type go in a certain folder and components of a different type go in a different folder, I don't have to guess where they go every time I write a new component. For a large application, we should also avoid the temptation to just make a big catch-all folder called something like "components" where we throw everything. That would be like saying that I organize my room by throwing all of my stuff in a pile. There are different types of components with different jobs and if we can distinguish between them, life will be much better.

## So, What Folders Do I Actually Have?

In addition to directories for data modeling, routing and utilities, I have split my code into 5 distinct component directories. Inside each of these directories, each of my components is a folder that looks something like this:

```
/Person
   _Person.scss
   index.js
   Person.jsx
```

All of our component folders contain an `index.js` file that does nothing but require the related `.jsx` file. This makes it look nicer when we require a file from a different component. We can require something like `components/Person` instead of `components/Person/Person.jsx`, but we still have the benefit of having the fully-named `.jsx` for quick reference in our text editors.

We use WebPack, so we are able to require CSS files inside our modules. This makes it easier to bundle stylesheets and components together since they are related to each other.

Some components will need other components nested inside them. If the nested component is only used by the parent component, we make it a sub-directory of the parent. We only let the children go one level deep, which means that if a child component contains a component, it will be a sibling in the folder structure. If a component is a child of two separate components, it is always moved up to the top level so that we never require a `.jsx` file that is outside the component folder.

Here are the basic directories that have worked for our particular project:

### /ui

We actually keep UI in a completely separate repository so that these components can be shared across projects. These are the lowest-level components possible. They are typically stateless, or dumb components that render based on the props that are passed down into them. They can also trigger callbacks from the props the receive if needed. These components should contain no business logic to the point where we could actually open-source each component if needed.

### /components

These typically sit on top of the UI components and pass data into them and respond to callbacks from them. They typically do contain state. As often as possible, they should not need to render anything except the UI components underneath them. This level of separation keeps the business logic out of the UI components and the rendering logic out of the components on top of them.

### /pages

Pages are actual routes that can be navigated to. These are typically composed of multiple components from the `/components` directory. They may pass some state down to the components. They are typically just concerned with laying out the components in a certain order and instantiating them with props.

### /layouts

These are classes that are meant to be extended by the pages, they wrap the pages and rely on the page to render the majority of the display. For example, a listing layout might expect the page to pass in the data and layout information for a list of things and then render a table with the list in hand. The layouts should never be aware of what data or types of data are being passed in, you can think of them as the base class for the pages.

### /modals

Modals turned out to be different enough from other types of components to warrant their own directory. They are not unlike pages in that they typically arrange components and pass props down into them, but there are not routes to modal windows, so they are not technically pages, so it seemed natural to give them their own directory.

Our current architecture could definitely be tweaked, but it is certainly a marked improvement from the strict MVC approach I have taken in the past with client-side application development. How are you organizing your modules? Is there anything that you would do differently?
