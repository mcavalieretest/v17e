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

            if (IBM.watson.isMobile) {
                $(".ibm-live-assistance-list").remove();
            }

            // Get query string key-value pairs
            my.oGetVars = new(function(sSearch) {
                if (sSearch.length > 1) {
                    for (var aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
                        aItKey = aCouples[nKeyId].split("=");
                        this[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
                    }
                }
            })(window.location.search);


            my.top_container = $("#mdc-finalists .row_top");
            my.bot_container = $("#mdc-finalists .row_bot");
            my.details = $("#mdc-finalists #details");

            my.finalistsObj = new Array();
            my.topfinalObj = new Array();

            my.isOpen = false;
            my.isTop = true;

            my.allItems;
            my.topItems;
            my.activeItems;

            my.prevIndex;
            my.itemIndex;


            my.sceneManager = new IBM.watson.SceneManager(this);


            $.ajax({
                type: "GET",
                url: "assets/data/finalists.json",
                dataType: "json",
                success: function(msg) {
                    my.dataLoaded(msg);
                },
                error: function(err) {
                    alert(err.status + " - " + err.statusText);
                }
            });

        },

        dataLoaded: function(data) {
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
                    deepLink: val.name.toLowerCase().replace(/\W/g, ''),
                    finalist: val.finalist

                }

                temp.push(obj)


            });

            //all
            my.finalistsObj = my.shuffle(temp);

            //top 5;
            $.each(my.finalistsObj, function(index, val) {
                if (val.finalist) {
                    my.topfinalObj.push(val);
                }
            });


            $.each(my.finalistsObj, function(index, val) {
                my.top_container.append(my.createItemTemplate(val))
            });


            my.allItems = $(".co_item");
            my.topItems = $(".co_item.finalist");
            my.activeItems = my.topItems;


            //this is in the way of the close btn
            $("#menu p").remove();

            $(".co_item").bind("click", function(e) {
                e.preventDefault();
                my.createMainTemplate(this);
            })

            $(".sort span").bind("click", function(e) {
                e.preventDefault();
                $(".sort span").removeClass('active');
                $(this).addClass('active');
                my.sortItems($(this).attr("class").split(" ")[0])
            })

            

            //deeplink
            if (my.oGetVars.company) {
                var deepIndex = my.findItem(my.finalistsObj, my.oGetVars.company.toLowerCase());
                my.isTop = false;
                $(".sort span.all_btn").addClass('active');
                my.sortItems("all_btn");
                my.createMainTemplate($(".co_item")[deepIndex])
            }else{
                $(".sort span.top_btn").addClass('active');
                my.sortItems("top_btn");
            }
        },

        findItem: function(objs, coName) {
            var itemIndex;
            $.each(objs, function(index, val) {
                if (val.deepLink == coName) {
                    itemIndex = index;
                    return false;
                }
            });
            return itemIndex;
        },

        shuffle: function(o) {
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        },

        sortItems: function(param) {

            var my = this;
            if (my.isOpen) {
                my.closeDetails();
            }
            if (param == "top_btn") {
                my.isTop = true;
                my.activeItems = my.topItems;
                $("#mdc-finalists .co_item").hide();
                $("#mdc-finalists .co_item.finalist").show();
            } else {
                my.isTop = false;
                my.activeItems = my.allItems;
                $("#mdc-finalists .co_item").show();
            }

            my.createContainers(my.activeItems.length);
        },

        createMainTemplate: function(item) {

            var my = this;

            var listObj = my.finalistsObj;

            if (my.isTop) {
                listObj = my.topfinalObj;
            }


            my.prevIndex = my.itemIndex;
            my.itemIndex = $.inArray(item, my.activeItems);


            if (this.isOpen) {
                if (my.prevIndex == my.itemIndex) {
                    this.closeDetails();
                } else {
                    this.closeDetails(item);
                }

            } else {

                $(".expand", item).addClass("open");

                var totalItems = my.activeItems.length;
                var itemWidth = $(item).width() + 20;
                var winWidth = my.top_container.width();
                var cols = Math.floor(winWidth / itemWidth);
                var rows = Math.ceil(totalItems / cols);

                var currentRow = Math.ceil((my.itemIndex + 1) / cols);
                var insertLocation = (currentRow * cols);
                var itemData = listObj[my.itemIndex];

                my.createContainers(insertLocation);
                // if(rows == currentRow){  
                //     insertLocation = totalItems - 1;
                // }


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


                $("#co_details").slideDown("slow", function(e) {
                    my.isOpen = true;
                });
                $('html, body').animate({
                    scrollTop: $("#details").offset().top
                }, 500);

                $("#co_details .close_btn").bind("click", function(e) {
                    e.preventDefault();
                    my.closeDetails();

                })
            }

        },

        createContainers: function(location) {
            var my = this;
            var topItems = my.activeItems.slice(0, location)
            var botItems = my.activeItems.slice(location, my.activeItems.length);


            $.each(topItems, function(index, val) {
                $(val).detach().appendTo(my.top_container)
            });
            $.each(botItems, function(index, val) {
                $(val).detach().appendTo(my.bot_container)
            });
        },

        createSocial: function(url, itemClass) {
            if (url) {
                return "<li><a href='" + url + "' class='" + itemClass + "' target='_blank'></a></li>";
            }
            return "";
        },

        closeDetails: function(item) {
            var my = this;
            $(".expand", my.activeItems).removeClass("open");
            $("#co_details").slideUp("slow", function(e) {
                my.isOpen = false;
                if (item) {
                    my.createMainTemplate(item);
                }
            });

        },

        createItemTemplate: function(obj) {

            var markup = "";
            if (obj.finalist) {
                markup += '<div class="ibm-col-6-2 co_item finalist">';
            } else {
                markup += '<div class="ibm-col-6-2 co_item">';
            }
            markup += '<div class="ibm-container">';
            markup += "<h3>" + obj.industry + "</h3>";
            markup += "<h2>" + obj.name + "</h2>";
            markup += "<p>" + obj.short_desc + "</p>";
            markup += "</div>";
            markup += '<div class="expand"></div>';
            markup += "</div>";

            return markup;
        }
    };
}(jQuery));