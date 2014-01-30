define([
    'jquery',
    'highlight'
], function ($, highlight) {

    //highlight.initHighlightingOnLoad();
    $(document).ready(function() {
        $('code').each(function(i, e) {
            highlight.highlightBlock(e);
        });
    });

});