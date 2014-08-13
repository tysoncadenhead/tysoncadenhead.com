I have been burning the midnight oil working on a Sails application. I'll be giving a more formal announcement when I launch it, but the basic idea is that you can surf the internet and add recipes for any meals using a handy bookmarklet. Once the recipe is in the database, you can generate a meal plan with any recipes you have added. You can then print off a shopping list based on the contents of your weekly meal plan.

<!-- more -->

While the concept is pretty simple, there have been a few gotchas. For example, I wanted to be able automatically to grab a photo of the recipe, download it to my server and resize it so that it would load quickly. The idea was pretty simple, but it took a little bit of research to find the right libraries to get the flow working.

Sails ships with a file upload handler called [Skipper](https://github.com/balderdashy/skipper), but that is for uploading files, not grabbing files off other websites and downloading them to our server.  I quickly realized, I was going to be working outside of the standard Sails workflow. Luckily, Sails is super-flexible and it can handle it.

### Downloading Remote Images

![](https://c2.staticflickr.com/4/3064/2999268596_24ce077c58.jpg)

You could definitely download images from remote websites using the Node `http` module. However, I ran across the [request](https://github.com/mikeal/request) NPM module, which makes the task a ton easier. You can download request by running:

```bash
npm install request
```

Once that is done, you can move on to create an image service. In Sails applications, services are a way to share code that can be used in any controller. The service that we will create will go in `/api/services/images.js`.

We can start out by providing a "downloadFile" method using request to grab the image and write it to the server.

```js
var request = require('request');

module.exports = {
    downloadFile: function (uri, fileName, done) {
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(fileName)).on('close', done);
        });
    }
};
```

You can try access the "downloadFile" method from any controller. Try it out like this:

```js
image.downloadFile(
    'http://www.google.com/intl/en_ALL/images/srpr/logo11w.png',
    './tmp/upload/googlelogo.png',
    function (data) {
        res.send(data);
    });
```

### Resizing the Image

![](http://www.dagami.com/wp-content/uploads/2011/08/big-dog-little-dog.jpg)

Since a user could download an image from anywhere, there was a really real possibility that the images could be huge. I wanted make all of the images have the same (small) width so that the application would load faster. To do that, I found a library called "GraphicsMagick." There is a little but of work required to get graphics magic running. You will need to use homebrew to install install it on your machine:

```bash
brew install graphicsmagick
```

Personally, several of my permissions had to be updated in order to install GraphicsMagick. The error trail was easy to follow, but just be aware that it may not be as easy as you might hope. After the brew package is installed, you can install the NPM package:

```bash
npm install gm
```

Finally, you can add a resize method to your "image" service:

```js
var gm = require('gm'),
    fs = require('fs'),
    request = require('request');

module.exports = {

    downloadFile: function (uri, fileName, done) {
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(fileName)).on('close', done);
        });
    },

    resize: function (srcPath, dstPath, width, done) {
        gm(srcPath)
            .options({imageMagick: true})
            .resize(width)
            .write(dstPath, done);
    }

};
```

### Putting It All Together

![](https://farm1.staticflickr.com/179/394669949_34d59f1e86.jpg)

Now that we have a downloadFile method and a resize method, we can create a third method that accesses both of them to download and resize the image that we pass in. We'll call this method `process`.

```js
var gm = require('gm'),
    fs = require('fs'),
    request = require('request');

module.exports = {

    downloadFile: function (uri, fileName, done) {
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(fileName)).on('close', done);
        });
    },

    resize: function (srcPath, dstPath, width, done) {
        gm(srcPath)
            .options({imageMagick: true})
            .resize(width)
            .write(dstPath, done);
    },

    process: function (uri, fileName, done) {
        var self = this;
        this.downloadFile(uri, fileName, function () {
            self.resize(fileName, fileName, 200, done);
        });
    }
    
};
```

Now, inside of any controller, we can call `image.process()` method. For example, we could download and resize the Google logo like this:

```js
image.process(
    'http://www.google.com/intl/en_ALL/images/srpr/logo11w.png',
    './tmp/upload/googlelogo.png',
    function (data) {
        res.send(data);
    });
```

Thanks to GraphicsMagick and the request module, downloading and resizing an image from any website using nothing more than a URL is actually not that difficult. Who would have thought?