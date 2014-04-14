define( ['App', 
          'backbone', 
          'marionette', 
          'jquery', 
          'handlebars',
          'hbs!templates/template', 
          'hbs!templates/template-1', 
          'hbs!templates/template-2', 
          'hbs!templates/template-3', 
          'hbs!templates/template-4', 
          'hbs!templates/template-5', 
          'hbs!templates/template-6', 
          'hbs!templates/template-7', 
          'hbs!templates/template-8', 
          'hbs!templates/template-9', 
          'hbs!templates/template-10', 
          'hbs!templates/template-11',
          'hbs!templates/template-footer',
          'hbs!templates/carousel-full',
          'hbs!templates/template-video', 
          'views/ModuleView', 
          'views/TemplateVideoView', 
          'collections/Modules', 
          'models/Model', 
          'bxslider',
          'youTubePlayer',
          'jqueryFancybox',
          'jqueryFancyboxMedia',
          'videoResizer' ],
  function(App, 
           Backbone, 
           Marionette, 
           $,
           handlebars, 
           template,
           template1,
           template2,
           template3,
           template4,
           template5,
           template6,
           template7,
           template8,
           template9,
           template10,
           template11,
           templateFooter,
           carouselfull,
           templateVideo, 
           ItemView, 
           VideoItemView, 
           Modules, 
           Model, 
           bxslider,
           youTubePlayer,
           jqueryFancybox,
           jqueryFancyboxMedia,
           videoResizer ) {
    //ItemView provides some default rendering logic
    return Backbone.Marionette.CompositeView.extend( {


      itemView: ItemView,
      // template: template,

      
      template: function( model )
      {
        var templateName = model.template_class;
        // console.log( "TemplateView.initialize: template ", model.template_class);

        // Handlebar custom helpers don't take variables, so had to inject a boolean if 'module_type' is carousel or notz
        for( i = 0; i < model.modules.length; i++ )
        {
            var module_type = model.modules[i].module_type;
            model.modules[i].isCarousel = ( module_type == 'carousel') ? true : false;
            // console.log( "TemplateView.initialize: model.modules[i].isCarousel: ", model.modules[i].isCarousel);
        }
        

        switch( templateName )
        {
          case 'template-1':
            template = template1( model );
            break;
          case 'template-2':
            template = template2( model );
            break;
          case 'template-3':
            template = template3( model );
            break;
          case 'template-4':
            template = template4( model );
            break;
          case 'template-5':
            template = template5( model );
            break;
          case 'template-6':
            template = template6( model );
            break;
          case 'template-7':
            template = template7( model );
            break;
          case 'template-8':
            template = template8( model );
            break;
          case 'template-9':
            template = template9( model );
            break;
          case 'template-10':
            template = template10( model );
            break;
          case 'template-11':
            template = template11( model );
            break;
          case 'template-footer':
            template = templateFooter( model );
            break;
          case 'carousel-full':
            template = carouselfull( model );
            break;
          case 'template-video':
            template = templateVideo( model );
            break;

          default:
            template = template;
        }
  
        return template;
      },

      
      // itemViewContainer: ".modules", // Commented out for now as the numbered templates don't have a .modules class - JPT

      initialize: function ( options ) {
        this.alphaOut = 0.9;
        this.alphaOver = 0.6;
        this.timeOut = 100;
        this.timeOver = 350;

        this.hasVideo = false;
      },

      /*
      onRender: function() {
        //this.$el.navbar();
        // console.log('TemplateView.onRender - collection:', this.collection );
      },
      */

      onShow: function() {
        //this.$el.navbar();
        // console.log('TemplateView.onRender - collection:', this.collection );
        var template_class = this.model.toJSON().template_class;
        // console.log( "TemplateView: onShow() - template_class: ", template_class);

        if( template_class == 'template-video') 
        {
          var model = this.model.toJSON();
          var module_type = model.modules[0].module_type;

          // If there is no video, dont add.
          if( module_type === "" ) return;

          this.hasVideo = true;
          this.initVideo();
          this.addVideoButtonIcon();
        }
        else
        {
          this.checkForCarousel();
          this.initLightbox();
          // this.checkForHyperlinks();
        }
      },


      /**************************************
      / CAROUSEL
      /*************************************/
      checkForCarousel: function()
      {
        var model = this.model.toJSON();
        var i = 0;
        var I = model.modules.length;
        for( i; i < I; i++)
        {
          if( model.modules[i].module_type == "carousel" )
          {
            // console.log( "TemplateView: checkForCarousel() - assets length: ",model.modules[i].assets.length );
            this.initCarouselAt( i );
          }
        }
      },

      initCarouselAt: function(index) 
      {
        var model = this.model.toJSON();
        var wrapperClass = model.modules[index].wrapper_class;
        console.log( "TemplateView: initCarouselAt() - index: ",index );
        var selector = '#s' + model.story_id + '-' + wrapperClass;
        console.log( "TemplateView: initCarouselAt() - selector: ",selector );

        var options;
        var template = model.template_class;

        var hidePager = ( model.modules[index].assets.length == 1 ) ? false : true;

        options = {
            pager: hidePager,
            touchEnabled: hidePager
        }; 

        this.bxSlider = $(selector).bxSlider( options ); 
        this.addCarouselTracking(index);
      },

      /****** Event Handlers *****/
      clicked: function(e){
        // Was used when there were inline buttons. Will keep in case the carousel objects need to be clickable.
        // e.preventDefault();
      },

      addCarouselTracking: function(index) 
      {
        this.prevCount = 0;
        this.nextCount = 0;
        this.linkedInCount = 0;
        this.twitterCount = 0;
        this.pagerCounts = [];

        var model = this.model.toJSON();
        var i = 0;
        var I = model.modules[index].assets.length;
        for( i; i < I; i++ )
        {
          this.pagerCounts.push({"count": 0});
        }
      },

      /**************************************
      / VIDEO
      /*************************************/
      initVideo: function() 
      {
        // Hide video
        $('.youtube-player').hide();
        //console.log( "TemplateView: initVideo() : this.hasVideo  ", this.hasVideo );
      },

      addVideoButtonIcon: function()
      {
        //console.log( "TemplateView: addVideoButtonIcon()");

        var selector = "#video-button-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        var iconId = "video-button-icon-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;

        $(selector).prepend('<img class="level-1 video-button-icon" id="'+iconId+'" src="./img/video-play-button.png" />');    
        $('#'+iconId).fadeTo( 0, this.alphaOut );
      },

      playVideo: function() 
      {
        var container= this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        var videoId= this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        var wrapperId = '#video-button-' + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        var w;
        var h;

        // Firefox is not getting scaled size. 
        var viewportDifference = Math.abs( $(wrapperId).outerWidth() - $(window).width() );
        if( viewportDifference > 10 )
        {
          w = $(window).width();
          h = Math.round( w * 0.5625 ); // images are always 16:9 ratio (0.5625)
        }
        else
        {
          w = $(wrapperId).outerWidth();
          h = $(wrapperId).height();
        }

        this.player = youTubePlayer;
        this.player.playVideo( container, videoId, w, h );

        // off/on to reset listener
        App.off('VideoEvent.COMPLETE'+'-'+videoId, this.onVideoComplete, this );
        App.on('VideoEvent.COMPLETE'+'-'+videoId, this.onVideoComplete, this );

      },


      toggleVideoViews: function(videoId) 
      {
        console.log( "TemplateView: toggleVideoViews() : videoId ", videoId);
        var playBtnId = '#video-button-' + videoId; //temp using this instead so i can use wrapper for image
        var youtubeId = '#' + videoId;
        $(playBtnId).toggle();
        $(youtubeId).toggle();
      },

      /**************************************
      / FANCYBOX LIGHTBOX
      /*************************************/
      initLightbox: function()
      {
        var model = this.model.toJSON();
        var i = 0;
        var I = model.modules.length;
        for( i; i < I; i++)
        {
          moduleType = model.modules[i].module_type;
          // console.log( ":::::::::: TemplateView: initCarousel() - moduleType: ",moduleType );

          var self = this;
          if( moduleType == "lightbox" )
          {

            // WRAP Hyperlink around image
            var wrapper_class = this.model.toJSON().modules[i].wrapper_class;
            var story_id = this.model.toJSON().story_id;
            var videoId = this.model.toJSON().modules[i].assets[ 0 ].hyperlink;
            var url = 'http://www.youtube.com/watch?v=' + videoId; 
            var selector = '#s'+story_id+'-'+wrapper_class+'-alt';

            var iconId = "lightbox-button-icon-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;

            $(selector).prepend('<img class="level-1 lightbox-button-icon" id="'+iconId+'" src="./img/video-play-button-lightbox.png" />');    
            $('#'+iconId).fadeTo( 0, this.alphaOut );

            $(selector).wrap('<a href="'+url+'" class="fancybox-media lightbox-link">');
            console.log( "TemplateView: initLightbox() - wrapper_class: ", wrapper_class );
            console.log( "TemplateView: initLightbox() - videoId: ", videoId );
            console.log( "TemplateView: initLightbox() - selector: ", selector );
            console.log( "TemplateView: initLightbox() - $(selector): ", $(selector) );

            
            this.videoId = videoId;
            console.log( "TemplateView: XXX - this.videoId: ", this.videoId );
            this.addLightbox( videoId );
          }
        }
  
      },


      /**************************************
      / HYPERLINKS
      /*************************************/
      checkForHyperlinks: function()
      {
        console.log("");
        console.log("TemplateView: checkForHyperlinks()");
        // Modules Level
        var model = this.model.toJSON();
        var i = 0;
        var I = model.modules.length;
        for( i; i < I; i++)
        {
          console.log("TemplateView: checkForHyperlinks() - module type: ",model.modules[i].module_type);
          // Assets Level
          var j = 0;
          var J = model.modules[i].assets.length;
          for( j; j < J; j++)
          if( model.modules[i].module_type == "carousel" )
          {
            console.log("TemplateView: checkForHyperlinks() - hyperlink: ",model.modules[i].assets[j].hyperlink);
          }
        }
      },

      addLightbox: function(videoId)
      {
        $('.fancybox-media')
        .attr('rel', 'media-gallery')
        .fancybox({
          padding: 0,
          openEffect : 'none',
          closeEffect : 'none',
          prevEffect : 'none',
          nextEffect : 'none',
          closeBtn: false,
          videoId: this.videoId,
          beforeShow  : function() {
              // Find the iframe ID
              
              var id = $.fancybox.inner.find('iframe').attr('id');

              // Create video player object and add event listeners
              this.player = new YT.Player(id, 
              {
                  events: 
                  {
                      'onStateChange': function(event) 
                      {

                        var evgroup;
                        var  ev;
                        var  evaction;
                        var  evname;

                        // console.log( ":::::::::: TemplateView: LIGHTBOX VIDEO FINISHED(): event.target.videoId ",event.target.videoId);
                        if (event.data === 0) 
                        {
                            // TRACKING -----------------------------------------------------------------------------
                              evgroup = 'stories';
                              ev      =  (window.location.hash !== '') ? window.location.hash : '#';
                              evaction= 'videocomplete';
                              evname  = evgroup + '_' + ev + '_' + evaction  + '_'  + event.target.videoId;

                            IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
                            //---------------------------------------------------------------------------------------
                        }
                        else if(event.data === 1 )
                        {
                          // TRACKING -----------------------------------------------------------------------------
                            evgroup = 'stories';
                            ev      =  (window.location.hash !== '') ? window.location.hash : '#';
                            evaction= 'videoplay';
                            evname  = evgroup + '_' + ev + '_' + evaction + '_' + event.target.videoId;

                          IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
                          //---------------------------------------------------------------------------------------
                        }
                     }
                  }

              });
              this.player.videoId = videoId;
              
          },

          arrows : false,
          helpers : {
            media : {},
            buttons : {}
          }
        });

      },

      doClickTracking: function( id, count, desc )
      {
        // TRACKING -----------------------------------------------------------------------------
        evgroup = 'stories';
        ev      =  (window.location.hash !== '') ? window.location.hash : '#';
        evaction= 'click';
        evname  = evgroup + '_' + ev + '_' + evaction + '_' + id + '-' + desc + '-' + count;

        IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
        //---------------------------------------------------------------------------------------
      },


      /**************************************
      / EVENTS
      /*************************************/
      events: {
        "mouseover .video-button": "onVideoBtnOver",
        "mouseout .video-button": "onVideoBtnOut",
        "click .video-button": "onVideoBtnClick",
        "click .fancybox-media": "onLightboxClick",
        "mouseover .lightbox-link": "onLightboxBtnOver",
        "mouseout .lightbox-link": "onLightboxBtnOut",
        "click .bx-prev": "onPrevClick",
        "click .bx-next": "onNextClick",
        "click .linkedin": "onLinkedInClick",
        "click .twitter": "onTwitterClick",
        "click .bx-pager-link": "onPagerItemClick"
      },

      /**************************************
      / EVENT HANDLERS
      /*************************************/
      onVideoBtnOver: function(e)
      {
        var selector = "#video-button-icon-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        $(selector).fadeTo( this.timeOver, this.alphaOver );
      },
      onVideoBtnOut: function(e)
      {
        var selector = "#video-button-icon-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        $(selector).fadeTo( this.timeOut, this.alphaOut );
      },
      onVideoBtnClick: function(e)
      {
        var videoId = this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        console.log( ":::::::::: TemplateView: onVideoBtnClick() videoId="+videoId);

        if ( typeof videoId === 'undefined' || videoId === '' ) return;

        this.toggleVideoViews(videoId);
        this.playVideo();

        // TRACKING -----------------------------------------------------------------------------
        var evgroup = 'stories',
        ev      =  (window.location.hash !== '') ? window.location.hash : '#',
          evaction= 'videoplay',
          evname  = evgroup + '_' + ev + '_' + evaction + '_' + videoId;

        IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
        //---------------------------------------------------------------------------------------
      },
      onVideoComplete: function(e)
      {
        console.log( ":::::::::: TemplateView: onVideoComplete() e: ");
        var videoId = e;
        this.toggleVideoViews(videoId);

        // TRACKING -----------------------------------------------------------------------------
        var evgroup = 'stories',
        ev      =  (window.location.hash !== '') ? window.location.hash : '#',
          evaction= 'videocomplete',
          evname  = evgroup + '_' + ev + '_' + evaction  + '_'  + videoId;

        IBMMasters.tracking.trackCustomEvent( evgroup, ev, evaction, evname );
        //---------------------------------------------------------------------------------------
      },

      onLightboxClick: function(e)
      {
        e.preventDefault();
        this.lightboxId = e.target.id.replace('lightbox-button-icon-', '');
      },

      onLightboxBtnOver: function(e)
      {
        // console.log( ":::::::::: TemplateView: onVideoLBXBtnOver() ");
        var selector = "#lightbox-button-icon-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        $(selector).fadeTo( this.timeOver, this.alphaOver );
        //$(selector).
      },
      onLightboxBtnOut: function(e)
      {
        ///console.log( ":::::::::: TemplateView: onLightboxBtnOut() ");
        var selector = "#lightbox-button-icon-" + this.model.toJSON().modules[0].assets[ 0 ].hyperlink;
        $(selector).fadeTo( this.timeOut, this.alphaOut );
      },

      onPrevClick: function(e)  
      {
        this.prevCount++;
        var id = this.bxSlider.attr('id').split('-').join('');
        this.doClickTracking( id, this.prevCount, 'left'); 
        e.preventDefault();
      },
      onNextClick: function(e)
      {
        this.nextCount++;
        var id = this.bxSlider.attr('id').split('-').join('');
        this.doClickTracking( id, this.nextCount, 'right'); 
        e.preventDefault();
      },
      onLinkedInClick: function(e)
      {
        this.linkedInCount++;
      },
      onTwitterClick: function(e)
      {
        this.twitterCount++;
      },
      onPagerItemClick: function(e)
      {
        var index = Number($(e.target).attr('data-slide-index'));
        var count = Number(this.pagerCounts[ index ].count);
        count++;
        this.pagerCounts[ index ].count = count;
        var id = this.bxSlider.attr('id').split('-').join('');
        index++;
        this.doClickTracking( id, count, 'dot'+index); 
        e.preventDefault();
      }

      /**************************************
      / GETTERS/SETTERS
      /*************************************/

    });
  });