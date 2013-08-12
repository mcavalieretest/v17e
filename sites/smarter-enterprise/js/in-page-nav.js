var is_iOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);

$(document).ready(function() {

	var current_page;

    $("#in-page-nav-1 a").click(function(e){

		e.preventDefault();

		var dest = 0;

		if ($(this.hash).offset().top > $(document).height()-$(window).height()){

			dest = $(document).height()-$(window).height();

		} else {

			dest = $(this.hash).offset().top;

		};

		current_page = $(this).attr("href");
		$('html, body').animate({
			scrollTop: dest
		}, 1000,'swing', function() {
			if(current_page != location.hash) {
				location.hash = current_page;
			}
		});

	});

    // Only apply hover class to non-touch devices
	if(!Modernizr.touch){
		
		$("#in-page-nav-1 a").each(function(){

			$(this).addClass('no-touch-hover');

		});
	}

	// Desktop Bottom of Section Tracking using waypoints
	if(!is_iOS){
		var opts = {
    	offset: '100%'
		};

		$('.endwaypoint').waypoint(function(direction) {
		    
		    var id = $(this).attr('id'),
		    	hash = '#'+id.replace('-end', '');

		    if(direction === 'down') {
		    	
		    	// Track Bottom Of Section
				trackScrollEvent(hash, 'end');
		       
		    }else{
		    	// Update Sticky Nav Bar
		    	updateInPageNav(hash);
				// Track Bottom Of Section
				trackScrollEvent(hash, 'end');
		    }
		    
		}, opts);

	}
	

});

$(window).load(function() {

	updateInPageNav(document.location.hash);

});

var lastScrollTop = 0;

$(window).scroll(function() {

	var currentScrollTop = $(this).scrollTop();

	if (currentScrollTop > lastScrollTop){
       // scroll down
       checkForNewSection('down');

 	} else {
      // scroll up
      checkForNewSection('up');
	}

	lastScrollTop = currentScrollTop;

});

function updateInPageNav(hash) {

	var expectedNavElement = $("#in-page-nav-1 a[href='" + hash + "']");

	if (expectedNavElement.length != -1) {

		$("#in-page-nav-1 li").removeClass("active");

		$(expectedNavElement).parent().addClass("active");

		// Mobile Sticky Nav Bar - Keep Selected Item in Viewport
		var windowWidth = $(window).width(),
			margin = (windowWidth > 980) ? (windowWidth-980)/2 : 0;

		if(expectedNavElement.length > 0 ){

			var activeXPosition = expectedNavElement.offset().left,
				rightEdgeOfScreen = windowWidth - expectedNavElement.width() - margin;
			
			if( activeXPosition < 50 + margin ){

				$('.left-side').trigger('click');

			}

			else if( activeXPosition > rightEdgeOfScreen ){

				$('.right-side').trigger('click');

			}

		}

	};

};

var sectionInView = '',
	sectionAboveTheTop,
	$window  = $(window),
	navHeight = $('.in-page-nav-1').height();

// create array of hero images
var hero_images = [];
$.each($('.hero-photo'), function() {
	hero_images.push($(this).attr('id'));
});
var hero_length = hero_images.length, inview_idx;


function checkForNewSection(direction) {

	var inview = "#undefined", abovethetop = "#undefined", inviewEl, distance = 0;

	$.each(hero_images, function(idx) {
		if($('#' + this + ':in-viewport').length) {
			inview_idx = idx;
			inview = "#" + String(this);
			abovethetop = "#" + String(hero_images[idx - 1]);
			inviewEl = $(inview);
			return false;
		}
	});
	
	if (inview != "#undefined" && direction === 'down') {

		distance = inviewEl.offset().top - (110 + navHeight);

		if ( $window.scrollTop() >= distance && sectionInView != inview) {
        	// element has reached the top
        	sectionInView = inview;

        	updateInPageNav(inview);
        	// Track Top of Section
       		trackScrollEvent(inview, 'start');

    	}
    	
    	if (sectionAboveTheTop != abovethetop && is_iOS){

			sectionAboveTheTop = abovethetop;

			// Track Bottom Of Section
			trackScrollEvent(abovethetop, 'end');

		}

	}else if (inview != "#undefined" && direction === 'up'){

		distance = inviewEl.offset().top + (110 + navHeight);

		if ( $window.scrollTop() <= distance && sectionInView != inview) {
        	// element has reached the top
        	sectionInView = inview;
        	
        	updateInPageNav(inview);
        	// Track Top of Section
       		trackScrollEvent(inview, 'start');

    	}

	} else if ( inview === "#undefined"  && direction === 'up' && is_iOS){
	
		abovethetop = "#" + String(hero_images[inview_idx - 1]);
		
		if (sectionAboveTheTop != abovethetop){
			
			sectionAboveTheTop = abovethetop;

			updateInPageNav(abovethetop);
			// Track Bottom Of Section
			trackScrollEvent(abovethetop, 'end');
		}

	} else if($window.scrollTop() > $(document).height() - $(window).height() - 200 ) {

		if(is_iOS){
			var inview_hash = "#" + hero_images[inview_idx];
			trackScrollEvent(inview_hash, 'end');
		}
		
		sectionInView = hero_images[inview_idx];

	}
	
	// If scroll ends in middle of section content
	if( is_iOS ){

		if(inview === "#undefined"){
			abovethetop = '#'+ $('.hero-photo:above-the-top:last').attr('id');
			updateInPageNav(abovethetop);
		}

	}
};



// Viewport Selectors for jQuery
// http://www.appelsiini.net/projects/viewport

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($) {

    $.belowthefold = function(element, settings) {
        var fold = $(window).height() + $(window).scrollTop();
        return fold <= $(element).offset().top - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var top = $(window).scrollTop();
        return top >= $(element).offset().top + $(element).height() - settings.threshold;
    };

    $.rightofscreen = function(element, settings) {
        var fold = $(window).width() + $(window).scrollLeft();
        return fold <= $(element).offset().left - settings.threshold;
    };

    $.leftofscreen = function(element, settings) {
        var left = $(window).scrollLeft();
        return left >= $(element).offset().left + $(element).width() - settings.threshold;
    };

    $.inviewport = function(element, settings) {
        return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
    };

    $.extend($.expr[':'], {
        "below-the-fold": function(a, i, m) {
            return $.belowthefold(a, {threshold : 0});
        },
        "above-the-top": function(a, i, m) {
            return $.abovethetop(a, {threshold : 0});
        },
        "left-of-screen": function(a, i, m) {
            return $.leftofscreen(a, {threshold : 0});
        },
        "right-of-screen": function(a, i, m) {
            return $.rightofscreen(a, {threshold : 0});
        },
        "in-viewport": function(a, i, m) {
            return $.inviewport(a, {threshold : 0});
        }
    });


})(jQuery);