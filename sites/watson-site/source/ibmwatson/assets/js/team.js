(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};

  IBM.watson.Team = function() { this.init(); };

  IBM.watson.Team.prototype = {
    init: function() {
      var my = this;

      my.sceneManager = new IBM.watson.SceneManager(this);
    }
  };

	IBM.watson.resizeIframe = function(contentHeight){
		$('iframe').css('height', contentHeight);
	};

}(jQuery));