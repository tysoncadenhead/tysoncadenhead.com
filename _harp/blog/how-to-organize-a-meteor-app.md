Meteor is a really nice framework for building real-time applications. The example application shows off how easy it is to share code between the server and client by putting the code inside a single JavaScript file at the root of the project. Running the example app from a single file definitely shows off how awesome sharing code is, but it also made me scratch my head trying to figure out how to organize a larger application. After reading through the documentation and a lot of trail and error, here is the organization that I have landed on.

<!-- more -->

-  app
    -  client
        -  stylesheets
        -  lib
            -  meteor
            -  vendor
        -  views
    -  lib
        -  collections
        -  meteor
        -  models
    -  packages
    -  private
    -  public
    -  server
        -  api
        -  models
        -  publications
-  tests
    -  integration
    -  spec

If you are confused about what any of these directories should contain, don't worry. Let me break it down:

<hr />

- #### app
This is where the entire application lives
    - #### client
        This is where put any code that you only want to be used on the client-side and not the server-side. This will typically include:
        - #### stylesheets
        Your css files go here
        - #### lib
        Anything in this folder will be executed first. You will want to put things such as shared libraries and things here. Inside of this directory, you may want to split things up a little more, such as:
            - ##### meteor
            The application core. This might include the router.js and a startup.js files
            - ##### vendor
            Client-side libraries, etc...
        - #### views
        Your views and templates can go in this folder. I typically arrange them as modules such as:
            - ##### myModuleName
                - ##### myController.js
                - ##### myTemplate.html
    - #### lib
        - #### collections
        Meteor collections should be shared, so they go here
        - #### meteor
        Any application-specific code
        - #### models
        Meteor doesn't really have a concept of models, but it's pretty simple to set them up as an extension of the collections
    - #### packages
    Meteor packages. You shouldn't need to touch this directly.
    - #### private
    Any static files that you only want to be available to the server
    - #### public
    The /public root for the client-side. This would typically have images and any other static assets.
    - #### server
    This is the code that only gets executed on the server-side
        - #### api
        If you need to have an http api, it can go here
        - #### models
        Models that you only want to be available on the server
        - #### publications
        Messaging for the server-side to the client
- #### tests
I've found that it is easier to put the tests completely outside of the app itself because the build process can be problematic
    - #### integration
    Selenium or Webdriver tests
    - #### spec
    Mocha or QUnit tests

<hr />

It's taken a lot of trail and error to get to the structure above, and every application will have different needs, but it serves as a good reference for me. How do you organize your Meteor apps?