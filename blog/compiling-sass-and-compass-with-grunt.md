If you haven't been using [Grunt](http://gruntjs.com) to run your JavaScript tasks, you have definitely been missing out. Grunt is really great about automating tasks that would have been very tedious otherwise. One great thing about Grunt is the ability to run `grunt watch` to monitor your files and run tasks when they are changed. We can use `grunt watch` in tandem with compass to automatically compile css files on the fly as we change our SASS files.

<!-- more -->

To get started, you'll need to install Grunt and then add the "watch" task.

```bash
npm install grunt-contrib-watch
```

Next, you can add something like this to the grunt.initConfig() function inside your Gruntfile.js:

```javascript
{
    watch: {
        options: {
            livereload: 1337
        },
        css: {
          files: ['scss/**/*.scss'],
          tasks: ['compass']
        }
    }
}
```

We've added livereload, listening to port 1337. You can add a snippet like this to listen for changes inside your html template:

```html4strict
<script src="http://localhost:1337/livereload.js"></script>
```

We've also told "watch" to listen for changes any `.scss` files inside the `scss` directory.

Last, we gave "watch" a task to runt when a scss file is changed. That task, of course, is compass.

Now, we will need to install the compass Grunt task:

```bash
npm install grunt-contrib-compass
```

Now, let's add the compass task to our Gruntfile:

```javascript
{
    compass: {
        dist: {
            options: {
                config: 'config.rb'
            }
        }
    }
}
```

Nothing too interesting is happening here. We're just giving compass a config file to look at when it is compiling. The config.rb will typically look something like this:

```text
http_path = "public/"
css_dir = "public/css"
sass_dir = "scss"
images_dir = "public/images"
javascripts_dir = "public/js"
output_style = :compressed
relative_assets=true
line_comments = false
```

That is really all there is to it. All told, our Gruntfile will look something like this:

```javascript
grunt.initConfig({

    watch: {
        options: {
            livereload: 1337
        },
        css: {
          files: ['public/scss/**/*.scss'],
          tasks: ['compass']
        }
    },

    compass: {
        dist: {
            options: {
                config: 'config.rb'
            }
        }
    }

});

grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-watch');
```

Now, just run:

```bash
grunt watch
```

Anytime you change a file in your `/scss` directory, it will be compressed and outputted into your `/public/css` directory.

With Compass building CSS as a part of your Grunt watch task, you will have one less process to keep running in your terminal. Automatically compiling SASS files is definitely something to grunt about!