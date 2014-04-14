define(['jquery', 'hbs!templates/desktopFooter', 'backbone', 'marionette'],
  function ($, template, Backbone) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend({
      template:template,


      initialize: function(){

      },

      onShow: function() {
        console.log('DesktopFooter.onShow()' );

        this.iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        this.touch = !( $('html').hasClass('no-touch') );
        this.onHandler = ( this.touch && !this.iOS ) ? 'touchstart' : 'click';

        this.setupFooterLinkHandlers();
      },

      setupFooterLinkHandlers: function(){
        //------------------------------------------------------
        // For homepage and voices html footer see sidebarNav.js
        //------------------------------------------------------
        $('.footer-link').on( this.onHandler, function(e) {

          var $el = $(e.currentTarget);
          var hash = $el.data('hash');

          // TRACKING -----------------------------------------------------------------------------
          var tracking  =  $el.data('tracking'),
              evgroup   = 'global',
              ev        = 'footer',
              evaction  = 'click',
              evname    = evgroup + '_' + ev + '_' + evaction + '_' +tracking;

          IBMMasters.tracking.trackCustomEvent(evgroup, ev, evaction, evname);
          //---------------------------------------------------------------------------------------

          console.log('hash', hash );
          if( typeof hash != 'undefined') {
            window.location.hash = hash;
          }
          //e.preventDefault();

        });


      },

      // View Event Handlers
      events: {

      }


    });
  });