$(function(){

	window.location.hash = "#gridview";
	var vo,
	// DEFAULTS (START)
	Defaults = {
		defaultURLHash:{},
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
			
			defaultURL: "./data/tt.json",			
			
			requestJSON: function(){
				vo = Defaults.manageCookie;
				$.getJSON(this.defaultURL, {
					"siteId": "86",
					"cometRequest":"null",
				})
				.done(function(data, error){
					// vo.setCookie("tt", JSON.stringify(data));
					(!error) ? console.log("fail") : Defaults.handleCallBack(data);
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
				trendingli = "";
				//console.log(data.hasOwnProperty('trending'));
				
				if(data.hasOwnProperty('trending')) {
					var $data;
					$data = data.trending.split(",");
				}
				else {				
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
			searchInput: $('form')
		},
		executeSearch: function(){
			vo = SearchWidget.settings;
			vo.searchInput.submit(function(event) {
				/* Act on the event */
				event.preventDefault();
				var searchObj = [$("#ibm-cc-search--field").val()];	
				$("#ibm-cc-search--field").val('');

				if(searchObj.length > 0 && searchObj != "null") {
					//Strip unwanted characters from the search Obj
					
					Defaults.handleCallBack(searchObj);
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
			toggleUI: $('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul'),
			gridWrapper: $("#ibm_cci-widget-js")
		},
		toggleView: function(settings){	
			// console.log("inside toggle");
			vo = ManageToggle.settings;						
			vo.toggleUI.children()
			.each(function(value, index){
				$this = $(this);				
				$this.on('click', 'a', function(event){
					event.preventDefault();
					var target = $(event.target);
					if(!target.hasClass('selected')) {
						target.addClass('selected').parent().siblings().children().removeClass("selected");
						console.log(vo);
						if($("#ibm_cci-widget-js").hasClass('ibm_cci-gv__modifier')){
							$("#ibm_cci-widget-js").removeClass('ibm_cci-gv__modifier').addClass('ibm_cci-lv__modifier');
						 } else {
						 	$("#ibm_cci-widget-js").removeClass('ibm_cci-lv__modifier').addClass('ibm_cci-gv__modifier');
						 }
					}
					Defaults.updateURLHash(target.attr('id'));
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
		}
	}
	// MANAGE TOGGLE (END)	
	Defaults.manageTrendingTopics.requestJSON();


	//Publish Toggle
	$('.ibm_cci--ls--toggle ul.ibm_cci--ls--toggle--ul li').on('click', ManageToggle.toggleView());
	$('form .ibm-cc-search--icon').on('click', SearchWidget.executeSearch());
	
});

