Authentication can be something of a road-blocker in application development. I can't tell you how many times I've had a great idea for an app, but instead of jumping in and writing the core functionality, I try to tackle the authentication layer first. The problem is that once I've gotten authentication in place, my excitement for the project has faded because I wasn't working on the project itself, just trying to set up a login system. Meteor takes the work out of setting up authentication so that you can focus on more important things, like writing the core functionality for your app.

<!-- more -->

Meteor has a really robust account and password API, but we won't cover all of it here. We are just going to focus on getting something in place really fast. The reason for that is because we don't want to spend a lot of time working on authentication on the front-end, we want to work on core functionality.

To work with authentication in Meteor, you will need to install the base accounts module.

```bash
meteor add accounts-base
```

Meteor also has a pre-built user interface for accounts. If you want to go back later and make the UI different, you can, but for us to take a "failing forward" approach to development, it makes sense to just use the default UI and then go back and refactor it as needed. Let's install the accounts user interface package.

```bash
meteor add accounts-ui
```

Next, we will need to install one of the authentication systems. Meteor comes packed with authentication through Facebook, Google, Github, Meetup, Twitter, Weibo and with a username and password. There are also third-party authentication types that were not written by the Meteor team.

We will start out with just the basic username and password.

```bash
meteor add accounts-password
```

Now if you start up your site by running `meteor`, you'll notice that nothing has changed. It should still look something like this:

![](/images/blog/meteorauth.png)

In order to see your login UI, you will need to add it to your template. That is as easy as adding `{{loginButtons}}` anywhere in your template. If you want the buttons to go on the right side of the screen, you can pass that in an argument like this:

```html4strict
{{loginButtons align="right"}}
```

Either way, though, the login buttons should be rendered:

![](/images/blog/meteorauth2.png)

When you click on the new "sign in" button, you should get something like this:

![](/images/blog/meteorauth3.png)

You now have authentication on your app!

The templates also have a `{{currentUser}}` that you can use to determine if the user has authenticated or not. For example, if you want to display a navigation only if the user is logged in, that might look like this:

```html4strict
<ul>
{{#if currentUser}}
    <li><a href="/account">My Account</a></li>
    <li><a href="/preferences">My Preferences</a></li>
{{/if}}
</ul>
```

When a user is logged in, your client-side JavaScript has access to a `Meteor.userId()` which is just a string representing the ID of the authenticated user. You also have access to a `Meteor.user()`, which will return an object with the user information. Depending on what authentication type you use, the content of the user object my vary. Both of those are available from the console, so you can log them at any time.

Each user object also has a profile that you can add your own data to. For example, if you wanted to add some data to the current user, you could do something like this:

```js
Meteor.users.update(Meteor.userId(), {
    $set: {
        profile: {
            firstName: 'Linus',
            lastName: 'Cadenhead',
            favoriteColor: 'green',
            ...
        }
    }
}, function () {
    alert('user was saved');
});
```

If you want to listen for an event to tell you when a user logs in or out, `Meteor.autorun` is your friend. This snippet will redirect the user when they log in or out:

```js
// Keep the current user logged in state
var loggedIn = !!Meteor.userId();

// This is fired whenever the user logs in or out
Meteor.autorun(function () {

    // If the user logs in, redirect them to the profile
    if (Meteor.userId() && !loggedIn) {
        document.location = '/profile';

    // If the user logs out, redirect them to the home page
    } else if (!Meteor.userId() && loggedIn) {
        document.location = '/';
    }

    // Set the current loggedIn status based on whether the userId is available or not
    loggedIn = !!Meteor.userId();

});
```

If you want to add another authentication method, just install it with Meteor. The user interface itself will walk you through the necessary steps to get things set up.

As you can see, authentication with Meteor is really quick and easy. In just a few minutes, you should be all set up and ready to work on the parts of your application that you care about. Yet another way that Meteor makes wasting time on tedious tasks a thing of the past!