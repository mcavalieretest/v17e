(function($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	IBM.watson.Index = function() { this.init(); };

	IBM.watson.Index.prototype = {
		init: function() {
			var my = this;

			my.sceneManager = new IBM.watson.SceneManager(this);

			$('#mdc-faq details').details();
			if (!Modernizr.touch) {
				$('summary').addClass('no-touch'); // 'summary' element doesn't inherit html.no-touch properly so we have to set something explicitly for css to reference
			}
		}




		/** SCENE ANIMATIONS **/

//		scene1: function(scene) {
//			//var someElement = scene.elm.find('.some-element');
//
//			//scene.timeline
//			//	.from(someElement, 25, {opacity: 0}, 'start')
//			//;
//
//			//scene.offset = -100;
//
//			return scene;
//		}
	};
}(jQuery));