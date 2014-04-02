(function($) { // reset V17e's noConflict
  'use strict';

	window.IBM = window.IBM || {};
  IBM.watson = IBM.watson || {};

  IBM.watson.ScrollManager = function() { this.init(); };

  IBM.watson.ScrollManager.prototype = {
    init: function() {
      var my = this;

      my.$win = $(window);
      my.$doc = $(document);

      my.bindScroll();
    },

    /**
     * Delegate out to doScroll on window scroll
     */
    bindScroll: function() {
      var my = this;

      my.scrollPercent = 0;

        // get the window sizes necessary to calculate scroll amount
      my.bindWindowMetrics();

      my.$win.on('scroll', function() {
        my.doScroll();
      });
    },

    /**
     * Seek the main timeline to the percent of the total window scroll
     */
    doScroll: function() {
      var my = this;

	    //TODO: put this media query someplace more global
	    if (Modernizr.mq('(min-width: 641px)') && !IBM.watson.isMobile) {
        my.scrollPercent = my.$win.scrollTop() / (my.docHeight-my.winHeight) * 100;

        // lock between 0-100 for rubber band scrolling bug
        if (my.scrollPercent < 0) { my.scrollPercent = 0; }
        if (my.scrollPercent > 100) { my.scrollPercent = 100; }
      } else { //set seek to 100% for mobile to always show final state
	      my.scrollPercent = 100;
      }

      my.timeline.seek(my.scrollPercent, false);
    },

    /**
     * Delegate out to getWindowMetrics on window resize
     */
    bindWindowMetrics: function() {
      var my = this;

      my.$win.on('resize', function() {
        my.getWindowMetrics();
        my.doScroll();
      });

      my.getWindowMetrics();
    },

    /**
     * Stash the window and document height for scroll and timeline calculations
     */
    getWindowMetrics: function() {
      var my = this;

      my.winHeight = my.$win.height();
      my.docHeight = my.$doc.height();
    },

    /**
     * Associate a timeline with this scroll manager
     * @param timeline
     */
    registerTimeline: function(timeline) {
      var my = this;

      my.timeline = timeline;
    }
  }
}(jQuery));