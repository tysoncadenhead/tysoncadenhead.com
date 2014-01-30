I previously introduced the [Meteor framework](/blog/getting-started-with-meteor) and showed how to create a simple application. Today we are going to look a little deeper and explore how data works in Meteor. If that isn't enough to get you excited, let me give you a teaser - Meteor literally lets you save data on the client-side without having to deal with the internals of server-side code. Have I got your attention yet?

<!-- more -->

Out of the box, Meteor uses MongoDB to store data, but it doesn't stop there. There is a localstorage database that the client-side works with that automatically syncs with the server if it can, which means your applications will work perfectly fine offline.

So what does it look like to interact with storage in Meteor? Let's jump right in, shall we?

##Setting up a collection

Meteor organizes its data into collections. So if you want to save a list of all of your friends, you would create a new collection that looks something like this:

```javascript
friends = new Meteor.Collection('friends');
```

Now, before you start yelling at me for not scoping the variable, Meteor will automatically detect global variables during the compiling process and scope them for us.

We should put the above collection code somewhere where the client and the server can both access it, which means avoiding the `client` and `server` directories. I would put it in a file called `/collections/friends.js`.

##Inserting data

Now that we have our friends collection set up, we can add data to it. To give it a shot, just open your browser console and insert the data.

```javascript
friends.insert({
   firstName: 'Bugs',
   lastName: 'Bunny'
});
```

Note that the `friends` variable that we are tapping into is the collection that we previously created. We should get back the id of the friend that was inserted. The id is randomly generated for us. The result should look something like this:

![Inserting Meteor data](/images/blog/meteor-2-1.png)

##Finding a single record

Getting a record is simple. You just use the findOne method on your collection. The first argument is your record id. As you may recall, we got the id back when we inserted our first friend, so we can use that.

```javascript
friends.findOne('wyzkT6BPmFbnjyfDr');
```

The results should look something like this:

![Meteor findOne](/images/blog/meteor-2-2.png)

##Finding multiple records

Let's go ahead and add a couple more records to our collection:

```javascript
friends.insert({ firstName: 'Elmer', lastName: 'Fudd' });
friends.insert({ firstName: 'Daffy', lastName: 'Duck' });
```

Now, we can use find to get all of the records that match our criteria. The find method returns a cursor which we can use to either `fetch` the data or do a `forEach` to iterate over the data once it is returned. Let's find and fetch every record where the first name is Elmer:

```javascript
friends.find({ firstName: 'Elmer' }).fetch();
```

That should return an array with the one record that matches or criteria:

![Meteor find and fetch](/images/blog/meteor-2-3.png)

If we updated Daffy Duck to be named Elmer Duck and fetched our data again, we would get back both records:

```javascript
friends.update('Ze9vGfh3R3iTPjef7', { firstName: 'Elmer', lastName: 'Duck' });
friends.find({ firstName: 'Elmer' }).fetch();
```

The query above would result in:

![find and fetch with meteor](/images/blog/meteor-2-4.png)

Also, if you don't pass any arguments into the find method, you will get back all of your friends.

##Permissions

If you've been developing applications for a while, you may feel a little cautious about letting the client save data. Not to worry, the real work is actually happening on the server, Meteor handles everything for you automagically so you don't actually have to write most of the server-side pieces.

Since the server is doing the work, you can allow or deny any database transactions you want on the server, which bubbles up to the client.

Let's return to the `collections/friends.js` file that we made earlier. We can add an allow method to the friends collection and specify that we will only allow a record to be inserted if the first name of the friend is "Elmer".

```javascript
friends.allow({
    insert: function (userId, record) {
       if (record.firstName === 'Elmer') {
           return true;
       }
    }
});
```

Now, when we try to insert Tweety Bird, we won't be allowed to because his first name is definitely not Elmer.

![Meteor allow](/images/blog/meteor-2-5.png)

If you want to listen for failures to insert data into the database, the second argument of insert will be a callback function with an object detailing the error if there is one.

```javascript
friends.insert({
    firstName: 'Tweety',
    lastName: 'Bird'
}, function (err) {
    console.log(err);
});
```

The object that you pass into `allow` can also contain filters for "update" and "remove" in addition to insert.

Meteor also adds a `deny` method to the collection that works exactly the opposite of allow. If the method in deny returns true, the client is not allowed to write data to the server.

So, that covers the basics of dealing with Meteor data. As you can see, Meteor makes working with data fun again. Cool, huh?