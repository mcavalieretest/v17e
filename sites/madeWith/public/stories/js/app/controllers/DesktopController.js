define(['App', 'backbone', 'marionette', 'views/MainView', 'views/MissionView', 'views/DesktopHeaderView', 'views/DesktopFooterView',  'views/SidebarNavView', 'views/StoryIndexView', 'collections/Stories', 'collections/Templates', 'models/Model'],
    function (App, Backbone, Marionette, MainView, MissionView, DesktopHeaderView, DesktopFooterView, SidebarNavView, StoryIndexView,  Stories, Templates, Model) {
    return Backbone.Marionette.Controller.extend({

        initialize:function (options) {

          //App.headerRegion.show(new DesktopHeaderView());
          //App.footerRegion.show(new DesktopFooterView());
          console.log('DesktopController.initialize');
          App.sidebarRegion.show(new SidebarNavView());
        },

        index:function () {
          App.headerRegion.show(new DesktopHeaderView());
          // load all of the stories
          App.mainRegion.show(new MainView({
            collection: App.storiesCollection
          }));
          App.footerRegion.show(new DesktopFooterView());

          // TRACKING -----------------------------------------------------------------------------
          var evgroup = 'stories',
              ev      = '#',
              evaction= 'pageload',
              evname  = evgroup + '_' + ev + '_' + evaction;

          IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
          //---------------------------------------------------------------------------------------
        },

        storyIndex:function () {
          App.headerRegion.close();
          var storiesIndexCollection =  App.storiesCollection.clone();
          storiesIndexCollection.sortByCompanyName();
          App.mainRegion.show(new StoryIndexView({ collection: storiesIndexCollection }));
          App.footerRegion.show(new DesktopFooterView());

          // TRACKING -----------------------------------------------------------------------------
          var evgroup = 'stories',
            ev      =  window.location.hash,
            evaction= 'pageload',
            evname  = evgroup + '_' + ev + '_' + evaction;

          IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
          //---------------------------------------------------------------------------------------
        },

        story:function (query) {
          console.log('id'+query);
          App.headerRegion.show(new DesktopHeaderView());
          // Clone the global collection created from JSON file
          var stories = App.storiesCollection.clone();

          // Create collection used to slice data
          var trimmedStoriesCollection;

          // check for query strings
          if( typeof query != 'undefined' ) {

            console.log('querystring: id = '+query);
            var storyIdNum = parseInt(query, 10);
            var storyById = stories.where({ id: storyIdNum });
            // if id exists trim collection to that id
            if(storyById.length > 0) {
              console.log('storyById', storyById);
              //console.log('getById: ', stories.get(storyIdNum) );
              var storyModel = stories.get(storyIdNum);
              var storyCollectionIndex = stories.indexOf(storyModel);
              trimmedStoriesCollection = new Stories(stories.slice(storyCollectionIndex, stories.length));

              // Load trimmed collection and model
              App.mainRegion.show(new MainView({
                collection: trimmedStoriesCollection
              }));
              App.footerRegion.show(new DesktopFooterView());

              // TRACKING -----------------------------------------------------------------------------
              var evgroup = 'stories',
                ev      =  window.location.hash,
                evaction= 'pageload',
                evname  = evgroup + '_' + ev + '_' + evaction;

              IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
              //---------------------------------------------------------------------------------------

            } else {

              // redirect to app index
              this.redirect();

            }
          }
        },

        filterByTech:function (query) {
          console.log('filterByTech:', query);
          App.headerRegion.show(new DesktopHeaderView());
          // check if tech is defined
          if( typeof query != 'undefined' ) {
            // create filtered category collection
            var filteredCollection = App.storiesCollection.filterByTech(query);
            console.log('Tech collection', filteredCollection);
            if ( filteredCollection.length > 0 ){
              // Load the filtered collection
              App.mainRegion.show(new MainView({
                collection: filteredCollection
              }));
              App.footerRegion.show(new DesktopFooterView());

              // TRACKING -----------------------------------------------------------------------------
              var evgroup = 'stories',
                ev      =  window.location.hash,
                evaction= 'pageload',
                evname  = evgroup + '_' + ev + '_' + evaction;

              IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
              //---------------------------------------------------------------------------------------
            }  else {
              //console.log('filterByTech: no-match');
              this.redirect();
            }
          } else {
            // redirect to app index
            this.redirect();
          }
        },

        filterByTechId:function (query, id) {
          console.log('filterByTech: '+ query +' and Id: '+ id);
          App.headerRegion.show(new DesktopHeaderView());
          // check if tech is defined
          if( typeof query != 'undefined' ) {
            // create filtered category collection
            var filteredCollection = App.storiesCollection.filterByTech(query);
            //console.log('tech collection', filteredCollection);
            if ( filteredCollection.length > 0 && typeof id != 'undefined' ) {
              var storyIdNum = parseInt(id, 10);
              // check that story exists by id
              var storyById = filteredCollection.where({ id: storyIdNum });
              // trim collection
              var storyModel = filteredCollection.get(storyIdNum);
              var storyCollectionIndex = filteredCollection.indexOf(storyModel);
              var trimmedCollection = new Stories(filteredCollection.slice(storyCollectionIndex));

              if ( storyById.length > 0 && trimmedCollection.length > 0 ){
                console.log('Tech collection LTE id: '+storyIdNum, trimmedCollection);
                // Load the filtered and trimmed collection
                App.mainRegion.show(new MainView({
                  collection: trimmedCollection
                }));
                App.footerRegion.show(new DesktopFooterView());

                // TRACKING -----------------------------------------------------------------------------
                var evgroup = 'stories',
                  ev      =  window.location.hash,
                  evaction= 'pageload',
                  evname  = evgroup + '_' + ev + '_' + evaction;

                IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
                //---------------------------------------------------------------------------------------
              }  else {
                //console.log('filterById: no-match');
                this.redirect();
              }
            }  else {
              //console.log('filterByTech: no-match');
              this.redirect();
            }
          } else {
             //redirect to app index
            this.redirect();
          }
        },

        filterByIndustry:function (query) {
          console.log('filterByIndustry:', query);
          App.headerRegion.show(new DesktopHeaderView());
          // check if industry is defined
          if( typeof query != 'undefined' ) {
            // create filtered category collection
            var filteredCollection = App.storiesCollection.filterByIndustry(query);
            console.log('Industry collection', filteredCollection);
            if ( filteredCollection.length > 0 ){
              // Load the filtered collection
              App.mainRegion.show(new MainView({
                collection: filteredCollection
              }));
              App.footerRegion.show(new DesktopFooterView());

              // TRACKING -----------------------------------------------------------------------------
              var evgroup = 'stories',
                ev      =  window.location.hash,
                evaction= 'pageload',
                evname  = evgroup + '_' + ev + '_' + evaction;

              IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
              //---------------------------------------------------------------------------------------
            }  else {
              //console.log('filterByIndustry: no-match');
              this.redirect();
            }
          } else {
            // redirect to app index
            this.redirect();
          }
        },

        filterByIndustryId:function (query, id) {
          console.log('filterByIndustry: '+ query +' and Id: '+ id);
          App.headerRegion.show(new DesktopHeaderView());
          // check if industry is defined
          if( typeof query != 'undefined' ) {
            // create filtered category collection
            var filteredCollection = App.storiesCollection.filterByIndustry(query);
            //console.log('industry collection', filteredCollection);
            if ( filteredCollection.length > 0 && typeof id != 'undefined' ) {
              var storyIdNum = parseInt(id, 10);
              // check that story exists by id
              var storyById = filteredCollection.where({ id: storyIdNum });
              // trim collection
              var storyModel = filteredCollection.get(storyIdNum);
              var storyCollectionIndex = filteredCollection.indexOf(storyModel);
              var trimmedCollection = new Stories(filteredCollection.slice(storyCollectionIndex));

              if ( storyById.length > 0 && trimmedCollection.length > 0 ){
                console.log('Industry collection LTE id: '+storyIdNum, trimmedCollection);
                // Load the filtered and trimmed collection
                App.mainRegion.show(new MainView({
                  collection: trimmedCollection
                }));
                App.footerRegion.show(new DesktopFooterView());

                // TRACKING -----------------------------------------------------------------------------
                var evgroup = 'stories',
                  ev      =  window.location.hash,
                  evaction= 'pageload',
                  evname  = evgroup + '_' + ev + '_' + evaction;

                IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
                //---------------------------------------------------------------------------------------
              }  else {
                //console.log('filterById: no-match');
                this.redirect();
              }
            }  else {
              //console.log('filterByIndustry: no-match');
              this.redirect();
            }
          } else {
            //redirect to app index
            this.redirect();
          }
        },

        filterByCapability:function (query) {
          console.log('filterByCapability:', query);
          App.headerRegion.show(new DesktopHeaderView());
          // check if capability is defined
          if( typeof query != 'undefined' ) {
            // create filtered capability collection
            var filteredCollection = App.storiesCollection.filterByCapability(query);
            console.log('Capability collection', filteredCollection);
            if ( filteredCollection.length > 0 ){
              // Load the filtered collection
              App.mainRegion.show(new MainView({
                collection: filteredCollection
              }));
              App.footerRegion.show(new DesktopFooterView());

              // TRACKING -----------------------------------------------------------------------------
              var evgroup = 'stories',
                ev      =  window.location.hash,
                evaction= 'pageload',
                evname  = evgroup + '_' + ev + '_' + evaction;

              IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
              //---------------------------------------------------------------------------------------
            }  else {
              //console.log('filterByCapability: no-match');
              this.redirect();
            }
          } else {
            // redirect to app index
            this.redirect();
          }
        },

        filterByCapabilityId:function (query, id) {
          console.log('filterByCapability: '+ query +' and Id: '+ id);
          App.headerRegion.show(new DesktopHeaderView());
          // check if Capability is defined
          if( typeof query != 'undefined' ) {
            // create filtered category collection
            var filteredCollection = App.storiesCollection.filterByCapability(query);
            //console.log('Capability collection', filteredCollection);
            if ( filteredCollection.length > 0 && typeof id != 'undefined' ) {
              var storyIdNum = parseInt(id, 10);
              // check that story exists by id
              var storyById = filteredCollection.where({ id: storyIdNum });
              // trim collection
              var storyModel = filteredCollection.get(storyIdNum);
              var storyCollectionIndex = filteredCollection.indexOf(storyModel);
              var trimmedCollection = new Stories(filteredCollection.slice(storyCollectionIndex));

              if ( storyById.length > 0 && trimmedCollection.length > 0 ){
                console.log('Capability collection LTE id: '+storyIdNum, trimmedCollection);
                // Load the filtered and trimmed collection
                App.mainRegion.show(new MainView({
                  collection: trimmedCollection
                }));
                App.footerRegion.show(new DesktopFooterView());

                // TRACKING -----------------------------------------------------------------------------
                var evgroup = 'stories',
                  ev      =  window.location.hash,
                  evaction= 'pageload',
                  evname  = evgroup + '_' + ev + '_' + evaction;

                IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
                //---------------------------------------------------------------------------------------
              }  else {
                //console.log('filterById: no-match');
                this.redirect();
              }
            }  else {
              //console.log('filterByCapability: no-match');
              this.redirect();
            }
          } else {
            //redirect to app index
            this.redirect();
          }
        },

        redirect:function() {
          // redirect to app index
          console.log('redirect');
          window.location.hash = '#'; //Backbone.history.navigate('', true);
        }
    });
});