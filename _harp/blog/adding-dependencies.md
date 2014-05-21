<div class="series-placement">

    This is part 3 of the [Creating An Application With Sails, Angular and Require.js](/blog/sails-ninja-intro) blog series. If you haven't read the introduction yet, you may want to start there.

    <h4>[Previous Post In This Series](/blog/starting_the_sails_project)</h4>

</div>

As I promised at the beginning of this series, we are going to be using [RequireJS](http://requirejs.org/) to manage our client-side modules. If you haven't used RequireJS or a similar AMD loader before, let me just say that you are really missing out. RequireJS lets you write your code in small modules that only expose the parts of the API that you want to show and as an added bonus, it uses JavaScript to load your JavaScript modules.

<!-- more -->

![Bower](http://bower.io/img/bower-logo.png)

#### We Can Use Bower, Right?

Before we get started, I wanted to give a quick rant about why using bower in a Sails project hasn't worked very well for me. Bower is a package manager for client-side JavaScript much like NPM is for server-side JavaScript. Typically, I would use bower to manage my dependencies for any project. The issue is that Sails doesn't run your assets right out of the folder you create them in. Instead, it packages them up with Grunt and runs them out of `.tmp/public`. That approach is really helpful if you have a compilation step such as converting SASS or LESS stylesheets to CSS or minifying your JavaScript. The issue is that it if you have a ton of files in your assets directory, as is often the case when you have installed bower packages, you will inevitably either get errors complaining about the number of files or it will be painfully slow. Either way, I've come to the painful conclusion that using Bower with Sails is more trouble than it is worth.

```bash
npm install -g yo
npm install -g generator-sails-angular generator-angular
npm install generator-sails-angular --save-dev
```