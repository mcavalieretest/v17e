(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	/**
	 * native html video, flash video and youtube functions
	 */
	IBM.watson.video =  {

		/**
		 * flash or html5 hero video, NOT youtube
		 */
		heroVideoInit: function () {


			var $video = $('video'),
				$headline = $('.slanted-header'),
				sourceFile = $video.data('src');

			if (!IBM.watson.isMobile) { // don't load video for mobile

				// TODO: load video if browser starts < 580px and then resizes to >= 580px

				$headline.hide(); // html5 video isn't respecting z-index when the vid src loads, so we have to hide then re-show the headline overlay

				if (Modernizr.video.webm || Modernizr.video.h264) { // html5

					$('#flashcontent').hide();

					// load the sources now instead of in markup to save bandwidth for mobile


					if (Modernizr.video.webm) {
						$video.attr('src', sourceFile + '.webm');
					}
					else {
						$video.attr('src', sourceFile + '.mp4');
					}

					$video[0].load();

					if ($video[0].readyState != 4) { // if video isn't ready, listen for 'canplay'
						//console.log('waiting');
						$video.on('canplay', function () {
							//console.log('play');
							$video[0].play();
							$headline.show();
						});
					}
					else {
						$video[0].play();
						$headline.show();
					}
				}
				else { // flash via swfobject

					// TODO: test the flash version

					$video.remove();
					$('#flashcontent').show();
					$('.video-wrapper').addClass('use-flash');

					var params = {
						quality: "high",
						scale: "noscale",
						wmode: "opaque",
						allowscriptaccess: "always",
						bgcolor: "#000000",
						base: "assets/video/"
					};
					var flashvars = {
						debug: false,
						video: sourceFile.match(/\/[^\/]+$/i)[0].replace('/','') +'.mp4'
					};
					var attributes = {
						id: "flashcontent",
						name: "flashcontent"
					};
					var IE8_NoCacheNum = Math.random() * 900000; //Stops IE8 (and maybe other versions) from caching the swf - http://bit.ly/1gyfZjg
					swfobject.embedSWF(params.base + "videoplayer.swf?nocache="+IE8_NoCacheNum, "flashcontent", "100%", "100%", "10.0.43", params.base + "expressInstall.swf", flashvars, params, attributes);
				}

				IBM.watson.video.setHeroSize();

				$(window).on('resize', function () {
					IBM.watson.video.setHeroSize();
				});
			}

			else { //mobile
				$('#hero').addClass('no-video');
				//$headline.show();
			}
		},

		/**
		 * hero video is always 16:9, so we have to prevent it from getting too short by scaling it up if its container gets too narrow
		 */
		setHeroSize: function () {

			var $hero = $('#hero'),
				$wrapper = $('.video-wrapper'),
				w = $hero.width(),
				h = $hero.height(),
				ratioX, ratioY, scale;

			ratioX = w / 16;
			ratioY = h / 9;
			scale = ratioX > ratioY ? ratioX : ratioY;
			$wrapper.css({
				width: scale * 16,
				height: scale * 9,
				marginLeft: ((w - 16 * scale) / 2),
				marginTop: ((h - 9 * scale) / 2)
			});
		}
	};

	IBM.watson.yt = {

		init: function() {
			if ($('#ytApi').length < 1) {
				var tag = document.createElement('script'),
						firstScriptTag = document.getElementsByTagName('script')[0];

				tag.id = 'ytApi';
				tag.src = "//www.youtube.com/iframe_api";
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				// api will fire onYouTubeIframeAPIReady() when it's good and ready
			}
		},

		ytInstances: [],


		/**
		 * called by onYouTubeIframeAPIReady; create yt iframe player instance when button is clicked
		 */
		handleYtPlay: function () {

			$('.yt-wrap').each(function(i){
				var $btn = $(this).find('.yt-btn'),
					$content = $(this).find('.yt-content'),
					$copy = $content.find('*').not('iframe'),
					eleId = 'yt-player-' + i,
					$playerEle, videoId, ytInstance;

				$playerEle = $('<div class="yt-frame" id="' + eleId +'" ></div>');
				$btn.css('display', 'block'); //play button is hidden until api ready

				$btn.on('click', function (e) {

					e.preventDefault();

					$content.append($playerEle); //create el for api to reference

					//hide the static content
					$content.find('*').not($playerEle).hide();

					// get the button and parse its href for a yt video id
					videoId = $btn.attr('href').split('v=')[1];

					ytInstance = new YT.Player(eleId, { // yt replaces the ele whose id we pass with an iframe player
						height: '100%',
						width: '100%',
						videoId: videoId, // and loads the video whose yt video id we passed
						playerVars: {
							'rel': 0,
							'enablejsapi': 1,
							'wmode': 'transparent'
						},
						events: { // required callbacks
							'onReady': IBM.watson.yt.onPlayerReady,
							'onStateChange': IBM.watson.yt.onPlayerStateChange
						}
					});
					IBM.watson.yt.ytInstances.push(ytInstance);
				});
			});
		},

		/**
		 * fires when the yt player has a video loaded and ready to play
		 * @param event
		 */
		onPlayerReady: function (event) {

			//console.log(event);
			var $wrap = $(event.target.a).closest('.yt-wrap');
			$wrap.find('.yt-poster').hide();
			if (!IBM.watson.isMobile) {
				$wrap.removeClass('not-playing');
				event.target.playVideo(); // play it!
			}
		},

		/**
		 * fires when the yt player has any state change
		 * @param event
		 */
		onPlayerStateChange: function (event) {
			//console.log(event);
			var $wrap = $(event.target.a).closest('.yt-wrap');
			if (event.data === 0) { //video has ended
				$(event.target.a).remove();
				$wrap.addClass('not-playing');
				$wrap.find('.yt-poster').show();
				$wrap.find('.yt-content').find('*').not('iframe').show();
			}
			else if (event.data === 1) { //video is playing
				$(IBM.watson.yt.ytInstances).each(function(i){ //loop through other yt instances
					if ( (this.a != event.target.a) && $(this.a).parents().is('body') ) {
						this.stopVideo(); //stop any videos that don't match the one playing and still exists in the dom
					}
				});
			}

		}
	};

	/**
	 * general init for video functions on dom ready
	 */

	$(function(){
		if ($('video').length > 0) {
			$(IBM.watson.video.heroVideoInit); //hero init
		}
		if ($('.yt-wrap').length > 0) {
			IBM.watson.yt.init(); //youtube init
		}
	});

})(jQuery);

/*
 youtube api ready callback; needs to be in global scope!
 */
function onYouTubeIframeAPIReady() {
	IBM.watson.yt.handleYtPlay();
}