//console.log("DOM READY");
	var tData = {}, vFeed = {}, stValues = [], sFeedStartIndex = 1;
	var getTrending = function(){			
		// var trendingURL = "";
		return $.getJSON("./data/tt.json");
	}

	var getFeed = function(){	
		// var feedURL = "";
		return $.getJSON("");
	}

	$.when(getTrending()).done(function(data, error) {
		// sFeedStartIndex = 20;
		if (typeof(data) !== "object") 
			{ 
				console.log("Not an Object" + data)
			}
			tData.uData = data.trending.split(",");
			tData.uData = $.extend({}, tData);			
			
			renderer(true, tData.uData);
			// console.log(tData);
	});
	
var renderer = function(renderBool, data) {
		if(renderBool) {
			$("#ibm_cci__ml").append($("#tt_template").render(data));
		}
}

var manageTrendingClicks = function(){
	var clickEvent;	
	if($(event.target).attr('name') != "all" && $(event.target).text().trim().length > 0 && !$(event.target).hasClass("ibm_cci-close")) { 
	 		$(event.target).addClass("ibm_cci-close");
	 		$(event.target).parent().parent().addClass('ibm_cci-clicked');
	 		$(event.target).parent().siblings('a').addClass("ibm_cci-close");
	 		$(".ibm_cci__ml_t p").removeClass('ibm_cci-clicked');
	 		console.log("trigger a");
	 		clickEvent = $(event.target).text().trim() ||  $(event.target).attr('name')
	}else if($(event.target).attr('name') != "all" && !$(event.target).hasClass("ibm_cci-close")) {	  	
	  		// clickEvent = $(event.target).attr('name').trim();
	  		$(event.target).parent().addClass('ibm_cci-clicked');
	  		$(event.target).addClass("ibm_cci-close");
	  		$(".ibm_cci__ml_t p").removeClass('ibm_cci-clicked');
	  		clickEvent = $(event.target).text().trim() ||  $(event.target).attr('name')
	  		console.log("trigger b");
	 }else if($(event.target).text().trim().length > 0 && $(event.target).attr('name') == "all") {
		 	// clickEvent = $(event.target).attr('name').trim();
		 	$(".ibm_cci__ml_t p").addClass('ibm_cci-clicked');
			$(".ibm_cci__ml-li p").removeClass('ibm_cci-clicked');
			$(".ibm_cci__ml-li .ibm_cci-voices-tt-close-container").removeClass("ibm_cci-close");
			clickEvent = $(event.target).text().trim() || $(event.target).attr('name')
			console.log("trigger c");
	 }else if($(event.target).hasClass("ibm_cci-close")) {
	 		$(event.target).removeClass("ibm_cci-close");
	 		$(event.target).parent().siblings('a').removeClass("ibm_cci-close");
	 		$(event.target).parent().removeClass('ibm_cci-clicked');
	 		$(event.target).parent().parent().removeClass('ibm_cci-clicked');
	 		clickEvent = $(event.target).text().trim() ||  $(event.target).attr('name')
	 		console.log("trigger d");
	 }

	var idx = $.inArray(clickEvent, stValues);   
	if (idx == -1 && clickEvent !== "all"){		
		stValues.push(clickEvent);	   	
	}else if(idx > -1){
		stValues.splice($.inArray(clickEvent, stValues), 1);
	}
	else{
		console.log($(".ibm_cci__ml_t p"));
	   	stValues.splice(0);
		console.log("call default JSON to build script");
	}	
	   
	   TOGGLE.updateURLHash(clickEvent);
	   console.log(stValues);
}

//Publish on events
window.location.hash = "#voices-grid";
$('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul li').on('click', TOGGLE.toggleView());	

$("#ibm_cci__ml").on("click", '.ibm_cci__ml_t .ibm_cci-voices-tt-text, .ibm_cci__ml-li .ibm_cci-voices-tt-text, .ibm_cci__ml-li .ibm_cci-voices-tt-close-container', function(event){
	
	if(!$(event.target).parent('span').parent('p').hasClass(".ibm_cci-clicked")){
		 manageTrendingClicks(event);
	}else{
		return false; 
	}
});