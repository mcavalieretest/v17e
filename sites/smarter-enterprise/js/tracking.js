$(document).ready(function(){

	// Sticky nav links
	$('#in-page-nav-1').on("click", 'a', function(event){

		var el = $(this),
			ev = el.data('ev'),
			evaction = el.data('evaction'),
			evname =  el.data('evname');

		trackClickEvent(ev, evaction, evname);

	});

	// Right Nav Arrow added dynamically in functions.js
	$('#in-page-nav-1').on("click", '.right-side', function(event){

		trackClickEvent('cloudmenu', 'clickmenu', 'scrollright');

	});
	// Left Nav Arrow added dynamically in functions.js
	$('#in-page-nav-1').on("click", '.left-side', function(event){

		trackClickEvent('cloudmenu', 'clickmenu', 'scrollleft');

	});

});

function trackClickEvent(ev, evaction, evname){

	if (typeof ibmStats === 'undefined') {

		// console.log('No ibmstats - el: '+'a' +' ev:'+ev+' evaction:'+evaction+' evname:'+evname);

	}else{

		ibmStats.event({ 'ibmEV' : ev, 'ibmEvAction' : evaction, 'ibmEvName' : evname });

	}

}

// trackScrollEvent called from in-page-nav.js

var last_item_id, last_suffix;

function trackScrollEvent(itemId, evNameSuffix){

	if(last_item_id == itemId && last_suffix == evNameSuffix) return;

	if(itemId === '#undefined') return;

	last_item_id = itemId;
	last_suffix = evNameSuffix;

	var el = $(itemId),
		ev = el.data('ev'),
		evaction = el.data('evaction'),
		noSuffix = el.data('nosuffix'),
		evname = (noSuffix === true) ? el.data('evname') : el.data('evname')+evNameSuffix; // suffix is either 'start' or 'end'

	if (typeof ibmStats === 'undefined') {

    	//console.log('No ibmstats - el:'+itemId +' ev:'+ev+' evaction:'+evaction+' evname:'+evname);

	}else{

		ibmStats.event({ 'ibmEV' : ev, 'ibmEvAction' : evaction, 'ibmEvName' : evname });

	}

}
