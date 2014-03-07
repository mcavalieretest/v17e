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
					event.stopPropagation();
					var target = $(event.target);
					if(!target.hasClass('selected')){
						target.addClass('selected').parent().siblings().children().removeClass("selected");						
						if($("#ibm_cci-widget-js").hasClass('ibm_cci-gv__modifier')){
							$("#ibm_cci-widget-js").removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
							$(".ibm_cci-lv__modifier .ibm_cci--tweet-content-text").css('display', 'block');
							$(".ibm_cci-lv__modifier .ibm-video").css('display', 'none');
								
								// REBULILD MASONRY TILES FOR LIST VIEW
								$("#ibm_cci-widget-js").masonry("reload");

						 } else {
						 	$("#ibm_cci-widget-js").removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
						 	$(".ibm_cci-gv__modifier .ibm_cci--tweet-content-text").css('display', 'none');
								
								// REBULILD MASONRY TILES GRID VIEW
								$("#ibm_cci-widget-js").masonry('reloadItems');
								setTimeout(function(){ 
									$("#ibm_cci-widget-js").masonry();
								 }, 800);
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

	$.when(vo.f_fetch_trending(), vo.f_fetch_feeds()).done(function(results, data){
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
			// event.preventDefault();
			if($("p#ibm_cci__ml_t-js").hasClass('ibm_cci-clicked')){
				console.log("return false");
			}else{
				//REMOVE ALL STYLES
				$("li.ibm_cci__ml-li p a").removeClass("ibm_cci-close-black, ibm_cci-close");
				$("li.ibm_cci__ml-li p[class='ibm_cci-clicked']").removeClass("ibm_cci-clicked");
				$("p#ibm_cci__ml_t-js").addClass("ibm_cci-clicked");
				$(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");

				//REMOVE ALL SEARCH NODES
				vo.f_removeNodes($(".ibm_cci-tsearch-js"));				
				
				//EMPTY VO.DIFFERENCE AND VO.SIMILAR
				vo.difference = [];
				vo.similar = [];
				vo.searchterms = [];
				vo.sTerms = [];
				vo.searchTrendingList = vo.searchTrendingList.slice(0, 11);
				vo.checkedCount = 0;
				
				vo.f_fetch_feeds().done(function(data){
					vo.f_removeNodes($("#ibm_cci-widget-js > span"));
					var newData = data;
					vo.search = true; // SEARCH TRUE
					vo.f_distribute(newData);

					$('.ibm-sortable').append( $(".ibm-card") ).masonry('appended', $(".ibm-card"));
						setTimeout(function(){
							$('#ibm_cci-widget-js').masonry();
						}, 400);								
				});			
			}	
			
		});
		//ALL TRENDING FUNCTION (END)
		

		// TRENDING TOPICS ELEMENTS (START)
			$(".ibm_cci__ml-li").on("click", function(event){
				vo.f_addspinner();
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
							vo.searchterms = $.grep(vo.searchterms, function(e, i){
								return e != clickedTrendingName || null;
							});

							vo.difference = [];
							vo.similar = [];
							$(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");
							vo.f_constructURL(vo.searchterms.toString());
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
				vo.searchterms = $.grep(vo.searchterms, function(e, i){
					return e != clickedTrendingName || null;
				});

				vo.searchTrendingList = $.grep(vo.searchTrendingList, function(e, i){
					return e != clickedTrendingName || null;
				});						
				
				$(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");
				vo.f_removeNodes($(event.target).parent().parent("li.ibm_cci__ml-li.ibm_cci-tsearch-js"));

				vo.difference = [];
				vo.similar = [];
				vo.search = true; // SEARCH TRUE
				vo.f_constructURL(vo.searchterms.toString());
				vo.checkedCount = 0;
			}			
		});
		// SEARCH TOPICS ELEMENTS (END)	
	});	//WHEN	
		

	// INFINITE SCROLL (START)
		$(window).data("ajaxReq", true).on("scroll", function(e){
			if( $(window).data("ajaxReq") == false ) return;

			console.log($(window).data('ajaxReq'));
			// console.log($("#ibm_cci-widget-js").height());
			
			// checkedCount is to verify if any search or trending list has been selected
			// checkedCount == 0 it means load more data for all filters
			// if (vo.checkedCount == 0) {
				try{		    
					var prevDocumentHeight = ($(document).height() - 900);
					// console.log("prev Document Height: "+prevDocumentHeight);
		    		
		    		if ( ($(window).scrollTop()+$(window).height()) >= ($(document).height() - 900) && $(window).data("ajaxReq",true)) {  

						console.log($(window).scrollTop());
						console.log($(window).height());
						console.log($(document).height());
						
						// Set Flag to false
						$(window).data("ajaxReq", false);
						console.log("inside scrolltop if " + $(window).data('ajaxReq'));
						// Call Ajax
						var rank = $("#ibm_cci-widget-js .ibm-card").last().attr("data-rank");
						$.ajax({
							url: vo.f_url + "?callback=?",
							type: 'GET',
							contentType: 'application/json',
							dataType: 'jsonp',
							data:{ 
								rank: rank, 
								noOfItems:20,
								filter: vo.f_checkSearchstatus(vo.search),
							},
							success: function(){
								console.log("inside success" + $(window).data('ajaxReq'));
							}
						})
						.done(function(data) {
							console.log("success");
							vo.dataCards = $(".ibm-card");
							if(data.entries){
								vo.search = false; // SEARCH FALSE
								vo.f_distribute(data);

								$('.ibm-sortable').imagesLoaded(function(){
									console.log("masonry triggered");
									$('.ibm-sortable').append( $(".ibm-card") ).masonry('appended', $(".ibm-card"));
									// $('.ibm-sortable').masonry('reloadItems');
									$('.ibm-sortable').masonry('reload');
								});

								setTimeout(function(){
										if(data.entries.length == 20) {
											console.log("if Trriggered");
											$(window).data("ajaxReq", true);
										}else{
											$(window).data("ajaxReq", false);
										}

								}, 3000);
								
								
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
					console.log("infinite all trending scroll error: "+e);
				}	
			// }	

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

	// $(document).bind("DOMNodeInserted", function(e){
	// 	var ele = e.target;
	// 	console.log($(ele).attr("data-rank"));
		
	// });

}); //CLOSE ON DOM READY

(function($, a) {			
	var vo = {

		//GLOBAL ARRAY VARIABLES (NOTE: SO THEY DON'T GET OVERWRITTEN WHEN YOU PUSH DATA)
		searchterms: [], differenceClone: [], searchTrendingList: [], sTerms: [], checkedCount : 0, var_rank: 0, search : true,
		// f_unresolved : [], f_resolved : [],

		// INITIALIZATION FOR TRENDING		
		init_t: function(t_config){
			// this.t_url = "./data/tt.json";
			this.t_url = t_config.tt_url;
			this.t_template = t_config.t_template;
			this.t_container = t_config.t_container;
			// this.f_fetch_trending();
		},

		t_attach_template: function(data) {
			var newData = data;
			this.t_container.append(this.t_template.render(newData));			
		},

		st_attach_template: function(data) {
			var newData = data;
			this.t_container.append($('#st_template').render(newData));			
		},

		// CHECK SEARCH STATUS
		f_checkSearchstatus: function(status){
			console.log("inside check searchStatus");
			try{
				if(status == true){
					console.log(status == true);
					return null;
				}else {
					return vo.searchterms.toString();
				}
			}catch(e){
				console.log("check searchStatus error: "+e);
			}
		},

		// FETCH TRENDING JSON OBJECT
		f_fetch_trending: function(){	
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

					if(feed_data.mediaURL || feed_data.altMediaURL || feed_data.userAvatar){
						feed_data.mediaURL = this.f_preloadImages(feed_data.mediaURL || "");
						feed_data.altMediaURL = this.f_preloadImages(feed_data.altMediaURL || "");
					}										
					
					if(feed_data.refTweets && feed_data.refTweets.length > 0){								
						for(var i = 0; i < feed_data.refTweets.length; i++){	
							if(feed_data.refTweets[i].content){
								feed_data.refTweets[i].content = this.f_mod_content(feed_data.refTweets[i].content || "");
								feed_data.refTweets[i].published = this.f_pretty_date(feed_data.refTweets[i].published || "");	
							}

							if(feed_data.userAvatar || feed_data.refTweets.userAvatar){
								feed_data.userAvatar = this.f_preloadImages(feed_data.userAvatar || "");
								feed_data.refTweets[i].userAvatar = this.f_preloadImages(feed_data.refTweets[i].userAvatar || "");
							}

						}						
					}	
				}			
				return feed_data;
			}catch(e){
				console.log("Error inside the modify_datafeed" + e );
			}	
		},

		f_preloadImages: function(imgURL){		    
		    // var imgloaded = $('<img>').src = imgData;
		    // console.log("Preload Images: "+((new Image()).src = imgURL));
		    // return (new Image()).src = imgURL || "";
		    var img = new Image();
		     	img.src = imgURL;
			 
			if(img.onerror !== null){
				console.log("img success "+img.src);
				return img.src;
			}
			// img.onerror = function (evt){
			// 	// console.log(this.src + "not loaded");
			// 	// return null value
			// }
			// img.onload = function (evt){
			// 	// console.log(this.src + " is loaded.");
			// 	// return imgURL
			// }

			//Return NULL if onerror fails
			// return img.src = imgsrc;
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
		
		f_addspinner: function(){
			// console.log("ibm-spinner-small triggered");
			$("#ibm_cci-widget-js").append('<span class="ibm-spinner-small"></span>');
		},

		// FETCH FEED JSON OBJECT
		f_fetch_feeds: function(){
			var self = this, url = self.f_url;
			self.f_addspinner();
			return $.ajax({
					url: url + "?callback=?",
					type: 'GET',
					contentType: 'application/json',
					dataType: 'jsonp',
					data:{ 
						rank: self.var_rank, 
						noOfItems:40,
						filter: self.searchterms.toString() || null,
				}
				}).promise();
		},

		f_distribute: function(data){
			console.log("f_distribute triggered");
			var self = this;
			self.widgetNodes = $("#ibm_cci-widget-js").children(".ibm-col-1-1");
			
			if(vo.search){
			// REMOVES THE NODES FOR SEARCH
				vo.f_removeNodes(self.widgetNodes);
			}

			try{
				if(data.entries){
					// self.f_removeNodes(self.widgetNodes);
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

		f_buildtiles: function(){
		//MASONRY HELPER
			var $sortable = $('.ibm-sortable'), masonryItems = $sortable.find('.ibm-card');		

				$sortable.imagesLoaded(function(){
					$sortable.masonry({
							gutter: 0,
							itemSelector: '.ibm-card',
							transitionDuration: '7s'
						}, true);
				});
		},
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
		        if ($.inArray(e, self.searchterms) === -1)
		            self.searchterms.push(e);
		    });

		    $.unique(self.searchterms);
		    
			$.ajax(self.f_url + "?callback=?",{
				type: 'GET',
				dataType: 'jsonp',
				contentType: 'application/json',
				data:{ 
					rank: self.var_rank, 
					noOfItems:20,
					filter: self.searchterms.toString(),
				},
				success: function(){
					// 
				}
			}).done(function(data, textStatus, jqXHR) {
				var self = vo;
				self.fetchedDataArray = $(window).data('vofeed', data);
				console.log(self.fetchedDataArray);
				// Update this function to distribute loadmore and search terms
				if(data.terms){
					if(data.terms.length > 0){
						vo.search = true; // SEARCH TRUE
						vo.f_distribute(data);
						vo.totalSearchCountNum = data.totalCount || 0;
						vo.f_totalSearchCount(data.totalCount);
						
						vo.f_appendTrendinglist($.makeArray(data.terms.split(',')));
						vo.checkedCount = data.terms.split(',').length;
						vo.f_removeNodes($("#ibm_cci-widget-js > span"));

						$('.ibm-sortable').append( $(".ibm-card") ).masonry('appended', $(".ibm-card"));
						setTimeout(function(){
							$('#ibm_cci-widget-js').masonry();
						}, 400);

					} else {
						return;
					}
				}else {
					vo.f_fetch_feeds().done(function(data){
						vo.f_removeNodes($("#ibm_cci-widget-js > span"));
						vo.search = true; // SEARCH TRUE
						vo.f_distribute(data);
						$("#ibm_cci__ml_t-js").addClass('ibm_cci-clicked');

						$('#ibm_cci-widget-js').masonry("reload");
						setTimeout(function(){
							$('#ibm_cci-widget-js').masonry();
						}, 400);

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


(function(e,t,n,v){"use strict";var r=t.event,i;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,t){var n=this,s=arguments;e.type="smartresize",i&&clearTimeout(i),i=setTimeout(function(){r.dispatch.apply(n,s)},t==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection),u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){a.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;n.src!==s&&t.inArray(n,o)===-1&&(o.push(n),--i<=0&&(setTimeout(u),r.unbind(".imagesLoaded",a)))}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];return i||u(),r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s,this.src=e}),n};var s=function(t){e.console&&e.console.error(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){s("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){s("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,jQuery,vo);
