(function($, IBM) {
  IBM.ns(IBM, "Common.Widgets.Carousel");
  IBM.ns(IBM, "Common.Util");

  IBM.Common.Util.getMaxHeight = function() {

  };
/*
    templateString : "<div class='ibm-container-body' dojoAttachPoint='ribbonContainer'>" + 
              "<a class='ibm-ribbon-prev' dojoAttachPoint='scrollLeftButton' role='button' href='#'></a>" +
              "<div class='ibm-ribbon-pane' dojoAttachPoint='scrollContainer'>" +
                "<div class='ibm-ribbon-section' dojoAttachPoint='scrollableNode' role='listbox'></div>" +
              "</div>" +
              "<a class='ibm-ribbon-next' dojoAttachPoint='scrollRightButton' role='button' href='#'></a>"+
              "<div class='ibm-ribbon-nav' dojoAttachPoint='navNode' role='toolbar'></div>" +
           "</div>",
*/
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
      bodyContainerSelector: ".ibm-container-body",
      panelContainerSelector:  ".ibm-columns",
      pagesContainerSelector: ".ibm-ribbon-pane",
      paginationContainerSelector: ".ibm-ribbon-nav",
      activePageClass: "ibm-active"
    };

    // Save the important elements
    // TODO - get these to traverse from the individual element using $(this.element).find().
    this.config  = $.extend({}, defaults, options);
    this.element = $(this.config.selector);


    this.browserDetect();
    this.initHtml();
    this.initDimensions();
    this.initEvents();
    this.initMisc();
  };

  $.extend(IBM.Common.Widgets.Carousel.prototype, {
    initHtml: function() {
      this.prevButton = $(this.config.prevButtonSelector);
      this.nextButton = $(this.config.nextButtonSelector);
      this.bodyContainer = this.element.find(this.config.bodyContainerSelector);

      // Inject html if it doesn't exist. For easy backward compatibility
      if (!this.bodyContainer.find(this.config.pagesContainerSelector).length) {
        this.bodyContainer.wrapInner('<div class="ibm-ribbon-pane"><div class="ibm-ribbon-section"></div></div>');
      }
      if (!this.bodyContainer.find(this.config.prevButtonSelector).length) {
        this.bodyContainer.prepend('<a class="ibm-ribbon-prev" role="button" href="#" title="Previous">Previous</a>');
      }
      if (!this.bodyContainer.find(this.config.nextButtonSelector).length) {
        this.bodyContainer.append('<a class="ibm-ribbon-next"  role="button" href="#" title="Next">Next</a>');
      }

      this.scrollContainer = $(this.config.scrollContainerSelector);
      this.pagesContainer = $(this.config.pagesContainerSelector);
      this.paginationContainer = $(this.config.paginationContainerSelector);
      this.pages = this.scrollContainer.children();
      this.paginationLinks = this.paginationContainer.children();      
    },

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

      var heights = this.pages.map(function(i, el) { 
            return $(el).height(); 
          }),
          maxHeight = Math.max.apply(null, heights);

      this.pagesContainer.height(maxHeight);
    },

    goToPage: function(index) {
      var self = this,
          newLeft;

      this.currentPage = index;
      this.toggleArrowVisibility();
      this.refreshPagination();

      // Note the 20 pixel offset to acommodate the margin on ibm-col-* items.
      newLeft = -((this.panelWidth+20) * index);

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

