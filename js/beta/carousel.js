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
      panelContainerSelector:  ".ibm-columns",
      paginationContainerSelector: ".ibm-ribbon-nav",
      activePageClass: "ibm-active"
    };

    // Save the important elements
    this.config  = $.extend({}, defaults, options);
    this.element = $(this.config.selector);
    this.prevButton = $(this.config.prevButtonSelector);
    this.nextButton = $(this.config.nextButtonSelector);
    this.scrollContainer = $(this.config.scrollContainerSelector);
    this.paginationContainer = $(this.config.paginationContainerSelector);

    this.browserDetect();
    this.initDimensions();
    this.initEvents();
    this.initMisc();
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

      this.paginationContainer.on("click", "a", function(e) {        
        e.preventDefault();
        e.stopPropagation();

        var index = self.paginationLinks.index(e.target);
        self.goToPage(index);
      });

      $(window).resize(function() {
        self.refreshPanelDimensions();
      });
    },

    initDimensions: function() {
      this.scrollContainer.css("left", "0px");

      this.refreshPanelDimensions();
    },

    initMisc: function() {
      this.pages = this.element.find("[role=\"option\"]");
      this.paginationLinks = this.paginationContainer.children();
      this.currentPage = 0;
      this.toggleArrowVisibility();
      this.refreshPagination();
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

    refreshPagination: function() {
      this.paginationLinks
        .removeClass(this.config.activePageClass)
        .eq(this.currentPage)
          .addClass(this.config.activePageClass);
    },

    refreshPanelDimensions: function() {
      this.panelWidth = this.element.find(this.config.panelContainerSelector+":first").width();
    },

    goToPage: function(index) {
      var self = this,
          newLeft;

      this.currentPage = index;
      this.toggleArrowVisibility();
      this.refreshPagination();

      newLeft = -(this.panelWidth * index);

      var complete = function() {
        console.warn('currentPage: '+self.currentPage);
      };

      if (this.useTransitions) {
        var eventName = IBM.Common.Util.transitionEndEventName();
        this.scrollContainer.one(eventName, complete);
        this.scrollContainer.css({"left": newLeft});
      } else {
        this.scrollContainer.animate({"left": newLeft}, 1000, complete);
      }
    },

    next: function() {
      this.goToPage(this.currentPage+1);
    },

    prev: function() {
      this.goToPage(this.currentPage-1);
    },

    toggleArrowVisibility: function() {
      if (this.hasPrevPages()) {
        this.prevButton.show();
      } else {
        this.prevButton.hide();
      }

      if (this.hasNextPages()) {
        this.nextButton.show();
      } else {
        this.nextButton.hide();
      }
    },

    hasPrevPages: function() {
      return (this.currentPage > 0);
    },

    hasNextPages: function() {
      return (this.currentPage < this.pages.length - 1);
    }
  });

  $(function() {
    window.carousel = new IBM.Common.Widgets.Carousel({
      selector: "#my-carousel"
    });
  });
})(jQuery, CHICKENFEED);

