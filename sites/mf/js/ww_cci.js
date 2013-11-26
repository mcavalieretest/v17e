/*
 * Name: MobileFirst
 * Version: 1.0
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 * Copyright (c) 2013 IBM Corporation
 */

// URI: www.ibm.com/common/v17e/mobilefirst/js/ww_cci.min.js
// Description: JS Customization for MobileFirst project
// Author: Jefferson D Florentino/New York/IBM@IBMUS
// Date: Nov 25, 2013
//

if (!Modernizr.svg) {
//  $(".logo img").attr("src", "images/logo.png");
//	$(".logo img").attr("src", "images/logo.png");
	alert('test');
}

jQuery(function() {

var mDeviceCheck = /(android|iPad|iPhone|iPod|playbook)/g.test( navigator.userAgent );

if(!mDeviceCheck) {
	jQuery.getScript( "//www.ibm.com/software/common-content/ssi/lp/lpdyn-common.js" )
}

});
