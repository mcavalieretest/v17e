(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};

  IBM.watson.Work = function() { this.init(); };

  IBM.watson.Work.prototype = {
    init: function() {
      var my = this;

      my.sceneManager = new IBM.watson.SceneManager(this);

	    my.initSlideshow();
    },

	  initSlideshow: function() {
		  var quoteSlideShow = $('#quoteSlideShow')[0];
		  var ss2 = new IBM.watson.SlideShow({
			  view : quoteSlideShow,
			  ease : Quad.easeInOut,
			  duration : 1,
			  looping : true,
			  fullscreen : false
		  });
	  }
  };
}(jQuery));