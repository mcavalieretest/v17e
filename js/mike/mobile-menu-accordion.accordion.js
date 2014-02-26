  var IBM = {};

 /**
   * Creates namespaces to be used for scoping variables and classes so that they are not global.
   * Specifying the last node of a namespace implicitly creates all other nodes.
   * Taken from ExtJS. Usage:
   * <pre><code>
IBM.namespace('Company', 'Company.data');
IBM.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
     </code></pre>
   * @param {String} namespace1
   * @param {String} namespace2
   * @param {String} etc
   * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
   * @method namespace
   */
  IBM.namespace = function() {
      var ln = arguments.length,
          i, value, split, x, xln, parts, object;

      for (i = 0; i < ln; i++) {
          value = arguments[i];
          parts = value.split(".");
          object = window[parts[0]] = Object(window[parts[0]]);
          for (x = 1, xln = parts.length; x < xln; x++) {
              object = object[parts[x]] = Object(object[parts[x]]);
          }
      }
      return object;
  };

  // Shortcut
  IBM.ns = IBM.namespace;

  IBM.ns(
    "IBM.Common", 
    "IBM.Common.Widget",
    "IBM.Common.Util",
    "IBM.Common.Vendor",
    "IBM.W3",
    "IBM.W3.Widget",
    "IBM.W3.Util",
    "IBM.WWW",
    "IBM.WWW.Widget",
    "IBM.WWW.Util",
    "IBM.Common.Widget.Accordion"
  );

(function($) {
  IBM.Common.Widget.Accordion = function(opts) {
    // var defaults = {};

    this.init(opts);
  };

  IBM.Common.Widget.Accordion.prototype = {
    init: function(opts) {
      var defaults = {};

      this.options = $.extend({}, defaults, opts);
      this.container = $(this.options.container);

      // this.container.find("ul").hide();

      this.container.on("click", "h2,a", function(e) {
        console.warn('accordion container click()');
        e.preventDefault();

        // Some other events on top of this are making this respond slowly;
        // calling stopPropagation() partially resolves this. 
        e.stopPropagation(); 

        var start = window.performance.now();

        console.warn(start);

        // $(this).next("ul").slideToggle("fast");
        $(this).next("ul").toggleClass("active");

        var end = window.performance.now();
        var time = end - start;

        console.warn(end);

        console.warn(time);



      });

    }

    
  };

})(jQuery);

