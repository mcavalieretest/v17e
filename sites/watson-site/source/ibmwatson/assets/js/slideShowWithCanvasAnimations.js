(function ($) { // reset V17e's noConflict
	'use strict';

	window.IBM = window.IBM || {};
	IBM.watson = IBM.watson || {};
	/**
	 * @Class SlideWithCanvasAnimation
	 * @param options
	 */

	IBM.watson.SlideShowWithCanvasAnimations = function (options) {
		IBM.watson.SlideShow.call(this, options);

		//since already inited
		this.initSprite();
	};

	//inherits slide show
	IBM.watson.SlideShowWithCanvasAnimations.prototype = new IBM.watson.SlideShow();
	IBM.watson.SlideShowWithCanvasAnimations.prototype.constructor = IBM.watson.SlideShowWithCanvasAnimations;

	IBM.watson.SlideShowWithCanvasAnimations.prototype.initSprite = function () {
		//sprite stuff
		this.path = 'assets/img/work/carousel/';
		this.json = 'assets/data/logo2.json';

		//slides
		this.slidesWithAnimation = [];


		//load sprite atlas
		this.requestJSON(this.json);

	};
	IBM.watson.SlideShowWithCanvasAnimations.prototype.requestJSON = function (path) {
		//request
		var self = this,
			xhr = new XMLHttpRequest();
		xhr.open('GET', path, true);
		xhr.onload = function () {
			var parsedJSON = JSON.parse(this.responseText);
			self.loadSprite(parsedJSON);
		};
		xhr.send();
	};
	IBM.watson.SlideShowWithCanvasAnimations.prototype.loadSprite = function (atlas) {
		var self = this;
		var img = new Image();
		var frames = [];

		for (var frame in atlas.frames) {
			//populate frames array
			frames.push(atlas.frames[frame]);
		}

		//img.crossOrigin = true;
		img.onload = function () {
			//add to dom
			self.addCanvasToSlides(img, frames);
			self.updateAnimations();

			self.setDimensions(); //ie10 fix
		}
		img.src = this.path + atlas.meta.image;


	};
	IBM.watson.SlideShowWithCanvasAnimations.prototype.addCanvasToSlides = function (img, frames) {
		for (var i = 0; i < this.slides.length; i++) {
			this.slidesWithAnimation.push(new IBM.watson.SlideWithCanvasAnimation(this.slides[i], i, frames, img));
		}
	};
	IBM.watson.SlideShowWithCanvasAnimations.prototype.updateAnimations = function () {
		if (!this.slidesWithAnimation) return;

		//check for current showing slide and start ani, stop others
		for (var i = 0; i < this.slidesWithAnimation.length; i++) {

			if (i !== this.active_index) {
				this.slidesWithAnimation[i].stop();
			} else {
				this.slidesWithAnimation[i].start();
				//console.log(i)
			}
		}

	};


	/**
	 * @class SlideWithCanvasAnimation
	 * for each slide
	 */
	IBM.watson.SlideWithCanvasAnimation = function (ele, index, frames, img) {
		this.ele = ele;
		this.index = index;
		this.frames = frames;
		this.currentSpriteImage = img;
		this.image = this.ele.getElementsByTagName('img')[0];
		this.currentFrame = 0;
		this.percentPlayed = 0;
		this.playing = true;

		//make canvas tag
		this.canvas = document.createElement('canvas');

		//set width by original attribute for slideShow resizing
		this.canvasWidth = this.canvas.width = this.image.getAttribute('width');
		this.canvasHeight = this.canvas.height = this.image.getAttribute('height');

		//init canvas
		if (this.canvas.getContext) {
			this.c = this.canvas.getContext('2d');
			// drawing code here
			//console.log('can canvas');

			//attach canvas to dom
			this.image.parentNode.insertBefore(this.canvas, this.image);

			this.placeSprite();

		}
	};
	IBM.watson.SlideWithCanvasAnimation.prototype.placeSprite = function () {
		//var whichImg = this.image.getAttribute('src').split('0')[1].split('.')[0];

		//set width height ratio
		var xRatio = this.canvas.offsetWidth / this.canvasWidth;
		var yRatio = this.canvas.offsetHeight / this.canvasHeight;

		//console.log(this.canvasWidth,this.canvasHeight,this.canvas.offsetWidth, this.canvas.offsetHeight,xRatio,yRatio)


		//save canvas
		this.c.save();
		//reset
		this.c.setTransform(1, 0, 0, 1, 0, 0);

		/**
		 matrix
		 __   __
		 | a c e |
		 | b d f |
		 | 0 0 1 |
		 --   --

		 setTransform(a, b, c, d, e, f)
		 setTransform(X_scale, X_skew, Y_skew, Y_scale, dx, dy)

		 radians = degrees * (pi/180)
		 degrees = radians * (180/pi)
		 **/
		switch (this.index) {
			case 0 :

				var x = 1152;
				var y = 459;

				this.c.translate(x, y);
				this.c.scale(0.3, 0.3);

				this.drawSprite();

				break;
			case 1 :
				var x = 658;
				var y = 476;

				this.c.setTransform(0.6, 0, 0.02, 0.24, x, y);

				this.drawSprite();
				break;
			case 2 :

				//bottomRight
				var x = 1238;
				var y = 558;

				this.c.translate(x, y);

				this.c.setTransform(0.3, 0.01, -0.1, 0.2, x, y);

				this.drawSprite();

				//reset
				this.c.save();
				this.c.setTransform(1, 0, 0, 1, 0, 0);

				//bottomLeft
				var x = 505;
				var y = 565;

				this.c.translate(x, y);

				this.c.setTransform(0.3, -0.021, 0.01, 0.2, x, y);

				this.drawSprite();

				//reset
				this.c.save();
				this.c.setTransform(1, 0, 0, 1, 0, 0);

				//topLeft
				var x = 445;
				var y = 475;

				this.c.translate(x, y);

				this.c.setTransform(0.31, 0.01, 0.05, -0.15, x, y);

				this.drawSprite();

				//reset
				this.c.save();
				this.c.setTransform(1, 0, 0, 1, 0, 0);

				//topRight
				var x = 1185;
				var y = 505;

				this.c.translate(x, y);

				this.c.setTransform(0.33, 0.01, -0.06, -0.14, x, y);

				this.drawSprite();

				break;
			case 3 :
				var x = 780;
				var y = 684;

				this.c.translate(x, y);
				this.c.scale(0.15, 0.15);
				this.c.rotate(19 * (Math.PI / 180));

				this.drawSprite();

				break;
			case 4 :
				var x = 765;
				var y = 660;

				this.c.translate(x, y);
				this.c.scale(0.36, 0.36);
				this.c.rotate(340 * (Math.PI / 180));

				this.drawSprite();

				break;
		}

		//this.c.restore();

	};
	IBM.watson.SlideWithCanvasAnimation.prototype.drawSprite = function () {
		var frame = this.frames[this.currentFrame].frame;
		var img = this.currentSpriteImage;

		var startClipX = frame.x,
			startClipY = frame.y,
			startClipWidth = frame.w,
			startClipHeight = frame.h,
			x = 100 + (frame.w * 0.5),//TODO
			y = 100 ,//+ (frame.h * 0.5),
			width = frame.w,
			height = frame.h;

		this.c.drawImage(img, startClipX, startClipY, startClipWidth, startClipHeight, x, y, width, height);
	};
	IBM.watson.SlideWithCanvasAnimation.prototype.update = function () {
		//set currentFrame based on percentage
		this.currentFrame = Math.round(( (this.frames.length - 1) * this.percentPlayed ) / 100);

		this.placeSprite();
	};

	IBM.watson.SlideWithCanvasAnimation.prototype.animate = function (lastTime) {
		var self = this,
			now = Date.now(), //new Date().getTime();
			deltaTime = now - ( lastTime || now);

		//update % played or reset to 0
		if (this.percentPlayed <= 100) {
			this.update();
			this.percentPlayed++;
		} else {
			this.percentPlayed = 0;
		}

		// request new frame
		requestAnimFrame(function () {
			if (self.playing) {
				self.animate(now);
			} else {
				//console.log('stopped')
			}
		});
	};
	IBM.watson.SlideWithCanvasAnimation.prototype.start = function () {
		this.playing = true;

		/**
		 *start animating
		 */
		var now = Date.now();
		this.animate(now);
	};
	IBM.watson.SlideWithCanvasAnimation.prototype.stop = function () {
		this.playing = false;
		//clear canvas //TODO check preformance hope better
		this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};


	/**
	 * requestAnimFrame
	 */
	window.requestAnimFrame = (function (callback) {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

}(jQuery));