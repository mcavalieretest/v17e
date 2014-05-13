(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};

  IBM.watson.Home = function() { this.init(); };
  
  IBM.watson.Home.prototype = {
    init: function() {
		var my = this;
		my.sceneManager = new IBM.watson.SceneManager(this);

		if(IBM.watson.isMobile){
			$(".ibm-live-assistance-list").remove();
		}

	    // my.initBxSlider();
    },

	  initBxSlider: function() {
		  $('#newsSlideShow ul').bxSlider({
			  infiniteLoop: true,
			  pager: false
		  });
	  },

	  scene1: function(scene) {
		  //var youTube = new IBM.watson.tweens.YouTube(scene);

		  return scene;
	  }
  };
}(jQuery));