(function($) { // reset V17e's noConflict
    'use strict';

    window.IBM = window.IBM || {};
    IBM.watson = IBM.watson || {};

    IBM.watson.Tech = function() {
        this.init();
    };

    IBM.watson.Tech.prototype = {
        init: function() {

            var my = this;
            my.$row = $('#tech-bio');
            my.$photo = my.$row.find('img');
            my.$textCol = my.$row.find('.column.text');
            my.$photoCol = my.$row.find('.column.context');
            my.sceneManager = new IBM.watson.SceneManager(this);
            my.bindResize();
            my.handleDualRow();
            my.browserString = window.navigator.userAgent.toLowerCase();

            /* Toggle animated header from fixed to relative during open/close to address IBMWM-326 */
            $('body').on('OpenSideNav', function() {
                $('.sprite-row').css('position', 'relative');
            });
            $('body').on('CloseSideNav', function() {
                $('.sprite-row').css('position', 'fixed');
            });

            if (IBM.watson.isMobile) {
                $('#tech-hero').addClass('no-fixed');
                $(".ibm-live-assistance-list").remove();
            }
        },

        bindResize: function() {
            var my = this;
            my.$win = $(window);

            my.$win.on('resize', function() {
                if (Modernizr.mq('(min-width: 580px)')) {
                    my.handleDualRow();
                }
            });
        },

        /**
         * scale bio photo and text to maintain equal col height, set img size and position
         */
        handleDualRow: function() {
            var my = this,
                photoHeight, textHeight, offset;

            //reset everything to natural
            my.$photo.css({
                width: '100%',
                height: 'auto',
                marginLeft: 0
            });
            my.$textCol.css({
                height: 'auto'
            });

            //see which column is naturally taller
            photoHeight = my.$photo.outerHeight();
            textHeight = my.$textCol.outerHeight();

            if (photoHeight > textHeight) {
                my.$textCol.css({
                    height: photoHeight
                });
            } else {

                my.$photo.css({
                    width: 'auto',
                    height: textHeight
                });

                //center photo if it's not fully revealed
                //must do after height is set
                offset = my.$photo.width() > my.$photoCol.outerWidth() ?
                    (my.$photo.width() - my.$photoCol.outerWidth()) / -2 : '0';

                my.$photo.css({
                    marginLeft: offset
                });
            }
        },

        scene1: function(scene) {
            var header = scene.elm.find('h1'),
                sprite = scene.elm.find('#watsonLogoSpriteAnimation'),
                callout1 = scene.elm.find('#hypothesisGenerationCallout'),
                callout2 = scene.elm.find('#naturalLanguageCallout'),
                callout3 = scene.elm.find('#dynamicLearningCallout'),
                callout4 = scene.elm.find('#watsonIsCallout');

            scene.timeline
                .from(sprite, 25, {
                    opacity: 0
                }, 'start')
                .from(callout1, 40, {
                    left: '-50%',
                    opacity: 0
                }, 'start+=15')
                .from(callout2, 40, {
                    right: '-50%',
                    opacity: 0
                }, 'start')
                .from(callout3, 40, {
                    right: '-50%',
                    opacity: 0
                }, 'start+=30')
                .from(callout4, 25, {
                    top: 1000,
                    opacity: 0
                }, 'start+=40');

            var spriteManager = new IBM.watson.tweens.Sprite(scene);
            spriteManager.buildSpriteTimeline(sprite, {
                width: 21716,
                height: 372
            }, 61, 1, 1);
            //
            //scene.offset = -100;
            //
            return scene;
        },

        scene2: function(scene) {
            var youTube = new IBM.watson.tweens.YouTube(scene);
            youTube.addTweens();

            // offset in parent timeline
            scene.offset = -50;

            return scene;
        },

        scene3: function(scene) {
            //var dualRow = new IBM.watson.tweens.DualRow(scene);
            //dualRow.addTweens();
            //scene.offset = -50;

            return scene;
        },

        scene4: function(scene) {
            //var spanRow = new IBM.watson.tweens.SpanRow(scene);
            //spanRow.addTweens();

            //scene.offset = +5;

            return scene;
        }
    };
}(jQuery));