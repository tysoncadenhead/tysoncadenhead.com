I've recently been thinking about what it would mean to emulate the MVC best practice of skinny controllers that started in the confines of server-side development within the much more glamorous language and beautiful JavaScript. For those of you who haven't read some of my previous posts, I am a huge advocate of using Model View Controller architecture in client-side code as well as on the server-side. I've written in depth about what MVC looks like on the client-side, so I won't bother to delve into that explanation here.

<!-- more -->

The basic idea of skinny controllers is that the models in the MVC architecture should really do more heavy lifting than they traditionally handel because the models are more reusable than the controllers, which should really be serving their proper role of directing traffic, or in the case of client-side controllers, listening for events and responding to them.

Following the fat model, skinny controller mantra to its logical place in client-side code, the places where the model should do the heavy lifting are:

- Validation in the case of CRUD functionality and post methods.
- Type-conversions and data manipulation.
- Storing data in memory or in HTML5 databases to minimize server hits.

The benefit of all of these being in the model layer rather than the controller layer, or worse yet, in the views, is that multiple events in the controller can easily tap into the same functionality, which cuts down on duplicate code and lowers the risk of making variations in type-conversion or validation.

For example, if a view is hitting a JSON datasource to get information about a user, the JSON might look something like this:

```javascript
{
   'id': 1112,
   'firstname': 'Darth',
   'lastname': 'Vader',
   'birthday': 1256953732
}
```

and our JavaScript model, which uses jQuery to make Ajax calls, might look something like this:

```javascript
myApp.Model.User = {
    
    /**
    * @function
    * @param {Object} params
    * @param {Function} success
    * @param {Function} error
    */
    find: function(params, success, error) {

        // This assumes that you are using a getter / setter to save data to memory
        if (myApp.get('user_' + data.id)) {
            success(myApp.get('user_' + data.id));

        // Get the data via Ajax if it's not in memory
        } else {

            $.ajax({
                url: '/myapp/user/get',
                data: params,
                dataType: 'json',
                type: 'get', 
                success: function(data) {

                    // Here, we do a little data manipulation so that 
                    // we don't have to do this in the controller or the view

                    data.name = data.firstname + ' ' + data.lastname;
                    data.birthday = new Date(data.birthday);

                    // Use some type of getter / setter to save the data to memory
                    myApp.set('user_' + data.id, data);

                    // Fire off the success function after the data manipulation
                    success(data);

                },
                error: error
            });

        }
    }
    
};
```

The model above is much larger than it could be, but all of the type-conversion and storing to local memory are now happening at the data level where it should be rather than being misplaced in the controller or the view.

I have to admit, I've only been thinking this direction for a few days when it comes to the client-side, but it has radically changed my viewpoint on what I think the model should actually be doing in an Ajax application.