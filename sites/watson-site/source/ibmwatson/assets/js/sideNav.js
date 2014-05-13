(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};

	/**
	 * @Class SideNav
	 */
	IBM.watson.SideNav = function () {
		this.menu = document.getElementById('menu');
		this.menuTxt = $(this.menu).find('p');
		this.nav = document.getElementById('sideNav');
		this.content = document.getElementById('ibm-content-main');
		this.closeBtn = this.nav.querySelector('.closeBtn');
		this.mainLinks = this.nav.querySelectorAll('ul.main > li > a');
		this.delay = 0.3;

		this.navWidth = Modernizr.mq('(max-width: 579px)') ? 240 : 360;

		this.isOpen = false;
		this.isIE8 = $('html').hasClass('ie8');
		//console.log('ie8', this.isIE8);

		this.events();
	};
	IBM.watson.SideNav.prototype.events = function() {
		var self = this,
			pages = [],
			$navLinks = $('#sideNav').find('.main a'),
			currentPage, navIndex;

		$(this.menu).click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			if (!self.isOpen) {
				self.open();
			} else {
				self.close();
			}
		});

		$(this.closeBtn).click(function (e) {
			self.close();
		});

		$(window).resize(function () {
			self.navWidth = Modernizr.mq('(max-width: 579px)') ? 240 : 360;
			if (self.isOpen) {
				self.content.style.left = -self.navWidth + 'px';
				self.menu.style.right = self.navWidth + 30 + 'px';
			}
			else {
				self.nav.style.right = -self.navWidth + 'px';
			}
		});

		$(window).scroll(function () {
			var doc = document.documentElement;
			//var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
			var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

			if (top > 10) {
				if (self.isIE8) {
					self.menuTxt.css({display: 'none'});
				} else {
					self.menuTxt.css({opacity: 0});
				}

			} else {
				if (self.isIE8) {
					self.menuTxt.css({display: 'block'});
				} else {
					self.menuTxt.css({opacity: 1});
				}
			}
		});
		//change nav link color for current page

		$navLinks.each(function () {
			if(!$(this).hasClass("ex")){
				var page = $(this).attr('href').match(/([^\/]+)\.html/i)[1];
				pages.push(page);
			}

		});

		currentPage = document.location.pathname.match(/([^\/]+)\.html/i);
		currentPage = (currentPage !== null) ? currentPage[1] : 'index';

		if (currentPage) {
			navIndex = $.inArray(currentPage.toLowerCase(), pages);
			$(self.mainLinks).removeClass('active');
			$(self.mainLinks[navIndex]).addClass('active');
		}
	};

	IBM.watson.SideNav.prototype.open = function () {
		var self = this;
		$("body").trigger("OpenSideNav");
		if (this.isIE8) {
			//console.log('is ie')
		} else {

		}
		TweenLite.to(this.menu, this.delay, {right: this.navWidth + 30});
		TweenLite.to(this.nav, this.delay, {right: "0"});
		TweenLite.to(this.content, this.delay, {left: -this.navWidth + 'px', onComplete: function () {
			self.isOpen = true;
		}});
	};

	IBM.watson.SideNav.prototype.close = function () {
		var self = this;
		TweenLite.to(this.menu, this.delay, {right: 30});
		TweenLite.to(this.nav, this.delay, {right: -this.navWidth + 'px'});
		TweenLite.to(this.content, this.delay, {left: "0", onComplete: function () {
			$("body").trigger("CloseSideNav");
			self.isOpen = false;
		}});
	};

	$(function () {
		IBM.watson.siteNav = new IBM.watson.SideNav(); // assign to obj for reference in tracking.js
	});
}(jQuery));