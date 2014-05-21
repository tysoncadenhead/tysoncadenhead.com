<div class="series-placement">

    This is part 2 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/sails-ninja-intro) | [Next Post In This Series](/blog/server-side-views)</h4>

</div>

Sails JS is a really cool framework for building realtime web applications. Today I am going to show you how easy it is to create a new Sails project. In many ways, Sails is similar to Ruby On Rails. It allows you to create a new application and sets enough defaults that you can run it right away.

<!-- more -->

#### Install Sails

Let's start by installing Sails. You will need to have Node.js installed too, but hopefully you've already got Node running at this point. To install Sails with npm, run this in your terminal:

```bash
sudo npm -g install sails
```

#### Create Your Project

Sails comes with a bunch of command-line tools. The `new` tool will help us create a new application:

```bash
sails new todo
```

Awesome! You just created an app! Now you just need to enter into the folder that the app went into and start the sails server:

```bash
cd todo
sails lift
```

Very good. Now if you go to [http://localhost:1337](http://localhost:1337). When you get there, you should see something like this:

![](/images/blog/sails1.png)

That is basically all there is to creating a new Sails project. If you want to follow along, I'm making a git repository to show the application we're building. We should currently be [at this point](https://github.com/tysoncadenhead/sails-angular-example-app/tree/cd5eed11dd5682656c791856886785e70b60e5bd) in the process of building this out.

In our next post, I'll show you how to add server-side views to the project. Stay tuned.