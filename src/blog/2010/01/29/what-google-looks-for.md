SEO has been a hot topic especially in the last few years as the number of websites on the Internet has increased and being easily found on most search engines has been increasingly difficult. Everyone who has a website is looking for ways to make their site more accessible to Google and other modern search tools, so what are the basics? How can you take your website and bump it up in search engine rankings? Here are some clues.

<!-- more -->

### URL

This is the first thing that Google looks at.  If your URL is the same thing as what you are searching for, chances are, it will be the first result in Google.  If you don't believe me, try Googling "[Tyson Lloyd Cadenhead](http://www.google.com/search?hl=en&amp;q=tyson+lloyd+cadenhead&amp;aq=f&amp;aql=&amp;aqi=&amp;oq=)."

### Keywords

The keywords found in your meta tags have become an increasingly smaller factor when it comes to optimizing your site, but they still weigh in.  If you're writing your website content with a dynamic language such as PHP, Coldfusion or C#, it's fairly easy to dynamically populate the meta tags for each page based on the content in the page.  For an example of how to implement meta tags into your site, check out this article on [How to use Meta Tags](http://searchenginewatch.com/2167931).  Something to remember is that only the first 200 characters of the `<description />` tag and typically less than 10 words in the `<keyword />` tag will be indexed by Google

Another thing to consider is the actual words in your content as well as what HTML tags they are encapsulated in.  For example, an `<h1 />` tag will be given higher priority than a standard `<p />` tag.  Always put your page titles inside a `<title>` tag in your `<head>` section as well as inside an `<h1>` tag near the top of the page. Page titles are given high priority when Google is indexing your site.

On a similar note, navigation and listed items should always be contained in `<li>` tags like this:

```html4strict
<ul>
   <li>item 1</li>
   <li>item 2</li>
<ul>
```

When Google can tell that something is a list, it reads it like a list instead of giving a messy summary / description on the search page which will confuse and drive away potential visitors.

### Images

Images should always contain an alt tag with a description of the image.  Never use images to render text (except for the case of an advertisement or logo.)  Search engines like real text.  If you need to use fonts that aren't supported on most operating systems as "web fonts," try a font rendering script like [typeface.js](http://typeface.neocracy.org/), [sIFR3](http://novemberborn.net/sifr3), or my favorite, [cufon](http://cufon.shoqolate.com/generate/).  These lightweight scripts allow the text to be rendered traditionally and then create dynamic images and add them through the DOM, which insures that search engines only see the web text.  Another positive point about these scripts is that they allow you to use dynamic text as opposed to creating individual PNG files that may need to be painstakingly changed later on.

### Announce your presence

Google actually wants your page to be indexed.  Why wouldn't they?  Having the best search results is what has made them internationally known as the preferred search engine.  Because of this, Google offers [Google Webmaster Central](http://www.google.com/webmasters/) which makes it easy to let them know that you're out there.  If you have a site that is opened to the public, they will inevitably find you no matter what, but Google Webmaster Central allows you to get indexed faster and to have more control over how Google sees you and what they do with your site.

One thing you'll definitely want to provide is an XML sitemap on your website.  This tells search engines various things about your site such as where to find your subpages, when the content was released (breaking news gets a better ranking than old news from within your site) and the frequency that your site is updated.  If your page is static, there are tons of resources such as [xml-sitemaps.com](http://www.xml-sitemaps.com/) which dynamically generate sitemaps for you.  If your site is dynamic, look up a tutorial on how to make a sitemap that is generated dynamically in the language you use.

You'll also need a robots.txt file in your website root directory.  This file tells Search Engine Spiders which sites to index and which ones to ignore.  For example, if you have an embarrassing baby picture in your website directory, you can explicitly tell search engines to ignore it here.  This isn't good security because it's still opened to the public and not all search engine crawlers use robots.txt, but it's a start.  You can also reference your sitemap in the

```text
UserAgent: *
Disallow: /
SITEMAP: http://www.yoursite.com/sitemap_name.extension
```

For more information about the robots.txt file, check out [robotstxt.org](http://www.robotstxt.org/robotstxt.html).

### Allow Interaction

Your viewers and users are an invaluable resource.  They have skills, opinions and questions that could benefit your website.  Let them comment, add opinions and ask questions on your site wherever you can.  It's a little more risky than generating all of the content yourself because the control is not completely in your hands, but the benefits are great.  If your visitors are commenting on your blog, for example, Google will look for keywords within their comments.  Tap into APIs from social media and social networking sites such as Facebook, YouTube, Twitter and Flicker.  If Google sees the same content on multiple sites, it will assume that your content is relevant.

Obviously this is just the tip of the iceberg when it comes to SEO.  I will try to write more on this topic in the near future because I feel like I've barely skimmed the surface. Remember that your best tool is your content.  Make it relevant and people will be looking for it.