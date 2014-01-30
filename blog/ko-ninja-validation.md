This is a part of a larger series about the [ko.ninja framework](/blog/ko-ninja) that I helped to create to make Knockout development more awesome. In my last post, I introduced ko.ninja, a framework that I helped create for making awesome Knockout apps. Today, we're going to continue looking at ko.ninja, but we are going to focus on doing validation on the ko.ViewModel.

<!-- more -->

As an example of what ko.ninja can do, check out the validation on this form:

<iframe src="http://jsfiddle.net/tysoncadenhead/QUPg8/show/" style="border: 0px; width: 600px; height: 300px;"></iframe>

Not bad, huh? What if I told you that all of the validation logic is happening painlessly in the ViewModel and all of the display logic is happening inside the template? Is it magic? Maybe. Let's look at the template for our form:

```html
<div id="form”>

     <div style="display: none" class="form-errors" data-bind="visible: errors().length”>
          <p>There are errors. Please fix them!</p>
     </div>

     <!-- Required -->
     <p data-bind="css: { error: firstName.error }">
          <label>First name:</label>
          <input data-bind="value: firstName, valueUpdate:'afterkeydown'" />
     </p>
     <div class="error-message" data-bind="html: firstName.error"></div>

     <!-- No Validation -->
     <p data-bind="css: { error: lastName.error }”>
          <label>Last name:</label>
          <input data-bind="value: lastName, valueUpdate:'afterkeydown'" />
     </p>
     <div class="error-message" data-bind="html: lastName.error"></div>
   
     <!-- Email -->
     <p data-bind="css: { error: email.error }”>
          <label>Email:</label>
          <input data-bind="value: email, valueUpdate:'afterkeydown'" />
     </p>
     <div class="error-message" data-bind="html: email.error"></div>

     <!-- Phone -->
     <p data-bind="css: { error: phone.error }">
          <label>Phone:</label>
          <input data-bind="value: phone, valueUpdate:'afterkeydown'" />
     </p>
     <div class="error-message" data-bind="html: phone.error"></div>
     
     <!-- Custom Validation -->
     <p data-bind="css: { error: answer.error }”>
          <label>Type "44"</label>
          <input data-bind="value: answer, valueUpdate:'afterkeydown'" />
     </p>
     <div class="error-message" data-bind="html: answer.error"></div>

     <input type="button" data-bind="click: submitPerson" value="Save" />

</div>
```

The template is just adding an "error" class to any paragraphs that contain errors, displaying the error message below the field if there is one and spitting out a summary of all of the form errors at the top.

There are a variety of types of validation that need to occur for a form like the one above, but there is no reason for the markup to be aware of what types of validation are happening. It just needs to display some nice error messages telling you to fix the form. The philosophy of ko.ninja is to keep all of the validation in the viewModel and out of the template.

To accomplish the validation in our form, our viewModel should look like this:

```js
var PersonViewModel = ko.ViewModel.extend({

    observables: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        answer: ''
    },

    validation: {
        firstName: {
            required: 'Your first name is required',
            minLength: {
                message: 'Please make sure your name is at least 3 characters long.',
                value: 3
            }
        },
        email: {
            required: 'Your email address is required',
            email: 'Please enter a valid email address'
        },
        phone: {
            number: 'Please enter a valid number',
            length: {
                message: 'Please make sure your phone number has 9 digits',
                value: 9
            }
        },
        answer: {
            maxLength: {
                message: 'You have entered more than 2 characters... there is no way you are typing "44"!',
                value: 2
            },
            custom: {
                message: 'Please enter "44"',
                validator: function (value) {
                    return value !== '44';
                }
            }
        }
    },

    submitPerson: function () {
        var errors = this.validate();
        if (!errors) {
            alert('Your form has been submitted. Just kidding!')
        }
    }

});

new PersonViewModel(); 
```

To do validation in ko.ninja, you just need to add the name of each observable you want to validate to the `validation` object. Any time the observables change or this.validate() is called, ko.ninja will check for errors. If there are errors, they are added to an “errors” observable array on the viewModel and they are added to the “[observableName].error” magic observable.

Ko.ninja comes with "required", "email", "length", "maxLength", "minLength" and "number" validations, but you can also add your own custom validation like this:

```js
custom: {
     message: 'Please enter "44"',
     validator: function (value) {
          return value !== '44';
     }
} 
````

If the validator returns a truthy value, the error will be added to the viewModel.

To really take advantage of ko.ninja validation, you can automatically sync your viewModel with a model. We will be looking at the ko.ninja model in the post next week.

Ready to get started? [Add ko.ninja to your project](https://github.com/jcreamer898/ko.ninja) and make awesome applications today!