(function($) { // reset V17e's noConflict
    'use strict';

    window.IBM = window.IBM || {};
    IBM.watson = IBM.watson || {};

    IBM.watson.Work = function() {
        this.init();
    };

    IBM.watson.Work.prototype = {
        init: function() {
            var my = this;



            my.sceneManager = new IBM.watson.SceneManager(this);

            if (IBM.watson.isMobile) {

                $(".ibm-live-assistance-list").remove();
            }

            my.initSlideshow();
        },

        initSlideshow: function() {
            var quoteSlideShow = $('#quoteSlideShow')[0];
            var ss2 = new IBM.watson.SlideShow({
                view: quoteSlideShow,
                ease: Quad.easeInOut,
                duration: 1,
                looping: true,
                fullscreen: false
            });
        },



        checkScroll: function() {

            var chat_btn = $(".ibm-live-assistance-list");
            var footer = $("#watson-footer");
            var hero = $(".hero")

            $(window).on('scroll', function() {
                var scrollPos = $(window).scrollTop();
                var footerPos = footer.offset().top - footer.height() - 220;
                var heroOffset = hero.height() - $(window).height();
                if(scrollPos > heroOffset && scrollPos < footerPos){
                    if (!$("#floater").is(':visible')) {
                        chat_btn.addClass('product')
                        $("#floater").show();
                    }
                }else{
                    if ($("#floater").is(':visible')) {
                        $("#floater").hide();
                        chat_btn.removeClass('product')
                    }
                }

            });
        }
    };
}(jQuery));