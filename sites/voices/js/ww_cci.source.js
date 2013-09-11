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

dojo.ready(function(){
	var toggleButton = dojo.query("#ibm_cci--toggle-js ul li");
		console.log(toggleButton);

		toggleButton.forEach(function(node){
			dojo.connect(node, 'onclick', function(t){
				dojo.stopEvent(t);
				console.log(t);
		})
	})



});