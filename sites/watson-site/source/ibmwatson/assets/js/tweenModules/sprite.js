(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};
  IBM.watson.tweens = IBM.watson.tweens || {};

  IBM.watson.tweens.Sprite = function(scene) { this.init(scene); };
  IBM.watson.tweens.Sprite.prototype = {
    init: function(scene) {
      var my = this;
      my.scene = scene;
    },

    buildSpriteTimeline: function(spriteElm, imgBounds, spriteCnt, rows, dir) { // TODO: enough params to warrant an opts obj now
      var my = this,
        rows = (typeof rows === 'undefined') ? 1 : rows,
        dir = (typeof dir === 'undefined') ? -1 : dir,
        spriteCnt = (typeof spriteCnt === 'undefined') ? 100: spriteCnt,
        rowSpriteCnt = spriteCnt / rows,
        spriteWidth = imgBounds.width / rowSpriteCnt,
        spriteHeight = imgBounds.height,
        bgOffset = 0,
        tlOffset = 0;

      for (var row=0; row<rows; ++row) {
        for (var i=0; i<rowSpriteCnt; ++i) {
          bgOffset = -(spriteWidth * i) + 'px ' + -(spriteHeight * row) + 'px';

          tlOffset = (i + (rowSpriteCnt * row)) * (100/spriteCnt); // evenly space them on a timeline from 0-100

          //console.log(tlOffset);

          my.scene.timeline.to(spriteElm, 0, {backgroundPosition: bgOffset}, 'start+=' + tlOffset);
        }
      }
    }
  };
}(jQuery));