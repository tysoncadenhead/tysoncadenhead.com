When I first started writing client-side applications, the process was terrible. I had to save my file and then flip over to my browser to check my results. As a result, I was clicking two buttons every time I wanted to save a file. To make matters worse, I had to repeat the process to test my application in multiple browsers. To test a minimum of Chrome, Firefox and a single version of Internet Explorer, I was clicking 4 buttons. To repeat that flow over and over again to test incremental changes was soul killing.

<!-- more -->

![](/images/blog/auqaman.png)

### LiveReload

A few years ago, a solution called [LiveReload](http://livereload.com/) was introduced to address this problem. Using LiveReload, I could tell my computer to watch a certain directory for changes. When a change occurred in one of my files, it would refresh the browser. My workflow with LiveReload was much easier, but the setup was a pain. Anytime I'd set up a new project, I found myself spending an inordinate amount of time setting up a grunt task to watch certain files and keep my browser up to date. Ultimately, I found myself slipping back into the old flow of development on smaller projects because it was too much of a pain to get working.

![](/images/blog/superman.png)

### Enter BrowserSync

A few days ago, I tried out [BrowserSync](http://www.browsersync.io/) for the first time. BrowserSync is available as a Grunt or Gulp plugin, but it is also really simple to run as a process in the terminal.

BrowserSync runs with NodeJS, so if you already have Node installed, you just need to install the `browser-sync` package like this:

```bash
npm install -g browser-sync
```

Once BrowserSync is installed, you can use it to watch static files or you can create a proxy for a dynamic site. For example, if I have a SailsJS application, I could watch the files in the `public` directory like this:

```bash
browser-sync start --proxy "localhost:3117" --files "public/**/*"
```

BrowserSync will create a proxy to serve the site through and open a browser window pointing to that proxy. Now, anytime I change a file in my `public` directory, the browser window will be refreshed and I will see the latest code.

BrowserSync doesn't care what backend technology you are using. I typically write in Node, but if I was using PHP or Ruby, it would work exactly the same.

I have been really impressed with BrowserSync so far. Try it out, you may find yourself in a happier place.