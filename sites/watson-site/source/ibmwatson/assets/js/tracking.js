
(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	(function () {

		IBM.watson.tracking = {

			init: function () {

				var my = IBM.watson.tracking;

				my.evGroup = 'default'; // page name as defined by analytics
				my.$scenes = $('.scene');
				my.handleEvents();
			},

			/**
			 * define events sitewide and page-specific
			 */
			handleEvents: function () {

				var my = IBM.watson.tracking,
					page = $('#ibm-content-main').attr('class');

				//bind sitewide events
				$('#sideNav a, #watson-footer a').on('click',function(){
					my.trackEvent(false, 'menu', 'click', $(this).data('evname'));
				});
				$('#menu, .closeBtn').on('click',function(){
					my.trackEvent(false, 'menu', 'click', IBM.watson.siteNav.isOpen ? 'nav-collapse' : 'nav');
				});


				//define individual page events

				//index.html
				if (/watson-home/i.test(page)) {
					my.evGroup = 'index';
				}

				//watson-hq.html
				else if (/watson-news/i.test(page)) {
					my.evGroup = 'home'; // this is correct per analytics matrix
				}

				//tech.html
				else if (/watson-tech/i.test(page)) {
					my.evGroup = 'about'; // this is correct per analytics matrix
				}

				//about.html
				else if (/watson-about/i.test(page)) {
					my.evGroup = 'abouthome';
				}

				//ecosystem.html
				else if (/watson-ecosystem/i.test(page)) {
					my.evGroup = 'deveco';
				}

				//work.html
				else if (/watson-work/i.test(page)) {
					my.evGroup = 'work';
				}

				//developers.html
				else if (/watson-developers/i.test(page)) {
					my.evGroup = 'devhome';
				}

				//team.html
				else if (/watson-team/i.test(page)) {

					var $teamSlides = $('#teamSlideShow').find('.slide');

					my.evGroup = 'team';

					$teamSlides.each(function () {
						var self = this;

						$(this).find('.icon-linkedin').on('click', function () {
							var name = $(self).find('.name').html();
							my.trackEvent(true, 'linkedin', 'click', name);
						});
					});
				}

				//challenge.html
				else if (/watson-mdc/i.test(page)) {

					var $details = $('details');
					my.evGroup = 'dev';

					$details.on( 'open.details', function() {
						var ev = $(this).closest(my.$scenes).data('ev');

						my.trackEvent(true, ev, 'expand', $(this).data('evname'));
					});
				}

				//fire page load evt
				my.trackEvent(true, 'page', 'load', '');

				//handle scroll tracking
				my.trackScenes();

				//general link handler
				$('.scene').find('a').on('click',function(){
					var ev = $(this).closest(my.$scenes).data('ev');
					if (ev) {
						my.trackEvent(true, ev, 'click', $(this).data('evname'));
					}
				});

				//slideshows
				$('.slideShow, .bx-watson-slideshow').each(function(){
					my.handleCarouselNav(this);
				});

				//accordions
				$('.accordion-head').each(function(){
					my.trackAccordion(this);
				});

			},

			/**
			 * accordion expand
			 * @param el the accordion header
			 */
			trackAccordion: function(el) {

				var my = IBM.watson.tracking,
					$accordion = $(el);

				$accordion.on('click', function(){
					var self = this;
					$(window).on('accordion-change',function(){
						var evname = $(self).data('evname'),
							ev = $(self).data('ev');
						if (evname && $(self).is('.open')) {
							my.trackEvent(true, ev, 'click', evname);
						}
						$(window).off('accordion-change');
					});
				});

			},

			/**
			 * prev and next carousel arrows
			 * @param el the carousel
			 */
			handleCarouselNav: function (el) {


				var my = IBM.watson.tracking,
					$carousel = $(el),
					ev = $(el).closest(my.$scenes).data('ev'),
					$prev,
					$next,
					prevCount = 0,
					nextCount = 0;

				setTimeout(function(){ //wait for bxslider to load :/

					$prev = $carousel.find('[class*="prev"]');
					$next = $carousel.find('[class*="next"]');
					$prev.on('click', function () {
						prevCount++;
						my.trackEvent(true, ev, 'click', 'left' + prevCount);
					});
					$next.on('click', function () {
						nextCount++;
						my.trackEvent(true, ev, 'click', 'right' + nextCount);
					});
				}, 1000);

			},

			/**
			 * track which sections scroll above the viewport
			 */
			trackScenes: function () {

				var my = IBM.watson.tracking;

				my.$scenes.each(function(){

					var self = this,
						ev = $(self).data('ev');

					if (ev) {
						$(self).waypoint(function(){
							my.trackEvent(true, ev, 'scroll', 'top');
							$(self).waypoint('destroy');
						}, {
							offset: -50 //fire when top of el is 50px above viewport per analytics team
						});
					}
				});

				// refresh when docheight changes
				$(window).on('accordion-change', function(){
					$.waypoints('refresh');
				});
			},

			/**
			 * fire ibm tracking according to their api
			 * @param trackEvGroup
			 * @param ev
			 * @param evaction
			 * @param evname
			 */
			trackEvent: function (trackEvGroup, ev, evaction, evname) {

				var my = IBM.watson.tracking,
					ibmEvName = [ ev, evaction ];

				if (evname && (evname.length > 0)) {
					ibmEvName.push(evname);
				}

				if (trackEvGroup) {
					ibmEvName.unshift(my.evGroup);
				}
				var trackingObject = {
					'ibmEvGroup': my.evGroup,
					'ibmEV': ev,
					'ibmEvAction': evaction,
					'ibmEvName': ibmEvName.join('_')
				};

				if (document.location.search === '?logtracking=1') {
					console.log(trackingObject);
				}
				ibmStats.event(trackingObject);
			}
		}

	})();

	$(IBM.watson.tracking.init);

}(jQuery));