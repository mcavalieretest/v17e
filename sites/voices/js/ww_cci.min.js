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
$.noConflict();

;$(function($) {
	var v,
	// DEFAULTS (START)
	Defaults = {

		defaultURLHash: window.location.hash = "#gridview",

		manageCookie: {
			setCookie: function (key, value) {
			    var expires = new Date();
			    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
			    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
	   		},

	   		getCookie: function(key) {
	        	var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
	        	return keyValue ? keyValue[2] : null;
	    	}
	    },	

    	updateURLHash: function(value)	{
			if (!window.location.hash && window.location.hash == "null" ) {
				$(location).attr('hash') + "#" + value + "w";
			}else {
				window.location.hash = value + "w";
			}
		},

		//
		manageTrendingTopics: {
			//to access manageCookie methods	
			v = this.manageCookie;

			//to access manage cookie methods
			defaultURL: "./data/tt.json",
			
			requestJSON: function(){
				$.getJSON(requestUrl, {
					"siteId": "86",
					"cometRequest":"null",
				})
				.done(function(data, error){
					v.setCookie("tt", JSON.stringify(data));
					(!error) ? console.log("fail") : this.handleCallBack(data);
				});
			},
		},
		handleCallBack: function(data){
			//console.log(data);
			if (typeof(data) !== "object") {
				console.log("Not an Object" + data);
			}else{
				var feedArray = [],
				trendingUl = $(".ibm_cci--sk.ibm_cci--sk__mt ul.ibm_cci__ml"),
				trendingli = "",
				//console.log(data.hasOwnProperty('trending'));
				
				if(data.hasOwnProperty('trending')) {
					var $data;
					$data = data.trending.split(",");
				}else{				
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
	},
	// DEFAULTS (END)

	//SEARCH FORM (START)
	SearchWidget = {
		settings: {
			form: $('form')
		},
		executeSearch: function(){
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
				
				if(searchObj.length > 0 && searchObj != "null") {
					console.log(searchObj);
					handleCallBack(searchObj);
				}		
					
			});
		}
	},
	//SEARCH FORM (END)
	
	//TRENDING TOPICS (START)
	TrendingWidget = {

	},
	//TRENDING TOPICS (END)
	
	// MANAGE TOGGLE (START)
	ManageToggle = {
		settings: {
			gridWrapper: $("#ibm_cci-widget-js"),
			toggleUI: $('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul')
		},
		toggleView: function(){	
			v = this.settings;

			v.toggleUI.children()
			.each(function(value, index){
				$this = $(this);
				$this.on('click', 'a', function(event){
					event.preventDefault();
					var target = $(event.target);
					if(!target.hasClass('selected')) {
						// console.log(target.toggleClass('selected').parent().siblings().children());
						target.addClass('selected').parent().siblings().children().removeClass("selected");
						if(v.gridWrapper.hasClass('ibm_cci-gv__modifier')){
							v.gridWrapper.removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
						} else {
							v.gridWrapper.removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
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
		}
	}
	// MANAGE TOGGLE (END)
	
})(jQuery);
