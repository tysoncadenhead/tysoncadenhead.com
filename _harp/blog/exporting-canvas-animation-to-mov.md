I have been a huge animation enthusiast since high-school. I even went to college hoping to become a professional computer animator before I got sucked into the wild world of computer programming. I have recently been dabbling with [Three JS](http://threejs.org/), which is a JavaScript engine for creating 3D models and animations for the browser.

Of course, my interests go beyond just making games and website animations. I like that the engine is written in JavaScript and that it uses web technologies like the canvas and WebGL to render the models. To that end, I have been exploring ways to export animations I make with Three JS to an external video file that I could use to stitch together actual films just like any application-based 3D animation software like Maya, Blender or Lightwave. I know it's crazy, but I think this might actually work.

<!-- more -->

So let's take the example that Three JS gives us for [creating our first scene](http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene). The markup looks something like this:

```js
<html>
    <head>
        <title>My first Three.js app</title>
        <style>canvas { width: 100%; height: 100% }</style>
    </head>
    <body>
        <script src="https://rawgithub.com/mrdoob/three.js/master/build/three.js"></script>
        <script>
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            var geometry = new THREE.CubeGeometry(1,1,1);
            var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            camera.position.z = 5;

            var render = function () {
                requestAnimationFrame(render);

                cube.rotation.x += 0.1;
                cube.rotation.y += 0.1;

                renderer.render(scene, camera);

            };

            render();
        </script>
    </body>
</html>
```

Now, if we want to export something in the canvas, we can use the `toDataURL()` method on the canvas like this:

```js
document.querySelector('canvas').toDataURL();
```

If you run that command in your console, you will get a link to the current frame you are on. It should be noted that the toDataURL() method is not particularly fast. But when has rendering animations ever been fast?

So, if we want to capture all of the frames for a given length of animation, we should be able to use toDataURL() to output each of those URLs.

Three JS runs all of the rendering through the render function, so we can output our images there:

```js
var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);

    if (cube.rotation.x < 3) {
        console.log(document.querySelector('canvas').toDataURL());
    }

};
```

Notice that I put a conditional around the output to just give us the first 30 frames. We could do more, but the point is that you don't want to keep it spitting out frames forever if you want to keep your browser alive. If your animation isn't infinite like this example, it should be easier to figure out how many frames you need to export.

Okay, so now we are exporting frames, but let's be honest, that can get tedious really fast. What if we could send the frames over websockets and have our server automatically save the png files to our hard drive in order?

Our server should look something like this:

```js
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    fs = require('fs');

server.listen(3000);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    socket.on('render-frame', function (data) {
        data.file = data.file.split(',')[1]; // Get rid of the data:image/png;base64 at the beginning of the file data
        var buffer = new Buffer(data.file, 'base64');
        fs.writeFile(__dirname + '/tmp/frame-' + data.frame + '.png', buffer.toString('binary'), 'binary');
    });
});
```

As you can see, we have created a socket.io event called "render-frame" that takes an object with the file and the frame number and it creates an image in the `/tmp` directory with the frame number as part of the name and the meta-data from the file as the content of the image. We'll also need to update the client-side code to this:

```js
<html>
    <head>
        <title>My first Three.js app</title>
        <style>canvas { width: 100%; height: 100% }</style>
    </head>
    <body>
        <script src="https://rawgithub.com/mrdoob/three.js/master/build/three.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script>
            var socket = io.connect('http://localhost:3000');
            var frame = 0;
            var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

            var renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(renderer.domElement);

            var geometry = new THREE.CubeGeometry(1,1,1);
            var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            camera.position.z = 5;

            var render = function () {
                requestAnimationFrame(render);

                cube.rotation.x += 0.1;
                cube.rotation.y += 0.1;

                renderer.render(scene, camera);

                if (cube.rotation.x < 3) {
                    socket.emit('render-frame', {
                        frame: frame++,
                        file: document.querySelector('canvas').toDataURL()
                    });
                }

            };

            render();
        </script>
    </body>
</html>
```

Where we are basically just setting up the websocket and emitting the "render-frame" event instead of logging it and letting the server handle the heavy lifting.

At this point, we've gotten as far as outputting the images, but there is still no video. However, if you have ffmpeg, you should be able to run:

```bash
ffmpeg -r 60 -i /tmp/frame-%04d.png -vcodec libx264 -vpre lossless_slow -threads 0 output.mp4
```

Which will output the video using the frames we've outputted.

As you can see, even if there isn't an out of the box solution to export Three JS videos from the browser, it's really not that hard. It is totally possible to make animations with JavaScript that you could put on YouTube and premier at your next nearby film festival.