requirejs.config({
    baseUrl: '/js/app',
    paths: {
        bootstrap: '../vendor/bootstrap.min',
        jquery: '../vendor/jquery',
        lazyLoad: '../vendor/jquery.lazyload',
        addthis: 'http://s7.addthis.com/js/300/addthis_widget.js#pubid=tysoncadenhead',
        highlight: '../vendor/highlight'
    },
    shim: {
        'highlight': {
            exports: 'hljs'
        },
        'jquery': {
            exports: '$'
        },
        'lazyLoad': {
            exports: '$',
            deps: ['jquery']
        },
        'bootstrap': {
            exports: '$',
            deps: ['jquery']
        },
        'viewModels/share': {
            deps: ['addthis']
        },
        'viewModels/trending': {
            deps: ['addthis']
        }
    }
});
requirejs([
    'bootstrap',
    'viewModels/share',
    'viewModels/trending',
    'viewModels/code',
    //'viewModels/footer',
    'viewModels/relatedPosts',
    'viewModels/posts'
], function ($) {

    $(function () {
        $('.disabled a').click(function (e) {
            e.preventDefault();
        });
    });
    
});