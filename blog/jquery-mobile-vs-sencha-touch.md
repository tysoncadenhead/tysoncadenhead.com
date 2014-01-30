Last night, I finished re-doing the mobile version of this site using [jQuery Mobile](http://jquerymobile.com/).  The only other mobile JavaScript library I have worked with so far is [Sencha Touch](http://www.sencha.com/products/touch/) and I must say, they are vastly different.  My prognosis?  If I am going to make a mobile version of a website, I am going to use jQuery Mobile.  If I am going to make a "native" mobile application, I will be more likely use Sencha Touch.

<!-- more -->

So how do they stack up?

If you've worked with EXTJS, working with Sencha Touch is not going to be a hard transition at all.  But the truth is that most people have not worked with EXTJS.  If you haven't, the learning curve may be a little staggering at first.  With Sencha Touch, you rarely use any pre-rendered HTML.  Everything is added to the DOM through JavaScript.  This might be a big paradigm shift for some people, but once you get acclimated to it, it really isn't a huge deal.  The Sencha Touch library is different than jQuery in that instead of working directly with the DOM, one element at a time, you are typically working with components that are comprised of  many DOM elements.  In fact, you often won't even need to think about what Divs, Tables or Span tags go together to make a component.

jQuery Mobile, however, is completely different.  With jQuery Mobile, you work with actual pages (not just HTML that is  rendered to the DOM).  The script automatically grabs the pages for you with Ajax.  After it loads the page, it can do any fancy transitions that we have come to associate with native mobile applications.  The  JavaScript that you will write with jQuery mobile is actually pretty minimal.  There is a lot of JavaScript "magic" happening behind the scenes that you'll never even have to think about.

In my opinion, Sencha Touch is absolutely more versatile.  If you feel a need to have complete control, Sencha Touch is probably for you.   If there is ever anything that you can't do with Sencha Touch, you can pretty easily write a plugin for it.   That is why I would usually pick it over jQuery Mobile for writing a native application in [Phonegap](http://phonegap.com).

jQuery Mobile is definitely easier to apply to an existing mobile site.  It provides great progressive enhancement though it's smooth transitions and smart navigation.  However, I would feel very limited with it if I was trying to write a sophisticated application.

What are your thoughts?  Have you used jQuery Mobile or Sencha Touch?  Which do you prefer and why?