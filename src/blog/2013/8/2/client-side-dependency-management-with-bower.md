If you've been creating applications using Node, you've probably fallen in love with the built-in package management framework "NPM". Using NPM makes life a ton easier because instead of needing to go out and download all of the third-party packages your project will need, you can just type a line or two in the terminal and everything is good to go. What if there was a tool like NPM for managing client-side JavaScript libraries? There is one. It is called Bower."

<!-- more -->

Bower essentially performs three vital functions

- You can download all of your dependencies from the command line, so you don't have to go out looking for them on the Internet
- You can easily update to the latest version of your library and easily switch back if you need to
- You don't have to check all of your dependencies in as part of your project. That means that your project will only contain the code that you write, which will make it smaller and more manageable.

So how do you use Bower? If you already have NPM installed, you can just install it globally:

```bash
npm install -g bower
```

You'll also probably want to install Git because most of the Bower packages use Git to work their magic.

Now that you've installed Bower, you can go to the project you want to use it in and create a `bower.json` file in the root. It will probably look something like this:

```json
{
  "name": "my-amazing-project",
  "version": "0.0.1",
  "dependencies": {
    "jquery": ">=2.0.3"
  },
  "ignore": [
    "**/.*",
    "node_modules",
    "components",
    "bower_components",
    "test",
    "tests"
  ]
}
```

If you've already been using NPM, you'll probably notice that the format is pretty similar. The dependency object is where you will list all of your dependencies and the version you would like to use.

By default, everything Bower downloads will go in the /bower_components folder in the root of your project. If you would like to put your dependencies in a different directory, just create a `.bowerrc` file with the path to your alternate folder:

```json
{
  "directory" : "public/js/bower_components"
}
```

Once everything is set up, you can install all of your dependencies using

```bash
bower install
```

All of your dependencies will go into the directory you declare in your .bowerrc file or in bower_components if none is specified.

To install a specific package, you can use

```bash
bower install jquery
```

or

```bash
bower install jquery#2.0.3
```

It's best to list your dependencies in the bower.json file, though, so that they will be remembered for later on.

I have found that most of the libraries I've needed are already registered with Bower. However, if you need to register a new GitHub repository, you can simply run something like

```bash
bower register jquery git://github.com/jquery/jquery
```

Simply pass in the name of the package and the path to the repository on GitHub.

Needless to say, I'm a big fan of Bower. Has anyone else been using Bower or something like it to manage third-party libraries on the client-side?