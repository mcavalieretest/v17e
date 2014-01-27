dojo.query(".ibm-no-mobile select").removeClass("ibm-styled");

dojo.addOnLoad(function() { 
	var path_name = window.location.pathname;
	path_name = path_name.substring(1, path_name.length);
	var path_array = path_name.split('/')
	if(path_array[(path_array.length-1)] == "" || path_array[(path_array.length-1)] == "index.html"){
		var page_class = 'ibm-me-overview-page';
	}else{
		var page_name = path_array[0];
		var page_class = 'ibm-me-'+page_name+'-page';
	}
	
	var body = dojo.byId("ibm-com");
	dojo.addClass(body, page_class);		

	dojo.query("#ibm-leadspace-body h1").html('IBM <strong>MobileFirst</strong>');

	var contactbox = dojo.query("#ibm-content-main div.ibm-columns div.ibm-col-1-1")[0].innerHTML;
	dojo.place('<div id="include-contact" class="md-test-hidden">'+ contactbox+"</div>","ibm-leadspace-body","last");
	dojo.destroy(dojo.query("#ibm-content-main div.ibm-columns")[0]);
	dojo.query("#include-contact").removeClass("md-test-hidden");

	dojo.query(".featured-first").wrapAll('<a href="http://www.ibm.com/mobilefirst/us/en/bin/pdf/wsj0429opad.pdf" target="_blank" style="display:block;height:auto;" class="featured-event-anchor"></a>');
	dojo.query(".featured-second").wrapAll('<a href="http://www.ibm.com/mobilefirst/us/en/bring-your-own-device/byod.html" target="_blank" style="display:block;height:auto;" class="featured-event-anchor"></a>');

	var hasFlash = false;
	try {
		var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if (fo) {hasFlash = true;}
	} catch (e) {
		if (navigator.mimeTypes['application/x-shockwave-flash'] != undefined) {hasFlash = true;}
	}
	if (!hasFlash) {
		dojo.query(".ibm-col-6-2 a").removeClass("ibm-media");
		dojo.query(".ibm-col-1-1 a").removeClass("ibm-media");	

	}
	
	dojo.query(".slider-div").wrapAll('<div class="ibm-slider-section"></div>');
	dojo.query(".ibm-slider-section").parent().addClass("last-column");

	for (i = 6; i < dojo.query("#ibm-content-main #modules div.ibm-columns").length + 1; i--) {
		dojo.place(dojo.query("#ibm-content-main #modules div.ibm-columns")[i].innerHTML, "modules", "first");
		dojo.destroy(dojo.query("#ibm-content-main #modules div.ibm-columns")[i]);
	}
	
	addChat();
	
	function addChat() {
		window.editskill = "websphere-english";
		dojo.io.script.get({url: "//www.ibm.com/software/common-content/ssi/lp/lpdyn-common.js"});
	}
	
	addTactic();
	
	function addTactic() {
		//window.tacticJS = "[unique tactic code]";
		dojo.io.script.get({url: "//www.ibm.com/software/info/js/tactic.js"});
	}
	
	if(dojo.query('.ibm-module-container').length !== 0){
		var _curr_ad = 'ibm-module-piece-1', 
			_buttons = dojo.query('.ibm-module-bttn');
		_buttons.forEach(function(_obj, _index){
			dojo.connect(_obj, 'click', function(e){
				var _rel = dojo.attr(_obj, 'rel');
				console.log(_rel);
				if(_rel != _curr_ad){
					dojo.removeClass(dojo.query('.ibm-module-piece.display')[0], 'display');
					dojo.removeClass(dojo.query('.ibm-module-bttn.display')[0], 'display');
					var _new_piece = dojo.byId(_rel);
					dojo.addClass(_new_piece, 'display');
					dojo.addClass(_obj, 'display');
					_curr_ad = _new_piece;
				}
				e.preventDefault();
			});
		});
	}
	
});
