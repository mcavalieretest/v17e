var IBMMasters = IBMMasters || {};

/**
 * Namespace function, safely creates a namespace without clobbering existing objects
 * @param {String} namespace A string in the form of 'IBMMobileFirst.SE.package.subpackage'
 * @returns {Object}
 */
IBMMasters.namespace = function(namespaceString) {
    var parts = namespaceString.split('.'),
        parent = window,
        currentPart = '';
    for (var i = 0, length = parts.length; i < length; i++) {
        currentPart = parts[i];
        parent[currentPart] = parent[currentPart] || {};
        parent = parent[currentPart];
    }
    return parent;
};


(function($) {
      	
    IBMMasters.namespace('IBMMasters.homepage');
    IBMMasters.homepage = {

    	init: function() {
    		console.log('IBMMasters.homepage.init');
    		this.getJson('./stories/js/app/json/stories.json');
	    },

	    getJson: function(jsonFileUrl) {
	    	console.log('IBMMasters.homepage.getJson: '+jsonFileUrl);
	    	var that = this;
	    	$.ajax({
          dataType: "json",
          url: jsonFileUrl,
          success: that.onJsonLoaded,
          error: that.onJsonLoadError
			  });
	    },

	    onJsonLoaded: function(responseObj, statusText, xhr) {
	    	console.log('IBMMasters.homepage.onJsonLoaded');
	    	console.log('statusText = '+statusText);
	    	console.log('JSON',responseObj);
        // store json to sort tiles by filter later
        IBMMasters.homepage.json = responseObj;
        // render json into tiles and init filter menu
        IBMMasters.homepage.onReady();
	    },

	    onJsonLoadError: function(jqXHR, textStatus, errorThrown) {
	    	console.log('IBMMasters.homepage.onJsonLoadError');
	    	console.log('jqXHR Obj',jqXHR);
			  console.log('textStatus = '+textStatus);
			  console.log('errorThrown = '+errorThrown);
	    },

      onReady: function() {
        $(document).ready(function() {
          console.log('IBMMasters.homepage.onReady');
          // render all tiles in json data
          IBMMasters.homepage.renderTiles(IBMMasters.homepage.json);
          // initialize filter menu
          IBMMasters.homepage.filterMenu.init();
        });
      },

      renderTiles: function(data) {
        console.log('IBMMasters.homepage.renderTiles');
        // clear old tracking waypoints
        $('.row').waypoint('destroy');
        // determine if mobile
        var isMobile = ( $(window).width() <= 580 ) ? true : false;

        var tile, num=1;

        if ( isMobile ) {
          console.log('IBMMasters.homepage.renderTiles-mobile');
          var templateMobile = Handlebars.compile( $('#tile-mobile').html() );
          jQuery.each(data, function(i, val) {
            //console.log('TILE='+i);
            tile = templateMobile(val);
            $('div#column-1').append(tile);
            // add waypoint class for tracking
            $( "div#column-1 .tile" ).last().addClass('row');
          });
        }
        else
        {
          var template = Handlebars.compile( $('#tile').html() );
          jQuery.each(data, function(i, val) {
            //console.log('TILE='+i);
            tile = template(val);
            $('div#column-'+num).append(tile);
            // add waypoint class for tracking
            if(num===1) {
              $( "div#column-1 .tile" ).last().addClass('row');
            }
            num = ( num === 3 ) ?  1 : num+1 ;
          });
        }

        $('.tile').on('click', function(e){
          IBMMasters.homepage.onTileClick(e);
        });

        //----------------------------------------------------------------
        // TRACKING ANALYTICS
        //----------------------------------------------------------------
        var rowCounter = 1;
        $('.row').waypoint({
          triggerOnce: true,
          handler: function(direction) {
            var evname =  'homepage' + '_' + 'row' + '_' + 'scroll' +'_' + rowCounter;
            if (direction==='down'){
              IBMMasters.tracking.trackCustomEvent('homepage', 'row', 'scroll', evname);
              rowCounter +=1;
            }
          }
        });

      },

      filterTiles: function(filter, value) {
        console.log('IBMMasters.homepage.filterTiles');
        console.log('filter: '+filter+' value: '+value);
        // filter json data
        var filteredData = [];
        for (var key in IBMMasters.homepage.json) {
          var obj = IBMMasters.homepage.json[key];
          if (obj[filter] === value) {
            filteredData.push(obj);
          }
        }
        console.log('filteredData',filteredData);
        // clear tiles
        IBMMasters.homepage.clearTiles();
        // render filtered data
        IBMMasters.homepage.renderTiles(filteredData);
      },

      clearTiles: function(){
        $.waypoints('destroy'); // prevents scroll tracking from mis-firing when tiles filtered
        $('div#column-1').html('');
        $('div#column-2').html('');
        $('div#column-3').html('');
      },

      onTileClick: function(e) {
        console.log('IBMMasters.homepage.onTileClick:', e.currentTarget);
        var filterType = $('#filter-menu').data('filtertype');
        console.log( 'filter type='+filterType );
        var id = $(e.currentTarget).data('id');
        console.log( 'id='+id );
        var filter = $(e.currentTarget).data(filterType);
        console.log( 'filter='+filter );
        var url;

        if( typeof filterType === 'undefined'  || filterType === 'none' ) {
          url = './stories/#!story/'+id;

        } else {
          url = './stories/#!filter/'+filterType+'/'+filter+'/'+id;
        }

        //----------------------------------------------------------------
        // TRACKING ANALYTICS
        //----------------------------------------------------------------
        var $el       = $(e.currentTarget),
          evgroup   = 'homepage',
          ev        = 'tile',
          evaction  = 'click',
          tileId    = $el.data('id'),
          evname    = evgroup + '_' + ev + '_' + evaction + '_' + tileId;

        IBMMasters.tracking.trackCustomEvent(evgroup, ev, evaction, evname);

        // send them on their way
        window.location = url;
      }
    };

    //------------------------------------------------------------
    // FILTER MENU
    // initialized after json loaded and tiles rendered
    //------------------------------------------------------------
    IBMMasters.namespace('IBMMasters.homepage.filterMenu');
    IBMMasters.homepage.filterMenu = {

      init: function() {
        console.log('IBMMasters.homepage.filterMenu.init');
        $filterMenu  = $('#filter-menu');
        dropdown    = $('.dropdown');
        menuItems   = $('.filter-link');
        selected    = $('.selected-filter');
        defaultText = $('.selected-filter').data('default');


        // IF TOUCH device hide menu and ibm connect
        if ( !( $('html').hasClass('no-touch') ) ){
          console.log('isTouch - hide filter menu and ibm connect');
          $('#filter-menu').css('display', 'none' );
          $('.ibm-connect-bar').css('display', 'none' );
          return;
        }

        IBMMasters.homepage.filterMenu.menuOpen  = 'false';
        this.scrollerInit= 'false';

        selected.text(defaultText);

        this.attachEventHandlers();
        this.setupFilterListToggles();
        // scrollbar created on first mouseover showDropdown()
      },

      attachEventHandlers: function() {
        //console.log('IBMMasters.homepage.filterMenu.attachEventHandlers');

        $filterMenu.on('mouseenter', function(){
          //console.log('mouseenter');
          if(  IBMMasters.homepage.filterMenu.menuOpen === 'false') {
            IBMMasters.homepage.filterMenu.showDropdown();
          }
        });

        $filterMenu.on('mouseleave', function(){
          //console.log('mouseleave');
          if(  IBMMasters.homepage.filterMenu.menuOpen === 'true') {
            IBMMasters.homepage.filterMenu.hideDropdown();
          }
        });

        menuItems.on('click', function(e){
          //console.log(e.currentTarget);
          // get filter data from item clicked
          var $el         = $(e.currentTarget),
              filterType  = $el.data('filter'),
              key         = $el.data('key'),
              value       = $el.data('value'),
              filterText  = $el.text();

          if(key===''||value===''){
            // 'view all' filter selected - reset and hide menu
            IBMMasters.homepage.filterMenu.setFilterText(defaultText);
            IBMMasters.homepage.filterMenu.hideDropdown();
            // reset to initial state - show all tiles
            IBMMasters.homepage.clearTiles();
            IBMMasters.homepage.renderTiles(IBMMasters.homepage.json);

          } else {
            // set filter and hide menu
            IBMMasters.homepage.filterMenu.setFilterText(filterText);
            IBMMasters.homepage.filterMenu.hideDropdown();
            // call homepage filter function to redraw tiles
            IBMMasters.homepage.filterTiles( key, value );
          }

          // set menu filter type data attribute
          // to retrieve when tile item clicked
          // to use in routing deeplink
          $filterMenu.data('filtertype', filterType);

          //----------------------------------------------------------------
          // TRACKING ANALYTICS
          //----------------------------------------------------------------
          var evgroup   = 'homepage',
              ev        = 'filter',
              evaction  = 'click',
              filter    = $el.data('value'),
              evname    = evgroup + '_' + ev + '_' + evaction + '_' + filter;

          IBMMasters.tracking.trackCustomEvent(evgroup, ev, evaction, evname);
        });
      },

      setFilterText: function(filterText) {
        selected.text(filterText);
      },

      hideDropdown: function() {
        if (  IBMMasters.homepage.filterMenu.menuOpen === 'true'){
          //console.log('hide dropdown');
          dropdown.hide();
          IBMMasters.homepage.filterMenu.menuOpen = 'false';
        }

      },

      showDropdown: function() {
        if( IBMMasters.homepage.filterMenu.menuOpen === 'true') return;
       // console.log('show dropdown');
        dropdown.show();
       // console.log('this.scrollerInit=',this.scrollerInit);
        if (this.scrollerInit==='false') {
          IBMMasters.homepage.filterMenu.createScrollbar();
        } else {
          IBMMasters.homepage.filterMenu.iScroll.scrollTo(0, 0);
          IBMMasters.homepage.filterMenu.resetFilterListTogglesAndSubmenus();
          IBMMasters.homepage.filterMenu.refreshScrollbar();
        }
        IBMMasters.homepage.filterMenu.menuOpen = 'true';
      },

      setupFilterListToggles: function() {
        //console.log('setupFilterListToggles');
        var that = this;

        var filterListSubmenuToggleBtns = $('.filter-dropdown-submenu-toggle');
        var submenus = $('.filter-dropdown-submenu');

        // SET FILTER SUBMENU TOGGLE BUTTONS
        filterListSubmenuToggleBtns.on( 'click', function(e) {
          var thisButton = $(e.currentTarget);
          var submenuId  = thisButton.data('submenu');
          if( thisButton.hasClass('open') ) {
            thisButton.removeClass('open');
            $(submenuId).removeClass('open');
          } else {
            thisButton.addClass('open');
            $(submenuId).addClass('open');
          }
          IBMMasters.homepage.filterMenu.refreshScrollbar();
        });
      },

      resetFilterListTogglesAndSubmenus: function() {
        //console.log('resetFilterListTogglesAndSubmenus');

        var filterListSubmenuToggleBtns = $('.filter-dropdown-submenu-toggle');
        var submenus = $('.filter-dropdown-submenu');
        // close all
        filterListSubmenuToggleBtns.removeClass('open');
        submenus.removeClass('open');
        // open first ones
        filterListSubmenuToggleBtns.eq(0).addClass('open');
        submenus.eq(0).addClass('open');
      },

      setScrollbarHeight: function() {
        //console.log('setScrollbarHeight');
        var windowHeight = $(window).height();
        var dropdownHeight = ( windowHeight > 560 ) ? windowHeight-500 : 60;
        $('.filterScroller').css('height', dropdownHeight);
      },

      createScrollbar: function() {
        //console.log('createScrollbar');
        IBMMasters.homepage.filterMenu.setScrollbarHeight();
        // https://github.com/cubiq/iscroll/
        IBMMasters.homepage.filterMenu.iScroll = new IScroll('.filterScroller', {
          mouseWheel: true,
          scrollbars: false
        });
        this.scrollerInit = 'true';
      },

      refreshScrollbar: function() {
        //console.log('refreshScrollbar');
        IBMMasters.homepage.filterMenu.setScrollbarHeight();
        IBMMasters.homepage.filterMenu.iScroll.refresh();
      }

    };

    // set it off
    IBMMasters.homepage.init();


})(window.jQuery);
