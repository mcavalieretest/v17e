(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};
  IBM.watson.tweens = IBM.watson.tweens || {};

  IBM.watson.tweens.YouTube = function(scene) { this.init(scene); };
  IBM.watson.tweens.YouTube.prototype = {
    init: function(scene) {
      var my = this;
      my.scene = scene;
    },

    addTweens: function(scene) {
      var my = this,
          content = my.scene.elm.find('.yt-content'),
          header = my.scene.elm.find('h1'),
          playBtn = content.find('.yt-btn');

      my.scene.timeline
        .from(header, 100, {scale: 0.5, opacity: 0}, 'start')
        .from(playBtn, 100, {scale: 0.5, opacity: 0}, 'start')
      ;
    }
  };
}(jQuery));