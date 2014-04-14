define(['jquery', 'backbone', 'marionette', 'underscore', 'handlebars', 'collections/Stories'],
    function ($, Backbone, Marionette, _, Handlebars, Stories) {
        var App = new Backbone.Marionette.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        //Organize Application into regions corresponding to DOM elements - by id or data-role
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"#site-header",
            sidebarRegion:".sidebar-nav",
            mainRegion:"#main",
            footerRegion:"#site-footer"
        });

        // Load json into global stories collection
        App.addInitializer(function () {
          App.storiesCollection = new Stories();
          App.storiesCollection.fetch({ url: "./js/app/json/stories.json" }).complete(function() {
            console.log('JSON load complete: ',App.storiesCollection);
            // Do not start router until JSON load coplete
            Backbone.history.start();
          });
        });

        App.mobile = false;//isMobile();

        // Deeplink helper function
        App.getQueryStringParams = function(queryString) {
            var params = {};
            if(queryString){
                _.each(
                    _.map(decodeURI(queryString).split(/&/g),function(el,i){
                        var aux = el.split('='), o = {};
                        if(aux.length >= 1){
                            var val;
                            if(aux.length == 2)
                                val = aux[1];
                            o[aux[0]] = val;
                        }
                        return o;
                    }),
                    function(o){
                        _.extend(params,o);
                    }
                );
            }
            return params;
        };
      

        return App;
    });