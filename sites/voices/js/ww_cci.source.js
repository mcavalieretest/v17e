/*
 * Name: [Project name]
 * Version: 1.0
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 * Copyright (c) 2013 IBM Corporation
 */

// URI: [File location on live site]
// Description: [JS Customization for "Project name"]
// Author: [Name and Lotus Notes address of JS author]
// Date: [Date of file edits] (e.g. July 30, 2013)
//

$(function(){
	
	// DEFAULT URL HASH (START)
	window.location.hash = "#gridview";
	// DEFAULT URL HASH (END)

	// TOGGLE GRID AND LIST VIEW (START)
	$('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul')
		.children()
		.each(function(value, index){
			$this = $(this);
			$this.on('click', 'a', function(event){
				event.preventDefault();
				var gridWrapper = $("#ibm_cci-widget-js"), target = $(event.target);
				if(!target.hasClass('selected')) {
					// console.log(target.toggleClass('selected').parent().siblings().children());
					target.addClass('selected').parent().siblings().children().removeClass("selected");
					if(gridWrapper.hasClass('ibm_cci-gv__modifier')){
						gridWrapper.removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
					} else {
						gridWrapper.removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
					}
				}
				updateUrlHash(target.attr('id'));
			})
	});
	// TOGGLE GRID AND LIST VIEW (END)
	
	// UPDATE URL HASH (START)
	var updateUrlHash = function(value)	{
		if (!window.location.hash && window.location.hash == "null" ) {
			$(location).attr('hash') + "#" + value + "w";
		}else {
			window.location.hash = value + "w";
		}
	}
	// UPDATE URL HASH (END)
		
	// Append Trending Topics (Start)
	try {
		// var requestUrl = "https://www-304.ibm.com/social/aggregator/voices/comet.json?siteId=86&cometRequest={\'siteId\':\'86\',\'searchCriteria\':{\'noFilter\':true,\'voices\':{\'noOfItems\':20},\'feeds\':null,\'fromDate\':null,\'filter\':null},\'action\':\'search\'}&callback=?";
		var requestUrl = "./data/tt.json" 
		$.getJSON(requestUrl, {
			"siteId": "86",
			"cometRequest":"null",
		}, function(data, error){
			 (!error) ? console.log("fail") : handleCallBack(data) ;	
		});
		var handleCallBack = function(value){
			if (typeof(value) !== "object" && value.trending.length <= 0) {
				console.log("Object not received and the TT items count is 0");
			} else {

				// var $data = data.searchResponse.entries;
				var $data = value.trending.split(","),
				feedArray = [],
				trendingUl = $(".ibm_cci--sk.ibm_cci--sk__mt ul.ibm_cci__ml"),
				trendingli = "";

		// var startTime = new Date().getTime();
				$data.forEach(function(val, i){						
					trendingli = "<li class=\"ibm_cci__ml-li\">";
					trendingli += "<p>";
					trendingli += "<span>";
					trendingli += "<a href=\"javascript:void(0)\" class=\"ibm_cci-voices-tt-text\">";
					trendingli += val;
					trendingli += " </a>";
					trendingli += "</span>";
					trendingli += "<a class=\"ibm_cci-voices-tt-close-container\" href=\"javascript:void(0)\"></a>";
					
					//append the li elements to the DOM
					trendingUl.append(trendingli);
			//console.log(new Date().getTime() - startTime);		
				});
				
			}	
		}				
	} catch(err) {
		console.log("Error while getting the JSON")
	}
	// Append Trending Topics (END)
	
});
