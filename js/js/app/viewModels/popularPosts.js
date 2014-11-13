define([
  'jquery',
  'handlebars'
], function ($, Handlebars) {

  if ($('#popular-posts').length) {

    $('#popular-posts').append('<div class="popular-post"><a href="/blog/unit-testing-sails-js-applications-with-mocha"><img class="span12" src="/images/blog/unit-testing-sails-js-applications-with-mocha.jpg" /><h4>Unit Testing Sails.js Applications With Mocha</h4></a></div>');
        $('#popular-posts').append('<div class="popular-post"><a href="/blog/cross-domain-post-delete-and-pu"><img class="span12" src="/images/blog/communication.png" /><h4>Cross-Domain Ajax Using POST, DELETE and PUT Methods</h4></a></div>');

    $.ajax({
      dataType: 'jsonp',
      url: 'https://disqus.com/api/3.0/threads/listPopular.json',
      data: {
        'api_key': '0bhBK0RFHjsfavdwPrFlGJn720Pio1Omom39PQbd4Kr2yuKHG9mjDawiPu6nRWQ5',
        'forum': 'tysoncadenhead'
      },
      success: function (data) {

        var template, html;

        for (var i = 0; i < data.response.length; i++) {
          var item = data.response[i].link.split('/');
          item = item[item.length - 1];
          if (typeof posts !== 'undefined' && posts[item]) {
            data.response[i].image = posts[item].thumbnail;
          } else {
            data.response[i].image = $('#image-' + data.response[i].link.split('/')[4]).data('original');
            data.response[i].link = '/blog/' + data.response[i].link.split('/')[4];
          }
          $('#popular-posts').html('').append('<div class="popular-post"><a href="' + data.response[i].link + '"><img class="span12" src="' + data.response[i].image + '" /><h4>' + data.response[i].title + '</h4></a></div>');
        }
      }
    });
  }

});