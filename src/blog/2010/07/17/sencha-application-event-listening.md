If you're like me, you are constantly looking for better ways to architect your JavaScript applications to be scalable and modular.  One of the keys to writing an application that fits the bill is to use reusable components that, instead of calling other functions or components directly, broadcast events that multiple components may be listening for.  I've been on a hunt to figure out how to do this correctly for a while now and I've finally come upon a few good solutions.

<!-- more -->

For those of you who don't know, [Sencha](http://sencha.com) (formerly known as EXT) is a JavaScript library that provides tons of tools for Rich Internet Application development.  If you are curious about what it can do, [check out some examples](http://www.sencha.com/deploy/dev/examples/).  If you are writing a Sencha application, a big part of the job is already done for you.  In this post, I will assume that you already have a basic knowledge of EXT / Sencha and that you know how to get it up and running.

First of all, you need an application component.  This is the main component that all of the other components live inside.  It doesn't matter what kind of component it is as long as it is a valid EXT component that can contain other EXT components.  For example:

```javascript
var application, MyApplication;

MyApplication = Ext.Extend(Ext.Panel, {
    height: 500,
    width: 700,
    initComponent: function(){
        this.items = [
            new MyContainer({
                application: this
            }),
            new MyButton({
                application: this
            })
        ];
        this.supperclass.initComponent.call(this);
    }
});

application = new MyApplication();
application.render(document.body);
```

Some things to make note of are that the Application is extending the EXT Panel.  When the component is initialized, a function is being called that uses the component as the "this."  We added an event called "myCustomEvent" that we will now be able to listen to and fire.  Also, we initialized a component called "myButton" and a component called "myContainer" and passed the application into them.  Shall we proceed?

Next, we need to create the "myButton" component.  Don't forget to include this above the application in your code, or the "myApplication" component won't know where to find "myButton."

```javascript
var MyButton;

MyButton = Ext.Extend(Ext.Button, {
    text: 'Click Me',
    initComponent: function(){
        var application = this.application;
        this.handler = function(e){
            var myVariable = 'This is my variable that I am passing around';
            application.fireEvent('myCustomEvent', myVariable);
        };
        this.supperclass.initComponent.call(this);
    }
});
```

What's happening here is that we are creating a button that fires a "myCustomEvent" event when it is clicked and passes a variable that we just made up.  You can pass as many variables as you need to here, and they will typically be more useful than a string that says "this is a variable."  It's just an example, silly.

Last of all, we need to make an event listener that will "hear" the "myCustomEvent" being announced and will act upon it.  The great thing about building an application this way is that it won't break if there ceases to be a component listening for your event, or if the event ceases to be announced.  The application simply handles sending and receiving events.  So, our listener will look something like this:

```javascript
var MyContainer;

MyContainer = Ext.Extend(Ext.Container, {
    text: 'Some Text',
    initComponent: function(){
        this.application.addListener('myCustomeEvent', function(myVariable){
            alert(myVariable);
        });
        this.supperclass.initComponent.call(this);
    }
});
```

This adds an event listener that fires when the "myCustomEvent" is fired and alerts us with the variable.  You can also use the "component" variable that we created to modify the myContainer component based on the event variables.  When put together, our code looks something like this:

```javascript
/*global Ext, alert, document */

var application, MyContainer, MyButton, MyApplication;

MyContainer = Ext.Extend(Ext.Container, {
    text: 'Some Text',
    initComponent: function(){
        this.application.addListener('myCustomeEvent', function(myVariable){
            alert(myVariable);
        });
        this.supperclass.initComponent.call(this);
    }
});

MyButton = Ext.Extend(Ext.Button, {
    text: 'Click Me',
    initComponent: function(){
        var application = this.application;
        this.handler = function(e){
            var myVariable = 'This is my variable that I am passing around';
            application.fireEvent('myCustomEvent', myVariable);
        };
        this.supperclass.initComponent.call(this);
    }
});

MyApplication = Ext.Extend(Ext.Panel, {
    height: 500,
    width: 700,
    initComponent: function(){
        this.items = [
            new MyContainer({
                application: this
            }),
            new MyButton({
                application: this
            })
        ];
        this.supperclass.initComponent.call(this);
    }
});

application = new MyApplication();
application.render(document.body);
```