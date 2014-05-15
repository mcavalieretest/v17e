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

  IBM.Common.Widgets.Carousel = function(element_or_selector, options) {
    var defaults = {
      arrows: false,
      init: true,
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
    this.element = this.getMainElement(element_or_selector);


    this.data = {};

    if (this.config.slides) {
      this.data.slides = $.extend(true, [], this.config.slides);
      /*
        

        target slide position = ??




       */
      //this.buildSlides(this.config.slides, 0);
    }
    else if (this.config.items) {
      this.data.slides = [
        { items: $.extend(true, [], this.config.items) }
      ];
      /*
      
        target slide = ??



        for each item
          add html to target slide
       */
      // this.buildSlides();

      // calls this.addItemsToSlide(items, slideNum)
    }

    // Prevent multiple instantiations
    if (typeof this.element.data("carousel") != "undefined") {
      return undefined;
    }
    
    // Save the object to the element for convenience
    this.element.data("carousel", this);

    this.browserDetect();

    if (this.config.init) {
      this.init();
    }
  };

  $.extend(IBM.Common.Widgets.Carousel.prototype, {
    buildSlidesHtml: function() {
/*
        for each slide in this.data.slides
          inject slide html
          for each item
            inject item html      

*/          
    },

    add: function(tree) {
      /*
        if tree.slides
          addSlides(tree.slides)
        else if tree.items
          addSlide(),
          addItems(tree.items, lastSlideIndex())
        else if tree.content
          addSlide(),
          addItem(tree, lastSlideIndex())

       */
    },

    /**
     * Add a content item to the specified slide. 
     * 
     * @param {[type]} item
     * @param {[type]} slide_index
     */
    addItem: function(item, slide_index) {
      this.data.slides[slide_index].items.push(item);
    },

    /**
     * Add multiple content items to the specified slide. 
     * 
     * @param {[type]} items
     * @param {[type]} slide_index
     */
    addItems: function(items, slide_index) {
      for (var i=0; i < items.length; i++) {
        this.addItem(items[i], slide_index);
      }
    },

    /**
     * Add a slide and its content items. 
     * 
     * @param {[type]} slide
     */
    addSlide: function(slide) {

    },

    /**
     * Add multiple slides and their content items.
     * 
     * @param {[type]} slides
     */
    addSlides: function(slides) {

    },

    /**
     * Return the zero-based index of the last existing slide. 
     * 
     * @return {Number} the zero-based index of the last existing slide. 
     */
    lastSlideIndex: function() {
      return (this.data.slides.length - 1);
    },

    /**
     * Kickoff all initialization tasks. Called automatically by constructor unless config.init is false. 
     * Can be called at any time after changing the internal settings to build or re-build the widget; 
     *  this should only be used when building the content programmatically though. 
     */
    init: function() {
      this.initHtml();
      this.initDimensions();
      this.initEvents();
      this.initMisc();
    },

    /**
     * Inject important html if it doesn't exist, and add accessibility attributes. 
     */
    initHtml: function() {
      var self = this;

      this.bodyContainer = this.element.find(this.config.bodyContainerSelector);
      
      // Inject html if it doesn't exist. For easy backward compatibility
      if (!this.bodyContainer.find(this.config.pagesContainerSelector).length) {
        this.bodyContainer.wrapInner('<div class="ibm-ribbon-pane"><div class="ibm-ribbon-section" role="listbox"></div></div>');
      }
      if (this.config.arrows) {
        if (!this.bodyContainer.find(this.config.prevButtonSelector).length) {
          this.bodyContainer.prepend('<a class="ibm-ribbon-prev" role="button" href="#" title="Previous">Previous</a>');
        }
        if (!this.bodyContainer.find(this.config.nextButtonSelector).length) {
          this.bodyContainer.append('<a class="ibm-ribbon-next"  role="button" href="#" title="Next">Next</a>');
        }
      }

      this.scrollContainer = this.element.find(this.config.scrollContainerSelector);
      this.pages = this.scrollContainer.children();

      if (!this.bodyContainer.find(this.config.paginationContainerSelector).length) {
        // TODO - dynamically set aria attributes, tabindexes and content here
        var html = '<div class="ibm-ribbon-nav" role="toolbar">';
        $.each(this.pages, function(i, el){
          var tabindex;

          if (i == 0) {
            tabindex = "0";
          } else {
            tabindex = "-1";
          }

          // TODO - set this aria-controls attribute correctly
          html += '<a href="#" role="button" aria-controls="ibmweb_ribbon_6_scrollable" tabindex="'+tabindex+'">Show carousel '+(i+1)+'</a>';
        });
        html += '</div>';
        this.bodyContainer.append(html);
      }

      if (this.config.arrows) {
        this.prevButton = this.element.find(this.config.prevButtonSelector);
        this.nextButton = this.element.find(this.config.nextButtonSelector);
      }

      this.pagesContainer = this.element.find(this.config.pagesContainerSelector);
      this.paginationContainer = this.element.find(this.config.paginationContainerSelector);
      this.paginationLinks = this.paginationContainer.children();      
      this.panelContainer = this.element.find(this.config.panelContainerSelector);

      $.each(this.pages, function(i, el){
        var page = $(el);

        page.attr("role", "option");

      });

      this.pages.children().attr("role", "document");

      this.panelContainer.children("[class*=ibm-col-]").each(function(i, el) {
        var tabindex;

        if (i == 0) {
          tabindex = "0";
        } else {
          tabindex = "-1";
        }

        $(el).attr("tabindex", tabindex);
      });

    },

    /**
     * Attach DOM events.
     */
    initEvents: function() {
      var self = this;

      if (this.config.arrows) {
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
      }

      this.paginationContainer.on("click", "a", function(e) {        
        e.preventDefault();
        e.stopPropagation();

        var index = self.paginationLinks.index(e.target);
        self.goToPage(index);
      });

      this.element.on("keydown", function(e) {
        self.handleKeyDown(e);
      });

      $(window).resize(function() {
        self.refreshPanelDimensions();
      });
    },

    /**
     * Do any necessary altering of any DOM element dimensions. 
     */
    initDimensions: function() {
      this.scrollContainer.css("left", "0px");

      this.refreshPanelDimensions();
    },

    /**
     * Do any initialization that doesn't fall into the other buckets. 
     * 
     * @return {[type]}
     */
    initMisc: function() {
      this.currentPage = 0;

      if (this.config.arrows) {
        var top = (this.pagesContainer.height() / 2) - (this.prevButton.height() / 2);
        this.prevButton.css("top", top+"px");
        this.nextButton.css("top", top+"px");
      }

      this.toggleArrowVisibility();
      this.refreshPagination();
    },

    browserDetect: function() {
      this.useTransitions = Modernizr.csstransforms3d;

      if (this.useTransitions) {
        this.element.addClass("ibm-carousel-css-transitions");
      }
    },

    handleKeyDown: function(e) {
      var self = this,
          LEFT_ARROW_CODE = 37,
          RIGHT_ARROW_CODE = 39,
          ENTER_CODE = 13;

      switch(e.keyCode) {
        case LEFT_ARROW_CODE:
          self.handleLeftArrowKey();
          break;

        case RIGHT_ARROW_CODE:
          self.handleRightArrowKey();
          break; 

        default: 
          return;
      }
    },

    handleLeftArrowKey: function() {
      var self      = this,
          $activeEl = $(document.activeElement);
      
      if ($activeEl.is(this.config.paginationContainerSelector + " > a")) {
        var index = self.paginationLinks.index($activeEl);

        self.focusPaginationLink(self.getPrevPaginationIndex(index));
      }
    },

    handleRightArrowKey: function() {
      var self      = this,
          $activeEl = $(document.activeElement);

      if ($activeEl.is(this.config.paginationContainerSelector + " > a")) {
        var index = self.paginationLinks.index($activeEl);

        self.focusPaginationLink(self.getNextPaginationIndex(index));
      }
    },

    focusPaginationLink: function(index) {
      this.paginationLinks.eq(index).focus();
    },

    getPrevPaginationIndex: function(currentIndex) {
      if (currentIndex <= 0) { 
        return this.paginationLinks.length - 1;
      }
      
      return currentIndex - 1;
    },

    getNextPaginationIndex: function(currentIndex) {
      if (currentIndex >= this.paginationLinks.length - 1) { 
        return 0;
      }
      
      return currentIndex + 1;
    },

    getMainElement: function(element_or_selector) {
      if (element_or_selector instanceof jQuery) {
        return element_or_selector;
      }
      if (typeof element_or_selector === "string") {
        return $(element_or_selector);
      }
        
      throw "Carousel constructor must be initialized with a jquery element or selector.";
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
      if (!this.config.arrows) {
        return;
      }

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

})(jQuery, CHICKENFEED);

/*jQuery(function() {


  jQuery("*").focus(function() {
    console.warn('focus:');
    console.warn(this);
  })
})*/