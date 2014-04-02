(function($) { // reset V17e's noConflict
  IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};

  IBM.watson.Demos = function() { this.init(); };

  IBM.watson.Demos.prototype = {
    init: function() {
      var my = this;

      my.sceneManager = new IBM.watson.SceneManager(this);
    },

    // TESTING ERROR HANDLING WITH AN EMPTY SCENE THAT EXCEEDS 100% DURATION
    scene1: function(scene) {
      scene.timeline
        .to(scene.elm.find('.test1'), 50, {left: '50%', top: '100%'}, 'start')
        .to(scene.elm.find('.test2'), 100, {left: '50%', top: '100%'}, 'start')
      ;

      return scene;
    },

    scene2: function(scene) {
      scene.timeline
        .to(scene.elm.find('.test1'), 50, {left: '50%', top: '100%'}, 'start')
        .to(scene.elm.find('.test2'), 100, {left: '50%', top: '100%'}, 'start')
      ;

      // offset in parent timeline
      scene.offset = 0; // offset 0%, so this should start animating once all scene1 animation complete

      return scene;
    },

    scene3: function(scene) {
      scene.timeline
        .to(scene.elm.find('.test1'), 50, {left: '50%', top: '100%'}, 'start')
        .to(scene.elm.find('.test2'), 100, {left: '50%', top: '100%'}, 'start')
      ;

      // offset in parent timeline
      scene.offset = -50; // offset -50%, so this should start animating when scene2, test1 completes at 50%

      return scene;
    },

    scene4: function(scene) {
      scene.timeline
        .to(scene.elm.find('.test1'), 50, {left: '50%', top: '100%'}, 'start')
        .to(scene.elm.find('.test2'), 100, {left: '50%', top: '100%'}, 'start')
      ;

      // offset in parent timeline
      scene.offset = -100; // offset -100%, so this should start animating at the same time as scene3

      return scene;
    },

    scene5: function(scene) {
      scene.timeline
        .to(scene.elm.find('.test1'), 50, {left: '50%', top: '100%'}, 'start')
        .to(scene.elm.find('.test2'), 100, {left: '50%', top: '100%'}, 'start')
      ;

      // offset in parent timeline
      scene.offset = +100; // offset +100, so this should start animating 100% after scene4 completes

      return scene;
    }
  };
}(jQuery));