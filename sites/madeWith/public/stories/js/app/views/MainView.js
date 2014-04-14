define( ['App', 'backbone', 'marionette', 'jquery', 'hbs!templates/main', 'views/StoryView', 'models/Model', 'jqueryScrollTo'],
  function(App, Backbone, Marionette, $, template, ItemView, Model, scrollTo) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.CompositeView.extend( {
      template: template,
      itemView: ItemView,
      itemViewContainer: "#stories",

      model: new Model({
        'lazyLoadMaxItems' : 8, // DESKTOP LAZY LOAD LIMIT
        'currentLastItemIndex' : 0
      }),

      // child view item pre-init logic
      itemViewOptions: function(model, index) {

        // Set collection index on each story view
        var itemCollectionIndex = this.collection.indexOf(model);

        return {
          lazyLoadItemIndex: itemCollectionIndex,
          lazyLoadMaxItems: this.model.get('lazyLoadMaxItems')
        };

      },

      initialize: function() {
        console.log('MainView.initialize');
        console.log('MainView collection:', this.collection);

        // Get platform info to set lower lazy load max
        this.iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
        this.touch = !( $('html').hasClass('no-touch') );

        // Check if iOS or TOUCH DEVICE
        if ( this.iOS ||  this.touch ) {
          this.model.set({'lazyLoadMaxItems': 3}); // iOS and Touch device LAZY LOAD LIMIT
        }

        var lazyLoadMaxItems =  this.model.get('lazyLoadMaxItems');
        console.log('MainView lazyLoadMaxItems:'+lazyLoadMaxItems );

        // Set current last item index
        var currentLastItemIndex;
        if ( this.collection.length > lazyLoadMaxItems ) {
          currentLastItemIndex = lazyLoadMaxItems - 1;
          this.model.set({'currentLastItemIndex': currentLastItemIndex} );
        }
        else {
          currentLastItemIndex = (this.collection.length - 1);
          this.model.set({'currentLastItemIndex': currentLastItemIndex} );
        }
        console.log('MainView currentLastItemIndex:'+this.model.get('currentLastItemIndex') );

      },

      onRender: function() {
        console.log('MainView.onRender');
      },

      onShow: function() {
        console.log('MainView.onShow: ');

        this.initShowMore();

        // reset scroll to top
        window.scrollTo(0,0);

        // add scroll tracking for initial loaded items - lazy loaded items scroll tracking added in StoryView.js
        IBMMasters.tracking.addScrollWaypoints();

      },

      initShowMore: function() {
        console.log('MainView.initShowMore()');
        // display 'show more'
        if( this.collection.length > this.model.get('lazyLoadMaxItems') ) {
          $('.show-more').show();

          this.onHandler = ( this.touch /*&& !this.iOS*/ ) ? 'touchstart' : 'click';
          console.log('this.onHandler='+this.onHandler);
          var that = this;
          $('.show-more').on( this.onHandler,  function(){ that.lazyLoadMore(); });
        }
      },

      hideShowMore: function() {
        console.log('hideShowMore');
        $('.show-more').hide();
      },

      lazyLoadMore: function() {
        console.log('lazy load more');

        // iterate over all of the views
        /*
        this.children.each(function(view, index){
          console.log(index);
          console.log(view.model.get('visible'));
          // process each view individually, here

        });
        */

        var currentLastItemIndex = this.model.get('currentLastItemIndex');
        var newLastItemIndex = currentLastItemIndex + this.model.get('lazyLoadMaxItems');
        var counter = 0;
        var itemView;
        for (var i = currentLastItemIndex+1; i <= newLastItemIndex; i++) {

          if( i <  this.collection.length ){
            itemView = this.children.findByIndex(i);
            console.log('itemIndex = '+ i + ' ', itemView);
            itemView.deferredRender();
            counter +=1;
          } else {
            console.log('no more items');
          }
        }
        this.model.set({'currentLastItemIndex':newLastItemIndex});

        if( newLastItemIndex >= this.collection.length-1 ) {
          this.hideShowMore();
        }


      },

      // View Event Handlers
      events: {

      }

    });
  });