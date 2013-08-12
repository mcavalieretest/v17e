var TABLET = 580;
var DESKTOP = 800;
var MAX_WIDTH = 980;

$(function() {

  var intro_animation = {

		init: function() {

			// If iphone, don't run.
			var is_iPhone = navigator.userAgent.match(/(iphone|ipod)/);
			if(is_iPhone) return;

			// for testing layout
			debug            = false;

			// scope
			_                = this;

			// "globals"
			win                     = $(window);
			doc                     = $(document);
			body                    = $('html, body');

			is_touch                = $('.touch').length;
			is_iPad 	              = navigator.userAgent.match(/(iPad)/);
			is_ie8                  = $('.ie8').length;

			ease                    = 'easeInOutQuart';
			auto_animation_complete = false;
			endframe_on             = false;
			step_interval           = 0;
			module_height           = $('.animation-holder').height();

			objs                    = $('.animation-item');
			intro_title 						= $(".intro-title-desktop");

			// set swipe increments
			desktop_swipe_increments = [0, 280, 950, 1500];
			tablet_swipe_increments = [0, 600, 1200];

			// Delegate .transition() calls to .animate()
			// if the browser can't do CSS transitions.
			if (!$.support.transition) {
				$.fn.transition = $.fn.animate;
			}

			_.align_elements();
			setInterval(function() {
				_.align_elements()
			}, 300);

			// check if the user scrolled down
			// page before site is loaded
			if(is_iPad) {
				setTimeout(function() {
					if(win.scrollTop() > 1000) {
						_.set_endframe();
					} else {
						_.start();
					}
				}, 100);
			} else {
				_.start();
			}
		},

		// start page
		start: function() {

			// if iDevice, autoscroll top
			if(is_iPad) {
				win.scrollTop(0);
				$('.sections').css({display: 'none'});
			}

			if(_.format() != 'mobile') {
				current_swipe_increments = eval(_.format() + '_swipe_increments');
			}

			swipe_frame_idx = 0;

			// Set swipe frame idx based on
			// scrollTop for iDevice devices
			if(is_iPad) {
				setTimeout(function() {
					var scroll = win.scrollTop();
					$.each(current_swipe_increments, function(idx) {
						if(scroll >= this && scroll < current_swipe_increments[idx + 1]) {
							swipe_frame_idx = idx;
							return;
						}
					});

					_.step(scroll);
				}, 500, ease);
			}

			if(!is_ie8) {
				// on resize/orientation, redraw elements
				$(window).on('resize orientationchange', function(e) {
					_.resize(e);
				});
			}

			// don't animate till after page loaded
			window.onload = function() {
				$(".animation-text, .animation-title")
					.removeClass("preload")
					.addClass('animate-text');

				// initialize
				setTimeout(function() {
					_.set_init_positions();
					_.init_animation();

					// handle scrolling/swiping
					if(is_iPad) {
						_.add_swipe_controls();
					} else {
						// step_interval = setInterval(function() {
						// 	_.step();
						// }, 5);
						_.step();
						win.scroll(function() {
							_.step();
						});
					}

				}, 100);
			}
		},

		align_elements: function() {

			// fix tablet/desktop headline
			intro_title.fitText(1.2);

			if(is_ie8) return;

			var cloud = $('.cloud-4 img');
			if(cloud.length) {
				if(_.format() == 'mobile') {
					cloud[0].style.marginLeft = -(cloud.width() * .4) + 'px';
				} else if(_.format() == 'tablet') {
					cloud[0].style.marginLeft = (_.get_window_size().width * .5 - cloud.width() - 75) + 'px';
				} else {
					cloud[0].style.marginLeft = (_.get_window_size().width * .5 - cloud.width()) + 'px';
				}
			}

			var office = $('.office img');
			if(office.length) {
				if(_.format() != 'mobile') {
					office[0].style.marginLeft = -(_.get_window_size().width * .34 - office.width()) + 'px';
				}
			}
		},

		// auto animate initial content
		init_animation: function() {

			$.each(objs, function() {

				var $this = $(this),
						stats = _.get_stats($this);

				if(!stats.autoanimate) return;

				$this.transition({
					x: stats.end_pos,
					delay: stats.autoanimate,
					opacity: 1,
					queue: false
				}, 750);

				// if(stats.is_text) {
				// 	if((is_iPad && $this.attr('class').indexOf('text2') == -1) || !is_iPad) {
				// 		$this.transition({
				// 			opacity: 1,
				// 			delay: stats.autoanimate
				// 		}, 500);
				// 	}
				// }

			});
		},

		// resize
		resize: function(e) {

			// jump to endframe or redraw,

			if(endframe_on) {
				_.set_endframe();
				_.turn_on();
			} else {
				_.redraw();
				_.turn_on();
				// _.init_animation();
			}

			// yuck. some annoying switches to fix
			// orientation change "frames"
			if(e.type == 'orientationchange') {

				if(_.format() === 'mobile') return;

				current_swipe_increments = eval(_.format() + '_swipe_increments');

				if(_.format() === 'tablet') {

					if(swipe_frame_idx == 1) {

						// desktop:1 = tablet:0
						swipe_frame_idx = 0;

					} else if(swipe_frame_idx == 2) {

						// desktop:2 = tablet:1
						swipe_frame_idx = 1;

					} else if(swipe_frame_idx == 3) {

						// desktop:3 = tablet:2
						swipe_frame_idx = 2;
					}

				} else if(_.format() === 'desktop') {

					if(swipe_frame_idx == 1) {

						// tablet:1 = desktop:2
						swipe_frame_idx = 2;
					} else if(swipe_frame_idx == 2) {

						// tablet:2 = desktop:3
						swipe_frame_idx = 3;
					}

				}

				// scroll to frame position on page
				body.stop().animate({
					scrollTop: current_swipe_increments[swipe_frame_idx]
				}, 0);

				// layout elements
				_.resize_static_elements();
				_.step(current_swipe_increments[swipe_frame_idx]);
			}
		},

		// redraw layout
		redraw: function() {
			_.step();
			_.resize_static_elements();
		},

		// resize auto animated elements
		resize_static_elements: function() {
			$.each(objs, function() {
				var $this = $(this),
						stats = _.get_stats($this);

				if(!stats.autoanimate) return;

				var val;
				if(stats.direction == 'left') {
					val = stats.padding;
				} else if(stats.direction == 'right') {
					val = _.get_window_size().width - stats.width_num - stats.padding;
				}

				$this.transition({
					x: val,
					queue: false
				}, 0);
			});
		},

		// swipe controls for mobile
		add_swipe_controls: function() {
			doc.swipe({
				swipeDown: function(event, direction, distance, duration, fingerCount) {
					_.swipe_prev();
					return false;
				},
				swipeLeft: function(event, direction, distance, duration, fingerCount) {
					_.swipe_prev();
					return false;
				},
				swipeRight: function(event, direction, distance, duration, fingerCount) {
					_.swipe_next();
					return false;

				},
				swipeUp: function(event, direction, distance, duration, fingerCount) {
					_.swipe_next();
					return false;
				},
				triggerOnTouchEnd: false
			});
		},

		// swipe to next frame
		swipe_next: function() {

			if(swipe_frame_idx < current_swipe_increments.length - 1) {
				swipe_frame_idx++;

				body.stop().animate({
					scrollTop: current_swipe_increments[swipe_frame_idx]
				}, 250);

				_.step(current_swipe_increments[swipe_frame_idx]);
			}

			if(current_swipe_increments.length - 1 === swipe_frame_idx) {
				_.set_endframe();
			}

		},

		// swipe to prev frame
		swipe_prev: function() {
			if(swipe_frame_idx >= 0) {
				swipe_frame_idx--;
				body.stop().animate({ scrollTop: current_swipe_increments[swipe_frame_idx] }, 250);
				_.step(current_swipe_increments[swipe_frame_idx]);
			}
		},

		// turn all animation items on
		turn_on: function() {
			var format = this.format();
			if(format != 'mobile') {
				$.each(objs, function() {
					// this.style.display = 'block';
					$(this).css({
						opacity: '1',
						display: 'block'
					});
				});
			}
		},

		// move elements into initial positions
		set_init_positions: function() {

			$.each(objs, function() {
				var $this = $(this),
						stats = _.get_stats($this),
						xval, yval = 0;

				xval = (debug || (stats.is_text && (_.format() === 'mobile' || _.format() === 'desktop'))) ? stats.end_pos : stats.start_pos;

				$this.transition({ x: xval }, 0);

				$this.css({
					display: 'block'
				});

				if(debug) {
					$this.css({
						opacity: '1'
					});
				}
			});
		},

		// math to calculate item position
		step: function(scroll) {

			if(debug) return;

			if(!scroll && !is_iPad) {
				scroll = win.scrollTop();
			}

			var format = this.format();
			if(format == 'mobile') {
				this.clear();
				return;
			}

			// location to start animating items
			trigger_height = parseInt(_.get_window_size().height * .7, 10);
			scroll_trigger = scroll + trigger_height;
			speed = 5;
			_ = this;

			// loop through page elements and animate
			$.each(objs, function() {

				var $this = $(this),
						stats = _.get_stats($this);

				// if doesn't have direction, don't animate
				if(!stats.direction || stats.autoanimate > 0) return;

				// amount to move element
				var move_val = scroll_trigger;

				// if element is at top of page, move element base on general scroll.
				if(stats.top < trigger_height && !is_iPad && !stats.is_text && stats.direction) {
					move_val = scroll + 200;
				} else if(stats.top < trigger_height && !is_iPad && stats.direction) {
					move_val = scroll + 500;
				} else if(is_iPad && stats.threshold) {
					move_val = stats.threshold;
				}

				// fade/slide text
				var fade_text = true;

				if(stats.direction == 'right') {

					var start = stats.start_pos - _.get_window_size().width,
							end      = _.get_window_size().width - stats.end_pos,
							real_val = parseInt((move_val - stats.top) / speed, 10),
							val      = real_val,
							max      = 100;

					if(val > 100) {
						val = 100;
					} else if (val < 0) {
						val = 0;
					}

					// IF text && !iDevice && fade
					if(stats.is_text && !is_iPad && fade_text) {

						var x_pos = _.get_window_size().width - stats.padding - stats.width_num;

						$this.transition({ x: x_pos }, 0);

						if(val > 0 && !is_iPad) {
							$this.addClass('text-on');
						} else {
							$this.removeClass('text-on');
						}

					// IF text && iDevice
					} else if(stats.is_text && is_iPad) {

						if(scroll > 0 && scroll + _.get_window_size().height - 100 >= stats.top) {

							$this.css({
								opacity: '1'
							});

							animate_to = _.get_window_size().width - stats.padding - stats.width_num
						} else {
							animate_to = _.get_window_size().width
						}

						$this.transition({
							x: animate_to,
							queue: false
						}, 500, ease);

					// IF !text && iDevice
					} else if(!stats.is_text && is_iPad) {

						var animate_to;
						if(scroll > 0 && scroll + _.get_window_size().height + 100 >= stats.top) {
							animate_to = parseInt(_.get_window_size().width - stats.width_num - stats.padding, 10);
						} else {
							animate_to = _.get_window_size().width
						}

						$this.transition({
							x: animate_to,
							queue: false
						}, 500, ease);

					// ELSE
					} else {

						$this.transition({
							x: _.get_window_size().width - easing.easeOutExpo(val/max, val, start, end, max)
						}, 0);

					}

				} else if(stats.direction == 'left') {

					var start 	 = stats.start_pos + stats.width_num + 100,
							end      = stats.end_pos + stats.width_num,
							real_val = parseInt((move_val - stats.top) / speed, 10)
							val      = real_val,
							max      = 100;

					if(val > 100) {
						val = 100;
					} else if (val < 0) {
						val = 0;
					}

					// IF text && !iDevice && fade
					if(stats.is_text && !is_iPad && fade_text) {

						var x_pos = stats.padding;

						$this.transition({ x: stats.padding }, 0);

						if(val > 0 && !is_iPad) {
							$this.addClass('text-on');
						} else {
							$this.removeClass('text-on');
						}

					// IF text && iDevice
					} else if(stats.is_text && is_iPad) {

						if(real_val >= 0 && real_val <= 100) {
							$this.css({
								opacity: '1'
							});
							animate_to = stats.padding;

						} else {
							// animate_to = -stats.width_num;
						}

						$this.transition({
							x: animate_to,
							queue: false
						}, 500, ease);

					// IF !text && iDevice
					} else if(!stats.is_text && is_iPad) {

						var animate_to;
						if(real_val >= 0 && real_val <= 100) {
							animate_to = stats.padding;
						}

						$this.transition({
							x: animate_to,
							queue: false
						}, 500, ease);

					// ELSE
					} else {

						$this.transition({
							x: easing.easeOutExpo(val/max, val, start, end, max) - stats.width_num
						}, 0);

					}
				}

			});

		},

		// clear all item styles
		clear: function() {
			$.each(objs, function() {
				$(this).attr('style', "");
			});
		},

		// page format
		format: function() {
			if(doc.width() >= DESKTOP) {
				return "desktop";
			} else if(doc.width() < DESKTOP && doc.width() > TABLET) {
				return "tablet";
			} else {
				return "mobile"
			}
		},

		// window width
		get_window_size: function() {
			var win_width = win.width(),
					win_height = win.height();

			if(win_width > MAX_WIDTH) {
				win_width = MAX_WIDTH;
			}

			return {
				width: win_width,
				height: win_height
			};
		},

		get_stats: function($obj) {

			var data_obj 		= _.get_data_obj($obj.attr('id'));

			var	top         = data_obj && data_obj.hasOwnProperty('scroll_threshold') ? data_obj.scroll_threshold : $obj.offset().top,
					width       = $obj.css('width'),
					is_text     = $obj.attr('class').indexOf('text') > -1,
					direction   = data_obj && data_obj.direction,
					autoanimate = data_obj && data_obj.hasOwnProperty('autoanimate') ? data_obj.autoanimate : 0,
					width_num   = parseInt(width.slice(0, width.indexOf('px')), 10),
					padding     = (data_obj && data_obj['padding_' + _.format()]) || 0,
					start_pos   = (direction =='left') ? -(width_num + 100) : _.get_window_size().width,
					end_pos     = (direction =='left') ? padding : _.get_window_size().width - width_num - padding,
					threshold   = data_obj && data_obj.hasOwnProperty('scroll_threshold') ? data_obj.scroll_threshold : 0;

			if(!direction) {
				start_pos = 0;
				end_pos = 0;
			}

			return {
				top         : top,
				direction   : direction,
				autoanimate : autoanimate,
				width       : width,
				width_num   : width_num,
				padding     : padding,
				start_pos   : start_pos,
				end_pos     : end_pos,
				is_text     : is_text,
				threshold   : threshold
			}
		},

		get_data_obj: function(id) {
			var obj;
			$.each(data, function() {
				if(this.id === id) {
					obj = this;
					return false;
				}
			});
			return obj;
		},

		reset: function() {
			$.each(objs, function() {
				var $this = $(this),
						stats = _.get_stats($this);

				$this.transit({
					x: stats.start_pos
				}, 0);

			});
		},

		set_endframe: function() {

			endframe_on = true;

			clearInterval(step_interval);
			doc.swipe('destroy');

			// animation_locked = true;

			$.each(objs, function() {
				var $this = $(this),
						stats = _.get_stats($this);

				if(!is_iPad || !stats.direction) return;

				$this.css({
					opacity: '1 !important',
					display: 'block'
				});

				// if($this.attr('class').indexOf('`') == -1) {
				$this.transit({ x: stats.end_pos }, 0);
				// }

			});

			setTimeout(function() {
				$('.sections').css({display: 'block'});
			}, 300);
		}
	}

	// DATA
	var data = [
		{
			id: 'cloud-header',
			direction: "right",
			padding_desktop: 200,
			padding_tablet: 30,
			autoanimate: 100
		},
		{
			id: 'cloud-1',
			direction: "left",
			autoanimate: 300
		},
		{
			id: 'cloud-2',
			direction: "right",
			autoanimate: 800
		},
		{
			id: "cloud-overlay-white-1",
			direction: "left",
			scroll_threshold: 400,
			autoanimate: 1000
		},
		{
			id: "cloud-overlay-white-2",
			direction: "right"
		},
		{
			id: 'cloud-overlay-blue',
			direction: "right"
		},
		{
			id: 'cloud-small-1',
			direction: 'left',
			padding_desktop: 150,
			padding_tablet: 40,
			scroll_threshold: 400,
			autoanimate: 1000
		},
		{
			id: 'cloud-small-3',
			direction: "right",
			padding_desktop: 20
		},
		//{
		//	id: 'euro',
		//	direction: "right",
		//	padding_desktop: 400,
		//	scroll_threshold: 215,
		//	autoanimate: 800
		//},
		{
			id: 'cloud-4',
			direction: "left"
		},
		{
			id: 'office',
			direction: "right",
			scroll_threshold: "1800"
		},
		{
			id: 'text1',
			direction: "right",
		 	autoanimate: 500,
		 	padding_desktop: "161",
		 	padding_tablet: "63"
		},
		{
			id: 'text2',
		 	direction: "left",
		 	padding_desktop: "98",
		 	padding_tablet: "63",
		 	autoanimate: 1200
		},
		{
			id: 'text3',
		 	direction: "left",
		 	padding_desktop: "98",
		 	padding_tablet: "63"
		},
		{
			id: 'text3b',
		 	direction: "left",
		 	padding_desktop: "98",
		 	padding_tablet: "63"
		},
		{
			id: 'text4',
		 	direction: "right",
		 	padding_desktop: "30",
		 	padding_tablet: "63"
		},
		{
			id: 'text5',
		 	direction: "left",
		 	padding_desktop: "98",
		 	padding_tablet: "63"
		}
	];

	intro_animation.init();

});






// /////////////////////////////////////////////////////////
//
// Plugins & Helpers
//
// /////////////////////////////////////////////////////////

// fitText
(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        if($(document).width() > TABLET) {
        	$('.intro-title-desktop').css({display: 'block'});
        } else {
        	$('.intro-title-desktop').css({display: 'none'});
        }
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      // $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})(jQuery);

// val/max, val, start, end, max
var easing = {
  linear: function(x,t,b,c,d) {
      return b+c*x;
  },
  def: 'easeOutQuad',
  swing: function (x, t, b, c, d) {
      //alert($.easing.default);
      return easing[easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
      return c*(t/=d)*t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
      return -c *(t/=d)*(t-2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t + b;
      return -c/2 * ((--t)*(t-2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
      return c*(t/=d)*t*t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
      return c*((t=t/d-1)*t*t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t + b;
      return c/2*((t-=2)*t*t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
      return c*(t/=d)*t*t*t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
      return -c * ((t=t/d-1)*t*t*t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
      return -c/2 * ((t-=2)*t*t*t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
      return c*(t/=d)*t*t*t*t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
      return c*((t=t/d-1)*t*t*t*t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
      return c/2*((t-=2)*t*t*t*t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
      return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
      return c * Math.sin(t/d * (Math.PI/2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
      return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
      return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
      return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
      if (t==0) return b;
      if (t==d) return b+c;
      if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
      return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
      return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
      return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
      if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
      return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
  },
  easeOutElastic: function (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
  },
  easeInOutElastic: function (x, t, b, c, d) {
      var s=1.70158;var p=0;var a=c;
      if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
      if (a < Math.abs(c)) { a=c; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (c/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
  },
  easeInBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*(t/=d)*t*((s+1)*t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
      return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
      return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
      if ((t/=d) < (1/2.75)) {
          return c*(7.5625*t*t) + b;
      } else if (t < (2/2.75)) {
          return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
      } else if (t < (2.5/2.75)) {
          return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
      } else {
          return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
      }
  },
  easeInOutBounce: function (x, t, b, c, d) {
      if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
      return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
  }
}

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */