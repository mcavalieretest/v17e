dojo.addOnLoad(function(){
	var ribbon = dojo.query('.ibm-ribbon2 .ibm-container-body'); 
	var s = new ibmweb.ribbon({
		srcNodeRef: ribbon[0],
		autoscroll: true, 
		freeScroll: true,
		interval: 5000
	});

	dojo.query('.ibm-ribbon2').forEach(function(i){
		dojo.addClass(i, 'ibm-ribbon');
	});
		
	s.startup();
    
    // ------- custom carousel ------------------
    //  - user clicks thumbnail image, we show correct panel and hide others
    /// contact:adestefa@ibm.com
    var iOSCheck = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
    var viewportHeight = jQuery(window).height();
    // filter iphones
    if ((iOSCheck) && (viewportHeight < 768)) {
        // show full version of each for mobile
        showPanel("p5");
    // show small image thumbs    
    } else {
        // show first panel in custom carousel
        showPanel("p1");
        // set event listeners for each thumbnail image using shared class name
        dojo.query('.panel_link_1').onclick( function(evt) {showPanel("p1");});
        dojo.query('.panel_link_2').onclick( function(evt) {showPanel("p2");});
        dojo.query('.panel_link_3').onclick( function(evt) {showPanel("p3");});
        dojo.query('.panel_link_4').onclick( function(evt) {showPanel("p4");});
    }
    // custom carousel controller driven by thumbnail image links 
    function showPanel (id) {
        // hide all panels 
        dojo.query('.panel').forEach(function(i) {dojo.style(i, "display", "none");});
        // show target panel by id
        dojo.style(dojo.byId(id), "display", "block");
    }    
});