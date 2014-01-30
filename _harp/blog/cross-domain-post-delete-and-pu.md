I've recently been working on a JavaScript API that interfaces with a REST-based server-side API and handles cross-domain issues while still allowing GET, POST, PUT and DELETE methods to be fired from anywhere on the web.  Due to cross-domain security issues at the browser level, making POST, PUT and DELETE requests can be a lot harder than you might think.

<!-- more -->

Let's say for the sake of argument that you have a domain at foo.com that needs to interact with an API at bar.com.  You can easily get around the cross domain issues using JSONP, but the limitation is that since JSONP is a hack that pretends that the ajax response is just a normal JavaScript file, it only allows for the data to be retrieved through the GET method.

My first thought on how to get around that issue was that I could use a hidden iframe to pass data into.  The issue with that is that iframes in different domains can't communicate with each other.  Or at least, they can't communicate very easily with each other.  In truth, the only control that the parent page has over the child page is the ability to change the child's url. The child page has absolutely no ability to communicate with a parent in a different domain.  In theory, that would make responding to an ajax call impossible, but the child iframe can render a child iframe inside of itself that can communicate with its grandparent using window.parent.parent

So you see, we have the ability to do cross-domain iframe communication using a proxy file for the requested domain and a proxy file for the response domain.  In the end, the process comes out looking like this:

<iframe width="560" height="315" src="http://www.youtube.com/embed/lg1Rwddms7U" frameborder="0" allowfullscreen></iframe>

In order to make the process of cross-domain Ajax calls easier, I've written a jQuery plugin that allows you to put an HTML proxy on both your request domain and your response domain.  All of the tricky details are taken care of.  Check out the [GitHub Repo](https://github.com/tysoncadenhead/jquery-ajaxproxy) to get started.  I've also created a [live demo](http://sandbox1.tysonlloydcadenhead.com/ajaxproxy/example.html) of the jQuery Ajax Proxy that shows how you can use GET, POST, PUT and DELETE across domains.  Let me know what you think.