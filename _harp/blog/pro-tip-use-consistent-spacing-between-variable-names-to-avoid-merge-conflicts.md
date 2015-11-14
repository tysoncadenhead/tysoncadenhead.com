To use a single space between variable names or to line them up, that is the question. This is something I've never had a strong opinion on either way, but I have recently formed a strong opinion as a reaction to the error of my ways.

<!-- more -->

So let's take a few variables defined at the top of our module:

```
const react = require('react');
const moment = require('moment');
const $ = require('jquery');
```

Wouldn't it be more pleasing to the eye if the value of the constants were lined up neatly like this?

```
const react =  require('react');
const moment = require('moment');
const $ =      require('jquery');
```

It does look a little nicer and so, not having a solid opinion on it, we went ahead and made all of our `let`s and `const`s use that nice formatting. To make matters easier, [Atom](https://atom.io/) is my current editor of choice and there is a handy package called [atom-alignment](https://github.com/Freyskeyd/atom-alignment) that lets you select all of the lines of variables, lets, or constants you want to line up and hold down `Cmd+Shift+A` to do it automatically. All was well in our world until the day when we started making multiple pull requests that affected the same file.

For example, if we add underscore in one commit:

```
const react =      require('react');
const moment =     require('moment');
const $ =          require('jquery');
const underscore = require('underscore');
```

and Falcor in a different commit:

```
const react =  require('react');
const moment = require('moment');
const $ =      require('jquery');
const Falcor = require('falcor');
```

We will get a merge conflict spanning the entire block of constant declarations:

```
<<<<<<<
const react =      require('react');
const moment =     require('moment');
const $ =          require('jquery');
const underscore = require('underscore');
=======
const react =  require('react');
const moment = require('moment');
const $ =      require('jquery');
const Falcor = require('falcor');
>>>>>>>
```

Git will just look at the lines and it will determine that all of the lines have changed since we updated the spacing. It will be unable to tell which of the two versions are correct and so there will be a merge conflict. I've dealt with this just about enough, which is why going forward, I will always just put one space after any variable declaration. It may not look quite as pretty, but it can help avoid a lot of headaches when you are managing a large code base.

So learn from my mistakes and *never* do this. Do you agree? Disagree? I'd love to hear about it in the comments section below.
