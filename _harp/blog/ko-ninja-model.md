This is a part of a larger series about the [ko.ninja framework](/blog/ko-ninja) that I helped to create to make Knockout development more awesome. With ko.ninja, you can add a model to your viewModel to automatically save your data as soon as it changes and validates. Ko.ninja comes with several model types including localStorage, ajax and socket.io, but we also plan to add the ability to let you define a custom model type if you have other needs that are not covered by our model types.

<!-- more -->

We will walk through how to use ajax and socket.io models in future posts, but we'll focus on localStorage today first since it doesn't require a server to function. Let's use this simple viewModel and template as an example:

<iframe src="http://jsfiddle.net/tysoncadenhead/NUJ9f/3/show/" style="border: 0px; height: 200px; width: 600px;"></iframe>

If you change the values in the form and refresh it, the data should persist. Here is our markup:

```html
<div id="form">

    <p data-bind="css: { error: firstName.error }">
        <label>First name:</label>
        <input data-bind="value: firstName, valueUpdate:'afterkeydown'" />
    </p>
    <div class="error-message" data-bind="html: firstName.error"></div>
  
    <p data-bind="css: { error: lastName.error }">
        <label>Last name:</label>
        <input data-bind="value: lastName, valueUpdate:'afterkeydown'" />
    </p>
    <div class="error-message" data-bind="html: lastName.error"></div>

</div> 
```

and here is the viewModel:


```js
var Person = ko.ViewModel.extend({

        el: '#form',

        observables: {
            id: null,
            firstName: '',
            lastName: '',
            fullName: function () {
                return this.firstName() + ' ' + this.lastName()
            }
        },
   
        model: {
            name: 'person',
            storage: 'localStorage'
        },

        validation: {
            firstName: {
                required: 'Your first name is required'
            },
            lastName: {
                required: 'Your last name is required'
            }
        }

    });

var person = new Person({
    id: 1
});
```

The model depends on there being an `id` defined in the viewModel. If it finds data with the matching id, it will update the observables to match the data it has retrieved. If no id is provided, when the viewModel is saved, it will create a new record with a randomly generated id. You can change the idAttribute to be something other than "id" by defining an `idAttribute` on the model like this:

```js
{
    observables: {
        '_id': '123'
    },
    model: {
        name: 'dogs',
        idAttribute: '_id'
    }
}
```

If no idAttribute is defined, ko.ninja will assume that it is called `id`.

There may be instances where you don't want the ViewModel to automatically sync with the model. To turn off the autoSync functionality, just add this to your ViewModel:

```js
ko.ViewModel.extend({
    autoSync: false,
    ...
});
```

If autoSync is turned off, you will need to tap into the model methods to save and retrieve data. The methods are `insert(data)`, `update(id, data)`, `save(data)`, `remove(id)`, `findOne(id)`, and `find(query)`. These methods are all available on any model type and can be used like this inside the viewModel:

```js
ko.ViewModel.extend({

    autoSync: false,

    observables: {
        id: 1,
        firstName: 'Tyson',
        lastName: 'Cadenhead'
    },

    model: {
        name: 'person'
    },

    insertPerson: function () {
        this.model.insert({
            firstName: 'Jonathan',
            lastName: 'Creamer'
        }, function () {
            console.log('inserted');
        });
    },

    updatePerson: function () {
        this.model.update(1, {
            lastName: 'The Yellow Dart'
        }, function () {
            console.log('updated!');
        });
    },

    removePerson: function () {
        this.model.remove(1, function () {
            console.log('removed!');
        });
    },

    initialize: function () {

        this.model.find({
            firstName: 'Tyson'    
        }, function (data) {
            console.log(data); // []
        });

        this.model.findOne(1, function (data) {
            console.log(data); // {}
        });
    }

});
```

As you can see, depending on your needs, you can sync with localStorage with pretty minimal configuration.

In my next post, we'll be looking at how to use the model to sync data with the server using Ajax requests.

Ready to get started? [Add ko.ninja to your project](https://github.com/jcreamer898/ko.ninja) and make awesome applications today!