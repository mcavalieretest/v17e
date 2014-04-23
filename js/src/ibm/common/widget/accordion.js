(function($, IBM) {


  IBM.Common.Widget.Accordion = function(opts) {
    this.init(opts);
  };

  IBM.Common.Widget.Accordion.prototype = {
    init: function(opts) {
      var defaults = {},
          self     = this;

      this.options = $.extend({}, defaults, opts);
      this.container = $(this.options.container);

      function toggleList(list) {
        var target  = list,
            heading = target.prev("h2");

        // If we're closing this list, close my children too. 
        if (target.hasClass("active")) {
          target = target.find("ul").andSelf();
          target.removeClass("active");
          heading.removeClass("active");
        } else {
          target.addClass("active");
          heading.addClass("active");

        }
      }



      this.container.on("click", "h2", function(e) {
        var target = $(this).next("ul");

        toggleList(target);
      });

/*
      this.container.on("click", "a", function(e) {
        e.preventDefault();

        // Some other events on top of this are making this respond slowly;
        // calling stopPropagation() partially resolves this. 
        e.stopPropagation(); 

        var target = $(this).next("ul");

        toggleList(target);
      });
      */
    },

    reset: function() {
      this.container
        .find("h2,ul").removeClass("active");
    }

    
  };

  IBM.Common.Widget.MobileMenu = (function() {
    var minViewportWidth = 800;

    function whenMastheadLinksAvailable(callback) {
      var mLinksCheckFunction = function() {
        if (jQuery('#ibm-menu-links').children('li').eq(1).length) {
          clearInterval(IBM.CurrentPage.checkMLinksExist);

          callback();
        }
      };

      // Loop till masthead links are available.  When available, prepend them to #m-shift
      IBM.CurrentPage.checkMLinksExist = setInterval(mLinksCheckFunction, 200); // check every 200ms             
    }

    function insertPushMenuWrapperHtml() {
      if(jQuery('#ibm-top').length > 0) {
        jQuery('#ibm-top').wrap('<div id="m-wrap"><div id="m-shift" class="m-shift"><div class="m-content"></div></div></div>');
      }
    }

    function insertHamburgerHtml() {
      // Hamburger icon, for toggling mobile nav.
      jQuery('#ibm-universal-nav').append('<p id="m-open-link"><a href="#" id="m-navigation">Mobile navigation</a></p>');
    }

    function insertMobileMenuHtml() {
     // Inject the mobile menu html
     var mastLinks = jQuery('#ibm-menu-links').html();
     
      jQuery('#m-shift').prepend(
        '<div id="m-menu" class="m-menu">'
        +'<div id="m-search-module">'
        +'<form id="m-search-form" action="http://www.ibm.com/Search/" method="get">'
        +'<input id="m-q" value="" maxlength="100" name="q" type="text" placeholder="search ibm.com" />'
        +'<input type="submit" id="m-search" class="ibm-btn-search" value="Submit"/>'
        +'</form>'
        +'</div>'

        +'<div id="m-menu-scroll">'            
          +'<div id="m-main-menu">'
            +'<h2>IBM.com</h2>'
            +'<ul>' + mastLinks + '</ul>'
          +'</div>'
          +'</div>'
        +'</div>'
      );            
    }

    function initPushMenu() {
      // Push menu for showing/hiding container
      IBM.CurrentPage.mobileMenuMain = new mlPushMenu( 
        document.getElementById( 'm-menu' ), 
        document.getElementById( 'm-main-menu' ), 
        document.getElementById( 'm-navigation' ),
        {
            onOpen: function() {
                if (IBM.CurrentPage.accordion) {
                    IBM.Common.Widget.MobileMenu.expandDefaultMenu();
                }
            },
            onClose: function() {
                if (IBM.CurrentPage.accordion) {
                    IBM.CurrentPage.accordion.reset();
                }
            }
        }
      );

      // Close the menu automatically when the viewport gets too wide. 
      $(window).resize(function() {
        if ( $(window).width() > minViewportWidth ) {
          IBM.CurrentPage.mobileMenuMain._resetMenu(false);
        }

        // Reposition the hamburger when resizing the page. 
        // TODO - handle with CSS when megamenu.js has been ported
        //  to jQuery. Currently impossible since the dojo version 
        //  repositions the #ibm-masthead when scrolling.
        setHamburgerPosition();
      });

      $(window).scroll(function() {
        setHamburgerPosition();
      });

      // Search placeholder text polyfill for IE9.
      if(!Modernizr.input.placeholder){
        $('#m-q').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }).blur();

        $('#m-q').parents('form').submit(function() {
          $(this).find('[placeholder]').each(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
          }
          });
        });
      }

      // Set the initial position
      setHamburgerPosition();
    }

    function insertLocalMenuHtml() {
        // Duplicate & inject the local nav html
        var tabContent = $(
                            '<div id="m-local-menu">'
                                + '<h2>' + $("h1").html() + '</h2>'
                                + '<ul>'
                                  + $('#ibm-primary-tabs .ibm-tabs').html()
                                + '</ul>'
                            + '</div>'
                        );

        tabContent.find("ul").removeClass("ibm-tabs");
        tabContent.appendTo("#m-menu-scroll");
    }

    function initAccordion() {
        // Create the accordion
        IBM.CurrentPage.accordion = new IBM.Common.Widget.Accordion({
          container: "#m-menu-scroll"
        });         
    }

    function expandDefaultMenu() {
      setTimeout(function(){
        var targets;

        if ( $("#m-local-menu").length ) {
          targets = $("#m-local-menu").children("h2,ul");
        } else {
          targets = $("#m-main-menu").children("h2,ul");
        }

        targets.addClass("active");
      }, 250);
    }

    function setHamburgerPosition() {
      var hamb   = $("#m-open-link"),
          offset = Math.abs( $(window).width() - hamb.offsetParent().width() ) - $(window).scrollLeft();

      hamb.css("right", offset + "px");
    }

    function init() {
      // Allow site owners to disable the menu via html.
      if ( $("html").hasClass("m-menu-disabled") ) { return; }

      insertPushMenuWrapperHtml();

      whenMastheadLinksAvailable(function() {
        insertMobileMenuHtml();
        insertHamburgerHtml();
        initPushMenu();
          
        if ($('#ibm-primary-tabs').length) {
          insertLocalMenuHtml();
        }

        initAccordion();
      });
    }

    return {
        whenMastheadLinksAvailable: whenMastheadLinksAvailable,
        insertPushMenuWrapperHtml: insertPushMenuWrapperHtml,
        insertHamburgerHtml: insertHamburgerHtml,
        insertMobileMenuHtml: insertMobileMenuHtml,
        initPushMenu: initPushMenu,
        insertLocalMenuHtml: insertLocalMenuHtml,
        initAccordion: initAccordion,
        expandDefaultMenu: expandDefaultMenu,
        init: init
    };
  })();

})(jQuery, CHICKENFEED);
