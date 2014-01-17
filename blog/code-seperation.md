A couple of years ago, if you had asked me what my take on design patterns for internet applications was, I would have probably given you a blank, questioning stare.  You see, as sad as it is, proper design and architectural patterns aren't exactly the norm in the web development world.  Today, I'm going to give you a quick overview on what architectural design patterns are and why they're important and then focus in on MVC.

<!-- more -->

### I like to have all of my code in one file.  Isn't that the best way?

When I first started making websites, I was 13 years old.  This was just when the internet was becoming something more than a place for email and messaging groups.  I set up my first website, which was a Star Wars fan page on Geocities and I was very satisfied with it.  The problem was that within about a week, I  wanted to change my neon-green typefaces to red.  The problem was that I had hard-coded each of my headers to be shown in that brilliant neon-green.  I couldn't just flip a switch or re-write a single line of code and change my beautiful comic-sans typography, I had to go through every single page and change every single hexadecimal value.  This took hours.  It took so long, in fact, that by the time that I was done, I had changed my mind and decided that I would prefer a blue typeface instead.  This was before I knew anything about external style sheets, and in all actuality, I'm not entirely certain that my early version of Internet Explorer would have even supported them.

Fast forward ten years.  By this point I've learned the importance of having separation in my client-side code.  I have all of my Javascript, CSS, flash, images and media sitting in their own tidy folders and I've even gotten a master page and includes.  Let's even say for the sake of argument that I've been able to stay away from writing inline queries to my database and I even have a code-behind file doing the actual work for each of my pages.  I'm doing pretty good, right?  Wrong.  The code still isn't all that separated.  My code-behind file is a jumble of actions that the page is supposed to perform, queries to the database, whether inline or through a function, and display logic.  When you have an entire development team working to decipher and update code under these circumstances, you end up with confusion that hasn't been rivaled since the tower of Babel.  There has to be a better and cleaner way to create code, right?  I'm glad you asked.  Enter architectural patterns.

### What are architectural patterns?  Why do I care?

There are a large number of architectural patterns out there for development.  Some of the big important ones are:

- Model View Controller
- Model View ViewModel
- Model View Presenter
- Presentation Abstraction Control

The basic idea behind all of these is to separate the coding logic into bite size pieces that can be easily found and manipulated and that link to the other related pieces correctly.  If you're a developer, these patterns will help you easily manipulate your own code and it will help anyone who comes after you as well.  If you are hiring a developer, it will save you money because instead of wrestling to get a project working, your developers will be dancing with the project.

### What is MVC?

MVC is an acronym for *Model-View-Controller*.  In this design pattern, every page is associated with a model, a view and a controller, which can all be found in appropriately labeled folders.

#### Controller

When someone goes to a page, the controller is accessed.  It essentially acts as a traffic director, telling the browser what to do.  The controller will look to the model and to the view.

#### Model
The model handles all of domain-specific data.  If your application uses a database, the model interacts with the database and builds objects that can be accessed in the view and in the controller.  It passes the objects back to them.

#### View
The view is the display.  The view accesses any objects that are built in the model or in the controller.  Think of this as the display.

This is just the very basic beginning point to understanding code separation and MVC.  For further reading on this and many other exciting subjects, subscribe to our RSS feeds and stay tuned.