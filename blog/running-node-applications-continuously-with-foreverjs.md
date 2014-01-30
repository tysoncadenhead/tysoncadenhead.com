When I first started writing Node applications, my main question was how I could keep the server running on a live server.

The answer I finally discovered was [Forever](https://github.com/nodejitsu/forever). Forever is a CLI tool that keeps a node process running indefinitely. That means that you can ssh into the place where your code is hosted, start the server with Forever and then close your ssh connection and the server will still be running. It is a thing of beauty.

<!-- more -->

To install Forever, just run:

```bash
[sudo] npm install forever -g
```

Then you can start up the server as easily as:

```bash
forever start my-server-file.js
```

After that, you can just hit your site or application from whatever port the server file is starting it up at.

If you need to stop your all of your processes, run:

```bash
forever stopall
```

It's a thing of beauty!