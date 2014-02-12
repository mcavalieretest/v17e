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
;( function( window, $ ) {
  var iOSCheck = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
  'use strict';

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

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
    this.options = extend( this.defaults, options );
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
      this._initLevelCss();
    },
    _initLevelCss: function() {
      var heights = [],
          max_height;

      if (this.container.id != "m-local-menu") { return; }

      jQuery("#m-local-menu .m-level").each(function(i, el) { 
        var level_height = jQuery(el).height();

        heights.push(level_height);
      });

      max_height = Math.max.apply(Math, heights);

      // If we're animating the container height, default to the first element's height. Otherwise,
      // make the container the same height as the tallest child level.
      if (this.options.animateContainerHeight) {
        $(this.container).css("height", jQuery("#m-local-menu .m-level").first().height() + "px");
      } else {
        $(this.container).css("height", max_height + "px");

        $.each(this.levels, function(i, el) { 
          $(el).css("height", max_height + "px");
        });
      }
      

    },
    _initEvents : function() {
      var self = this;

      // the menu should close if clicking somewhere on the body
      var bodyClickFn = function( el ) {
        self._resetMenu();
        jQuery('html').removeClass('m-menu-open');
        el.removeEventListener( self.eventtype, bodyClickFn );

        if (window.mobileMenuLocal) {
          window.mobileMenuLocal._resetLocalMenu();
        }
      };

      // open (or close) the menu
      this.trigger.addEventListener( this.eventtype, function( ev ) {

        jQuery('html').addClass('m-menu-open');
        
        if (jQuery(this).attr('id') == 'm-local-navigation') {
          jQuery('#m-menu').addClass('m-local-menu-enable');
        }
        else {
          jQuery('#m-menu').removeClass('m-local-menu-enable');

          // If this is the local menu, open the local menu in a second
          if (jQuery(self.el).is("#m-menu") 
            && jQuery('#m-local-navigation').length
            && !self.open) {
            setTimeout(function() {            
              var height = jQuery("#m-main-menu").height();

              // jQuery("#m-menu-scroll").animate({scrollTop: height}, 500);
            }, 500);
          }
        }

        ev.stopPropagation();
        ev.preventDefault();

        if( self.open ) {
          self._resetMenu();
        }
        else {
          self._openLevel();

          // the menu should close if clicking somewhere on the body (excluding clicks on the menu)
          document.addEventListener( self.eventtype, function( ev ) {
            if( self.open && !hasParent( ev.target, self.el.id ) ) {
              bodyClickFn( this );
            }
          } );
        }
      } );

      // opening a sub level menu
      this.menuItems.forEach( function( el, i ) {
        // check if it has a sub level
        var subLevel = el.querySelector( 'div.m-level' );
        if( subLevel ) {
          el.querySelector( 'a' ).addEventListener( self.eventtype, function( ev ) {
            ev.preventDefault();
            var level = closest( el, 'm-level' ).getAttribute( 'data-level' );
            if( self.level <= level ) {
              ev.stopPropagation();
              
              jQuery(closest( el, 'm-level' )).addClass( 'm-level-overlay' );

              self._openLevel( subLevel );
            }
          } );
        }
      } );

      // closing the sub levels :
      // by clicking on the visible part of the level element
      this.levels.forEach( function( el, i ) {
        el.addEventListener( self.eventtype, function( ev ) {
          ev.stopPropagation();
          var level = el.getAttribute( 'data-level' );
          if( self.level > level ) {
            self.level = level;
            self._closeMenu();
          }
        } );
      } );

      // by clicking on a specific element
      this.levelBack.forEach( function( el, i ) {
        el.addEventListener( self.eventtype, function( ev ) {
          ev.preventDefault();
          var level = closest( el, 'm-level' ).getAttribute( 'data-level' );
          if( self.level <= level ) {
            ev.stopPropagation();
            self.level = closest( el, 'm-level' ).getAttribute( 'data-level' ) - 1;
            self.level === 0 ? self._resetMenu() : self._closeMenu();
          }
        } );
      } );  
    },

    // Opens a single menu 'level'
    _openLevel : function( subLevel ) {
      // check height of menu contents.  need to do this to prevent the choppy scrolling on iPad / iPhone. this is enabled to force a taller view on iPhone landscape mode.
      var mNavHeightCheck = jQuery("#m-menu ul").height() + 100;
      var viewportHeight = jQuery(window).height();

      if(iOSCheck) {
        jQuery('#m-wrap').css("height", '100%');
      }
      if((iOSCheck) && (mNavHeightCheck > viewportHeight)){
        jQuery('#m-wrap').css("height", mNavHeightCheck); 
      }
    
    
      // increment level depth
      ++this.level;

      // move the main wrapper
      var levelFactor = ( this.level - 1 ) * this.options.levelSpacing,
        translateVal = this.el.offsetWidth;
      
      //this._setTransform( 'translate3d(' + translateVal + 'px,0,0)' );

      if( subLevel ) {
        // reset transform for sublevel
        this._setTransform( '', subLevel );
        // need to reset the translate value for the level menus that have the same level depth and are not open
        for( var i = 0, len = this.levels.length; i < len; ++i ) {
          var levelEl = this.levels[i];

          if( levelEl != subLevel && !jQuery(levelEl).hasClass( 'm-level-open' ) ) {
          //  this._setTransform( 'translate3d(-100%,0,0) translate3d(' + -1*levelFactor + 'px,0,0)', levelEl );
          }
        }
      }
      // add class m-enable to main wrapper if opening the first time
      if( this.level === 1 ) {
        jQuery(this.wrapper).addClass( 'm-enable' );
        this.open = true;
      }
      // add class m-level-open to the opening level element
      var levelElement = jQuery(subLevel || this.levels[0]);
      levelElement.addClass( 'm-level-open' );

      this.levelElementStack.push(levelElement[0]);

      this._updateContainerHeight();
    },
    // close the menu
    _resetMenu : function() {
      // reset left mobile menu height.  need to do this to prevent the choppy scrolling on iPad / iPhone.
      if(iOSCheck){
        jQuery('#m-wrap').css("height", 'auto');  
      }
    
      //this._setTransform('translate3d(0,0,0)');
      this.level = 0;
      // remove class m-enable from main wrapper
      jQuery(this.wrapper).removeClass( 'm-enable' );
      this._toggleLevels();
      this.open = false;
    },
    _resetLocalMenu: function() {
      jQuery('#m-menu').removeClass('m-local-menu-enable');
      jQuery("#m-menu-scroll").animate({scrollTop: 0}, 500);

      this.level = 0;

      var self = this;

      setTimeout(function() {
        self._toggleLevels();
      }, 500);
            
      jQuery(this.container).removeClass("docked");
    },
    // close sub menus
    _closeMenu : function() {
      var translateVal = this.el.offsetWidth;
    //  this._setTransform( 'translate3d(' + translateVal + 'px,0,0)' );
      this.levelElementStack.pop();

      this._toggleLevels();

      this._updateContainerHeight();
    },
    // translate the el
    _setTransform : function( val, el ) {
      el = el || this.wrapper;
      el.style.WebkitTransform = val;
      el.style.MozTransform = val;
      el.style.transform = val;
    },
    _updateContainerHeight: function() {
      if (this.options.animateContainerHeight) {
        var levelElement = $(this._getCurrentLevelElement());
        $(this.container).css("height", levelElement.height() + "px")
      }
    },
    // removes classes m-level-open from closing levels
    _toggleLevels : function() {
      for( var i = 0, len = this.levels.length; i < len; ++i ) {
        var levelEl = this.levels[i];
        if( levelEl.getAttribute( 'data-level' ) >= this.level + 1 ) {
          jQuery(levelEl).removeClass( 'm-level-open' );
          jQuery(levelEl).removeClass( 'm-level-overlay' );
        }
        else if( Number( levelEl.getAttribute( 'data-level' ) ) == this.level ) {
          jQuery(levelEl).removeClass( 'm-level-overlay' );
        }
      }
    },
    _getCurrentLevelElement: function() {
      return this.levelElementStack[this.levelElementStack.length-1];
    }
  }

  // add to global namespace
  window.mlPushMenu = mlPushMenu;
} )( window, jQuery );