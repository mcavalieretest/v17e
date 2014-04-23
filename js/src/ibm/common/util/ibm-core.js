jQuery.noConflict();

var CHICKENFEED = {};

;( function( window, $, IBM ) {
 /**
   * Creates namespaces to be used for scoping variables and classes so that they are not global.
   * Specifying the last node of a namespace implicitly creates all other nodes.
   * Taken from ExtJS and tailored. Usage:
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
      var scope = arguments[0],
          ln = arguments.length,
          i, value, split, x, xln, parts, object;

          // debugger

      for (i = 1; i < ln; i++) {
          value = arguments[i];
          parts = value.split(".");
          object = scope[parts[0]] = Object(scope[parts[0]]);
          for (x = 1, xln = parts.length; x < xln; x++) {
              object = object[parts[x]] = Object(object[parts[x]]);
          }
      }
      return object;
  };


  // Shortcut
  IBM.ns = IBM.namespace;

  IBM.ns(
    IBM,
    "Common", 
    "Common.Widget",
    "Common.Util",
    "Common.Vendor",
    "W3",
    "W3.Widget",
    "W3.Util",
    "WWW",
    "WWW.Widget",
    "WWW.Util",
    "Common.Widget.Accordion",
    "Common.Widget.MobileMenu",
    "CurrentPage"
  );

  // Placeholder for browser detection; to be replaced when we start using the browser plugin.
  $.browser = {
    firefox: (function() {
      return navigator.userAgent.toLowerCase().indexOf('firefox') > -1;;
    })()
  };
} )( window, jQuery, CHICKENFEED );
