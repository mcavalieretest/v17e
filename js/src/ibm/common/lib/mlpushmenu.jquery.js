/**
 * mlpushmenu.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window, $, IBM ) {
  var iOSCheck = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
  'use strict';

  // taken from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
  function hasParent( e, id ) {
    if (!e) return false;
    var el = e.target||e.srcElement||e||false;
    while (el && el.id != id) {
      el = el.parentNode||false;
    }
    return (el!==false);
  }

  // returns the depth of the element "e" relative to element with id=id ()
  // for this calculation only parents with classname = waypoint (m-level) are considered
  function getLevelDepth( e, id, waypoint, cnt ) {

    cnt = cnt || 0;
    if ( e.id.indexOf( id ) >= 0 ) return cnt;
    if( jQuery(e).hasClass( waypoint ) ) {
      ++cnt;
    }
    return e.parentNode && getLevelDepth( e.parentNode, id, waypoint, cnt );
  }

  // http://coveroverflow.com/a/11381730/989439
  function mobilecheck() {
    var check = false;
    (function(a){if(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  }

  // returns the closest element to 'e' that has class "classname"
  function closest( e, classname ) {
    if( jQuery(e).hasClass( classname ) ) {
      return e;
    }
    return e.parentNode && closest( e.parentNode, classname );
  }

  function mlPushMenu( el, container, trigger, options ) { 
    this.el = el;                 // The element containing all menus on the page. 
    this.container = container;   // The element containing only this particular menu. 
                                  // Separating this.el and this.container allows us to have 
                                  //   two menus overlapping each other that look like one, but 
                                  //   behave a little differently. 

    this.trigger = trigger;
    this.options = $.extend( this.defaults, options );
    // support 3d transforms
    this.support = Modernizr.csstransforms3d;
    // need to catch IE9 - while it doesn't support CSS transform 3d, id does support CSS for possible fallback - see adaptive.scss - selectors with .no-csstransforms3d
    this.isIE9 = jQuery.support.cssFloat; 
    if(( this.support ) || (this.isIE9)) {
      this._init();
    }


  }

  mlPushMenu.prototype = {
    defaults : {
      // overlap: there will be a gap between open levels
      // cover: the open levels will be on top of any previous open level
      type : 'cover', // overlap || cover
      // space between each overlaped level
      levelSpacing : 40,
      // classname for the element (if any) that when clicked closes the current level
      backClass : 'm-back',

      // Added by Mike Cavaliere. Set to true, and the container height will animate 
      //  to the height of the selected level.
      animateContainerHeight: false
    },
    _init : function() {
      // if menu is open or not
      this.open = false;
      // level depth
      this.level = 0;
      // the moving wrapper
      this.wrapper = document.getElementById( 'm-shift' );
      // the m-level elements
      this.levels = Array.prototype.slice.call( this.el.querySelectorAll( 'div.m-level' ) );
      // (Added by Mike Cavaliere) Keep track of the current element by pushing them onto an array.
      // Start with the first level by default.
      this.levelElementStack = [ this.levels[0] ];
      // save the depth of each of these m-level elements
      var self = this;
      this.levels.forEach( function( el, i ) { el.setAttribute( 'data-level', getLevelDepth( el, self.el.id, 'm-level' ) ); } );
      // the menu items
      this.menuItems = Array.prototype.slice.call( this.el.querySelectorAll( 'li' ) );
      // if type == "cover" these will serve as hooks to move back to the previous level
      this.levelBack = Array.prototype.slice.call( this.el.querySelectorAll( '.' + this.options.backClass ) );
      // event type (if mobile use touch events)
      this.eventtype = mobilecheck() ? 'touchstart' : 'click';
      // add the class m-overlap or m-cover to the main element depending on options.type
      jQuery(this.el).addClass( 'm-' + this.options.type );

      // initialize / bind the necessary events
      this._initEvents();
    },

    _initEvents : function() {
      var self = this;


      // open (or close) the menu
     // $(this.trigger).on( this.eventtype, function( ev ) {
        $(this.trigger).on( 'click', function( ev )  {


        ev.stopPropagation();
        ev.preventDefault();

       
        
        if( self.open ) {
          self._resetMenu();
        }
        else {
          self._openLevel();
          
        }
      } );

      $(window).on("resize", function() {
        self._setHeight();
     

      });

    },

    _getActualMenuHeight: function() {
      var copy = $("#m-menu").clone(), 
          height;

      copy.css({
        position: "absolute",
        top: "-10000px"
      });

      copy.appendTo( $(document.body) );

      height = copy.height();

      copy.remove();

      return height;
    },

    _setHeight: function(open) {
      if (!iOSCheck) { return; }

      var height,
          mNavHeightCheck = this._getActualMenuHeight(),
          viewportHeight = jQuery(window).height();

      if (open === true) {
        if ( mNavHeightCheck > viewportHeight ) {
          height = mNavHeightCheck;
        } else {
          height = '100%';
        }
      } else if (open === false) {
        height = 'auto';
      }

      $('#m-wrap').css("height", height);  
    },

    // Opens a single menu 'level'
    _openLevel : function( subLevel ) {
      var self = this;

      if ( self.operationInProgress ) { return; }

      self.operationInProgress = true;

      var self = this;

      // the menu should close if clicking somewhere on the body
      var bodyClickFn = function( el ) {
        self._resetMenu();
        el.removeEventListener( self.eventtype, bodyClickFn );
      };

      // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
      document.addEventListener( self.eventtype, function( ev ) {
        if( self.open && !hasParent( ev.target, self.el.id) ) {
          // Avoid 300ms touch delay on mobile browsers
          ev.preventDefault() 
          ev.stopPropagation();

          bodyClickFn( this );
        }
      } );

      // check height of menu contents.  need to do this to prevent the choppy scrolling on iPad / iPhone. this is enabled to force a taller view on iPhone landscape mode.
      var self = this;

      $('html').addClass('m-menu-open');

      this._setHeight(true);
    
      // increment level depth
      ++this.level;

      // move the main wrapper
      var levelFactor = ( this.level - 1 ) * this.options.levelSpacing,
        translateVal = this.el.offsetWidth;
      
      if( subLevel ) {
        // reset transform for sublevel
        this._setTransform( '', subLevel );
        // need to reset the translate value for the level menus that have the same level depth and are not open
        for( var i = 0, len = this.levels.length; i < len; ++i ) {
          var levelEl = this.levels[i];

        }
      }
      // add class m-enable to main wrapper if opening the first time
      if( this.level === 1 ) {
        this._disableDrag();

        if ( Modernizr.csstransforms3d ) {
          $("#m-menu").show();  
          
          setTimeout(function() {
            $(self.wrapper).addClass( 'm-enable' );
            
            self.open = true;
            self.operationInProgress = false;

            if (self.options.onOpen) {
              self.options.onOpen();
            }
          }, 50)

        } else {
          /* relative positioning version*/
          $("#m-menu").show();
          $(self.wrapper).animate({
            left: "-250px"
          }, function() {
            self.open = true;
            self.operationInProgress = false;

            if (self.options.onOpen) {
              self.options.onOpen();
            }        
          });
          
          

        }
      }
      // add class m-level-open to the opening level element
      // var levelElement = jQuery(subLevel || this.levels[0]);
      // levelElement.addClass( 'm-level-open' );

      // this.levelElementStack.push(levelElement[0]);

      // this._updateContainerHeight();
    },
    // close the menu
    _resetMenu : function() {
      var self = this;

      if ( self.operationInProgress ) { return; }

      self.operationInProgress = true;

      // Override close animation. Used when auto-closing on window resize in IE9.
      var animate = (arguments.length > 0 ? arguments[0] : true);

      // reset left mobile menu height.  need to do this to prevent the choppy scrolling on iPad / iPhone.
      this._setHeight(false);

      this.level = 0;

      var closeFunc = function() {
        $('html').removeClass('m-menu-open');
        $("#m-menu").hide();  

        self.operationInProgress = false;
      };

      // Good browsers
      if ( Modernizr.csstransforms3d ) {
        $(this.wrapper).one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd mozTransitionEnd", function() { 
          setTimeout(closeFunc, 200);
        });
        $(this.wrapper).removeClass( 'm-enable' );
      } else {

        if (animate) {
          // IE9 fallback animation
          $(this.wrapper).animate({
            left: "0px"
          }, closeFunc);
        } else {
          // IE9, hide without animation when auto-closing menu, to avoid choppiness. 
          $(this.wrapper).css("left", "0px");
          closeFunc();
        }
      }

      this.open = false;

      if (this.options.onClose) {
        this.options.onClose();
      }
    },

    // translate the el
    _setTransform : function( val, el ) {
      el = el || this.wrapper;
      el.style.WebkitTransform = val;
      el.style.MozTransform = val;
      el.style.transform = val;
    },

    _getCurrentLevelElement: function() {
      return this.levelElementStack[this.levelElementStack.length-1];
    },
    _emptyFunc: function (ev) { 
    ev.preventDefault();
  },
    _enableDrag: function() {
      // $('body').unbind('touchmove', this._emptyFunc);      
    },
    _disableDrag: function() {
    // $('body').bind('touchmove', this._emptyFunc);      
    }
  }

  // add to global namespace
  window.mlPushMenu = mlPushMenu;
} )( window, jQuery, CHICKENFEED );
