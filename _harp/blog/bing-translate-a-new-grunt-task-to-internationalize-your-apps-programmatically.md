Internationalizing an application can be a tedious process if you are translating your app into different languages manually. Every time you add a new value to be translated, you have to add that value for all of your  translation files. It can become a real pain.

<!-- more -->

To ease the pain, I've written a Grunt task that translates all of your language files from a common Grunt config location using the Bing Translator api.

Why did I use Bing Translator instead of Google Translator? Unfortunately, the Google Translator API is no longer free. Don't worry, nobody will make you take a test that reveals that you prefer Bing to Google. After you create your Bing account, you'll barely even notice you're using it.

So how can you get started?

First you'll need to download the Grunt Bing Translate task from NPM:

```bash
npm install grunt-bing-translate
```

Once that is done, you just need to modify your Gruntfile. Inside of your grunt.initConfig(), you'll want to add something like this:

```javascript
grunt.initConfig({
  bing_translate: {
    options: {
      // Task-specific options go here.
    }
  }
});
```

For a full list of options, check out the [documentation on Github](https://github.com/tysoncadenhead/grunt-bing-translate/)

Here is an example of how you might configure your bing_translate options:

```javascript
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    "bing_translate": {
      "options": {
        "clientId": require("./config.json").clientId, // Replace this with your Bing Translate Client ID
        "clientSecret": require("./config.json").clientSecret, // Replace this with your Bing Translate Client Secret
        "defaultLanguage": "en",
        "languages": ["ar", "bg", "cs", "da", "nl", "en", "et", "fi", "fr", "de", "el", "hu", "it", "lv", "lt", "pl", "pt", "ro", "ru", "sk", "sl", "es", "sv"],
        "files": {
            "test/lang": {
                "template": "console.log('<%- language %>', <%- values %>);",
                "fileNameEnding": "/translation.js",
                "values": {
                    "hello": "Hello",
                    "world": "World"
                }
            }
        }
      }
    }

  });

};
```

Once all of your options are specified, you can run:

```bash
grunt bing_translate
```

to translate all of your files. It's like magic.

One important thing to note is that the Bing translate API does have a monthly limit per account. I haven't hit it yet and my understanding is that it is pretty large, but it's still there. This task will only translate each word once even if it appears in multiple language files, so that will hopefully reduce the amount of calls you have to make each month.

So, far I've used this to generate language files for [CKEditor](http://ckeditor.com/) plugins and to generate language files for use with [i18next](http://i18next.com/). The ability to put a template around the contents of the file should make this easily work with any project.

What do you think?