$(function() {

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
					if(!target.hasClass('selected')) {
						target.addClass('selected').parent().siblings().children().removeClass("selected");						
						if($("#ibm_cci-widget-js").hasClass('ibm_cci-gv__modifier')){
							$("#ibm_cci-widget-js").removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
						 } else {
						 	$("#ibm_cci-widget-js").removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
						 }
					
					}
					updateURLHash(target.attr('id'));
				})
		});			
	// MANAGE TOGGLE EFFECTS ON GRID AND LIST VIEW (END)
 

/*
	1. 	INITIALIZATION OF TRENDING TOPICS
	2. 	LATER WE CAN CHANGE THE URL INTO AN OBJECT AND 
		PASS THAT OBJECT TO CONSTRUCT THE URL
*/
	VOICES.init_t({
		tt_url : "https://www-304.ibm.com/social/aggregator/voices/comet.json?siteId=86&cometRequest={'siteId':'86','action':'rpc','rpc':{'method':'trending','type':'','id':''}}&callback=?", 
		// tt_url 		: "./data/tt.json", 
		t_template 	: $('#tt_template'),
		t_container	: $('#ibm_cci__ml')
	});

	VOICES.init_f({
		f_url : "https://www-304.ibm.com/social/aggregator/voices/comet.json?siteId=86&cometRequest={'siteId':'86','searchCriteria':{'noFilter':false,'feeds':null,'fromDate':null,'filter':'SimonPorter'},'action':'search'}&callback=?",
		// f_url : "./data/voicesfeed.json", 
		f_unro_template: $('#unro_template'),
		f_container: $('#ibm_cci-widget-js'),

	});	

	$.when(VOICES.fetch_trending(), VOICES.fetch_feeds()).done(function(results, data){		
		var self = VOICES, f_unresolved = [], f_resolved = [];
		self.feed = data[0].searchResponse.entries;	
		self.feed_length = data[0].searchResponse.entries.length;
			
			for(var i = 0; i < self.feed_length; i++){	
				if(typeof(self.feed[i]) !== 'undefined') {		
					if(typeof(self.feed[i].refTweets) == 'undefined') {
						// For unresolved Tweets
						f_unresolved.push(self.feed[i]);
						// VOICES.f_attach_unro_temp(f_unresolved);
					}else {
						// For resolved Tweets you need to store the Object
						f_resolved.push(self.feed[i]);
					}
				}
			}
			// before sending it to template attach sanitize the data
			self.f_attach_unro_temp(f_unresolved);
			// console.log(f_unresolved);
	});


});

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
			return $.getJSON(this.t_url, { dataType: 'jsonp', crossDomain: true }, function(data){
				// RESULTS OF THE JSON DATA IS MAPPED AND STORED TO THE NEW ARRAY filter_tweets
				var rec_data = data.searchResponse.trending.split(",") || null;
					rec_data = $.extend({}, rec_data);

				self.t_newlist = $.map(data.searchResponse.trending.split(","), function( list, index ){
					
					return {
						 t_list : $.makeArray(list)
						 //t_list : list
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
		},		

		f_attach_unro_temp: function(unro_data) {
			//Modify the timestamp and the content attr and wrap href
			// console.log(unro_data[i]);
			this.f_container.append(this.f_unro_template.render(this.f_modify_unro(unro_data)));		
		},

		f_modify_unro: function(unro_data){
			var self = this,
				unr_data_length = unro_data.length,
				unr_data = unro_data;

				for(var i = 0; i <= unr_data_length; i++){
					if(typeof(unr_data[i]) !== 'undefined'){
						if(typeof(unr_data[i].content) !== 'undefined'){
							unr_data[i].content = this.f_mod_content(unr_data[i].content);
							unr_data[i].published = this.f_pretty_date(unr_data[i].published);
							// unr_data[i].published = f_addcontent_links(unr_data[i].content);
						}
					}	
				}				
				return unr_data;
		},

		
		f_mod_content: function(data){			
			var update_content = data.replace(/(http(s)*\:\/\/[^\s]+\s*)/g, "<a href=\"$1\">$1</a>")
								.replace(/#([^\s]+)/g, '<a href="//twitter.com/search?q=%23$1">#$1</a>')
								.replace(/@([^\s:]+)/g, '<a href="//twitter.com/$1">@$1</a>');
				return update_content;
		},

		f_pretty_date: function(timeVal){
			
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
					   
			  
			  return retVal;
		},

		// FETCH FEED JSON OBJECT
		fetch_feeds: function( ){
			var self = this;
			return $.getJSON(this.f_url, { dataType: 'jsonp', crossDomain: true }, function(data) {
				f_feed : data.searchResponse.entries
			}).promise();
		}

	}; //VOICES (END)

	a.VOICES = VOICES;

})(jQuery, window);

