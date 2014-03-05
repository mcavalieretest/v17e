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
								// vo.f_constructURL();
						 } else {
						 	$("#ibm_cci-widget-js").removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
						 	$(".ibm_cci-gv__modifier .ibm_cci--tweet-content-text").css('display', 'none');
								// vo.f_buildtiles();

						 }
					}
					updateURLHash(target.attr('id'));
				})
		});			
	
/*
	1. 	INITIALIZATION OF TRENDING TOPICS
	2. 	LATER WE CAN CHANGE THE URL INTO AN OBJECT AND 
		PASS THAT OBJECT TO CONSTRUCT THE URL
*/
	vo.init_t({
		tt_url : "https://esl002.somerslab.ibm.com/social/aggregator/rest/80/VOICES/trending", 
		// tt_url 		: "./data/tt.json", 
		t_template 	: $('#tt_template'),
		t_container	: $('#ibm_cci__ml')
	});

	vo.init_f({
		f_url : "https://esl002.somerslab.ibm.com/social/aggregator/rest/80/VOICES",
		// f_url : "./data/voicesfeed.json", 
		// f_url : vo.f_constructURL("cloud"),
		f_container: $('#ibm_cci-widget-js'),
		f_unro_template: $('#unro_template'),
		f_reso_template: $('#reso_template')
	});	

	$.when(vo.fetch_trending(), vo.fetch_feeds()).done(function(results, data){
		// console.log(self.feed_length);
		var self = vo;
		self.f_distribute(data);
		
		//INITIAL BUILD MASONRY TILES
		vo.f_buildtiles();

		vo.f_removeNodes($("#ibm_cci-widget-js > span"));
		
		//SEARCH FUNCTION (START)
		$('form').on('submit', function(){
			var searchVal = $("#ibm-cc-search--field").val().toLowerCase();
				searchVal = searchVal.split(',');
				console.log(searchVal);

				for (var i = searchVal.length - 1; i >= 0; i--) {
					searchVal[i] = searchVal[i].trim();
				}

			$("#ibm-cc-search--field").val('');
				// vo.sTerms.push(searchVal.toString());
				console.log(searchVal);
				vo.f_constructURL(searchVal.toString());

		});
		//SEARCH FUNCTION (END)
		

		//ALL TRENDING FUNCTION (START)
		$("li.ibm_cci__ml_t a[name='all']").on('click', function(event){
			event.preventDefault();
			if($("p#ibm_cci__ml_t-js").hasClass('ibm_cci-clicked')){
				console.log("return false");
				return;
			}else{
				//REMOVE ALL STYLES
				$("li.ibm_cci__ml-li p a").removeClass("ibm_cci-close-black, ibm_cci-close");
				$("li.ibm_cci__ml-li p[class='ibm_cci-clicked']").removeClass("ibm_cci-clicked");
				$("p#ibm_cci__ml_t-js").addClass("ibm_cci-clicked");
				
				//REMOVE ALL SEARCH NODES
				vo.f_removeNodes($(".ibm_cci-tsearch-js"));
				
				$(".ibm_cci--sr > p").addClass('ibm_cci-resultdisplay');
				
				//EMPTY VO.DIFFERENCE AND VO.SIMILAR
				vo.difference = [];
				vo.similar = [];
				vo.f_searchterms = [];
				vo.sTerms = [];
				vo.searchTrendingList = vo.searchTrendingList.slice(0, 11);
				vo.checkedCount = 0;
				
				vo.fetch_feeds().done(function(data){
					vo.f_removeNodes($("#ibm_cci-widget-js > span"));
					var newData = data;
					vo.search = true;
					vo.f_distribute(newData);			
				});			
			}
			
		});
		//ALL TRENDING FUNCTION (END)
		

		// TRENDING TOPICS ELEMENTS (START)
			$(".ibm_cci__ml-li").on("click", function(event){
				vo.addspinner();
				// VARIABLES DECLARED
				var clickedTrendingName = $(event.target).attr('name').trim(),
					parentP = $(event.target).parent();

				// CONDITIONS FULFILLED
					if( !$(parentP).hasClass('ibm_cci-clicked') ){
						console.log("if triggered");
							$(event.target).parent('p').addClass('ibm_cci-clicked');
							$(event.target).siblings('a').addClass('ibm_cci-close');
							$("#ibm_cci__ml_t-js").removeClass('ibm_cci-clicked');
							vo.f_constructURL(clickedTrendingName.toString());
					}
					else if( $(parentP).hasClass('ibm_cci-clicked') ) {	
							console.log("else if triggered parent has class clicked");
							console.log("if vo > 0");

						if(!$(event.target).hasClass('ibm_cci-close-black')){
							
							// TARGET IS NOT SEARCH
							console.log("if target does not have close black");
							$(event.target).parent('p').removeClass('ibm_cci-clicked');
							
							if($(event.target).hasClass('ibm_cci-close')){
								$(event.target).removeClass('ibm_cci-close');

							}else {
								$(event.target).siblings('a').removeClass('ibm_cci-close');
							}


							// ADD THIS PEICE AS FUNCTION TO AVOID REPETITION
							// REMOVE THE SELECTED FROM THE F_SEARCHTERMS ARRAY
							vo.f_searchterms = $.grep(vo.f_searchterms, function(e, i){
								return e != clickedTrendingName || null;
							});

							vo.difference = [];
							vo.similar = [];
							$(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");
							vo.f_constructURL(vo.f_searchterms.toString());
							vo.checkedCount = 0;

						}
					}

			});
		// TRENDING TOPICS ELEMENTS (END)
		
		// SEARCH TOPICS ELEMENTS (START)
		$(".ibm_cci__ml").on("click", ".ibm_cci__ml-li.ibm_cci-tsearch-js", function(event) {
			if ( $(event.target).hasClass('ibm_cci-close-black') || $(event.target).hasClass('ibm_cci-voices-search-term')) {
				// TARGET IS SEARCH
				console.log("if target has close black");
				
				var clickedTrendingName = $(event.target).attr('name').trim();

				// ADD THIS PEICE AS FUNCTION TO AVOID REPETITION
				// REMOVE THE SELECTED FROM THE F_SEARCHTERMS ARRAY
				vo.f_searchterms = $.grep(vo.f_searchterms, function(e, i){
					return e != clickedTrendingName || null;
				});

				vo.searchTrendingList = $.grep(vo.searchTrendingList, function(e, i){
					return e != clickedTrendingName || null;
				});						
				
				$(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");
				vo.f_removeNodes($(event.target).parent().parent("li.ibm_cci__ml-li.ibm_cci-tsearch-js"));

				vo.difference = [];
				vo.similar = [];
				vo.search = true;
				vo.f_constructURL(vo.f_searchterms.toString());
				vo.checkedCount = 0;
			}			
		});
		// SEARCH TOPICS ELEMENTS (END)	
	});	//WHEN	


	// INFINITE SCROLL (START)
	var win = $(window), winHeight = win.height(), widgetHeight = $("#ibm_cci-widget-js").height();
		win.data("ajaxReq", true).on("scroll", function(e){
			var scrollLock = false;
			if(win.data("ajaxReq") == false) return;
			
			// checkedCount is to verify if any search or trending list has been selected
			// checkedCount == 0 it means load more data for all filters
			if (vo.checkedCount == 0) {
				try{
					if ($(window).scrollTop() >= $("#ibm_cci-widget-js").height() - $(window).height()) {


						console.log($(window).scrollTop());
						console.log($(window).height());
						console.log($("#ibm_cci-widget-js").height());

						// Set Flag to false
						win.data("ajaxReq", false);
						$.ajax({
							url: vo.f_url + "?callback=?",
							type: 'GET',
							contentType: 'application/json',
							dataType: 'jsonp',
							data:{ 
								rank: $("#ibm_cci-widget-js .ibm-col-1-1").last().attr('data-rank'), 
								noOfItems:20,
								filter: null,
							},
							success: function(){
								win.data("ajaxReq", true);
								scrollLock = true;
							}
						})
						.done(function(data) {
							console.log("success");
							
							if(data.entries){
								vo.search = false;
								vo.f_distribute(data);
								vo.f_buildAppendedTiles();
							}
						})
						.fail(function() {
							console.log("error");
						})
						.always(function() {
							console.log("complete");
						});
						
					}
				}catch(e){
					console.log("infinite all trending scroll error" + e);
				}	
			}	

		}).on("resize", function(){
			winHeight = $(window).height();
			// f_buildtiles();
		});
	// // INFINITE SCROLL (END)


	// HELPER FUNCTIONS FOR THE TEMPALTES (START)
	$.views.helpers({
		addClass:retweetAddClass,
	});
	
	function retweetAddClass(value, val){
		if (value.indexOf("youtube") > -1){
			value = val;
		}
		return value;
	}
	// HELPER FUNCTIONS FOR THE TEMPALTES (END)		

}); //CLOSE ON DOM READY

(function($, a) {			
	var vo = {

		//GLOBAL ARRAY VARIABLES (NOTE: SO THEY DON'T GET OVERWRITTEN WHEN YOU PUSH DATA)
		f_searchterms: [], f_unresolved : [], f_resolved : [], differenceClone: [], searchTrendingList: [], sTerms: [], checkedCount : 0, f_rank: 0, search : true,

		// INITIALIZATION FOR TRENDING		
		init_t: function(t_config){
			// this.t_url = "./data/tt.json";
			this.t_url = t_config.tt_url;
			this.t_template = t_config.t_template;
			this.t_container = t_config.t_container;
			// this.fetch_trending();
		},

		t_attach_template: function(data) {
			var newData = data;
			this.t_container.append(this.t_template.render(newData));			
		},

		st_attach_template: function(data) {
			var newData = data;
			this.t_container.append($('#st_template').render(newData));			
		},

		// FETCH TRENDING JSON OBJECT
		fetch_trending: function(){	
			var self = this, url = self.t_url; 
			$.getJSON(url + "?callback=?", {
				type: 'GET',
				dataType: 'jsop',
				contentType: 'application/json'
			}, function(data){
				// RESULTS OF THE JSON DATA IS MAPPED AND STORED TO THE NEW ARRAY filter_tweets
				// add if condition
				if (data && data.trending && data.trending.indexOf(',') > -1) {				
					var rec_data = data.trending.trim() || null;
						// rec_data is an array, need to convert it into an object self.t_newlist
						rec_data = $.makeArray(rec_data);
						// rec_data = $.extend({}, rec_data);
						self.trendinglist = rec_data[0].split(",");
				}
				self.t_newlist = $.map(rec_data[0].split(','), function(list, index ){
					//returns an object to the trending template
					return {
						 t_list : $.makeArray(list)
					};
				});

				self.searchTrendingList = self.trendinglist.slice(0);
				self.t_attach_template(self.t_newlist);

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
		
		addspinner: function(){
			// console.log("ibm-spinner-small triggered");
			$("#ibm_cci-widget-js").append('<span class="ibm-spinner-small"></span>');
		},

		// FETCH FEED JSON OBJECT
		fetch_feeds: function(){
			var self = this, url = self.f_url;
			self.addspinner();
			return $.ajax({
					url: url + "?callback=?",
					type: 'GET',
					contentType: 'application/json',
					dataType: 'jsonp',
					data:{ 
						rank: self.f_rank, 
						noOfItems:20,
						filter: self.f_searchterms.toString() || null,
				}
				}).promise();
		},

		f_distribute: function(data){
			console.log("f_distribute triggered");
			var self = this;
			self.widget_nodes = $("#ibm_cci-widget-js").children(".ibm-col-1-1");
			
			if(vo.search){
			// REMOVES THE NODES FOR SEARCH
				vo.f_removeNodes(self.widget_nodes);
			}

			try{
				if(data.entries){
					// self.f_removeNodes(self.widget_nodes);
					self.feed = data.entries;	
					self.feed_length = data.entries.length || 0;
				}else{
					self.feed = data[0].entries;	
					self.feed_length = data[0].entries.length || 0;				
				}
			}catch(e){
				console.log("testing f_distribute" + e);
			}

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

		f_removeNodes: function(nodes){
			// Need to add condition to only remove trending search nodes count > 9 
			nodes.remove();
		},

		f_totalSearchCount: function(count){
			var searchResultNode = $(".ibm_cci--sr > p");
			searchResultNode.text("Results found: " + count).removeClass('ibm_cci-toggleDisplay');
		},

	//MASONRY HELPER
		f_buildtiles: function(){
			var $sortable = $('.ibm-sortable'), masonryItems = $sortable.find('.ibm-card');		

				$sortable.imagesLoaded(function(){
					$sortable.masonry({
							gutter: 0,
							itemSelector: '.ibm-card',
							transitionDuration: '5s',
							isAnimated: true
						}, true);
				});
		},

		//check searchTrendingList ? array : object
		//Append the search terms to the searchTrendingList (may need to make this global so it can be updated on close)
		//SearchTerms to lowercase
		//Check similar ? array or object
		//
		f_appendTrendinglist: function(searchterms){
			var self = this;
			self.sTerms = [];			
			self.sTerms.push(searchterms);

			self.similar = [];
			self.difference = [];			
			
			if(vo.search) { 
				$.grep(self.sTerms[0], function(e, i){
					//Similar values
					if($.inArray(e, self.searchTrendingList ) !== -1) {
						if(self.similar.length == 0) {
							self.similar.push(e);
						}else if(self.similar.length > 0) {
							if($.inArray(e, self.similar) !== -1) return false;
							if($.inArray(e, self.similar) === -1) self.similar.push(e);
						}
					}

					//Different values
					else if($.inArray(e, self.searchTrendingList ) === -1) {	
						if(self.difference.length == 0) {
							self.difference.push(e);							
						}else if(self.difference.length > 0) {
							if($.inArray(e, self.difference) !== -1) return false;
							if($.inArray(e, self.difference) === -1) self.difference.push(e);
						}
					}
				});

				// NEED TO ADD THE DIFFERENCE DATA INSIDE SEARCHTRENDINGLIST
				$.grep(self.difference, function(e, i){
					if($.inArray(e, self.searchTrendingList ) !== -1) {
						return false;
					}
					else if($.inArray(e, self.searchTrendingList ) === -1) {
						self.searchTrendingList.push(e);
						self.differenceClone.push(self.difference);
					}
				});

				self.newSearchTermList = $.map(self.difference, function(e, i){
					return {
						t_list : $.makeArray(e)
					};
				});
				
				var $targetNode = $(".ibm_cci__ml-li a.ibm_cci-voices-tt-text");

				try{
					
					for(var i = 0; i <  $targetNode.length; i++){
						for(var j = 0; j < self.similar.length; j++){
							if(self.similar[j] == $targetNode[i].text){		
								$($targetNode[i]).parent().addClass('ibm_cci-clicked');
								$($targetNode[i]).siblings().addClass('ibm_cci-close');
								
								if($("#ibm_cci__ml_t-js").hasClass("ibm_cci-clicked")){
									$("#ibm_cci__ml_t-js").removeClass("ibm_cci-clicked");
								}
							}
						}
					}
				}catch(e){
					console.log("error in f_appendTrendinglist" + e);
				}
				
				$("#ibm_cci__ml_t-js").removeClass("ibm_cci-clicked");
					self.st_attach_template(self.newSearchTermList);
				self.search = false;
			}			 

		},

		f_constructURL: function(searchterms){			
			var self = this; 
			
			console.log(searchterms);
		    
		    self.filter_searchterms = [];
		    var searchEle = searchterms.trim().split(",");
			    
			    for (var i = 0; i < searchEle.length; i++) {
			        self.filter_searchterms.push(searchEle[i]); //pushing each elements inside the list   
			    }
		        
		    $.grep(self.filter_searchterms, function(e, i) {
		        if ($.inArray(e, self.f_searchterms) === -1)
		            self.f_searchterms.push(e);
		    });

		    $.unique(self.f_searchterms);
		    
			$.ajax(self.f_url + "?callback=?",{
				type: 'GET',
				dataType: 'jsonp',
				contentType: 'application/json',
				data:{ 
					rank: self.f_rank, 
					noOfItems:20,
					filter: self.f_searchterms.toString(),
				},
				success: function(){
					// console.log("SUCCESS");
				}
			}).done(function(data, textStatus, jqXHR) {
				var self = vo;
				console.log(data.terms);
				// Update this function to distribute loadmore and search terms
				if(data.terms){
					if(data.terms.length > 0){
						vo.search = true;
						self.f_distribute(data);
						vo.f_totalSearchCount(data.totalCount);
						vo.f_appendTrendinglist($.makeArray(data.terms.split(',')));
						vo.checkedCount = data.terms.split(',').length;
						vo.f_removeNodes($("#ibm_cci-widget-js > span"));
					} else {
						return;
					}
				}else {
					vo.fetch_feeds().done(function(data){
						vo.f_removeNodes($("#ibm_cci-widget-js > span"));
						vo.search = true;
						vo.f_distribute(data);
						$("#ibm_cci__ml_t-js").addClass('ibm_cci-clicked');			
					});
				}	
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				// console.log("complete");
			});
			
		}

	}; //vo (END)

	a.vo = vo;

})(jQuery, window);