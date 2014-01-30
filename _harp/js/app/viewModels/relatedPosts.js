define([
    'jquery'
], function ($) {

    if (tysonJS.slug) {
        $.ajax({
            url: '/api/related?title=' + tysonJS.slug,
            success: function (data) {
                $('#related-posts').html('');
                for (var i = 0; i < data.posts.length; i++) {
                    $('#related-posts').append('<div class="well left thumbnail">' + 
                        '<a href="' + data.posts[i].url + '">' +
                            '<img src="' + data.posts[i].thumbnail + '" />' +
                            '<h6>' + data.posts[i].title + '</h6>' +
                        '</a>' +
                    '</div>'
                    );
                };
            }
        });
    }

    $(document).ready(function() {
        //$('#related-posts')
    });

});