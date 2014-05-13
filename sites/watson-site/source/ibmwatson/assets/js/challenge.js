(function($) { // reset V17e's noConflict
    'use strict';

    window.IBM = window.IBM || {};
    IBM.watson = IBM.watson || {};

    IBM.watson.Challenge = function() {
        this.init();
    };

    IBM.watson.Challenge.prototype = {
        init: function() {

            var my = this;

            if(IBM.watson.isMobile){
                $(".ibm-live-assistance-list").remove();
            }

            // Get query string key-value pairs
            my.oGetVars = new (function (sSearch) {
                if (sSearch.length > 1) {
                    for (var aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
                        aItKey = aCouples[nKeyId].split("=");
                        this[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
                    }
                }
            })(window.location.search);


            my.top_container = $("#mdc-finalists .row_top");
            my.bot_container = $("#mdc-finalists .row_bot");
            my.details       = $("#mdc-finalists #details");
            my.finalistsObj  = new Array();
            my.isOpen        = false;
            my.prevIndex;
            my.itemIndex;


            console.log(my);

            
            my.sceneManager = new IBM.watson.SceneManager(this);


            $.ajax({
                type: "GET",
                url: "assets/data/finalists.json",
                dataType: "json",
                success: function (msg) {
                    my.dataLoaded(msg);
                },
                error: function (err) {
                    alert(err.status + " - " + err.statusText);
                }
            });
            
        },

        dataLoaded: function(data){
            var my = this;

            var temp = new Array();

            $.each(data.finalists, function(index, val) {
                // console.log(my)
                var obj = {
                    name: val.name,
                    industry: val.industry,
                    short_desc: val.short_desc,
                    long_desc: val.long_desc,
                    url: val.url,
                    facebook: val.facebook,
                    twitter: val.twitter,
                    linkedin: val.linkedin,
                    youtube: val.youtube,
                    deepLink: val.name.toLowerCase().replace(/\W/g, '')

                }
                
                temp.push(obj)
                

            });

            my.finalistsObj = my.shuffle(temp);


            $.each(my.finalistsObj, function(index, val) {
                my.top_container.append(my.createItemTemplate(val))
            });


            //this is in the way of the close btn
            $("#menu p").remove();

            $(".co_item").bind("click", function(e){
                e.preventDefault();
                my.createMainTemplate(this);           
            })

            //deeplink
            if(my.oGetVars.company){
                var deepIndex = my.findItem(my.finalistsObj, my.oGetVars.company);
                my.createMainTemplate($(".co_item")[deepIndex])
            }
        },

        findItem: function(objs, coName){
            var itemIndex;
            $.each(objs, function(index, val) {
                 if(val.deepLink == coName){
                    itemIndex = index;
                    return false;
                 }
            });
            return itemIndex;
        },

        shuffle: function (o){ 
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

        createMainTemplate: function(item) {

            var my       = this;
            var allItems = $(".co_item");
            my.prevIndex = my.itemIndex ;
            my.itemIndex = $.inArray(item, allItems);

            if(this.isOpen){
                if(my.prevIndex == my.itemIndex ){
                    this.closeDetails();
                }else{
                    this.closeDetails(item);
                }

            }else{

                $(".expand", item).addClass("open")
               
                var totalItems     = allItems.length;
                var itemWidth      = $(item).width() + 20;
                var winWidth       = my.top_container.width();
                var cols           = Math.floor(winWidth / itemWidth);
                var rows           = Math.ceil(totalItems / cols);
                
                var currentRow     = Math.ceil((my.itemIndex + 1) / cols); 
                var insertLocation = (currentRow * cols);
                var itemData       = my.finalistsObj[my.itemIndex];

                var topItems;
                var botItems;

                if(rows == currentRow){
                    insertLocation = totalItems - 1;
                    $(my.details).insertAfter(my.bot_container);
                    topItems = [];
                    botItems = allItems;
                }else{
                    $(my.details).insertAfter(my.top_container);
                    topItems = allItems.slice(0, insertLocation)
                    botItems = allItems.slice(insertLocation, allItems.length);
                }


                $.each(topItems, function(index, val) {
                    $(val).detach().appendTo(my.top_container)
                });
                $.each(botItems, function(index, val) {
                     $(val).detach().appendTo(my.bot_container)
                });

                $(".content .ibm-col-1-1 ol", my.details).html("");

                $(".content h2", my.details).text(itemData.industry);
                $(".content h1", my.details).text(itemData.name);
                $(".content p.desc", my.details).text(itemData.long_desc);
                $(".content .ibm-col-1-1 p a", my.details).attr("href", itemData.url);
                $(".content .ibm-col-1-1 span.co_link", my.details).text(itemData.name);
                $(".content .ibm-col-1-1 ol", my.details).append(my.createSocial(itemData.twitter, "ibm-twitter-link"));
                $(".content .ibm-col-1-1 ol", my.details).append(my.createSocial(itemData.linkedin, "ibm-linkedin-link"))
                $(".content .ibm-col-1-1 ol", my.details).append(my.createSocial(itemData.facebook, "ibm-facebook-link"))
                $(".content .ibm-col-1-1 ol", my.details).append(my.createSocial(itemData.youtbube, "ibm-youtube-link"))


                $("#co_details").slideDown( "slow", function(e){my.isOpen = true;} );
                $('html, body').animate({
                    scrollTop: $("#details").offset().top
                },500);

                $("#co_details .close_btn").bind("click", function(e){
                    e.preventDefault();
                    my.closeDetails();
                   
                })
            }

        },

        createSocial: function(url, itemClass){
            if(url){
                return "<li><a href='" + url + "' class='" + itemClass + "' target='_blank'></a></li>";
            }
            return "";
        },

        closeDetails: function(item){
            var my = this;
            $(".expand", my.allItems).removeClass("open");
            $("#co_details").slideUp( "slow", function(e){
                my.isOpen = false;
                if(item){
                    my.createMainTemplate(item);                   
                }
            } );

        },

        createItemTemplate: function(obj){
            //this makes me sad
            var markup =  '<div class="ibm-col-6-2 co_item">';
                markup  +=      '<div class="ibm-container">';
                markup  +=          "<h3>" + obj.industry + "</h3>";
                markup  +=          "<h2>" + obj.name + "</h2>";
                markup  +=          "<p>" + obj.short_desc + "</p>";                    
                markup  +=      "</div>";
                markup  +=      '<div class="expand"></div>';
                markup  +=  "</div>";

            return markup;
        }
    };
}(jQuery));