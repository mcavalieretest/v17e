

(function($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	IBM.watson.accordions = []; // store accordion instances

	/**
	 * instantiate accordion and define the basics
	 * @param el
	 * @constructor
	 */
	IBM.watson.Accordion = function(el) {
		this.$head = $(el);
		this.$body = this.$head.next('.accordion-body');
		this.isOpen = false;
		if (!this.$body) {
			return
		}
		else {
			this.init();
		}
	};

	IBM.watson.Accordion.prototype.init = function() {
			var my = this;
			IBM.watson.accordions.push(this); // store for later reference
			my.handleEvents();
	};

	IBM.watson.Accordion.prototype.handleEvents = function() {

		var my = this;

		my.$head.on('click',function(){

			if (my.isOpen) {
				my.close();
			}
			else {
				// loop through accordion instances and close any that are open
				$(IBM.watson.accordions).each(function() {
					if (this.isOpen) {
						this.close();
					}
				});
				my.open();
			}
		});
	};

	IBM.watson.Accordion.prototype.open = function() {
		var my = this;

		my.isOpen = true;
		my.$head.addClass('open');
		my.$body.slideDown(500, function(){
			$(window).trigger('accordion-change'); //for waypoints
			$('html, body').animate({
				scrollTop: my.$head.offset().top
			},500);
		});
	};

	IBM.watson.Accordion.prototype.close = function() {
		var my = this;

		my.isOpen = false;
		my.$head.removeClass('open');
		my.$body.slideUp(500, function(){
			$(window).trigger('accordion-change'); //for waypoints
		});
	};

	$('.accordion-head').each(function(){
		new IBM.watson.Accordion(this);
	});


}(jQuery));