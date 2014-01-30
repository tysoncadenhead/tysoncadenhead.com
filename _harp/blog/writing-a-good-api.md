As a JavaScript developer, I tend to spend a lot of time getting and setting data using a server-side API.  Over the past few years, I've encountered all sorts of APIs and I've formed some opinions on what makes a good API for JavaScript interaction.  Here are some of my thoughts.

<!-- more -->

### Make the API use only a single URL, if possible

It's a pain to keep up with multiple URLs to hit to get different data.  Instead of having to hit `http://mydomain.com/api/getFoo.php` and `http://mydomain.com/api/saveFoo.php`, I prefer to be able to hit something more like `http://mydomain.com/api.php?method=getFoo` or `http://mydomain.com/api.php?method=saveFoo`.  I know it's not that different, but it gets even more complicated when you start passing in IDs as part of the routing structure.  

The more that can be passed as query string parameters or post parameters, the better.  One benefit of passing params as key / value pairs is that it eliminates confusion, because the purpose of the param should be defined by its name.

### Allow multiple data types

Currently, most JavaScript developers prefer to work with JSON because it doesn't have to be parsed or manipulated and it can literally be used out of the box unlike it's ugly step-brother XML.  The truth of the matter is that we don't know what the future will hold, so it's best to abstract the data type to a point where a client-side developer can easily request the one he or she wants by passing it into the request.  For example, `http://mydomain.com/api?method=getFoo&format=json`.

JSONP is a little bit different, because it requires a callback to work.  The way I've seen this done most effectively is that there is a separate param for the JSONP callback name.  For example, `http://mydomain.com/api?method=getFoo&format=json&callback=myCallback`.  JSONP isn't always needed, but if you are making cross-domain calls, it's the best we have right now.

### Don't require the method to be GET or POST

POST requests are more appropriate when data is being saved and GET is appropriate for retrieving data, but the decision of which method to use at what time should ultimately be something the client-side developer should be able to chose.  A lot of time can be wasted trying to figure out why a param passed in with the query string isn't working when it is expected to be in the POST scope. Believe me, I know.

### Don't go crazy if unexpected arguments are passed in

A successful API should simply disregard params that are not needed.  I've seen APIs blow up because I passed in an argument it didn't expect.  In the course of building and maintaining an application, params can get added and removed all the time so the API should be built in such a way that it doesn't care about arguments that it doesn't ask for and that it doesn't care about the order of the arguments that are passed in.

### Require as few arguments as possible

In many cases, the only thing that is needed to run a query is a single ID.  If that is the case, the request shouldn't have to be much more complicated than this: `http://mydomain.com/api?method=getFoo&format=json&fooid=123`

Things can get a little more complicated when the request requires some sort of authentication, but usually that doesn't require much more effort than passing around an access token.

### If authentication is required, only ask for login credentials once

Login credentials should be passed as infrequently as possible to avoid being compromised.  The best case scenario is to have an authentication method that passes back a session token that is maintained on the server-side for an allotted amount of time.  Once the session token is expired, the user has to log in again.  That way, the authentication information such as a username and password are only passed to the server once.

There are definitely more important aspects to creating a successful API, but the basis of most of them are clarity and future-proofing.  If the API is easy to change from a server-side perspective and a client-side perspective and everything makes sense, everyone will be happier and the development process will be easier.