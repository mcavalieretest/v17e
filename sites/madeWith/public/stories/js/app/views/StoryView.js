define( ['App', 'backbone', 'marionette', 'jquery', 'hbs!templates/story', 'views/TemplateView', 'collections/Templates', 'jquerySticky'],
    function(App, Backbone, Marionette, $, template, ItemView, Templates, jquerySticky) {
      //ItemView provides some default rendering logic
      return Backbone.Marionette.CompositeView.extend( {
        template: template,
        itemView: ItemView,
        itemViewContainer: ".templates",

        itemViewOptions : function () {
          return { storyId: this.model.id };
        },

        setCollection: function() {
          // this array of templates, nested within the story JSON data, represents
          //  a new collection to be rendered as models using TemplateView
          var model = this.model.get("templates");
          for( var i = 0; i < model.length; i++ )
          {
            model[i].story_id =  this.model.id;
          }
          var templatesCollection = new Templates(model);
          this.collection = templatesCollection;
        },

        initialize: function (options) {

          this.lazyLoadMaxItems = options.lazyLoadMaxItems;
          this.lazyLoadItemIndex = options.lazyLoadItemIndex;
          this.model.set({'lazyLoadItemIndex':this.lazyLoadItemIndex});
          //console.log('this.lazyLoadMaxItems = '+this.lazyLoadMaxItems);

          if ( this.lazyLoadItemIndex < (this.lazyLoadMaxItems) ){
            this.setCollection();
            console.log('StoryView.initialize - collection:', this.collection );
            this.model.set({'visible': true});
            this.model.set({'deferRender': false});
          }
          else {
            console.log('StoryView.initialize - deferred');
            this.model.set({'visible': false});
            this.model.set({'deferRender': true});
          }
          console.log( 'this.lazyLoadItemIndex = '+this.lazyLoadItemIndex);
          console.log( 'StoryId = '+this.model.id);

        },

        deferredRender: function() {
          console.log('StoryView.deferredRender()');
          this.model.set({'deferRender': false});
          this.setCollection();
          this.render();
          this.onShow();
        },

        onRender: function() {
          console.log('StoryView.onRender');

        },

        onShow: function() {
          //console.log('StoryView.onShow()', this.model.id );

          var id = this.model.id;
          var header = $("#story-header-"+id);
          var headerTop = 37;
          var headerHeight = header.height();
          var headerBottom = headerTop + headerHeight;

          var selector = '#story-'+id;

          // INITIALLY HIDDEN (ITEM INDEX ABOVE LAZY LOAD MAX ITEM LIMIT)
          if ( this.model.get('deferRender') === true && this.model.get('visible') === false ) {

            $(selector).removeClass('story-waypoint'); // remove class to prevent false firing of story scroll tracking
            console.log('removeClass',$(selector));

            $(selector).hide();
            console.log('StoryView.onShow - hide:'+ selector );

          }

          // DEFERRED RENDER CALLED ON INITIALLY HIDDEN ITEM
          else if( this.model.get('deferRender') === false && this.model.get('visible') === false ) {
            console.log('StoryView.onShow() - deferred '+ selector);

            $(selector).show();
            this.model.set({'visible': true});

            header.sticky({ topSpacing: headerTop });

            $(selector).addClass('story-waypoint'); // add class to enable story scroll tracking
            console.log('addClass',$(selector));

            // update scroll tracking to add new story
            IBMMasters.tracking.updateScrollWaypoints(selector);

            this.attachSocialShareHandlers();

            App.YTPlayer.stopAllPlayers(); // stop any youtube videos that are playing
          }

          // INITIALLY SHOWN (ITEM INDEX BELOW LAZY LOAD MAX ITEM LIMIT)
          else {
            console.log('StoryView.onShow - show:'+ selector );
            header.sticky({ topSpacing: headerTop });
            this.attachSocialShareHandlers();

          }

        },

        attachSocialShareHandlers: function(){

          var selector = '#story-'+this.model.id;
          var that = this;
          $(selector).find('.twitter').on('click', function(e){
            IBMMasters.tracking.trackSocialShare('twitter', that.model.id );
          });
          $(selector).find('.facebook').on('click', function(e){
            IBMMasters.tracking.trackSocialShare('facebook', that.model.id );
          });
          $(selector).find('.linkedin').on('click', function(e){
            IBMMasters.tracking.trackSocialShare('linkedin', that.model.id );
          });

        },

        // View Event Handlers
        events: {

        }
      });
    });