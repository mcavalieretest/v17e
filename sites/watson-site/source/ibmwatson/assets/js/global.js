
(function($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	IBM.watson.uastring = window.navigator.userAgent.toLowerCase();
	IBM.watson.isMobile = (/iPhone|iPod|iPad|Android|BlackBerry/i).test(IBM.watson.uastring) || Modernizr.mq('(max-width: 579px)');
	IBM.watson.isSafari = (IBM.watson.uastring.indexOf('safari') > 0) && (IBM.watson.uastring.indexOf('chrome') < 1); // safari on all devices incorrectly reports html5 form validation support

}(jQuery));