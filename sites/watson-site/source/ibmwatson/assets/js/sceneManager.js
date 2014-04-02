(function($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};

  IBM.watson.SceneManager = function(stage) { this.init(stage); };

  IBM.watson.SceneManager.prototype = {
    init: function(stage) {
      var my = this;

      if (!$('html').hasClass('ie-lt10')) { // only modern IE
        // the stage is the parent page component that defines all of the scene inits
        my.stage = stage;

        my.scroller = new IBM.watson.ScrollManager();

        my.buildScenes();
        my.resetMainTimeline();
        my.bindWindowResize();

        // KLUDGE: force reflow to realign timelines to scroll on load
        $(window).trigger('resize');
      }

      // Show all anim elms now that we're loaded
      $('body').removeClass('loading-anims');
    },

    /**
     * Create a timeline for each .scene element stacked on the page.
     * If my.stage class defines a corresponding sceneX function (where X is the scene number),
     * call that function so it can add custom behavior to the scene.
     */
    buildScenes: function() {
      var my = this;

      my.scenes = [];

      // build a scene scaffold for each child scene and add it to the scenes array
      $('.scene').each(function(i) {
        var timeline = new TimelineMax(),
            offset = 0, // relative offset amount when inserted in parent timeline
            elm = $(this),
            scene;

        // Ensure scene blocks out 100% time in timeline even if it has no animations added.
        // This is necessary for sibing scenes to line up in the timeline properly.
        timeline
          .addLabel('start', 0)
          .to(elm, 100, {}, 'start');

        scene = {timeline: timeline, offset: offset, elm: elm};

        // pass scene up to stage's scene init if it exists
        var sceneInit = my.stage['scene' + (i+1)];
        if (typeof sceneInit === 'function') {
          scene = sceneInit(scene);
        }

        // add scene timeline to timeline array
        my.scenes.push(scene);

/* //scene tracking refactored in tracking.js

        scene.timeline.call(function(){
            IBM.watson.tracking.trackScene(scene.elm.context.id);
        }, null, this, 0);
*/

      });
    },

    /**
     * Iterate over each scene in my.scenes array and normalize them before inserting into parent timeline
     */
    resetMainTimeline: function() {
      var my = this;

      my.mainTimeline = new TimelineMax({paused: true});

      for(var _scene in my.scenes) {
        if (my.scenes.hasOwnProperty(_scene)) {
          var scene = my.scenes[_scene],
              normalizedScene = my.normalizeScene($.extend({}, scene)); // normalize clone so we don't affect the original

          var offsetStr = (normalizedScene.offset < 0) ? '-=' : '+=';
          offsetStr += Math.abs(normalizedScene.offset);

          //console.log(normalizedScene.timeline.duration(), offsetStr);

          my.mainTimeline.add(normalizedScene.timeline, offsetStr);
        }
      }

      my.scroller.registerTimeline(my.mainTimeline);
    },

    /**
     * For each child scene with a 100 duration, stretch its duration to the ratio its height takes up
     * in the overall timeline.
     * @param scene The original scene with tweens occurring from 0-100
     * @returns {*}
     */
    normalizeScene: function(scene) {
      var my = this,
          elmHeight = scene.elm.outerHeight();

      var percentOfTotalTimeline = (elmHeight / my.scroller.docHeight) * 100;

      if (scene.timeline.duration() > 100) {
        console.error(scene.elm.attr('id'), 'timeline duration is greater than 100%.  This will result in an improperly normalized duration.  Please ensure that the timeline tweens do not exceed 100.');
      }

      //console.log(my.scroller.docHeight, my.scroller.winHeight, percentOfTotalTimeline);

      scene.timeline.duration(percentOfTotalTimeline);
      scene.offset = (elmHeight > 0) ? scene.offset / percentOfTotalTimeline : 0; // avoid divide by 0

      return scene;
    },

    /**
     * Reset the timeline on window resize in order to account for responsive design scene heights
     */
    bindWindowResize: function() {
      var my = this,
          $win = $(window);

      $win.on('resize', function() {
        my.resetMainTimeline();
      });
    }
  };
}(jQuery));