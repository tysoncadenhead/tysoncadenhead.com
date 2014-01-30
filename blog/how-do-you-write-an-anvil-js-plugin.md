[Anvil.js](http://anviljs.com) is a powerful "Convention over configuration" build tool that was built by [Alex Robson](http://twiiter.com/a_robson) and sponsored by [appendTo](http://appendto.com), which is incidentally where I work now.

<!-- more -->

One of the most powerful things about Anvil is that it has an intentionally light core. It was meant to be primarily run by plugins. Authoring Anvil plugins is a pretty painless ordeal. Today, I'm going to walk you through the process of creating an Anvil plugin. Once you see how simple it is, you'll probably find yourself writing plugins to make your own build more efficient. Let's get started.

### 1. Install Anvil

If you haven't installed [anvil](http://anviljs.com) yet, that will be where you need to start. If you already have Node installed, you will just need to run this in the terminal:

```bash
npm install anvil.js -g
```

### 2. Create a sandbox project to test your plugin in

It is usually helpful to sandbox your plugin development just in case something goes terribly wrong. The last thing you want is to run a build and have it wipe out your entire project. These things can happen. Trust me.

We'll create a generic project so we can rest easy.

```bash
mkdir anvil-helloworld-sandbox
cd anvil-helloworld-sandbox/
```

### 3. Create your sandbox build.json file

Anvil uses a file called build.json to determine which Anvil plugins will be used and how they will be used. The file will go at the root of our sandbox project directory. It can be as simple as this:

```javascript
{}
```

In order to run our plugin, we'll need an extra line to pass in some configuration information. Our build.json will look like this:

```javascript
{
    "anvil.helloworld": {
        "greeting": "How are you today?"    
    }
}
```

We'll revisit how to access the greeting we passed in. For the time being, you just need to know that you can use it.

### 4. Create your plugin directory

We'll create a directory called "anvil-helloworld" where our plugin will live during development.

```bash
mkdir anvil.helloworld
cd anvil.helloworld
```

So, what does the anvil plugin need to work? Not much, really. A typical Anvil plugin directory would look something like this:

```text
/anvil.helloworld
    /lib
        plugin.js
    /spec
        plugin.spec.js
    /src
        plugin.js
    build.json
    package.json
    README.md
```

It's less complicated than it looks. Let's break it down.

#### build.json

We'll be building our plugin with Anvil, so a build.json file is needed. For our purposes, there is no need for any configuration, so the entire file can just be an empty object:

```javascript
{}
```

#### package.json

This is for npm (Node Package Management) to register the plugin. It should look something like this:

```javascript
{
  "author": {
    "name": "Tyson Cadenhead",
    "email": "tcadenhead@appendto.com",
    "url": "http://appendto.com"
  },
  "name": "anvil.helloworld",
  "description": "An example plugin for anvil",
  "version": "0.0.1",
  "repository": {
    "type": "git",
    "url": "git://github.com/tysoncadenhead/anvil.helloworld.git"
  },
  "engines": {
    "node": "~0.8.15"
  },
  "main": "./lib/plugin.js",
  "dependencies": {
  },
  "devDependencies": {
    "anvil.js": ">=0.9.0"
  },
  "optionalDependencies": {},
  "readme": "## Anvil Helloworld Plugin\n\nThis plugin requires anvil.js version 0.9.* or greater.\n\n## Installation\n\n\tanvil install anvil.helloworld",
  "_id": "anvil.helloworld@0.0.1",
  "_from": "anvil.helloworld"
}
```

#### /lib

You won't need to worry about creating the /lib directory because you can use Anvil to build it from the /src files. One of the cool things about Anvil is that it is a perfect tool for building its own plugins.

#### /spec

We won't focus much on the spec directory here, but it is for your unit tests. I would recommend writing [Mocha tests](http://visionmedia.github.com/mocha/) for any Anvil plugins that you create.

#### /src

This is where the meat of the plugin is located. Our "Hello World" plugin.js would look like this:

```javascript
var pluginFactory = function( _, anvil ) {

    return anvil.plugin({

        // Name of the plugin
        name: "anvil.helloworld",

        // Activity list: "pre-build", "identify", "pull", "combine", "pre-process", "compile", "post-process", "push", "test", "post-build"
        activity: "post-process",

        // [ "-h, --helloworld", "Run this helloworld plugin" ]
        commander: [],

        // This is to configure the plugin with
        configure: function( config, command, done ) {
            done();
        },

        // This is always called
        run: function( done ) {
            console.log("HELLO WORLD!!!");
            done();
        }

    });

};
 
module.exports = pluginFactory;
```

Anvil plugins are created using the anvil.plugin() method. Every pluginFactory gets the underscore.js library and anvil passed in as its arguments.

### 5. Run your plugin locally

To get anvil to use your plugin as a part of the build process, just navigate into the root of your plugin directory in the terminal and run:

```bash
anvil install .
```

Now if you go back to your plugin sandbox directory and run anvil, you should see it log "HELLO WORLD!!!" among the other feedback it will give you.

### 6. Get config data in the plugin

I told you we were going to talk about how to get our configuration data, didn't I?

All of the config information is available in the this.config variable. For example, we can add the greeting that we had in the build.json file like this:

```javascript
run: function( done ) {
    console.log("HELLO WORLD!!!! " + this.config.greeting);
    done();
}
```

There is also plenty of helpful configuration information inside of the anvil.config object. I would advise logging the entire object like this so that you can see what is available:

```javascript
run: function( done ) {
    console.log(anvil.config);
    done();
}
```

Some of the notable parameters are:

- **working** - The path to the directory where temporary files are processed
- **source** - The path where the original unbuilt project lives
- **spec** - The path where unit tests live for the project
- **output** - The directory where the files will live once the project is built

The anvil.fs object also gives you access to the entire file system, which makes it easy to modify the files in your build.

### 7. Publish your Anvil plugin

Once you've finished writing your plugin, you will want to publish it.  You will need an account at [npmjs.org](https://npmjs.org/) in order to publish your plugin.

After you have an account, you can just navigate to the directory of your plugin and run:

```bash
npm publish
```

Anvil automatically pulls in any plugins in the anvil namespace, so your plugin will be available if you run "anvil list" in your terminal:

```bash
anvil list
```

### 8. Go make some awesome plugins!

The "Hello World" plugin that we just walked through is [available on Github](https://github.com/tysoncadenhead/anvil.helloworld) for you to poke around with.

There is really no limit to what you can do with Anvil plugins, so go fourth and conquer.

If you use this tutorial to create an awesome Anvil plugin, please let me know. I'd love to hear about it!