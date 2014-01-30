define([
    'jquery'
], function ($) {

    function hideMenu(){
        $('.footer').stop().animate({
            bottom: -120
        }, 'fast');
    }

    function showMenu(){
        $('.footer').stop().animate({
            bottom: 0
        });
    }

    var timeout = false,
        afterScrollingWait = 500;

    $(document).scroll(function(){
        hideMenu();
        if (timeout) {
            clearTimeout(timeout);
        }
        setTimeout(showMenu, afterScrollingWait); 
    });

});