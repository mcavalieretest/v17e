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
      autoScroll: false,
      autoScrollInterval: 5000,
      freeScroll: false,
      wrapAround: false,  // Seamless autoscrolling (always scrolls in the same direction, even on the last slide)
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

    // Require an html ID on the container. We'll need this to generate unique IDs safely for other elements (like the scroll container, for aria attributes). 
    if (!this.element.attr("id")) { throw "The Carousel widget requires that the element with the .ibm-carousel class have an ID attribute. Please add one."; }

    // Use the data object for dynamic temporary stuff: event handlers, slide content, etc. 
    this.data = {slides: [], handlers: {}};

    if (this.config.slides) {
      this.data.slides = $.extend(true, [], this.config.slides);
    }
    else if (this.config.items) {
      this.data.slides = [
        { items: $.extend(true, [], this.config.items) }
      ];
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
    buildHtml: function(items) {
      var self = this,
          html = '';

      html += '<div class="ibm-container-body">';

      $.each(self.data.slides, function(i, slide) {
        html += '<div class="ibm-columns">';
          var columnClass = self.columnClass(slide.items);

          $.each(slide.items, function(j, item) {
            html += '<div class="' + columnClass + '">';
            html += item.content;
            html += '</div>';
          });
        html += '</div>';
      });

      html += '</div>';

      self.data.html = html;

      self.element.append(html);
    },

    columnClass: function(cols) {
      switch(cols.length) {
        case 1: 
          return "ibm-col-1-1";
        case 3:  
          return "ibm-col-6-2";
        case 5: 
          return "ibm-col-5-1";
        case 6:  
          return "ibm-col-6-1";
        default: 
          return "ibm-col-6-2";
      }
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

    addItemSequentially: function(item) {
      if (typeof this.config.columns == "undefined") {
        throw "To use carousel.addItemSequentially(), you must specify a number of columns in the columns: property of your options object.";
      }

      if (
        this.data.slides.length == 0
        || this.data.slides[this.lastSlideIndex()].items.length >= this.config.columns
      ) {
        this.addSlide({ items: []})
      }

      this.addItem(item, this.lastSlideIndex());
    },

    /**
     * Add a slide and its content items. 
     * 
     * @param {[type]} slide
     */
    addSlide: function(slide) {
      this.data.slides.push(slide);
    },

    /**
     * Add multiple slides and their content items.
     * 
     * @param {[type]} slides
     */
    addSlides: function(slides) {
      for (var i=0; i < slides.length; i++) {
        this.addSlide(slides[i]);
      }
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
      this.initAutoScroll();
    },

    /**
     * Inject important html if it doesn't exist, and add accessibility attributes. 
     */
    initHtml: function() {
      var self = this;

      if (!this.config.init) {
        this.buildHtml();
      }

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

      // The scroll container gets a unique id, based on the main element's id.
      if (typeof(this.scrollContainer.attr("id")) == "undefined") {
        this.scrollContainer.attr("id", this.element.attr("id") + "-scroll-container");
      }

      this.loadPages();

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
          html += '<a href="#' + self.slideId(i) + '" role="button" aria-controls="'+self.scrollContainer.attr("id")+'" tabindex="'+tabindex+'">Show carousel '+(i+1)+'</a>';
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
        page.attr("id", self.slideId(i));
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

    initAutoScroll: function() {
      var self = this;

      if (!this.config.autoScroll) { return; }

      this.data.autoScrollInterval = setInterval(function() {
        self.nextAuto();
      }, this.config.autoScrollInterval);  

      if (!this.config.freeScroll) {
        // if user moves mouse over ribbon area, we should disable interval - it should not circle on its own, give control to user
        this.data.handlers.mouseenter = function(e) {
          clearInterval(self.data.autoScrollInterval);
        };
        this.data.handlers.mouseleave = function(e) {
          e.stopPropagation();

          clearInterval(self.data.autoScrollInterval);
          self.data.autoScrollInterval = setInterval(function(){
            self.nextAuto();
          }, self.config.autoScrollInterval);
        };
        this.data.handlers.resize = function(e) {
          clearInterval(self.data.autoScrollInterval);
        };

        // when user moves out of ribbon area, we should enable interval again
        this.element.hover(self.data.handlers.mouseenter, self.data.handlers.mouseleave);

        // also, make sure we do not autoscroll while resizing window, it looks very ugly
        $(window).resize(self.data.handlers.resize);
      }
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
          ENTER_CODE = 13,
          SPACE_CODE = 32;

      switch(e.keyCode) {
        case LEFT_ARROW_CODE:
          self.handleLeftArrowKey(e);
          break;

        case RIGHT_ARROW_CODE:
          self.handleRightArrowKey(e);
          break; 

        case SPACE_CODE:
          self.handleSpaceBar(e);
          break;

        default: 
          return;
      }
    },

    handleLeftArrowKey: function(e) {
      var self      = this,
          $activeEl = $(document.activeElement);
      
      if ($activeEl.is(this.config.paginationContainerSelector + " > a")) {
        var index = self.paginationLinks.index($activeEl);

        self.focusPaginationLink(self.getPrevPaginationIndex(index));
      }
    },

    handleRightArrowKey: function(e) {
      var self      = this,
          $activeEl = $(document.activeElement);

      if ($activeEl.is(this.config.paginationContainerSelector + " > a")) {
        var index = self.paginationLinks.index($activeEl);

        self.focusPaginationLink(self.getNextPaginationIndex(index));
      }
    },

    handleSpaceBar: function(e) {
      var self      = this,
          $activeEl = $(document.activeElement);

        if($activeEl.is(this.config.paginationContainerSelector + " > a")) {
          e.preventDefault();

          var index = self.paginationLinks.index($activeEl),
              $controlEl = $("#"+$activeEl.attr("aria-controls"));

          self.goToPage(index);

          $activeEl.blur();
          $controlEl.focus();
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

    /**
     * Grab and save the list of slide elements. 
     * 
     * @return {[type]} [description]
     */
    loadPages: function() {
      this.pages = this.scrollContainer.children();
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

    /**
     * Animate to the selected page, toggle/refresh UI components. 
     * 
     * @param  {[type]}   index    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    goToPage: function(index, callback) {
      var self = this,
          newLeft;

      this.currentPage = index;
      this.toggleArrowVisibility();
      this.refreshPagination();

      newLeft = this.newCssLeftPosition(index);

      var complete = function() {
        var targetSlide = self.pages.eq(self.currentPage).find('[role=document]')[0];

        targetSlide.focus();

        if (typeof callback != "undefined") {
          callback();
        }
      };

      this.animateTo(newLeft, complete);
    },

    next: function(callback) {
      var page = this.nextPageIndex();
      this.goToPage(page, callback);
    },

    prev: function(callback) {
      var page = this.prevPageIndex();
      this.goToPage(page, callback);
    },

    nextAuto: function() {
      var self = this;
      this.next(function() {
        // self.rearrangePages();
      });
    },

    nextPageIndex: function() {
      return (this.currentPage+1 > this.pages.length-1 ? 0 : this.currentPage+1);
    },

    prevPageIndex: function() {
      return (this.currentPage-1 < 0 ? this.pages.length-1 : this.currentPage-1);
    },

    newCssLeftPosition: function(index) {
      // Note the 20 pixel offset to acommodate the margin on ibm-col-* items.
      return -((this.panelWidth+20) * index);
    },

    animateTo: function(newLeft, callback) {
      if (this.useTransitions) {
        var eventName = IBM.Common.Util.transitionEndEventName();
        this.scrollContainer.one(eventName, callback);
        this.scrollContainer.css({"left": newLeft});
      } else {
        this.scrollContainer.animate({"left": newLeft}, 1000, callback);
      }
    },

    /**
     * Take the slide currently in the first position, and move it to the last position. 
     * Used to support wraparound. 
     * 
     * @return {[type]} [description]
     */
    rearrangePages: function() {
      this.pages.first().after(this.pages.last());
      this.loadPages();
    },

    slideId: function(index) {
      return this.element.attr("id") + "-slide-" + index;
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
