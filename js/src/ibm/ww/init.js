jQuery(function() {

    try {
      // Tracking code for v17e pages
      var csses = ["application","data","forms","module","social"],
            cssUsed = "",
            jsUsed = jQuery("script[src$='/ww.js']").length == 1 ? jQuery("script[src$='/ww.js']").attr("src") : jQuery("script[src$='/w3.js']").length > 0 ? jQuery("script[src$='/w3.js']").attr("src") : "NA";

      jQuery.each(csses, function(k, cssFileName){
        if (jQuery("link[href$='/"+cssFileName+".css']").length > 0) {
          cssUsed += ","+cssFileName;
        }
      });

      cssUsed = cssUsed.substr(1);
      ibmStats.event({"ibmEV":"page load","ibmEvSection":jsUsed,"ibmEvAction":"v17e page","ibmEvModule":cssUsed});
    }
    catch (e) {}

    var ibmcom = {
    
        mobTabs: function () {
        
        // Check if primary tabs exists
        if(jQuery('#ibm-primary-tabs').length)

        jQuery("#ibm-primary-tabs").addClass("ibm-no-mobile").after('<form class="ibm-menu-list ibm-mobile" action="http://www.ibm.com/links" id="ibm-mobile-tabs"><div><select></select></div></form>');

        // Loop through each link under primary tabs and convert it to a dropdown list
        jQuery('#ibm-primary-tabs li').each(function(){
        
            var selectedLink = jQuery(this).hasClass('ibm-active');
            
            if(selectedLink) {
                selectedLink = 'selected="selected"'
                }
            else {
                selectedLink = '';
                }
            var isSubPage = this.parentNode.parentNode.tagName.toLowerCase() === 'li';
            jQuery('#ibm-mobile-tabs select').append('<option ' + 
            
                selectedLink + 

                ' value="' + jQuery(this).find("a").eq(0).attr('href') + '">' + 
                    ( isSubPage ? '&emsp;&#x21b3; ' : '' ) + jQuery(this).find("a").eq(0).text() + 
                '</option>');
            
            // check for change on dropdown list and submit value to window.location
            jQuery('#ibm-mobile-tabs select').change(
            
            function(){
                window.location = jQuery(this).val();
             });
            
        });
        
        },
        
        leftNavTabs: function () {
        
        // Check if left nav links exists
        if(jQuery('#ibm-primary-links').length)

        jQuery("#ibm-content-main").prepend('<form class="ibm-menu-list ibm-mobile" action="http://www.ibm.com/links" id="ibm-leftnav-links"><div><select></select></div></form>');

        // Loop through each link under primary tabs and convert it to a dropdown list
        jQuery('#ibm-primary-links a').each(function(){
        
            var selectedLink = jQuery(this).parent().hasClass('ibm-active');
            var depth = jQuery(this).parents('ul').length;
            var depthIndicator = '';
    
            if (depth == '2') {
                depthIndicator = '- ';
                }
            if (depth == '3') {
                depthIndicator = '-- ';
                }
            if (depth == '4') {
                depthIndicator = '--- ';
                }
            
            if(selectedLink) {
                selectedLink = 'selected="selected"'
                }
            else {
                selectedLink = '';
                }
        
            jQuery('#ibm-leftnav-links select').append('<option ' + 
            
                selectedLink + 

                ' value="' + jQuery(this).attr('href') + '">' + 
                depthIndicator + 
                jQuery(this).text() + 
                '</option>');
            
            // check for change on dropdown list and submit value to window.location
            jQuery('#ibm-leftnav-links select').change(
            
            function(){
                window.location = jQuery(this).val();
             });
            
        });
        
        },

        init: function () {
        
            // init primary tabs to dropdown list function
            ibmcom.mobTabs();
            
            // init convert the left nav links (default template) into a dropdown list
            ibmcom.leftNavTabs();
            
        }

    }; 

ibmcom.init();

  (function($, IBM) {
   IBM.Common.Widget.MobileMenu.init();

    window.scrollTo(1,1);
    window.scrollTo(0,0);
  })(jQuery, CHICKENFEED);

});
