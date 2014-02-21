$(function(){

	// DEFAULT URL HASH (START)
		window.location.hash = "#voices-" + $("#ibm_cci--toggle-js li a").attr('id');		
	// DEFAULT URL HASH (END)

	// UPDATE URL HASH ON CLICKED ELEMENTS FROM SEARCH AND TRENDING TOPICS (START)
		var updateURLHash = function(value){
			if (!window.location.hash && window.location.hash == null ) {
				$(location).attr('hash') + "#voices-" + value;
			}else {
				window.location.hash = "#voices-" + value;
			}
		}
	// UPDATE URL HASH ON CLICKED ELEMENTS FROM SEARCH AND TRENDING TOPICS (END)

	// MANAGE TOGGLE EFFECTS ON GRID AND LIST VIEW (START)				
		$('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul').children()
			.each(function(){
				$this = $(this);				
				$this.on('click', 'a', function(event){
					//event.stopPropagation();
					var target = $(event.target);
					if(!target.hasClass('selected')){
						target.addClass('selected').parent().siblings().children().removeClass("selected");						
						if($("#ibm_cci-widget-js").hasClass('ibm_cci-gv__modifier')){
							$("#ibm_cci-widget-js").removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
							$(".ibm_cci-lv__modifier .ibm_cci--tweet-content-text").css('display', 'block');
							$(".ibm_cci-lv__modifier .ibm-video").css('display', 'none');
								VOICES.f_constructURL();
						 } else {
						 	$("#ibm_cci-widget-js").removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
						 	$(".ibm_cci-gv__modifier .ibm_cci--tweet-content-text").css('display', 'none');
								VOICES.f_buildtiles();

						 }
					}
					updateURLHash(target.attr('id'));
				})
		});			
	// MANAGE TOGGLE EFFECTS ON GRID AND LIST VIEW (END)

	// $.ajax({
	// 	url: 'https://wwwbeta-sso.toronto.ca.ibm.com:444/social/aggregator/rest/80/VOICES/',
	// 	type: 'GET',
	// 	dataType: 'jsonp',
	// 	data: {rank: 20, noOfItems: 20, filter:null},
	// })
	// .done(function(data) {
	// 	console.log("success");
	// 	console.log(data);
	// })
	// .fail(function() {
	// 	console.log("error");
	// })
	// .always(function() {
	// 	console.log("complete");
	// });
	

/*
	1. 	INITIALIZATION OF TRENDING TOPICS
	2. 	LATER WE CAN CHANGE THE URL INTO AN OBJECT AND 
		PASS THAT OBJECT TO CONSTRUCT THE URL
*/
	VOICES.init_t({
		tt_url : "https://wwwbeta-sso.toronto.ca.ibm.com:444/social/aggregator/rest/80/VOICES/trending?callback=?", 
		// tt_url 		: "./data/tt.json", 
		t_template 	: $('#tt_template'),
		t_container	: $('#ibm_cci__ml')
	});

	VOICES.init_f({
		f_url : "https://wwwbeta-sso.toronto.ca.ibm.com:444/social/aggregator/rest/80/VOICES/?callback=?",
		// f_url : "./data/voicesfeed.json", 
		// f_url : VOICES.f_constructURL("cloud"),
		f_container: $('#ibm_cci-widget-js'),
		f_unro_template: $('#unro_template'),
		f_reso_template: $('#reso_template')
	});	

	$.when(VOICES.fetch_trending(), VOICES.f_init_feeds()).done(function(results, data){		
			// console.log(self.feed_length);
		var self = VOICES;
		console.log(data);
		self.f_distribute(data);
	});	
	

	// HELPER FUNCTIONS FOR THE TEMPALTES (START)
	$.views.helpers({addClass:retweetAddClass});
		function retweetAddClass(value, val){
			if (value.indexOf("youtube") > -1){
				value = val;
			}
			return value;
		}

	// HELPER FUNCTIONS FOR THE TEMPALTES (END)		
	$('form').on('submit', function(){
		var searchVal = [$("#ibm-cc-search--field").val().trim()];
		$("#ibm-cc-search--field").val('');
		VOICES.f_constructURL(searchVal);
	});


}); //CLOSE ON DOM READY

(function($, a) {			
	var VOICES = {			
		// INITIALIZATION FOR TRENDING		
		init_t: function(t_config){
			// this.t_url = "./data/tt.json";
			this.t_url = t_config.tt_url;
			this.t_template = t_config.t_template;
			this.t_container = t_config.t_container;

			// this.fetch_trending();
		},

		t_attach_template: function() {
			this.t_container.append(this.t_template.render(this.t_newlist));			
		},

		// FETCH TRENDING JSON OBJECT
		fetch_trending: function(){	
			var self = this;
			return $.getJSON(this.t_url, function(data){
				// RESULTS OF THE JSON DATA IS MAPPED AND STORED TO THE NEW ARRAY filter_tweets
				// add if condition
				if (data && data.trending && data.trending.indexOf(',') > -1) {				
					var rec_data = data.trending || null;
						rec_data = $.makeArray(rec_data);
						// rec_data = $.extend({}, rec_data);
				}
				self.t_newlist = $.map(rec_data[0].split(','), function(list, index ){
					return {
						 t_list : $.makeArray(list)
					};
				});

				 self.t_attach_template();
			}).promise();
		},

		// INITIALIZATION FOR FEEDS
		init_f: function(f_config){
			this.f_url = f_config.f_url;
			this.f_unro_template = f_config.f_unro_template;
			this.f_container = f_config.f_container;
			this.f_reso_template = f_config.f_reso_template;
		},		

		f_attach_reso_temp: function(reso_data) {
			//Modify the timestamp and the content attr and wrap href
			// console.log("Resolved tweet function triggered");
			this.f_container.append(this.f_reso_template.render(this.f_modify_datafeed(reso_data)));		
		},		

		f_attach_unro_temp: function(unro_data) {
			//Modify the timestamp and the content attr and wrap href
			// console.log("Unresolved tweet function triggered");
			this.f_container.append(this.f_unro_template.render(this.f_modify_datafeed(unro_data)));		
		},

		f_modify_datafeed: function(data){
			var self = this,
				feed_data = data || null;
			try{
				if(feed_data){
					feed_data.content = this.f_mod_content(feed_data.content || "");
					feed_data.published = this.f_pretty_date(feed_data.published);

					if(feed_data.mediaURL || feed_data.altMediaURL){
						feed_data.mediaURL = this.f_preloadImages(feed_data.mediaURL || "");
						feed_data.altMediaURL = this.f_preloadImages(feed_data.altMediaURL || "");
					}										
					
					if(feed_data.refTweets && feed_data.refTweets.length > 0){								
						for(var i = 0; i < feed_data.refTweets.length; i++){	
							if(feed_data.refTweets[i].content){
								feed_data.refTweets[i].content = this.f_mod_content(feed_data.refTweets[i].content);
								feed_data.refTweets[i].published = this.f_pretty_date(feed_data.refTweets[i].published);	
							}

						}						
					}	
				}			
				return feed_data;
			}catch(e){
				console.log("Error inside the modify_datafeed" + e );
			}	
		},

		f_preloadImages: function(imgData){		    
		    var imgloaded = $('<img>').src = imgData;
		    return imgloaded;
		},

		f_mod_content: function(data){			
			var update_content = data.replace(/(http(s)*\:\/\/[^\s]+\s*)/g, "<a href=\"$1\">$1</a>")
								.replace(/#([^\s]+)/g, '<a href="//twitter.com/search?q=%23$1">#$1</a>')
								.replace(/@([^\s:]+)/g, '<a href="//twitter.com/$1">@$1</a>');
				return update_content;
		},

		f_pretty_date: function(timeVal){
			try{	
				 var monthTxt = new Array();
				  monthTxt[0] = "Jan";
				  monthTxt[1] = "Feb";
				  monthTxt[2] = "Mar";
				  monthTxt[3] = "Apr";
				  monthTxt[4] = "May";
				  monthTxt[5] = "Jun";
				  monthTxt[6] = "Jul";
				  monthTxt[7] = "Aug";
				  monthTxt[8] = "Sep";
				  monthTxt[9] = "Oct";
				  monthTxt[10] = "Nov";
				  monthTxt[11] = "Dec";
				  monthTxt[12] = "December";
				  timeVal = timeVal+"";
				 
				 var date = new Date((parseInt(timeVal.trim()) || "")),
				  diff = (((new Date()).getTime() - date.getTime()) / 1000),
				  day_diff = Math.floor(diff / 86400);
				   
				 if ( isNaN(day_diff) || day_diff < 0  )
				  return;
				
				  var retVal =  day_diff == 0 && (
					   diff < 60 && "just now" ||
					   diff < 120 && "1m" ||
					   diff < 3600 && Math.floor( diff / 60 ) + "m" ||
					   diff < 7200 && "1h" ||
					   diff < 86400 && Math.floor( diff / 3600 ) + "h") ||
					//day_diff >= 1 && date.getDate() + " " + monthTxt[parseInt(date.getMonth(), 10)];
					   day_diff >= 1 && day_diff + "d";
				
				// console.log(timeVal +" : "+ retVal);
				return retVal;
			}catch(e){
				console.log("error inside the f_pretty_data function: " + e );
			}	
		},

	    f_correctRank : function(){
	    	var rankPObj = dojo.query(".ibm_cci--rea-rank",this.domNode)[0];
	    	if(rankPObj.innerHTML.trim().length > 2){
	    		dojo.addClass(rankPObj,"ibm_cci-reducedFont");
	    	}
	    },		

		// FETCH FEED JSON OBJECT
		f_init_feeds: function(){
			var self = this;
			this.f_rank = 20;
			// return $.getJSON(self.f_url, function(data) {
			// 	//f_feed : data.searchResponse.entries
			// }).promise();
			
			return $.ajax({
					url: self.f_url,
					contentType: "application/json; charset=utf-8",
					type: 'GET',
					dataType: 'jsonp',
					cache: false
				}).promise();
			
		},

		f_distribute: function(data){
			console.log(data);
			var self = this, f_unresolved = [], f_resolved = [];
			self.feed = data[0];	
			self.feed_length = data[0].length || 0;
			try{
				if(self.feed){
					for(var i = 0; i < self.feed_length; i++){		
						if(self.feed[i].type && self.feed[i].type === "URLREF"){	
								// For unresolved Tweets
								// console.log(self.feed[i].type);
								self.f_attach_reso_temp(self.feed[i]);	
						}
						else if(self.feed[i].type && self.feed[i].type === "TWEET"){
								// For resolved Tweets you need to store the Object
								// console.log(self.feed[i].type);	
								self.f_attach_unro_temp(self.feed[i]);
							}
						}	
				}
			}catch(e){
				console.log('Error logged in the DOM ready $.when' + e);
			}
		},

		f_buildtiles: function(){
		//MASONRY HELPER
			var $sortable = $('.ibm-sortable'), masonryItems = $sortable.find('.ibm-card');		
				// console.log($sortable.imagesLoaded());
				$sortable.imagesLoaded(function(){
					$sortable.masonry({gutter: 0 ,itemSelector: '.ibm-card' ,transitionDuration: '5s'}, true);	
				});
		},

		f_constructURL: function(data){			
			var self = this, rank = self.f_rank, url = self.f_url;
			param = data.toString();		
			// return $.getJSON(url, { rank: 0, noOfItems: 20,  filter:param},function(data) { 
			// 		self.f_distribute(data);
			// });
			
			$.ajax({
				type: 'POST',
				url: url,
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				dataType: 'json',
				cache: false,
				data: {filter: param, rank:0, noOfItems:20},
				success: function(data){console.log("SUCCESS")}
			})
			.done(function(data) {
				self.f_distribute(data);
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
			
		}

	}; //VOICES (END)

	a.VOICES = VOICES;

})(jQuery, window);

/**
 * jQuery Masonry v2.1.08
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */
(function(e,t,n,v){"use strict";var r=t.event,i;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,t){var n=this,s=arguments;e.type="smartresize",i&&clearTimeout(i),i=setTimeout(function(){r.dispatch.apply(n,s)},t==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection),u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){a.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;n.src!==s&&t.inArray(n,o)===-1&&(o.push(n),--i<=0&&(setTimeout(u),r.unbind(".imagesLoaded",a)))}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];return i||u(),r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s,this.src=e}),n};var s=function(t){e.console&&e.console.error(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){s("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){s("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,jQuery,VOICES);

