(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};


	IBM.watson.instagram = (function () {

		return {

			instagramData : [],
			/**
			 * get instagram data
			 */

			getData: function(url){
				var instURL = url;
				var count = 50;

				if(!instURL){
					instURL = 'https://api.instagram.com/v1/users/589638973/media/recent/?client_id=4e56b0141d3c4590a4c3916313e9d512&count=' + count;
				}

				$.ajax({
					type: 'GET',
					dataType: 'jsonp',
					url: instURL
				})
				.done(function (response, textStatus, jqXHR) {
					
					IBM.watson.instagram.loadComplete(response)
					
				});

			},

			loadComplete: function(obj){

				IBM.watson.instagram.instagramData.push(obj.data)

				var hash = "ibmwatson";

				if(obj.pagination.next_url){
					IBM.watson.instagram.getData(obj.pagination.next_url);
				}else{
					var allData = IBM.watson.instagram.instagramData;
					var newData = [];
					for(var i = 0; i < allData.length; i++){
						for(var j = 0; j < allData[i].length; j++){
							if(allData[i][j].tags.indexOf(hash) != -1){
								newData.push(allData[i][j])
							}
						}
						
					}
					IBM.watson.instagram.createSlide(newData)
				}
				
			},

			createSlide: function(data){

				var $slideshowList = $('#instagramSlideShow').find('ul'),
				markup, res;

				res = Modernizr.mq('(min-width: 580px)') ? 'standard_resolution' : 'low_resolution'; // pick a resolution

				$(data).each(function () {
					markup = '<li class="slide">' +
							'<a href="' + this.link + '" target="_blank">' +
							'<img src="' + this.images[res].url + '">' +
							'</a>' +
							'</li>';
					$slideshowList.append(markup);


				});

				// instantiate instagramSlideShow slideshow
				var instagramSlideShow = document.getElementById('instagramSlideShow');
				if (instagramSlideShow)//if there make slideShow
					var instaSS = new IBM.watson.SlideShow({
						view: instagramSlideShow,
						ease: Quad.easeInOut,
						duration: 1,
						looping: false
						});
			},

			init: function () {

				IBM.watson.instagram.getData();

			}
		}
	})();


	/**
	 * general init for instagram functions on dom ready
	 */
	jQuery(IBM.watson.instagram.init);
})(jQuery);
