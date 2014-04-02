(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};
  IBM.watson.tweens = IBM.watson.tweens || {};

  IBM.watson.tweens.DualRow = function(scene) { this.init(scene); };

  IBM.watson.tweens.DualRow.prototype = {
    init: function(scene) {
      var my = this;

      my.scene = scene;
    },

    addTweens: function() {
      var my = this,
          textColumn = my.scene.elm.find('.text.column'),
          header = textColumn.find('h2'),
          body = textColumn.find('p');

      my.scene.timeline
        .from(header, 100, {left: '-100%', opacity: 0}, 'start')
        .from(body, 100, {left: '100%', opacity: 0}, 'start')
      ;
    }
  };
}(jQuery));