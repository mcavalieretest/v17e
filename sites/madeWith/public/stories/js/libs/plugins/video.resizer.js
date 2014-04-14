(function($) {
	// Responsive videos
	// var all_videos = $( 'iframe[src^="http://www.youtube.com"], object, embed' );

	$(window)
		.resize( function() {

			var all_videos = $( 'iframe[src^="http://www.youtube.com"], object, embed' );

			/*
 			var viewportwidth;
 			var viewportheight;
  
			// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight

			if (typeof window.innerWidth != 'undefined')
			{
			  viewportwidth = window.innerWidth,
			  viewportheight = window.innerHeight
			}

			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)

			else if (typeof document.documentElement != 'undefined'
			 && typeof document.documentElement.clientWidth !=
			 'undefined' && document.documentElement.clientWidth != 0)
			{
			   viewportwidth = document.documentElement.clientWidth,
			   viewportheight = document.documentElement.clientHeight
			}

			// older versions of IE

			else
			{
			   viewportwidth = document.getElementsByTagName('body')[0].clientWidth,
			   viewportheight = document.getElementsByTagName('body')[0].clientHeight
			}
			*/

			var newWidth = $(window).width();
			var newHeight = newWidth * 0.5625;

			all_videos.each(function() {
				var el = $(this);
				el
					.removeAttr( 'height' )
					.removeAttr( 'width' )
					.width( newWidth )
			    	.height( newHeight );
			} );

			// console.log('video.resizer.js - onWindowResize() - newWidth: '+newWidth+'; newHeight: '+newHeight);
		} )
		.resize();
})(jQuery);