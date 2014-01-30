I tend to fall in with Coldfusion programmers from time to time and while I actually really like the language and the community, the one thing that can make working with Coldfusion and JavaScript harder is how the language returns JSON.

<!-- more -->

Typical JSON looks something like this:

```javascript
{
   "firstname": "Tyson",
   "lastname": "Cadenhead",
   "favoritelanguage": "JavaScript"
}
```

But Coldfusion encodes structs to look more like this:

```javascript
{
    "COLUMNS": ["FIRSTNAME", "LASTNAME", "FAVORITELANGUAGE"],
    "DATA": [[
        "Tyson", "Cadenhead", "JavaScript"
    ]]
}
```

The problem with that is that JavaScript can't do much with that.  The solution?  I wrote a quick and dirty script that parses the Coldfusion JSON into the old-fashioned kind.  All you need is this:

```javascript
Object.prototype.parseCFJSON = function() {
   
   var result = [],
       data = this;

   for (var j = 0; j < data.DATA.length; j++) {
      result[j] = {};
      for (var i = 0; i < data.COLUMNS.length; i++) {
         result[j][data.COLUMNS[i].toLowerCase()] = data.DATA[j][i];
      }
   }
   
   return result;
};
```

If you include that bit of code in your script, anytime you get back a Coldfusion struct, you can simply encode it by running this:

```javascript
myData = myData.parseCFJSON();
```

There you go... easy as pie!