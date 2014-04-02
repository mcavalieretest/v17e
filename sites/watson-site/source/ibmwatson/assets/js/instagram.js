(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	IBM.watson.instagram = (function () {

		return {

			/**
			 * get instagram data
			 */
			getData: function () {

				var minTimestamp = Math.round(new Date("2014-01-09 00:00:00").getTime() / 1000),
					maxTimestamp = Math.round(new Date("2014-01-29 00:00:00").getTime() / 1000),
					count = 20;

				$.ajax({
					type: 'GET',
					dataType: 'jsonp',
					url: 'https://api.instagram.com/v1/users/589638973/media/recent/?client_id=4e56b0141d3c4590a4c3916313e9d512&count=' + count + '&min_timestamp=' + minTimestamp + '&max_timestamp=' + maxTimestamp
				})
				.done(function (response, textStatus, jqXHR) {

					//console.log(response);
					var $slideshowList = $('#instagramSlideShow').find('ul'),
						markup, res;

					res = Modernizr.mq('(min-width: 580px)') ? 'standard_resolution' : 'low_resolution'; // pick a resolution

					$(response.data).each(function () {

						markup = '<li class="slide">' +
							'<a href="' + this.link + '" target="_blank">' +
							'<img src="' + this.images[res].url + '">' +
							'</a>' +
							'</li>';
						$slideshowList.append(markup);


					});

					//instantiate instagramSlideShow slideshow
					var instagramSlideShow = document.getElementById('instagramSlideShow');
					if (instagramSlideShow)//if there make slideShow
						var instaSS = new IBM.watson.SlideShow({
							view: instagramSlideShow,
							ease: Quad.easeInOut,
							duration: 1,
							looping: false
						});
				});
			}
		}
	})();


	/**
	 * general init for instagram functions on dom ready
	 */
	jQuery(IBM.watson.instagram.getData);
})(jQuery);
