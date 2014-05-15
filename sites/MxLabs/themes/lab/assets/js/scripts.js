(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
		
		// DOM ready, take it away
		
        // Start Slick
        $('.post-slider').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1
        });

	});
	
})(jQuery, this);
