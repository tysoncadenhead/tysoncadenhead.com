About a month ago, I switched from running my blog using Poet.js on Nodejitsu to using Harp.js to compile it as a static site. There are several benefits to taking this approach. First of all, I can host the site using any server environment. When I build it, all that I have are HTML, CSS and JavaScript files and they can be hosted with Node, Apache, IIS or any other server. Another benefit is that there are several places where I can host my blog for free.

I ended up choosing to go with Github pages because this is a web development blog and I thought it was well-suited for their platform. This is how I got it working.

<!-- more -->

First of all, it should be noted, that Github pages have to be served from the root of your project. For example, your domainname.com would serve up `./index.html`. So, to begin with, I put all of my templates, css, javascript and markdown files in a subfolder named "_harp".

### Serving Harp Locally

Next, I opened my `.profile` file in the terminal and created an alias to start up the server without needing to manually navigate into the _harp directory:

```bash
alias tyson_run='cd ~/Sites/apps/tysoncadenhead.com; harp server;';
```

With that done, I just needed to call `tyson_run` and a server would be spawned at port :9000 with my blog. I know this part isn't really related to serving the site on Github Pages, but it is important to have a local testing environment.

### Setting Up Github Pages

Github has a ton of documentation about [how to set up and run Github pages](http://pages.github.com/), so I won't attempt to rewrite what's already been written.

I will say that you need to remember to create a branch in your repository called `gh-pages` to push your blog to. Github will be looking for that branch to serve from.

### Building and Deploying

I found myself repeating several steps every time I wanted to deploy my blog. First of all, I noticed that when I compiled my code, the static assets such as images, javascript files and the CNAME file, which is important for telling Github to use a custom domain were all missing. It was easy enough to copy them up a directory in the terminal, but it was needlessly tedious.

I also found that with me being the only person with push access to my repo, I was never going to need to manage merge conflicts, so adding the files, committing them and pushing was needlessly verbose.

Because of all that, I ended up writing a function in my `.profile` file that compiles harp, copies the static assets that harp misses, adds the files to the git branch, commits the files with whatever message I pass in as an argument and pushes the code.

```bash
function tyson_deploy () {
        cd ~/Sites/apps/tysoncadenhead.com;
        harp compile _harp ./;
        cp -r _harp/images images;
        cp -r _harp/js js;
        cp _harp/CNAME CNAME;
        git add .;
        git add -u;
        git commit -m "$1";
        git push origin gh-pages;
}
```

Now, I just need to run `tyson_deploy` and my code is pushed to the gh-pages branch. Any code in that branch is automatically served by Github, which means that after I push, my code is deployed.

I have been really happy with harp as a solution. There are a few features I'd love to see integrated, such as static paging but in the meantime, it works really well for my needs.

Now, excuse me while I type "tyson_deploy" into my terminal...