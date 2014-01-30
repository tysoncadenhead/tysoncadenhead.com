JQuery comes loaded with various utility methods that make manipulating elements and data easier. One really useful method is jQuery.map().

<!-- more -->

Map is used to manipulate array values. Behind the scenes, jQuery.map loops over any array that you feed it and gives you a callback function to modify it. In the old days before the dawn of jQuery, if you wanted to modify an array, you had to write something like this:

```javascript
var arr = ["Indiana", "James Earl", "Casey"], i;

for (i = 0; i < arr.length; i++) {
   arr[i] = arr[i] + " Jones";
}

// ["Indian Jones", "James Earl Jones", "Casey Jones"];
console.log(arr);
```

JQuery.map() provides us with a much cleaner api for modifying and manipulating array data. The syntax for $.map looks like this:

```javascript
var arr = ["Indiana", "James Earl", "Casey"];

arr = $.map(arr, function (value) {
   return value + " Jones";
});

// ["Indian Jones", "James Earl Jones", "Casey Jones"];
console.log(arr);
```

As you can see, map is a function that takes two parameters. The first parameter is the array you are mapping. The second parameter is the callback function to map the array to. Whatever you return in the function will be the new value for the current array index.

$.map is a much cleaner approach than iterating over the array index.

The jQuery map method can be applied to an array of objects as well. For example:

```javascript
var arr = [{
   firstName: "John",
   lastName: "Lennon"
}, {
   firstName: "Paul",
   lastName: "McCartney"
}, {
   firstName: "George",
   lastName: "Harrison"
}, {
   firstName: "Ringo",
   lastName: "Starr"
}];

arr = $.map(arr, function (obj) {
   return $.extend(obj, {
      fullName: obj.firstName + " " + obj.lastName
   });
});

/* [{ 
   firstName: "John", 
   lastName: "Lennon", 
   fullName: "John Lennon" 
}, { 
   firstName: "Paul", 
   lastName: "McCartney", 
   fullName: "Paul McCartney" 
}, { 
   firstName: "George", 
   lastName: "Harrison", 
   fullName: "George Harrison" 
}, { 
   firstName: "Ringo", 
   lastName: "Starr", 
   fullName: "Ringo Starr" 
}] */
console.log(arr);
```

Since $.map can be applied to anything that looks like an array, it can actually even be applied to jQuery dom elements. In the example below, I will grab all of the paragraph tags on the page and wrap them in a wrapper div. Notice that I wrap the entire $.map results in the jQuery function. The reason I do this is because $.map returns a real array of elements and not the jQuery object which only resembles an array.

```javascript
var $ps = $("p");

var $ps = $(
   $.map($ps, function (p) {
      $(p).wrap("<div class='p-wrapper' />");
      return p;
   })
);

$ps.each(function () {
   // $("<div class='p-wrapper' />")
   console.log($(this).parent());
});
```

Obviously, using $.map on an array of dom elements is not the best way to loop over them, but it is interesting  to see that it actually does work.

JQuery's map method is useful in many circumstances. It helps to simplify code. Anything that makes code more simple and readible is always worth doing.