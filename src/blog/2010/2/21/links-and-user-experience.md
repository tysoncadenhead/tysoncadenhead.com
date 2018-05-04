If I haven't said this before, I am seriously planning on showing more code in some of my post in the near future.  This one is slightly related to my previous blog entry, [What is UI / UX?](/blog/what-is-user-experience-user-interface/) but I will be more focused because I'm just going to be talking about how links relate to user experience on websites.  First, we'll take a history lesson.

<!-- more -->

When the Internet and web browsers first became available to the public, the link was a convention that was quickly adapted to allow users to navigate multiple pages within a single site, or to even point to pages contained in different websites.  Before links, navigating the internet was practically impossible because you had to know the exact location of the information that you were looking for.  I'm sure you never would have found this blog entry, much less my website, if it weren't for links.  When links were introduced, there had to be a visual cue to show people that they could click on them.  Remember, we're still talking old-school here, websites with white backgrounds and huge blocks of white text, sometimes using frames for navigation.  The way that links looked different from the regular text was that it was blue and underlined and when you scrolled over it, the cursor for your mouse would change to an image of a finger pointing at the the link.  Who couldn't help but click on something so enticing?

Things have changed a little now and users have become increasingly perceptive to what a link will be.  The way that development is done has changed also.  In the beginning, when you clicked on a link, the expectation was that the link would take you to a different page containing the information you would like to see.  Now, a link could be in the form of an AJAX request that simply appends a string of HTML to an existing element, or it could be contained within Flash or Silverlight.  With CSS, the way that links are displayed can be completely customized, so the days of being tied down to underlined blue text is no more.  So what do users expect a link to look like now?

First of all, they expect for it to stand apart from everything else.  Users are increasingly forgiving in case of navigation when they see links grouped together, but when it comes to links within the body copy, they expect to have some sort of visual feedback that tells them that an element is clickable.  Always use the pointing finger cursor on links.  This is especially important to remember if you're using JavaScript to make something clickable that isn't technically a link.  It's as easy as adding this line to your stylesheet:

```css
.myElement { cursor: pointer; }
```

Underlining links is another great way to show people that an element is clickable.  Never ever underline something that isn't a link on a web page.  Make it bold or italic if you need to create emphasis, but underlining should be exclusive to links.  There are certain cases where a link doesn't have to be underlined, but be very cautious about these exceptions because they are rare.  For example, in the navigation or the footer or sometimes within special elements of a page such as an image gallery where navigation is implied.

Links don't necessarily have to be blue anymore, as the Internet users have become increasingly savvy, but it is important to make them a different color than the other text.  This creates visual separation.  Also, be aware of who your main audience is, if they are in a demographic that isn't as familiar with modern web browsing (I'm thinking specifically of the elderly or people in areas that have only recently gotten connected to the Internet), you should maintain the classic link style.  I know it isn't as pretty from a design standpoint, but where usability is concerned, it's important to make content as accessible as possible to your audience.

This is something I actually need to improve on, but especially on larger websites, it's helpful to the user to know what links they have already clicked.  This can be as simple as changing the color slightly for visited links in your stylesheet like this:

```css
a:visited { color: #myNewColor; }
```

The good thing about providing feedback for visited links is that it shows visitors where they have already been so that they can return to that location if they need to revisit it or so that they can continue on to new information that hasn't been marked as visited yet.

Hover states for links are another good way to give added emphasis that an action will result from the element being clicked.  This can be as simple as turning the link more vibrant with CSS.

Last of all, never target a page to open in a new window unless it is on a different website.  For example, if your website is linking to a video on YouTube, open it in a new window.  If it is linking to another page on your site, keep it in the same window.  I should say though, that there are two separate schools of though on this one.  Some people say that you should never target a new window because it interferes with the user's browsing experience.  If they don't realize that a new window or tab has been opened, they may attempt to use the back button on their browser and be unable to return to your page not knowing that it was actually never accessed in their current window.  So, use the target="_blank" attribute or it's JavaScript equivalent at your own risk.

I hope I've covered some of the basics for user experience when it comes to links.  If you have any questions, comments or corrections, don't hesitate to let me know.