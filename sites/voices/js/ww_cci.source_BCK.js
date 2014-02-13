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

// GET SET COOKIE (START)
	function setCookie(key, value) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
	    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }
// GET SET COOKIE (END)

	
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
	var requestUrl = "./data/tt.json";
		$.getJSON(requestUrl, {
			"siteId": "86",
			"cometRequest":"null",
		}).done (function(data, error){
			 setCookie("tt", JSON.stringify(data));
			 (!error) ? console.log("fail") : handleCallBack(data) ;

		});
	
	var handleCallBack = function(data){
		//console.log(data);
		if (typeof(data) !== "object") {
			console.log("Not an Object" + data);
		} 
		else{
			var feedArray = [],
			trendingUl = $(".ibm_cci--sk.ibm_cci--sk__mt ul.ibm_cci__ml"),
			trendingli = "",
			trendingCount;
			//console.log(data.hasOwnProperty('trending'));
			
			if(data.hasOwnProperty('trending')) {
				var $data;
				$data = data.trending.split(",");
				trendingCount = $data.length;
			} else {				
				$data = $.extend({}, data);
				$data = $data[0].split(',');
				//console.log($data);
			}	 

			// var startTime = new Date().getTime();
			$data.forEach(function(val, i){						
				trendingli = "<li class='ibm_cci__ml-li'>";
				trendingli += "<p>";
				trendingli += "<span>";
				trendingli += "<a href='javascript:void(0)' class='ibm_cci-voices-tt-text'>";
				trendingli += val;
				trendingli += " </a>";
				trendingli += "</span>";
				trendingli += "<a class='ibm_cci-voices-tt-close-container' href='javascript:void(0)'></a>";
				
				//append the li elements to the DOM
				trendingUl.append(trendingli);
				//console.log(new Date().getTime() - startTime);		
			});
				
		}	
	}				
	// Append Trending Topics (END)

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
				});
		});
	});
	// TOGGLE GRID AND LIST VIEW (END)
	 
	$('form').submit(function(event) {
		/* Act on the event */
		event.preventDefault();
		var searchObj = [$("#ibm-cc-search--field").val()];	
		$("#ibm-cc-search--field").val('');

		var filterSearchTerms = function(){
			//santitize search and pass the values to check if the words exist
		}

		// var doesExist = function(data){
			
		// 	var existingTT = $.parseJSON(getCookie('tt')), 
		// 	existingArrItem = data, difference = [];		
			
		// 	existingTT = existingTT.trending.split(",");

		// 	$.grep(existingTT, function(el) {
		// 	    if($.inArray(el, existingArrItem) == -1) difference.push(el);
		// 	});
		// 		console.log(difference);
		// }

		// doesExist(searchObj);
		
		if(searchObj.length > 0 && searchObj != null) {
			console.log(searchObj);
			handleCallBack(searchObj);
		}		
			
	});

});
