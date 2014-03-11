(function($, IBM) {
  IBM.Common.Widget.MobileMenu = (function() {
  	function whenMastheadLinksAvailable(callback) {
      var mLinksCheckFunction = function() {
        if (jQuery('#ibm-menu-links').children('li').eq(1).length) {
          clearInterval(checkMLinksExist);

          callback();
        }
      };

  	  // Loop till masthead links are available.  When available, prepend them to #m-shift
      window.checkMLinksExist = setInterval(mLinksCheckFunction, 200); // check every 200ms      		
  	}

  	function insertPushMenuWrapperHtml() {
	  if(jQuery('#ibm-top').length > 0) {
	    jQuery('#ibm-top').wrap('<div id="m-wrap"><div class="m-shift" id="m-shift"><div class="m-content"></div></div></div>');
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
      window.mobileMenuMain = new mlPushMenu( 
        document.getElementById( 'm-menu' ), 
        document.getElementById( 'm-main-menu' ), 
        document.getElementById( 'm-navigation' ),
        {
        	onClose: function() {
        		window.accordion.reset();
        	}
        }
      );
  	}

  	function insertLocalMenuHtml() {
      	// Duplicate & inject the local nav html
      	var tabContent = $(
      						'<div id="m-local-menu">'
      							+ '<h2>' + $("h1").html() + '</h2>'
			          			+ $('#ibm-primary-tabs').html()					          		
			          		+ '</div>'
		          		).clone();

      	tabContent.find("ul").removeClass("ibm-tabs");
        tabContent.appendTo("#m-menu-scroll");

        $("#m-menu-scroll")
        	.find("h2").addClass("icon-arrow-right")
        	// .each(function(i,el) {
        	// 	$(this).html( '<a href="#">' + $(this).text() + '</a>' );
        	// });

  	}

  	function initLocalMenu() {
        // Create the accordion
        window.accordion = new IBM.Common.Widget.Accordion({
          container: "#m-menu-scroll"
        });	  		
  	}

  	return {
  		whenMastheadLinksAvailable: whenMastheadLinksAvailable,
  		insertPushMenuWrapperHtml: insertPushMenuWrapperHtml,
  		insertHamburgerHtml: insertHamburgerHtml,
  		insertMobileMenuHtml: insertMobileMenuHtml,
  		initPushMenu: initPushMenu,
  		insertLocalMenuHtml: insertLocalMenuHtml,
  		initLocalMenu: initLocalMenu
  	};
  })();
})(jQuery, CHICKENFEED);
