/*global define */

define([
    'lazyLoad'
], function ($) {

    'use strict';

    var getSearchParams = function () {
        var params = {},
            query = window.location.search.replace('?', '').split('&');

        for (var i = 0; i < query.length; i++) {
            params[query[i].split('=')[0]] = query[i].split('=')[1];
        }

        return params;
    };

    var goToPage = function (page) {
        $('.page-group').hide();
        $('#page-group-' + page).show();
        $('.page-number').removeClass('active');
        $('li#page-number-' + page).addClass('active');

        // Back Button
        if (page) {
            $('#page-back').removeClass('disabled');
        } else {
            $('#page-back').addClass('disabled');
        }

        // Forward Button
        if ((page + 1) === $('.page-group').length) {
            $('#page-forward').addClass('disabled');
        } else {
            $('#page-forward').removeClass('disabled');
        }

        window.location.hash = '';

    };

    var paginate = function () {

        var $blogPosts = $('#blog-posts'),
            $pager = $('.pagination ul'),
            $currentPage, $pagerPage, currentPageNumber = 0;

        $blogPosts.find('article').each(function ($post, i) {
            if (!$currentPage || $currentPage.find('article').length >= 10) {
                $currentPage = $('<div />')
                    .attr({
                        'class': 'page-group',
                        'id': 'page-group-' + currentPageNumber 
                    });
                $pagerPage = $('<li />')
                    .attr({
                        'id': 'page-number-' + currentPageNumber,
                        'class': ((!currentPageNumber) ? 'active ' : '') + 'page-number'
                    })
                    .html('<a href="#top" data-page="' + currentPageNumber + '">' + (currentPageNumber + 1) + '</a>')

                $blogPosts.append($currentPage);
                $pager.append($pagerPage);
                currentPageNumber++;
            }
            $currentPage.append($(this));
        });

        if (currentPageNumber > 1) {
            $pager.append('<li id="page-forward"><a href="#top">&#187;</a></li>');
        } else {
            $('.pagination').remove();
        }

    };

    var filterCategory = function (category) {
        $('#blog-posts article').each(function () {
            if ($(this).find('.label-info a').text() !== category) {
                $(this).remove();
            }
        });
    };

    var filterTags = function (tag) {
        $('#blog-posts article').each(function () {
            if (!~$(this).attr('data-tags').indexOf(tag)) {
                $(this).remove();
            }
        });
    };

    var searchParams = getSearchParams();

    if (searchParams.category) {
        filterCategory(searchParams.category);
    }

    if (searchParams.tag) {
        filterTags(searchParams.tag);
    }

    paginate();

    $('img.lazy').lazyload({
        effect : 'fadeIn'
    });

    $('.page-number a').bind('click', function (e) {
        goToPage($(e.target).data('page'));
    });

    $('#page-back a').bind('click', function () {
        var page = $('.page-number.active a').data('page');
        if (page) {
            goToPage(page - 1);
        }
    });

    $('#page-forward a').bind('click', function () {
        var page = $('.page-number.active a').data('page');
        if ((page + 1) < $('.page-group').length) {
            goToPage(page + 1);
        }
    });

});