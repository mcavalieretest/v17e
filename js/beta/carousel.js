(function($, IBM) {
  IBM.ns(IBM, "Common.Widgets.Carousel");
  IBM.ns(IBM, "Common.Util");

  IBM.Common.Util.getMaxHeight = function() {

  };

  IBM.Common.Util.transitionEndEventName = function() {
    if (!Modernizr.csstransforms3d) {
      return undefined;
    }

    var map = {
      "transition": "transitionend",
      "WebkitTransition": "webkitTransitionEnd",
      "OTransition": "oTransitionEnd",
      "MsTransition": "MSTransitionEnd"
      // "MozTransition": "transitionend"
    };

    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        finalEventName;    

    jQuery.each(map, function(property, eventName){ 
      if (thisStyle[property] !== undefined) {
        finalEventName = eventName;
        return false;
      }
    });

    return finalEventName;
  };    

  IBM.Common.Widgets.Carousel = function(options) {
    var defaults = {
      prevButtonSelector: ".ibm-ribbon-prev",
      nextButtonSelector: ".ibm-ribbon-next",
      scrollContainerSelector: ".ibm-ribbon-section",
      panelContainerSelector:  ".ibm-columns"
    };

    // Save the important elements
    this.config  = $.extend({}, defaults, options);
    this.element = $(this.config.selector);
    this.prevButton = $(this.config.prevButtonSelector);
    this.nextButton = $(this.config.nextButtonSelector);
    this.scrollContainer = $(this.config.scrollContainerSelector);

    this.browserDetect();
    this.initDimensions();
    this.initEvents();

    //Temporary
    this.prevButton.show();
    this.nextButton.show();
  };

  $.extend(IBM.Common.Widgets.Carousel.prototype, {
    initEvents: function() {
      var self = this;

      this.prevButton.on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.prev();
      });

      this.nextButton.on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.next();
      });
    },

    initDimensions: function() {
      this.scrollContainer.css("left", "0px");

      this.panelWidth = this.element.find(this.config.panelContainerSelector+":first").width();
    },

    browserDetect: function() {
      this.useTransitions = Modernizr.csstransforms3d;

      if (this.useTransitions) {
        this.element.addClass("ibm-carousel-css-transitions");
      }
    },

    getCurrentSlidePos: function() {
      return parseInt(this.scrollContainer.css("left").replace("px", ""));
    },

    next: function() {
      var currentLeft = this.getCurrentSlidePos(),
          newLeft     = currentLeft - this.panelWidth;

      if (this.useTransitions) {
        this.scrollContainer.css({"left": newLeft});
      } else {
        this.scrollContainer.animate({"left": newLeft}, 1000);
      }
    
    },

    prev: function() {
      var currentLeft = this.getCurrentSlidePos(),
          newLeft     = currentLeft + this.panelWidth;
      
      if (this.useTransitions) {
        this.scrollContainer.css({"left": newLeft});
      } else {
        this.scrollContainer.animate({"left": newLeft}, 1000);
      }
      
    }
  });

  $(function() {
    window.carousel = new IBM.Common.Widgets.Carousel({
      selector: "#my-carousel"
    });
  });
})(jQuery, CHICKENFEED);

