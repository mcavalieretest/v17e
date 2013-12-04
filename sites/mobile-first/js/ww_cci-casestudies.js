/*
 * Name: Smarter Planet v17e customization JS file
 * Version: 1.0
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 * Copyright (c) 2013 IBM Corporation
 */

// URI: www.ibm.com/common/v17e/smarter-planet/js/ww_cci.js
// Description: JS Customization for Smarter Planet
// Author: [Name and Lotus Notes address of JS author]
// Date: [Date of file edits] (e.g. July 30, 2013)
//

var IBMMobileFirst = IBMMobileFirst || {};

/**
 * Namespace function, safely creates a namespace without clobbering existing objects
 * @param {String} namespace A string in the form of 'IBMMobileFirst.SE.package.subpackage'
 * @returns {Object}
 */
IBMMobileFirst.namespace = function( namespaceString ){
  var parts = namespaceString.split( '.' ),
    parent = window,
    currentPart = '';

  for( var i = 0, length = parts.length; i < length; i++ ){
    currentPart = parts[i];
    parent[currentPart] = parent[currentPart] || {};
    parent = parent[currentPart];
  }

  return parent;
}

IBMMobileFirst.Site = function() { this.init(); };
IBMMobileFirst.Timeline = function() { this.init(); };
IBMMobileFirst.Tracking = function() { this.init(); };


// remap jQuery to $
(function($){
				
	//custom js for site
	
	
	IBMMobileFirst.Site.prototype = {
		init: function() {
			this.DEBUG = false;
			this.roleModules = $('.role-module');
			
			window.scrollTo(0,1);
			//initializing top role selector
			this.initRoleSelector();
			//initializing all role modules for the site
			this.initRoleModules();
			this.buildSliderSections();
			this.expandModules();
			this.Tracking = new IBMMobileFirst.Tracking();
			this.addTracking();
			
			
		},
		initRoleSelector: function() {
			var self = this;
			var currentRole = '',
				prevRole;
			var roleArray = ['Marketers','IT','Operations'];
			var totalModulesOnPage = self.roleModules.length;
			
			$('.ibm-role-link .roleSelector').on("click", function(){
				$.address.value($(this).attr('name'));  
			});
	
			$('.roleSelection ul li a').on("click", function(){
				var selfa = $(this);
				$.address.value($(this).attr('name'));  

				setTimeout(function(){
					$('html, body').animate({
							scrollTop: selfa.parent().parent().parent().parent().parent().next('.role-module').offset().top -100
						}, 500);
				},500);		
			});
			
			// url change event handling for role selections
			$.address.change(function(event) {  
	
				prevRole = currentRole;
				currentRole = event.value;
	
				$.ajax({
				url: "content/ottawa/roles.html",
				cache: false,
				dataType:'html'
				})
				.done(function( responseXML ) {	
					for(var i=1; i<=roleArray.length; i++){
						for(var j=1; j<=totalModulesOnPage; j++){
							var elementInResponse = $("<div>").html(responseXML).find('#' + roleArray[i-1] + 'Module' + j);
							if(elementInResponse.html() === undefined){
								$('#roleModule' + j).parent().parent().parent().prev('.roleSelection').find('a.'+ roleArray[i-1]).parent('li').hide();
							}else{}
						}
					}
	
					if(event.value != '/'){
						//load current role modules
						//update selected Module 
						$('.role-module-selected').show();
						$('.role-select-panel').hide();
						var roleSelectedResponse = $("<div>").html(responseXML).find('#'+ currentRole.substring(1) +'SelectedModule');
						$('#selectedRoleModule').html(roleSelectedResponse);
						$('.roleSelection.first').show();
						$('.role-module-selected').prev('.roleSelection').addClass('roleExpanded');
						$('.roleSelection p.label').html('Change role');
	
						for(var x=1; x<=totalModulesOnPage; x++){
							var index = x-1;
							var elementInResponse = $("<div>").html(responseXML).find('#' + currentRole.substring(1) + 'Module' + x);
							if(elementInResponse.html() === undefined){
								$('.role-module:eq('+ index +')').hide();
								$('#roleModule' + x).parent().parent().parent().prev('.roleSelection').removeClass('roleExpanded');
							}else{
								$('.role-module:eq('+ index +')').show();
								$('#roleModule' + x).html(elementInResponse);
								$('#roleModule' + x).parent().parent().parent().prev('.roleSelection').addClass('roleExpanded');
							}
						}
						

						
					}else{
						self.roleModules.hide();
						$('.roleSelection p.label').html('Select role');
					}
					//calling picturefill to handle responsive images for dynamic content
					picturefill();
					
				});
	
				$('.role-module, .role-module-selected').removeClass(prevRole.substring(1));
				$('.role-module, .role-module-selected').addClass(currentRole.substring(1));
				$('.roleSelection ul li a').removeClass('active');
				$( ".roleSelection ul li a" ).each(function( index ) {
					if($(this).hasClass('' +currentRole.substring(1))){
						$( this ).addClass('active');
					}
				});	
			});
			
			
		},
		initRoleModules: function() {
			var self = this;
			// assign click events for role module expandable panel
			self.roleModules.on("click", '.readMore', function(){
				var self= $(this);
				$(this).parent().parent().next('.expanded').slideDown( 300, function() {
				});
				
				setTimeout(function () { self.parent().parent().parent().prev().find('.role-img').addClass('full'); }, 150);
	
				$(this).parent().hide();
				$(this).parent().parent().next().find('.readLess').css('display','block');
			});
	
			self.roleModules.on("click", '.readLess', function(){
				var self = $(this);
				$(this).parent().parent().slideUp( 300, function() {
	
				});
				$(this).parent().parent().prev().find('.readMore').parent().show();
	
				$('html, body').animate({
					scrollTop: self.parent().parent().parent().parent().parent().parent().offset().top -200
				}, 0);
				setTimeout(function () { self.parent().parent().parent().prev().find('.role-img').removeClass('full'); }, 150);
				$(this).hide();
			});
		},
		buildSliderSections: function() {
			
			$(window).load(function() {
					$('.slider2').bxSlider({
						slideWidth: 300,
						minSlides: 1,
						maxSlides: 3,
						slideMargin: 20,
						useCSS: false,
					  	infiniteLoop: false,
					  	hideControlOnEnd: true,
					  	easing: 'swing',
					  	speed: 1000,
						touchEnabled: true,
						swipeThreshold: 50,
						oneToOneTouch: false,
						onSlideAfter:  function($slideElement, oldIndex, newIndex){		
							var el = $slideElement,
							 	evgroup = el.data('evgroup'),
								ev = el.data('ev'),
								evaction = el.data('evaction'),
							 	evname = el.data('evname');
							
							IBMMobileFirst.tracking.trackCustomEvent(evgroup, ev, evaction, evname);
						}
					});

					var industryslider = $('.industrySlider').bxSlider({
						minSlides: 1,
						maxSlides: 1,
						useCSS: false,
						infiniteLoop: false,
					  	hideControlOnEnd: true,
					  	easing: 'swing',
					  	speed: 1000,
						touchEnabled: true,
						swipeThreshold: 50,
						oneToOneTouch: false,
						adaptiveHeight: false
					});
			});
		
		},
		expandModules: function (){
			$('.ibm-col-6-4 .readMore, .rightPanel .readMore').on("click", function(){
					$(this).parent().parent().next('.expanded').show();
					$(this).parent().hide();
				});

				$('.ibm-col-6-4 .readLess, .rightPanel .readLess').on("click", function(){
					$(this).parent().parent().hide();
					$(this).parent().parent().prev().find('.readMore').parent().show();
					$(this).parent().parent().prev().find('.readMore').parent().focus();
				});
		
		},
		addTracking: function (){
			
			
			$('body').on("click", 'a', function(event){		
				IBMMobileFirst.tracking.trackClickEvent($(this));	
			});
			
			$('.waypoint').waypoint(function(direction) {
				
				 var el = $(this),
				 	evgroup = el.data('evgroup'),
					ev = el.data('ev'),
					evaction = el.data('evaction'),
				 	evname = el.data('evname');
		
				 IBMMobileFirst.tracking.trackCustomEvent(evgroup, ev, evaction, evname);
		
			}, {offset: 50});
			
		}
	}
	
	//timeline js
	
	IBMMobileFirst.Timeline.prototype = {
	
		init: function() {
			this.timelineFunctions();
			this.disableTextSelect();
			this.Tracking = new IBMMobileFirst.Tracking();
			this.timelineClasses = 'mobileFirst mobileSecond mobileThird mobileFourth mobileOffscreenBack mobileOffscreen first offscreen offscreenBack';
		},
		mobileTimelineInit: function(direction) {
			
			var self = this;
		
			maxHeight = window.innerHeight - 60;

			$('#timeline-container').css('max-height', maxHeight); // make sure the timeline fits in the viewport
			//$('.timeline-bubble').css('max-height', maxHeight - 80); // make sure the timeline fits in the viewport
			
			if (!direction) { // initial setup
				
				$('#timeline-container .slide .timeline-bubble').addClass('onscreen').each(function(index) {
				
					if (index === 0) {
						
						mobileClass = 'mobileFirst';
					
					} else if (index === 1) {
						
						mobileClass = 'mobileSecond';
						
					} else if (index === 2) {
						
						mobileClass = 'mobileThird';
						
					} else if (index === 3) {
						
						mobileClass = 'mobileFourth';
						
					} else {
						
						mobileClass = 'mobileOffscreenBack';
						
					};
				
					$(this).addClass(mobileClass);
				
				});
			
			} else if (direction === 'forward') {
				
				$('#timeline-container .slide .timeline-bubble.mobileFirst').removeClass('onscreen mobileFirst').addClass('mobileOffscreen');
					
				$('#timeline-container .slide .timeline-bubble.mobileSecond').removeClass('mobileSecond').addClass('mobileFirst');
				
				$('#timeline-container .slide .timeline-bubble.mobileThird').removeClass('mobileThird').addClass('mobileSecond');
				
				$('#timeline-container .slide .timeline-bubble.mobileFourth').removeClass('mobileFourth').addClass('mobileThird');
				
				$('#timeline-container .slide .timeline-bubble.mobileOffscreenBack').first().removeClass('mobileOffscreenBack').addClass('mobileFourth');
				
				IBMMobileFirst.tracking.trackClickEvent($('.timeline-bubble.mobileFirst').parent());
			
			} else if (direction === 'backward') {
					
				$('#timeline-container .slide .timeline-bubble.mobileFourth').first().removeClass('mobileFourth').addClass('mobileOffscreenBack');
				
				$('#timeline-container .slide .timeline-bubble.mobileThird').removeClass('mobileThird').addClass('mobileFourth');
				
				$('#timeline-container .slide .timeline-bubble.mobileSecond').removeClass('mobileSecond').addClass('mobileThird');
				
				$('#timeline-container .slide .timeline-bubble.mobileFirst').removeClass('mobileFirst').addClass('mobileSecond');
				
				$('#timeline-container .slide .timeline-bubble.mobileOffscreen').last().removeClass('mobileOffscreen').addClass('mobileFirst');
				
				IBMMobileFirst.tracking.trackClickEvent($('.timeline-bubble.mobileFirst').parent());
				
			};
			
		},
		timelineInit: function(direction,breakpoint) {
			
			var self = this;
			
			if (breakpoint != 1) {
			
				if (!direction) $('#timeline-container .slide').addClass('onscreen').first().addClass('first'); // initial setup
				
				// set up the values that control the effect of the cards going off into the distance
				
				var currentZ = 100;
				var currentScale = .86;
				var scaleOffset = .20;
					
				if ($('.breakpoint-801').length === 0) {

					var currentY = 70;
					var yOffset = 43;
				
				} else {
					
					var currentY = 80;
					var yOffset = 70;
					
				};
				
				$('#timeline-container .slide.onscreen').each(function(index) {
					
					if (index <= 3) {
						
						styles = {
							"z-index": currentZ,
							"-webkit-transform": "translateY(-" + currentY + "px) scale(" + currentScale + ")",
							"-moz-transform": "translateY(-" + currentY + "px) scale(" + currentScale + ")",
							"-o-transform": "translateY(-" + currentY + "px) scale(" + currentScale + ")",
							"-ms-transform": "translateY(-" + currentY + "px) scale(" + currentScale + ")",
							"transform": "translateY(-" + currentY + "px) scale(" + currentScale + ")"
						};
					
						$(this).css(styles).removeClass('offscreenBack');
						
						if (direction == 'backward') {
						
							currentScale = currentScale - scaleOffset;
							currentY = currentY + yOffset;
							currentZ = currentZ - 1;
							
						} else {
						
							currentScale = currentScale - scaleOffset;
							currentY = currentY + yOffset;
							currentZ = currentZ - 1;
							
						};
					
					} else {
					
						$(this).addClass('offscreenBack');
						
					};
					
					
				});
			
			} else {
			
				if (!direction) {
					
					self.mobileTimelineInit(direction);
							
				};
			
			};
				
		},
		resetTimeline: function() {
		
			var self = this;
			
			$('#forward').removeClass('inactive');
			
			$('#backward').addClass('inactive');
			
			$('#timeline-container .slide').removeClass(self.timelineClasses).attr('style', '').css('opacity', '1');
				
			$('#timeline-container .slide .timeline-bubble').removeClass(self.timelineClasses).attr('style', '');
			
		},
		timelineFunctions: function() {
			
			var self = this;
			
			var offscreenStyles = {
			
				"-webkit-transform": "translatey(20px) scale(1.2)",
				"-moz-transform": "translatey(20px) scale(1.2)",
				"-o-transform": "translatey(20px) scale(1.2)",
				"-ms-transform": "translatey(20px) scale(1.2)",
				"transform": "translatey(20px) scale(1.2)"
				
			};
			
			$('#timeline-container').on('tap', '#forward:not(.inactive)', function(e) {
			
				$('#backward').removeClass('inactive');
			
				if ($('.breakpoint-1').length === 0) {
					
					if ($('#timeline-container .slide.onscreen').length > 1) {
					
						$('.slide.onscreen.first').removeClass('onscreen first').addClass('offscreen').css(offscreenStyles).next().addClass('first');
					
						self.timelineInit('forward');
						
						IBMMobileFirst.tracking.trackClickEvent($('.slide.onscreen.first'));
					
					};
					
					if ($('#timeline-container .slide.onscreen').length === 1) {
					
						$(this).addClass('inactive');
					
					};
				
				} else {
					
					self.mobileTimelineInit('forward');
					
					if ($('#timeline-container .timeline-bubble.mobileSecond').length === 0) {
					
						$(this).addClass('inactive');
					
					};
				
				};
				
			});
			
			$('#timeline-container').on('tap', '#backward:not(.inactive)', function(e) {
			
				$('#forward').removeClass('inactive');
			
				if ($('.breakpoint-1').length === 0) {
				
					if ($('#timeline-container .slide.offscreen').length != 0) {
					
						$('.slide.onscreen.first').removeClass('first').prev().removeClass('offscreen').addClass('onscreen first');
					
						self.timelineInit('backward');
						
						IBMMobileFirst.tracking.trackClickEvent($('.slide.onscreen.first'));
					
					};
					
					if ($('#timeline-container .slide.offscreen').length === 0) {
					
						$(this).addClass('inactive');
					
					};
				
				} else {
					
					self.mobileTimelineInit('backward');
					
					if ($('#timeline-container .timeline-bubble.mobileOffscreen').length === 0) {
					
						$(this).addClass('inactive');
					
					};
				
				};
				
			});
			
			// swipe events
			$(".touch .timeline-bubble").swipe( {
				//Generic swipe handler for all directions
				swipeDown:function(event, direction, distance, duration, fingerCount) {
					$('#forward').tap();
				},
				swipeUp:function(event, direction, distance, duration, fingerCount) {
					$('#backward').tap();
				},
				threshold:75, //Default is 75px, set to 0 for demo so any distance triggers swipe
				excludedElements:$.fn.swipe.defaults.excludedElements+", .mobileSecond, .mobileThird, .mobileFourth"
			});
		
			// BREAKPOINTS.jS
			$(window).setBreakpoints({
			// use only largest available vs use all available
				 distinct: true, 
			// array of widths in pixels where breakpoints
			// should be triggered
				 breakpoints: [
				 	1,
				 	641,
				 	801
				 ] 
			});     
			
			$(window).bind('enterBreakpoint1',function() {

				//fakeConsole('1');
				self.resetTimeline();
				self.timelineInit(null,1); // "1" to identify small screen layout
				
			});
			
			$(window).on( "orientationchange", function() { 
			
				if ($('.breakpoint-1').length != 0) {
				
					self.resetTimeline();
					self.timelineInit(null,1);
				
				};
				
			});
			
			$(window).bind('enterBreakpoint641',function() {
				
				//fakeConsole('641');
				self.resetTimeline();
				self.timelineInit();
				 
			});
			
			$(window).bind('enterBreakpoint801',function() {
			
				//fakeConsole('801');
				self.resetTimeline();
				self.timelineInit();
				 
			});
			
			function fakeConsole(value) {
				$('#fakeConsole').remove();
				$('body').append('<div id="fakeConsole" style="position: fixed; z-index: 10000000000; top: 20px; left: 20px; color: #fff; background: red; padding: 6px 12px;">' + value + '</div>');
			};
			
		},
		disableTextSelect: function() {
			return $('#timeline-container').each(function() {
				$(this).css({
					'MozUserSelect':'none',
					'webkitUserSelect':'none'
				}).attr('unselectable','on').bind('selectstart', function() {
					return false;
				});
			});
		}
	
	},

	IBMMobileFirst.Tracking.prototype = {
	
		init: function() {
			this.trackingInit();
		},
		trackingInit: function(direction) {
			
			var self = this;
		
			IBMMobileFirst.namespace("IBMMobileFirst.tracking");
	
			IBMMobileFirst.tracking = {
			
				last_evname : null,
				last_item_id : null,
				last_suffix: null,
				AB: '',
		
				trackClickEvent : function($el) {
			
					var el = $el,
							ev = el.data('ev'),
							evgroup = el.data('evgroup'),
							evaction = el.data('evaction'),
							evname =  el.data('evname');
					if( typeof ev === 'undefined') return; // IBM navbar links do not have data tags
			
			
					try {
						//console.log('ibmstats - el: '+'a' +' ev:'+ev+' evaction:'+evaction+' evname:'+evname+IBMMobileFirst.SE.tracking.AB);
						ibmStats.event({ 'ibmEV' : ev, 'ibmEvGroup' : evgroup, 'ibmEvAction' : evaction, 'ibmEvName' : evname });
					} catch(error) {}
			
				},
		
				// trackCustomEvent called from categories.js
				trackCustomEvent : function(evgroup, ev, evaction, evname) {
			
					if(IBMMobileFirst.tracking.last_evname === evname) return;
					IBMMobileFirst.tracking.last_evname = evname;
			
					try {
						//console.log('ibmstats - el: '+'waypoint' +' evgroup:'+evgroup+' ev:'+ev+' evaction:'+evaction+' evname:'+evname);
						ibmStats.event({ 'ibmEV' : ev, 'ibmEvGroup' : evgroup, 'ibmEvAction' : evaction, 'ibmEvName' : evname });
					} catch(error) {}
				},
		
				// trackScrollEvent called from in-page-nav.js
				trackScrollEvent : function(itemId, evNameSuffix) {
					
					if(IBMMobileFirst.tracking.last_item_id == itemId && IBMMobileFirst.tracking.last_suffix == evNameSuffix) return;
			
					if(itemId === '#undefined') return;
			
					IBMMobileFirst.tracking.last_item_id = itemId;
					IBMMobileFirst.tracking.last_suffix = evNameSuffix;
			
					var el = $(itemId),
						ev = el.data('ev'),
						evgroup = el.data('evgroup'),
						evaction = el.data('evaction'),
						noSuffix = el.data('nosuffix'),
						evname = (noSuffix === true) ? el.data('evname') : el.data('evname')+evNameSuffix; // suffix is either 'start' or 'end'
			
				 	try {
				  		//console.log('ibmstats trackScrollEvent - el:'+itemId +' ev:'+ev+' evaction:'+evaction+' evname:'+evname);
				  		ibmStats.event({ 'ibmEV' : ev, 'ibmEvGroup' : evgroup, 'ibmEvAction' : evaction, 'ibmEvName' : evname });
					} catch(error) {}
			
				}
		
			}
		
		}

	}

})(window.jQuery);