// Browser detection. Yes, really. Guess for which browser? Nope! Chrome.
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);

var animate = false;

$(document).ready(function(){

	$('.IBMSE-container').on('dblclick', function() {

		$(this).toggleClass('grid');

	});

	$("#in-page-nav-1").sticky();




	$(".in-page-nav").noSelect().on("click", ".thumb-nav", function() {

		triggerThumbNav(this);

	});

	$(".csstransitions .in-page-nav li:first-of-type").on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", function() {

		$(this).data("transitioning", false);

	});






});

/*function matrixToArray(matrix) {
	return matrix.substr(7, matrix.length - 8).split(', ');
}*/

$(window).setBreakpoints({
// use only largest available vs use all available
	distinct: true,
// array of widths in pixels where breakpoints
// should be triggered
	breakpoints: [
		1,
		640
	]
});

$(window).bind('enterBreakpoint600',function() {



});

// sticky nav carousel

var itemType = "li";

$(window).resize(function() {

	if ($(".in-page-nav").length != 0) {

		resetThumbNavs();

	};

});

$(window).load(function() {

	if ($(".in-page-nav").length != 0) {

		resetThumbNavs();

	};

});

function resetThumbNavs() {

	$(".in-page-nav").each(function(index) {

		scroller = $(this).attr("id");
		positionMaster = $("#" + scroller + " " + itemType + ":first-of-type");
		scrollPosition = parseInt(positionMaster.css("margin-left"));
		scrollDistance = parseInt(positionMaster.css("margin-right")) + parseInt(positionMaster.width());
		collectionCount = parseInt($("#" + scroller + " " + itemType).length);
		collectionWidth = collectionCount * scrollDistance;
		containerWidth = $("#" + scroller).width();
		viewportHolds = Math.floor(containerWidth / scrollDistance);
		offLeftItems = 0 - (scrollPosition / scrollDistance);
		offRightItems = collectionCount - offLeftItems - viewportHolds;

		navElements = "<div data-for='in-page-nav-" + (index + 1) + "' class='thumb-nav right-side'></div>";
		navElements += "<div data-for='in-page-nav-" + (index + 1) + "' class='thumb-nav left-side'></div>";

		if ($("#" + scroller).hasClass("inactive")) { // first time?

			$("#" + scroller).addClass("beginning").removeClass("inactive").append(navElements);

		};

		if ((offLeftItems < 1) && (offRightItems < 1)) { // if all existing items are visible

			$("#" + scroller).addClass("beginning end");

		} else if ((offLeftItems < 1) && (offRightItems > 0)) { // if we're at the beginning and some are hidden off right

			$("#" + scroller).addClass("beginning");
			$("#" + scroller).removeClass("end");

		} else if ((offLeftItems > 0) && (offRightItems < 1)) { // if we're at the end and some are hidden off left

			$("#" + scroller).addClass("end");
			$("#" + scroller).removeClass("beginning");

		} else {

			$("#" + scroller).removeClass("beginning end");

		};

	});

};

function triggerThumbNav(which) {

	scroller = $(which).attr("data-for");
	positionMaster = $("#" + scroller + " " + itemType + ":first-of-type");
	scrollPosition = parseInt(positionMaster.css("margin-left"));
	scrollDistance = parseInt(positionMaster.css("margin-right")) + parseInt(positionMaster.width());
	collectionCount = parseInt($("#" + scroller + " li").length);
	collectionWidth = collectionCount * scrollDistance;
	containerWidth = $("#" + scroller).width();
	viewportHolds = Math.floor(containerWidth / scrollDistance);
	offLeftItems = 0 - (scrollPosition / scrollDistance);
	offRightItems = collectionCount - offLeftItems - viewportHolds;

	if (!positionMaster.data("transitioning")) { // is the carousel not in the midst of a transition?

		if ($(which).hasClass("right-side")) {

			newPosition = scrollPosition - scrollDistance;

			if (offRightItems > 0) {

				$("#" + scroller).removeClass("beginning");

				if(!Modernizr.csstransitions) {

					positionMaster.animate({marginLeft: newPosition});

				} else {

					positionMaster.data("transitioning", true).css("margin-left", newPosition);

				};

				if (offRightItems == 1) {

					$("#" + scroller).addClass("end");

				};

			};

		};

		if ($(which).hasClass("left-side")) {

			newPosition = scrollPosition + scrollDistance;

			if (offLeftItems != 0) {

				$("#" + scroller).removeClass("end");

				if(!Modernizr.csstransitions) {

					positionMaster.animate({marginLeft: newPosition});

				} else {

					positionMaster.data("transitioning", true).css("margin-left", newPosition);

				};

				if (offLeftItems == 1) {

					$("#" + scroller).addClass("beginning");

				};

			};

		};

	};

};


/*! http://mths.be/noselect v1.0.3 by @mathias */
jQuery.fn.noSelect=function(){var a='none';return this.bind('selectstart dragstart mousedown',function(){return false}).css({MozUserSelect:a,msUserSelect:a,webkitUserSelect:a,userSelect:a})};


var alertFallback = true;
 if (typeof console === "undefined" || typeof console.log === "undefined") {
   console = {};
   if (alertFallback) {
       console.log = function(msg) {
          // alert(msg);
       };
   } else {
       console.log = function() {};
   }
 }