
(function($) {
  IBM.Common.Widget.Accordion = function(opts) {
    this.init(opts);
  };

  IBM.Common.Widget.Accordion.prototype = {
    init: function(opts) {
      var defaults = {},
          self     = this;

      this.options = $.extend({}, defaults, opts);
      this.container = $(this.options.container);

      function toggleList(list) {
        var target  = list,
            heading = target.prev("h2");

        // If we're closing this list, close my children too. 
        if (target.hasClass("active")) {
          target = target.find("ul").andSelf();
          target.removeClass("active");
          heading.removeClass("active");
        } else {
          target.addClass("active");
          heading.addClass("active");
        }
      }

      this.container.on("click", "h2", function(e) {
        var target = $(this).next("ul");

        toggleList(target);
      });

      this.container.on("click", "a", function(e) {
/*        e.preventDefault();

        // Some other events on top of this are making this respond slowly;
        // calling stopPropagation() partially resolves this. 
        e.stopPropagation(); 

        var target = $(this).next("ul");

        toggleList(target);*/
      });
    },

    reset: function() {
      this.container.find("ul").removeClass("active");
    }

    
  };

})(jQuery);

