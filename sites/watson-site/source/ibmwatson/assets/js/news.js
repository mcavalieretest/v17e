(function($) { // reset V17e's noConflict
    'use strict';

    window.IBM = window.IBM || {};
    IBM.watson = IBM.watson || {};

    IBM.watson.News = function() {
        this.init();
    };

    IBM.watson.News.prototype = {
        init: function() {
            var my = this;
            my.browserString = window.navigator.userAgent.toLowerCase();

            my.sceneManager = new IBM.watson.SceneManager(this);

            my.initGoogleMaps();

            my.handleDualRow();

            my.bindScroll();
            my.bindResize();



            if (IBM.watson.isMobile) {
                $('#news-digs').addClass('no-fixed');
                $('.slanted-header').addClass('always-show');
                $(".ibm-live-assistance-list").remove();
            }

        },

        initGoogleMaps: function() {

            if (Modernizr.touch) { // cover map to defeat maps api hijack of touch events
                $('.map-shim').css('display', 'block');
            }


            var my = this;
            var map;
            var $map = document.getElementById('map-canvas');
            var myLatling = new google.maps.LatLng(40.72968, -73.99033);
            var stylers = [{
                "saturation": -100
            }, {
                "lightness": -33
            }];
            var mapOptions = {
                zoom: 17,
                center: myLatling,
                scrollwheel: false,
                disableDefaultUI: window['isMobile'],
                styles: [{
                    "stylers": stylers
                }]
            };
            map = new google.maps.Map($map, mapOptions);
            var marker = new google.maps.Marker({
                position: myLatling,
                map: map,
                title: '51 Astor P1'
            });
            var timeout;
            $(window).on('resize', function() {
                clearTimeout(timeout);
                timeout = setTimeout(function() {

                    map.setCenter(myLatling);
                    if (window["isIE"]) {
                        $($map).children().height($($map).parent().height());
                        $(window).trigger('resize');
                    }
                }, 200);
            });

            $(window).trigger('resize');
        },

        bindScroll: function() {
            var my = this;
            my.$win = $(window),
            my.sceneElm = $('#news-digs'),
            my.sceneContent = my.sceneElm.find('.sprite-row');

            my.$win.on('scroll', function() {
                my.handleFixedPosition();
            });

            my.handleFixedPosition();
        },

        bindResize: function() {
            var my = this;
            my.$win = $(window);

            my.$win.on('resize', function() {
                my.handleFixedPosition();
                my.handleDualRow();
            });
        },

        handleFixedPosition: function() {

            var my = this;

            if (Modernizr.mq('(min-width: 580px)') && (my.browserString.indexOf('iphone') < 1) && (my.browserString.indexOf('ipad') < 1)) {
                if (!$('html').hasClass('ie-lt10')) { // only modern IE

                    var scrollTop = my.$win.scrollTop(),
                        elmOffset = my.sceneElm.offset().top,
                        dist = (elmOffset - scrollTop);

                    if (dist <= 0 && !my.sceneContent.hasClass('fixed')) {
                        my.sceneContent.addClass('fixed');
                    } else if (dist > 0 && my.sceneContent.hasClass('fixed')) {
                        my.sceneContent.removeClass('fixed');
                    }

                }
            }
        },

        handleDualRow: function() {
            var my = this,
                row = $('#news-bio'),
                elm1 = row.find('.context'),
                elm2 = row.find('.text');

            elm1.height(elm2.outerHeight());
        },

        /**
         * Pause scene1 video at the end of scene2
         */
        scene2: function(scene) {
            var video = $('#news-video-player');

            video.on('canplay', function() {
                scene.timeline
                    .call(function() {
                        if (!video[0].paused) {
                            video[0].pause();
                        } else {
                            video[0].play();
                        }
                    });
            });



            return scene;
        },

        scene3: function(scene) {
            var youTube = new IBM.watson.tweens.YouTube(scene);
            youTube.addTweens();

            // offset in parent timeline
            scene.offset = -100;

            return scene;
        },

        scene5: function(scene) {
            var header = scene.elm.find('h1'),
                sprite = scene.elm.find('#building-sprite-animation'),
                callout1 = scene.elm.find('#design-studio'),
                callout2 = scene.elm.find('#incubator'),
                callout3 = scene.elm.find('#solution-center');

            scene.timeline
                .from(header, 25, {
                    left: '-100%',
                    opacity: 0
                }, 'start')
                .from(sprite, 50, {
                    opacity: 0
                }, 'start');

            if (true) { // TODO: Only do this if above 640!
                scene.timeline
                    .from(callout1, 50, {
                        top: 1000,
                        opacity: 0
                    }, 'start')
                    .from(callout2, 50, {
                        top: 1000,
                        opacity: 0
                    }, 'start+=30')
                    .from(callout3, 50, {
                        top: 1000,
                        opacity: 0
                    }, 'start+=15');
            }

            var spriteManager = new IBM.watson.tweens.Sprite(scene);
            spriteManager.buildSpriteTimeline(sprite, {
                width: 16900,
                height: 495
            }, 50, 2);

            scene.offset = -75;

            return scene;
        },

        scene6: function(scene) {
            var dualRow = new IBM.watson.tweens.DualRow(scene);
            dualRow.addTweens();

            scene.offset = +100;

            return scene;
        },

        scene7: function(scene) {
            var spanRow = new IBM.watson.tweens.SpanRow(scene);
            spanRow.addTweens();

            scene.offset = +15;

            return scene;
        }
    };
}(jQuery));