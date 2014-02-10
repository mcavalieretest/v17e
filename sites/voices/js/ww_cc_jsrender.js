(function($, b){
	var	myApp  = {};
		myApp.toggleView = function(){	
			// console.log(this);						
			$('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul').children()
			.each(function(value, index){
				$this = $(this);				
				$this.on('click', 'a', function(event){
					event.stopPropagation();
					var target = $(event.target);
					if(!target.hasClass('selected')) {
						target.addClass('selected').parent().siblings().children().removeClass("selected");						
						if($("#ibm_cci-widget-js").hasClass('ibm_cci-gv__modifier')){
							$("#ibm_cci-widget-js").removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
						 } else {
						 	$("#ibm_cci-widget-js").removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
						 }
					}
					myApp.updateURLHash(target.attr('id'));
					$('.ibm-col-1-1').each(function(v, i){
						$this = $(this);
						$this.css({opacity:0});
						$this.animate({
							opacity: 1
						},1000,
						function(){
							console.log("Animate was triggered" );
						}
						)
					})
				})
			});			
		};

		myApp.updateURLHash = function(value)	{
			if (!window.location.hash && window.location.hash == "null" ) {
				$(location).attr('hash') + "#voices-" + value;
			}else {
				window.location.hash = "#voices-" + value;
			}
		};

	b.myApp = myApp;
})(jQuery, window);

$(function() {
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
		f_url : "https://www-304.ibm.com/social/aggregator/voices/comet.json?siteId=86&cometRequest={'siteId':'86','searchCriteria':{'noFilter':true,'feeds':null,'fromDate':null,'filter':null},'action':'search'}&callback=?"
	});	

	$.when(VOICES.fetch_trending(), VOICES.fetch_feeds()).then(function(results, data){
		console.log(results);
		console.log(data[0].searchResponse.entries);
	});

 	myApp.toggleView();	

});

(function($, a) {		
	
	var VOICES = {			
		// INITIALIZATION FOR TRENDING		
		init_t: function(t_config){
			// this.t_url = "./data/tt.json";
			this.t_url = t_config.tt_url;
			this.t_template = t_config.t_template;
			this.t_container = t_config.t_container;
		},

		t_attach_template: function() {
			this.t_container.append(this.t_template.render(this.t_newlist));			
		},

		// FETCH TRENDING JSON OBJECT
		fetch_trending: function(){	
			var self = this;
			return $.getJSON(this.t_url, {
				dataType: 'jsonp',
				crossDomain: true
			}, function(data){
				// RESULTS OF THE JSON DATA IS MAPPED AND STORED TO THE NEW ARRAY filter_tweets
				var rec_data = data.searchResponse.trending.split(",");
					rec_data = $.extend({}, rec_data);
				self.t_newlist = $.map(rec_data, function( list ){
					return {
						 // t_list : $.makeArray(list)
						 t_list : list
					};
				});				
				 self.t_attach_template();
			}).promise();
		},

		// INITIALIZATION FOR FEEDS
		init_f: function(f_config){
			this.f_url = f_config.f_url;
		},		

		// FETCH FEED JSON OBJECT
		fetch_feeds: function( ){
			var self = this;
			return $.getJSON(this.f_url, {
				dataType: 'jsonp',
				crossDomain: true
			}, function(data) {
				
			}).promise();

		}

	}; //VOICES (END)

	a.VOICES = VOICES;

})(jQuery, window);

