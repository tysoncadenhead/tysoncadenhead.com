Setting up multiple types of authentication on an application can be a daunting task. There are a ton of moving pieces and you want to make sure that your user model is up to the task of consuming any type of authentication you throw at it. To that end, I recently set up Facebook authentication on a Sails.js app I'm working on and I thought it might be worth sharing how easy it actually turned out to be.

<!-- more -->

### Passport To The Rescue!

The good news is that if you are creating a Sails app, you can use [Passport](https://github.com/jaredhanson/passport), which makes using multiple types of validation a ton easier.

Passport authenticates requests through plugins known as "strategies". Almost any of the strategies you can imagine, such as Facebook, Twitter, Github, Username/Password, etc... are already written. It's also really easy to write your own strategy if needed. Each strategy just takes a little bit of configuration and then gives you a callback when the login succeeds or fails.

Ok, enough talk. Let's get started, shall we?

### Install Passport

You will need to install the passport npm module:

```bash
npm install passport
```

As well as the passport-facebook module:

```bash
npm install passport-facebook
```

We'll come back to this, but we need to create a model to hold the data for the user first.

### Create a User Model

To do authentication, we will need a user model to check our login against. You can generate your model from the command line using:

```bash
sails generate user
```

That will spit out a model in `/api/models/User.js` as well as a controller in `/api/controllers/UserController.js`.

The User model should look something like this:

```js
/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    
    /* e.g.
    nickname: 'string'
    */
    
  }

};
```

Now, we just need to update the attributes that are being exported to include the facebookId:

```js
module.exports = {

  attributes: {
    
    facebookId: {
      type: 'string',
      required: true,
      unique: true
    }
    
  }

};
```

### Update the User Controller

You will need to add a little logic to the user controller to handle authentication with Facebook. As I mentioned earlier, the user controller should be located at `/api/controllers/UserController.js`. Some of the routes and request scope may need to be changed based on your needs, but this is essentially how I got it working:

```js
var passport = require('passport');

module.exports = {

  login: function (req, res) {
    res.view();
  },

  dashboard: function (req, res) {
    res.view();
  },

  logout: function (req, res){
    req.session.user = null;
    req.session.flash = 'You have logged out';
    res.redirect('user/login');
  },

  'facebook': function (req, res, next) {
     passport.authenticate('facebook', { scope: ['email', 'user_about_me']},
        function (err, user) {
            req.logIn(user, function (err) {
            if(err) {
                req.session.flash = 'There was an error';
                res.redirect('user/login');
            } else {
                req.session.user = user;
                res.redirect('/user/dashboard');
            }
        });
    })(req, res, next);
  },

  'facebook/callback': function (req, res, next) {
     passport.authenticate('facebook',
        function (req, res) {
            res.redirect('/user/dashboard');
        })(req, res, next);
  }

};
```

### Create the Passport Service

This is probably the biggest addition you will need to make to get your app accepting Facebook logins. This should all go in `api/services/passport.js`.

Remember to replace the clientId and ClientSecret with your own Facebook app credentials. If you don't have them yet, you can create them at [developers.facebook.com](http://developers.facebook.com/)

```js
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

function findById(id, fn) {
  User.findOne(id).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

function findByFacebookId(id, fn) {
  User.findOne({
    facebookId: id
  }).done(function (err, user) {
    if (err) {
      return fn(null, null);
    } else {
      return fn(null, user);
    }
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
    clientID: "YOUR-FACEBOOK-CLIENT-ID",
    clientSecret: "YOUR-FACEBOOK-CLIENT-SECRET",
    callbackURL: "http://localhost:1337/user/facebook/callback",
    enableProof: false
  }, function (accessToken, refreshToken, profile, done) {

    findByFacebookId(profile.id, function (err, user) {

      // Create a new User if it doesn't exist yet
      if (!user) {
        User.create({

          facebookId: profile.id

          // You can also add any other data you are getting back from Facebook here 
          // as long as it is in your model

        }).done(function (err, user) {
          if (user) {
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          } else {
            return done(err, null, {
              message: 'There was an error logging you in with Facebook'
            });
          }
        });

      // If there is already a user, return it
      } else {
        return done(null, user, {
          message: 'Logged In Successfully'
        });
      }
    });
  }
));
```

### Add the Express Middleware

You will need to add a little bit of middleware in order to use Passport with Express. I just created a file called `/config/express.js` with this logic:

```js
var passport = require('passport');

module.exports.express = {
    customMiddleware: function(app){

        // Passport
        app.use(passport.initialize());
        app.use(passport.session());

        app.use(function(req, res, next){
            res.locals.user = req.session.user;
            next();
        });

    }
};
```

All it's really doing is initializing passport, using the passport session and adding the user to the local scope of any views that are being rendered.

### Create a Login View

Create a view in `views/user/login.ejs` The bare bones of the login view should look like this:

```html
<a href="/user/facebook">Login With Facebook</a>
```

Let's also throw up a dashboard view in `views/user/dashboard.ejs`:

```html
<p>You are logged in! Your id is <strong><%- user.id %></strong> and your Facebook Id is <strong><%- user.facebookId %></strong></p>
<p><a href="/user/logout">Logout</a></p>
```

Okay then. Now, you can test this whole thing by running `sails lift` in your command line and going to [http://localhost:1337/user/login](http://localhost:1337/user/login). When you click on the "Login With Facebook" it should authenticate and then take you to the dashboard page. If you log out and try to go to the dashboard page again without logging back in, it will actually throw an error because there is no user in the session. Not the best experience, but it shows that the user has successfully logged out and it's fairly trivial to check for the user in the session and redirect if they don't exist.

So there you have it. Facebook authentication with Sails.js. Enjoy!