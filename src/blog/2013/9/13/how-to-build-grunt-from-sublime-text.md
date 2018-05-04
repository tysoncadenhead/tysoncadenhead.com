Sublime Text is a really great editor for writing code. It is actually my editor of choice at the moment. One nice feature that comes with Sublime is the ability to specify a custom build type. Sublime comes with several built-in build systems, but I've recently discovered that rolling my own build system is really simple. Here is how I got Sublime to build my JavaScript and Node scripts using Grunt.

<!-- more -->

Assuming you are already running Grunt for your build, you can simply go to `Tools>Build System>New Build System` in the Sublime menu and a new JSON file will appear.

![Adding a new build](/images/blog/sublime-grunt2.jpg)

For my grunt build, I modified the file to look like this:

```javascript
{
    "shell": true,
    "cmd": ["grunt"],
    "path": "/Users/myUserName/nvm/v0.10.1/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin"
}
```

The only thing you may need to modify is the path. The path is important because the build system will need to know where to locate Node on your machine. If you aren't sure what your path should contain, you can run this in your terminal:

```bash
echo $PATH
```

If Node already works on your machine and you copy the string that the terminal returns, it should work.

![The $PATH](/images/blog/sublime-grunt1.jpg)

Now, save your json file as `Grunt.sublime-build` and go to `Tools>Build System>Grunt` to use it as the default build system.

![Running a build](/images/blog/sublime-grunt3.jpg)

To test it out, run `cmd+B` in Sublime. It should kick off Grunt and run your build like normal. Any messages will be spit out into your sublime console.