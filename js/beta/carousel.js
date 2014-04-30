(function($, IBM) {
  IBM.ns(IBM, "IBM.Common.Widgets.Carousel");
  IBM.ns(IBM, "IBM.Common.Util");

  IBM.Common.Util.getMaxHeight = function() {
    
  };

  IBM.Common.Widgets.Carousel = function(options) {
    var defaults = {

    };

    this.config  = $.extend({}, defaults, options);
    this.element = $(this.config.selector);

    this.initHeight();
  };

  $.extend(IBM.Common.Widgets.Carousel.prototype, {
    initHeight: function() {
      this.element.height
    }
  });


})(jQuery, CHICKENFEED);

$(function() {

});