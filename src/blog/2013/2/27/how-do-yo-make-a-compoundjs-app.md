NodeJS may still be young, but there are already several MVC frameworks popping up to run exclusively on Node. My favorite is [CompoundJS](http://compoundjs.com/).

<!-- more -->

Compound was written to look like to Ruby on Rails. In fact, Compound's original name was "Railway on Express." As the defunct name implies, Compound runs on top of [the ExpressJS framework](http://expressjs.com/). Some of the reasons to use Compound instead of simply running a vanilla installation of Express are that:

-   Compound provides a structure for where things are supposed to go and how they are supposed to be used.
-   Compound uses the MVC architecture, which makes maintaining code much easier, especially for those of us who are familiar with it.
-   Compound provides scaffolding so you can generate portions of your application from the command line.
-   Compound ships with a library called JugglingDB, which abstracts the database layer of your application and allows you to use MongoDB, Redis, LocalStorage and MySQL interchangeably.

There are a few other Node MVC frameworks out there, such as [TowerJS](http://towerjs.org/), but one of my favorite things about Compound is that it doesn't force you to write in CoffeeScript. If you prefer CoffeeScript, you can use it, but using the JavaScript syntax is just as acceptable.

### Installing Compound

Compound is registered as an npm package, so you can install it globally using:

```bash
sudo npm install compound -g
```

### Creating an App

We'll make a basic application to keep track of our monthly budget. Since we are so creative, we'll name our application "budget".

```bash
compound init budget && cd budget
npm install
```

### Scaffold Categories

One of the best features of Compound is the built-in scaffolding. The scaffolding will create the ORM, controller, views, routes and tests for our budget categories:

```bash
compound generate crud category name amount:number active:boolean
```

Let's break this down. The first argument after the "crud" is the name of the model. All of the arguments after the model name are the fields that the model contains. The fields can be cast to a type when they are divided by a colon. If no type is provided, Compound assumes the field is a string.

### Start the server

To start the server, you can run:

```bash
compound server 8080
```

Compound will start the server using the port that you specified. Since we started our server on port 8080, we should be able to go to http://localhost:8080/categories and see the index page of categories that we scaffolded a moment ago.

The index of categories should look like this:

![Compound](/images/blog/compound1.png)

Out of the box, Compound uses Twitter Bootstrap to style the views. You can usually customize the views and get them looking pretty good with very minimal effort.

Compound has generated all of the basic user interface from our one line of scaffolding instructions. You can use the interface to add new categories.

![Compound](/images/blog/compound2.png)

Once a category is created it will show up in the index.

The scaffolding also generates a details view that displays more information about the category.

![Compound](/images/blog/compound3.png)

As you can see, Compound outputs a completely functional interface.

If this introduction is useful to anyone, I'd love to expand on it and get deeper into more advanced aspects of how Compound actually works.

Is anyone else using Compound for application development? What have your experiences been with it?