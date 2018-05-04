One of the most useful CompoundJS plugins is [Compound-Passport](https://npmjs.org/package/compound-passport). If you aren't familiar with [Passport](http://passportjs.org/), it is an authentication library for Node that provides a common API to authenticate with Facebook, Twitter, Google, Github and over a hundred other OpenId and OAuth login sources.

<!-- more -->

This is how I was able to get authentication with Facebook added to an application within minutes.

First of all, you'll need to have a CompoundJS app. If you need help with that, check out my previous blog post on [how to make a CompoundJS application](/blog/how-do-yo-make-a-compoundjs-app/).

My first step was to install the compound-passport package with npm.

```bash
#install compound-passport
npm install compound-passport

#install passport
npm install passport

#install passports facebook authentication piece
npm install passport-facebook
```

As you can see, we're installing the Facebook connection module. If you want to do a different type of authentication, you'll need to install that module as well.

The next step is to add the configuration file. This will need to be saved in config/passport.yml

```yml
development:
  baseURL: 'http://localhost:3000/'
  facebook:
    apiKey: "my-api-key"
    secret: "my-secret"
```

You will need to use your Facebook API Key and secret. You can acquire both of them from the [https://developers.facebook.com/apps](Facebook Developers site).

Next, we'll need to modify our config/autoload.js file. I'm showing the entire file, but the only real takeaway here is that the array that is returned from the module.exports() function needs to contain require('compound-passport').

```javascript
module.exports = function (compound) {
  var defaultModules = [
      'jugglingdb',
      'co-assets-compiler'
    ], developmentModules = [];

  if ('development' === compound.app.get('env')) {
    developmentModules = [
      'ejs-ext',
      'seedjs',
      'co-generators',
      'compound-passport'
    ]
  }

  if (typeof window === 'undefined') {
    return defaultModules.concat(developmentModules).map(require);
  } else {
    return []
  }

};
```

In Compound, any before() filters that are added to the controllers/application_controller.js file are called before any standard controller methods. If we do something like this, we will have a req.user object available if the Facebook session have been authenticated. Otherwise, it will be null.

```javascript
before(function requireManager() {
    User.find(session.passport.user, function (err, user) {
        console.log(user);
        if (user) {
            req.user = user;
        } else {
            redirect('/login');
        }
        next();
    });
});
```

Last of all, if we create a login page like this, everything should come together.

```html4strict
<a href="/auth/facebook">Login with Facebook</a>
```

Has anyone else been working with Compound-Passport? My experience has been that even though the integration is fairly straightforward, the documentation is spotty enough that it isn't as easy to do as it should be. What has your experience been?