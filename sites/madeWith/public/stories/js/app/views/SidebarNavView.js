define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model', 'hbs!templates/sidebarNav'],
  function(App, Backbone, Marionette, $, Model, template) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.ItemView.extend( {
      template: template,
      model: new Model({
       /*mobile: App.mobile*/
        'isVizible': 'false'
      }),

      initialize: function(){
        //console.log('SidebarNav.initialize', this.model);
      },

      onRender: function() {
        //console.log('SidebarNav.onRender', this.model);
      },

      onShow: function() {

        // Disable 300 ms lag on iOS click events
        FastClick.attach(document.body);

        // For Android use 'touchstart'
        // For Desktop use 'click'
        // For iOS use 'click' with fastclick.js

        this.iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        this.touch = !( $('html').hasClass('no-touch') );
        this.onHandler = ( this.touch && !this.iOS ) ? 'touchstart' : 'click';

        console.log('this.iOS = ', this.iOS);
        console.log('this.touch = ', this.touch);
        console.log('this.onHandler = ', this.onHandler);

        this.setupFilterListToggles();

        this.createScrollbar();

        this.attachEventHandlers();

        var that = this;
        $(window).on("resize", function() { that.resizeHandler(that); } );

      },

      attachEventHandlers: function(){

        var that = this;

        // CHEESEBURGER - OPEN/CLOSE NAV
        $('.bars').on( this.onHandler, function(){

          if ( that.model.get('isVizible') === 'false' ) {
            TweenLite.to( $('.bars'), 0.20, {right: 360, ease:"Power1.easeOut"});
            TweenLite.to( $('.sideNav'), 0.20, {right:0, ease:"Power1.easeOut", onComplete:function(){ that.model.set( {'isVizible': 'true'} ); }});

            // TRACKING -----------------------------------------------------------------------------
            IBMMasters.tracking.trackCustomEvent('global', 'nav', 'click', 'global_nav_click_open');
            //---------------------------------------------------------------------------------------

          } else {
            TweenLite.to( $('.bars'), 0.20, {right: 0, ease:"Power1.easeOut"});
            TweenLite.to( $('.sideNav'), 0.20, {right:'-360px', ease:"Power1.easeOut", onComplete:function(){ that.model.set( {'isVizible': 'false'} ); }});

            // reset sidebar menu
            that.resetFilterListTogglesAndSubmenus();
            that.refreshScrollbar();

            // TRACKING -----------------------------------------------------------------------------
            IBMMasters.tracking.trackCustomEvent('global', 'nav', 'click', 'global_nav_click_close');
            //---------------------------------------------------------------------------------------
          }
        });

        // X CLOSE BUTTON
        $('.closeBtn').on( this.onHandler, function() {
          console.log('close');
          TweenLite.to( $('.bars'), 0.20, {right: 0, ease:"Power1.easeOut"});
          TweenLite.to( $('.sideNav'), 0.20, {right:'-360px', ease:"Power1.easeOut", onComplete:function(){ that.model.set( {'isVizible': 'false'} ); }});

          // reset sidebar menu
          that.resetFilterListTogglesAndSubmenus();
          that.refreshScrollbar();

          // TRACKING -----------------------------------------------------------------------------
          IBMMasters.tracking.trackCustomEvent('global', 'nav', 'click', 'global_nav_click_close');
          //---------------------------------------------------------------------------------------
        });

        // SIDEBAR NAV LINKS
        $('.main .nav-link').on( this.onHandler, function(e) {
          TweenLite.to( $('.bars'), 0.20, {right: 0, ease:"Power1.easeOut"});
          TweenLite.to($('.sideNav'), 0.20, { right:'-360px', ease:"Power1.easeOut", onComplete:function(){
            that.model.set( {'isVizible': 'false'} );

            // reset sidebar menu
            that.resetFilterListTogglesAndSubmenus();
            that.refreshScrollbar();

            // TRACKING -----------------------------------------------------------------------------
            var $el       = $(e.currentTarget),
              evgroup   = 'global',
              ev        = 'nav',
              evaction  = 'click',
              text      = $el.text(),
              textLower = text.toLowerCase(),
              linkName  = textLower.split(' ').join('-'),
              evname    = evgroup + '_' + ev + '_' + evaction + '_' +linkName;

            IBMMasters.tracking.trackCustomEvent(evgroup, ev, evaction, evname);
            //---------------------------------------------------------------------------------------

            //console.log('hash', $(e.currentTarget).data('hash') );
            var hash = $(e.currentTarget).data('hash');
            window.location.hash = hash;

          }});
        });

        // A HREF LINKS - HOMEPAGE index.html AND VOICES voices.html
        $('.main a').on( this.onHandler, function(e) {
          //e.preventDefault();
          // TRACKING -----------------------------------------------------------------------------
          var $el       = $(e.currentTarget),
            evgroup   = 'global',
            ev        = 'nav',
            evaction  = 'click',
            text      = $el.text(),
            textLower = text.toLowerCase(),
            linkName  = textLower.split(' ').join('-');

          if( linkName === '') linkName = $el.data('linkname');

          var evname  = evgroup +'_' + ev +'_' + evaction +'_' + linkName;

          IBMMasters.tracking.trackCustomEvent(evgroup, ev, evaction, evname);
          //---------------------------------------------------------------------------------------
        });

      },

      setupFilterListToggles: function() {

        var that = this;

        var filterListToggleBtn = $('.filter-list-toggle');
        var filterListSubmenuToggleBtns = $('.filter-list-submenu-toggle');
        var submenus = $('.filter-list-submenu');

        // SET UP MAIN FILTER LIST TOGGLE BUTTON
        filterListToggleBtn.on( this.onHandler, function(e) {

            if( filterListToggleBtn.hasClass('open') ) {
              filterListSubmenuToggleBtns.each( function() {
                $(this).removeClass('show');
                $(this).removeClass('open');
              });
              filterListToggleBtn.removeClass('open');
              submenus.removeClass('open');

              // TRACKING -----------------------------------------------------------------------------
              IBMMasters.tracking.trackCustomEvent('global', 'nav', 'collapse', 'global_nav_collapse_filters');
              //---------------------------------------------------------------------------------------

            } else {
              filterListSubmenuToggleBtns.each( function() { $(this).addClass('show'); });
              filterListToggleBtn.addClass('open');

              // Open first filter submenu
              filterListSubmenuToggleBtns.eq(0).addClass('open');
              $('#capability').addClass('open');

              // TRACKING -----------------------------------------------------------------------------
              IBMMasters.tracking.trackCustomEvent('global', 'nav', 'expand', 'global_nav_expand_filters');
              //---------------------------------------------------------------------------------------
            }
            that.refreshScrollbar();
        });

        // SET FILTER SUBMENU TOGGLE BUTTONS
        filterListSubmenuToggleBtns.on( this.onHandler, function(e) {
            var thisButton = $(e.currentTarget);
            var submenuId  = thisButton.data('submenu');
            var evname;

            if( thisButton.hasClass('open') ) {
              thisButton.removeClass('open');
              $(submenuId).removeClass('open');

              // TRACKING -----------------------------------------------------------------------------
              evname =  'global_nav_collapse_' + thisButton.data('submenu').replace('#','');
              IBMMasters.tracking.trackCustomEvent('global', 'nav', 'collapse', evname);
              //---------------------------------------------------------------------------------------

            } else {
              thisButton.addClass('open');
              $(submenuId).addClass('open');

              // TRACKING -----------------------------------------------------------------------------
              evname =  'global_nav_expand_' + thisButton.data('submenu').replace('#','');
              IBMMasters.tracking.trackCustomEvent('global', 'nav', 'expand', evname);
              //---------------------------------------------------------------------------------------
            }
            that.refreshScrollbar();
        });
      },

      resetFilterListTogglesAndSubmenus: function() {
        //console.log('resetFilterListTogglesAndSubmenus');
        var filterListToggleBtn = $('.filter-list-toggle');
        var filterListSubmenuToggleBtns = $('.filter-list-submenu-toggle');
        var submenus = $('.filter-list-submenu');

        if( filterListToggleBtn.hasClass('open') ) {
          filterListSubmenuToggleBtns.each( function(){
            $(this).removeClass('show');
            $(this).removeClass('open');
          });
          filterListToggleBtn.removeClass('open');
          submenus.removeClass('open');
        }
      },

      setScrollbarHeight: function() {
        var windowHeight = $(window).height();
        $('.iscroller').css('height', windowHeight);
      },

      createScrollbar: function() {

        this.setScrollbarHeight();
        this.iScroll = new IScroll('.iscroller', {
          mouseWheel: true,
          scrollbars: false
        });

      },

      refreshScrollbar: function() {
        this.setScrollbarHeight();
        this.iScroll.refresh();
      },

      resizeHandler: function(scope) {
        //console.log('window resize', scope);
        scope.refreshScrollbar();
      },

      // View Event Handlers
      events: {

      }

    });
  });