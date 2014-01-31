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


$(document).load(function() {
	/* Act on the event */	
});

$(function(){
	var url = "https://www-304.ibm.com/social/aggregator/voices/comet.json?siteId=86&cometRequest={\'siteId\':\'86\',\'searchCriteria\':{\'noFilter\':true,\'voices\':{\'noOfItems\':20},\'feeds\':null,\'fromDate\':null,\'filter\':null},\'action\':\'search\'}&dojo.preventCache=1391137396789&jsoncallback=handleCallBack";
	
	$.getJSON(url, function(data, error){
		return (error) ? console.log("success") : console.log("fail");
	});

	var handleCallBack = function(data){
		var dataLength = data.searchResponse.entries;
		console.log(dataLength);
	}
});
