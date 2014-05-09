define([
  'jquery',
  'handlebars'
], function ($, Handlebars) {

  /*if ($('#popular-posts').length) {
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
          data.response[i].image = $('#image-' + data.response[i].link.split('/')[4]).data('original');
          data.response[i].link = '/blog/' + data.response[i].link.split('/')[4];
        }

        template = Handlebars.compile(
          $('#popular-posts-template').html()
        );
        html = template(data);
        $('#popular-posts').html(html);
      }
    });
  }*/

});