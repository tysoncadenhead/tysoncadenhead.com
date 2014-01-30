/*global define */

define([
    'lazyLoad'
], function ($) {

    'use strict';

    var goToPage = function (page) {
        $('.page-group').hide();
        $('#page-group-' + page).show();
        $('.page-number').removeClass('active');
        $('#page-number-' + page).addClass('active');

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