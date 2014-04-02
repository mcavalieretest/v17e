(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};
  IBM.watson.tweens = IBM.watson.tweens || {};

  IBM.watson.tweens.SpanRow = function(scene) { this.init(scene); };
  IBM.watson.tweens.SpanRow.prototype = {
    init: function(scene) {
      var my = this;
      my.scene = scene;
    },

    addTweens: function(scene) {
      var my = this,
          header = my.scene.elm.find('h2'),
          p = my.scene.elm.find('p');

      my.scene.timeline
        .from(header, 100, {marginTop: '-300px', opacity: 0}, 'start')
        .from(p, 100, {right: '-100%', opacity: 0}, 'start')
      ;
    }
  };
}(jQuery));