$(function() {
    // ABOUT US PAGE API:
    // http://esl002.somerslab.ibm.com/social/aggregator/rest/80/VOICES/about

    // DEFAULT URL HASH (START)
    window.location.hash = "#voices-" + $("#ibm_cci--toggle-js li a").attr("id");
    var pathName = window.location.pathname, 
        voicesLogo = $("#ibm-leadspace-body h1.ibm_cci--h1__modifyer a");

    // DEFAULT URL HASH (END)

    // console.log($("#ibm_cci-gototop-js").css("position"));

    var defaultValue = "comma,separated,values",
        alertText = $('.ibm_cci--ls--search p'),
        gotoTop = $("#ibm_cci-gototop-js"),
        widgetJS = $("#ibm_cci-widget-js");

    // UPDATE URL HASH ON CLICKED ELEMENTS FROM SEARCH AND TRENDING TOPICS (START)
    var updateURLHash = function(value) {
        if (!window.location.hash && window.location.hash == null) {
            $(location).attr("hash") + "#voices-" + value;
        } else {
            window.location.hash = "#voices-" + value;
        }
    };

    // INDEXLOGO ONCLICK ONCLICK ACTION
    // voicesLogo.on("click", function(e){
    //     e.preventDefault();
    //     if (pathName === "/indexx.html") {
    //         return;
    //     } else {
    //         console.log(voicesLogo.attr('href', 'index.html'));
    //         window.location.href = voicesLogo.attr('href', 'index.html');
    //     }
    // });

    // GO TO TOP ONCLICK ACTION
    gotoTop.on("click", function(event){
        console.log("inside gototop action: "+gotoTop);
        event.preventDefault();
        $("html, body").stop(true).animate({ scrollTop: 0 }, "slow");
        // $(window).data("ajaxReq", true);
    });

    // UPDATE URL HASH ON CLICKED ELEMENTS FROM SEARCH AND TRENDING TOPICS (END)
    // MANAGE TOGGLE EFFECTS ON GRID AND LIST VIEW (START)
        $("ul.ibm_cci--ls--toggle--ul li").on("click", "a", function(event) {
            event.preventDefault();
            var target = $(event.target);
            if (!target.hasClass("selected")) {
                target.addClass("selected").parent().siblings().children().removeClass("selected");
                if (widgetJS.hasClass("ibm_cci-gv__modifier")) {
                    widgetJS.removeClass("ibm_cci-gv__modifier").addClass("ibm_cci-lv__modifier");
                    $(".ibm_cci-lv__modifier .ibm_cci--tweet-content-text").css("display", "block");
                    $(".ibm_cci-lv__modifier .ibm-video").css("display", "none");
                    // REBULILD MASONRY TILES FOR LIST VIEW
                    vo.f_checkBrowserWidth();
                    widgetJS.masonry("reload");
                    setTimeout(function() {
                        widgetJS.masonry('reloadItems');
                    }, 800);
                } else {
                    widgetJS.removeClass("ibm_cci-lv__modifier").addClass("ibm_cci-gv__modifier");
                    $(".ibm_cci-gv__modifier .ibm_cci--tweet-content-text").css("display", "none");
                    $(".ibm_cci-gv__modifier .ibm-video").removeAttr("style");
                    // REBULILD MASONRY TILES GRID VIEW
                    vo.f_checkBrowserWidth();
                    widgetJS.masonry("reloadItems");
                    setTimeout(function() {
                        widgetJS.masonry({fromBottom: true});
                    }, 800);
                }
            }
            updateURLHash(target.attr("id"));
                if(window.location.hash === "#voices-list" && window.innerWidth > 1280){
                    $("#ibm_cci-widget-js.ibm-columns").css("width", "");
                    widgetJS.masonry("reload");
                }else if(window.location.hash === "#voices-grid" && window.innerWidth > 1280){
                    $("#ibm_cci-widget-js.ibm-columns").css("width", "auto");
                }
        });
    // INITIALIZATION OF TRENDING TOPICS
    vo.init_t({
        // ESL002 API
        tt_url: "https://esl002.somerslab.ibm.com/social/aggregator/rest/80/VOICES/trending",

        // STAGING API
        // tt_url: "https://www-sso.toronto.ca.ibm.com/social/aggregator/rest/213/VOICES/trending",

        t_template: $("#tt_template"),
        t_container: $("#ibm_cci__ml")
    });
    // INITIALIZATION OF FEEDS
    vo.init_f({
        // ESL002 API
        f_url: "https://esl002.somerslab.ibm.com/social/aggregator/rest/80/VOICES",

        // STAGING API
        // f_url: "https://www-sso.toronto.ca.ibm.com/social/aggregator/rest/213/VOICES/",

        f_container: $("#ibm_cci-widget-js"),
        f_unro_template: $("#unro_template"),
        f_reso_template: $("#reso_template")
    });
    // WHEN JSON FEEDS ARE FETCHED DO THE FOLLOWING
    $.when(vo.f_fetch_trending(), vo.f_fetch_feeds()).done(function(results, data) {
        var self = vo;
        self.f_checkBrowserWidth();
        self.f_distribute(data[0]);
        //INITIAL BUILD MASONRY TILES
        self.f_buildtiles();
        //REMOVE THE SPINNER
        self.f_removeNodes($("#ibm_cci-widget-js > span"));

        //SEARCH FUNCTION (START)
         $("#ibm-cc-search--field").focusin(function(event){
            event.preventDefault();
            $('.ibm_cci--ls--search p').removeClass('ibm-cci-alert').html('');
            $(this).val('');
         });

        $("form").on("submit", function(event) {
            // /^[a-zA-Z0-9]*$/ : /[^\w\s]/gi;
            var search = $("#ibm-cc-search--field"),
                regex = /^[a-zA-Z0-9]*$/,
                searchVal = $("#ibm-cc-search--field").val().toLowerCase();
                searchVal = searchVal.split(","), filterVal = [];

                if(searchVal != '' && searchVal.length != 0 && searchVal[0] != "comma"){
                    for(var i = searchVal.length - 1; i >= 0; i--) {
                        if(regex.test(searchVal[i])){
                            // filterVal[i] = searchVal[i].trim();
                            filterVal[i] = searchVal[i];
                        }else{
                            alertText.addClass('ibm-cci-alert').html('').append('illegal characters in search string'+' : '+searchVal[i]);
                            search.val('').blur();
                        }
                    }
                }else{
                    $('.ibm_cci--ls--search p').addClass('ibm-cci-alert').html('').append('Sorry! Search value entered is not valid!');
                    search.blur().val(defaultValue);
                }

                search.val("");
                if(filterVal != '' && filterVal != 0 && filterVal.length > 0) vo.f_constructURL(filterVal.toString());
        });
        //SEARCH FUNCTION (END)

        //ALL TRENDING FUNCTION (START)
        $("li.ibm_cci__ml_t a[name='all']").on("click", function(event) {
            event.preventDefault();
            if ($("p#ibm_cci__ml_t-js").hasClass("ibm_cci-clicked")) {
                event.preventDefault();
                return;
            } else {
                //REMOVE ALL STYLES
                $("li.ibm_cci__ml-li p a").removeClass("ibm_cci-close-black, ibm_cci-close");
                $("li.ibm_cci__ml-li p[class='ibm_cci-clicked']").removeClass("ibm_cci-clicked");
                $("p#ibm_cci__ml_t-js").addClass("ibm_cci-clicked");
                $(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");

                //REMOVE ALL SEARCH NODES
                vo.f_removeNodes($(".ibm_cci-tsearch-js"));

                //EMPTY VO.DIFFERENCE AND VO.SIMILAR
                vo.difference = []; vo.similar = []; vo.searchterms = []; vo.sTerms = []; vo.checkedCount = 0;
                vo.searchTrendingList = vo.searchTrendingList.slice(0, 11);

                vo.f_fetch_feeds().done(function(data) {
                    vo.f_removeNodes($("#ibm_cci-widget-js > span"));
                    var newData = data;
                        vo.search = true;
                        vo.totalSearchCountNum = newData.entries.length;
                    // if(data.entries.length < 20) $(window).data("ajaxReq", false);
                    // SEARCH TRUE
                    vo.f_distribute(newData);
                    vo.f_reTweetToggle();

                    $(".ibm-sortable").append($(".ibm-card")).masonry("appended", $(".ibm-card"));
                    setTimeout(function() {
                        $("#ibm_cci-widget-js").masonry();
                    }, 400);
                    if (vo.searchterms.length == 0) $(window).data("ajaxReq", true);
                    alertText.html('');
                });
            }
        });
        //ALL TRENDING FUNCTION (END)

        // TRENDING TOPICS ELEMENTS (START)
        $(".ibm_cci__ml-li").on("click", function(event) {
            event.preventDefault();
            // vo.f_addspinner();
            // VARIABLES DECLARED
            var clickedTrendingName = $(event.target).attr("name").trim(),
                parentP = $(event.target).parent();
            // CONDITIONS FULFILLED
            if (!$(parentP).hasClass("ibm_cci-clicked")) {
                $(event.target).parent("p").addClass("ibm_cci-clicked");
                $(event.target).siblings("a").addClass("ibm_cci-close");
                $("#ibm_cci__ml_t-js").removeClass("ibm_cci-clicked");
                vo.f_constructURL(clickedTrendingName.toString());
                alertText.html('');

            } else if ($(parentP).hasClass("ibm_cci-clicked")) {
                if (!$(event.target).hasClass("ibm_cci-close-black")) {
                    // TARGET IS NOT SEARCH
                    $(event.target).parent("p").removeClass("ibm_cci-clicked");
                    if ($(event.target).hasClass("ibm_cci-close")) {
                        $(event.target).removeClass("ibm_cci-close");
                    } else {
                        $(event.target).siblings("a").removeClass("ibm_cci-close");
                    }
                    // ADD THIS PEICE AS FUNCTION TO AVOID REPETITION
                    // REMOVE THE SELECTED FROM THE F_SEARCHTERMS ARRAY
                    vo.searchterms = $.grep(vo.searchterms, function(e, i) {
                        return e != clickedTrendingName;
                    });
                    vo.difference = [];
                    vo.similar = [];
                    $(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");

                    vo.f_constructURL(vo.searchterms.toString());
                    alertText.html('');
                }
            }
        });
        // TRENDING TOPICS ELEMENTS (END)
        // SEARCH TOPICS ELEMENTS (START)
        $(".ibm_cci__ml").on("click", ".ibm_cci__ml-li.ibm_cci-tsearch-js", function(event) {
            event.preventDefault();
            if ($(event.target).hasClass("ibm_cci-close-black") || $(event.target).hasClass("ibm_cci-voices-search-term")) {
                // TARGET IS SEARCH
                var clickedTrendingName = $(event.target).attr("name").trim();
                // ADD THIS PEICE AS FUNCTION TO AVOID REPETITION
                // REMOVE THE SELECTED FROM THE F_SEARCHTERMS ARRAY
                vo.searchterms = $.grep(vo.searchterms, function(e, i) {
                    return e != clickedTrendingName || null;
                });
                vo.searchTrendingList = $.grep(vo.searchTrendingList, function(e, i) {
                    return e != clickedTrendingName || null;
                });
                $(".ibm_cci--sr > p").addClass("ibm_cci-toggleDisplay");
                vo.f_removeNodes($(event.target).parent().parent("li.ibm_cci__ml-li.ibm_cci-tsearch-js"));
                vo.difference = [];
                vo.similar = [];
                vo.search = true;
                // SEARCH TRUE
                vo.f_constructURL(vo.searchterms.toString());
                vo.checkedCount = 0;
                alertText.html('');
            }
        });
        //SEARCH TOPICS ELEMENTS (END)

        self.f_reTweetToggle();

        // ADDED THE CHECKBROWSERWIDTH AGAIN TO TEST FIREFOX
        self.f_checkBrowserWidth();
    });
    //WHEN(END)
    //INFINITE SCROLL (START)
    $(window).data("ajaxReq", true).on("scroll", function(event) {
        event.preventDefault();
        var lastRankID = $("#ibm_cci-widget-js .ibm-card").last().attr("data-rank");

        if ($(window).scrollTop() < 400){
            $(gotoTop).css({"opacity": 0, "visibility": "hidden"});
        }else {
            $(gotoTop).css({"opacity": 1, "visibility": "visible"});
        }

        if($(window).data("ajaxReq") == false || vo.totalSearchCountNum < 20 || lastRankID < 20) {
            return;
        }
        try {
            if ($(window).scrollTop() + $(window).height() >= (($(document).height()+72) - 900) && $(window).data("ajaxReq", true)) {
                // Set Flag to false
                $(window).data("ajaxReq", false);

                if(lastRankID >= 20 || vo.totalSearchCountNum >= 20){
                    // Call Ajax
                    $.ajax({
                        url: vo.f_url + "?callback=?",
                        type: "GET",
                        contentType: "application/json",
                        dataType: "jsonp",
                        data: {
                            rank: lastRankID,
                            noOfItems: 20,
                            filter: vo.f_checkSearchstatus(vo.search)
                        },
                        success: function() {
                            // console.log("error");
                        }
                    }).done(function(data) {
                        vo.dataCards = $(".ibm-card");
                        if (data.entries) {
                            vo.search = false;
                            // SEARCH FALSE
                            vo.f_distribute(data);
                            vo.f_reTweetToggle();
                            $(".ibm-sortable").imagesLoaded(function() {
                                // console.log("infinite scroll done condition: masonry triggered");
                                $(".ibm-sortable").append($(".ibm-card")).masonry("appended", $(".ibm-card"));
                                $(".ibm-sortable").masonry("reload");
                            });
                            setTimeout(function() {
                                if (data.entries.length >= 20) {
                                    $(window).data("ajaxReq", true);
                                } else {
                                    $(window).data("ajaxReq", false);
                                }
                            },800);
                        }
                    }).fail(function() {
                        // console.log("error");
                    }).always(function() {
                        // console.log("inside infinite scroll complete");
                    });
                }
            }
        } catch (e) {
            console.log("infinite all trending scroll error: "+e);
        }
    }).on("resize", function() {
        var winHeight = $(window).height();
            ibmsortable = $(".ibm-sortable");
            // ibmcolumn = $("#ibm_cci-widget-js.ibm-columns");

        if ($(window).width() <= 500 || $(window).width() <= 800) {
            ibmsortable.imagesLoaded(function() {
                // console.log("masonry triggered");
                ibmsortable.append($(".ibm-card")).masonry("appended", $(".ibm-card"));
                ibmsortable.masonry("reload");
            });
            vo.f_removeNodes($("#ibm_cci-widget-js > span"));
        }
        if ($(window).width() <= 500 && $("#ibm_cci-widget-js").hasClass("ibm_cci-lv__modifier")) {
            $("#ibm_cci-widget-js").removeClass("ibm_cci-lv__modifier").addClass("ibm_cci-gv__modifier");
            $(".ibm_cci--ls--toggle--li--list-icon a").removeClass("selected");
            $(".ibm_cci--ls--toggle--li--grid-icon a").addClass("selected");
            vo.f_removeNodes($("#ibm_cci-widget-js > span"));
        }

        vo.f_checkBrowserWidth();

        // FOR FLUID LAYOUT
        if(window.location.hash === "#voices-list" && window.innerWidth > 1280){
            $("#ibm_cci-widget-js.ibm-columns").css("width", "");
            widgetJS.masonry("reload");
        }else if(window.location.hash === "#voices-grid" && window.innerWidth > 1280){
            $("#ibm_cci-widget-js.ibm-columns").css("width", "auto");
        }else if(window.location.hash === "#voices-grid" && window.innerWidth < 1280){
            $("#ibm_cci-widget-js.ibm-columns").css("width", "");
            $("#ibm_cci-widget-js.ibm-columns").css("margin-left", "");
            widgetJS.masonry("reload");
        }

    });
    // INFINITE SCROLL (END)

    // HELPER FUNCTIONS FOR JSRender TEMPALTES (START)
    // DEFINE THE HELPERS
    $.views.helpers({
        mediaURL: YTmediaURL,
        truncateDesc: truncateDescription
    });
    // DEFINED HELPER FUNCTIONS
    function YTmediaURL(value, val) {
        if (value.indexOf("youtube") > -1) {
            value = val;
        }
        return value;
    }
    // DEFINED HELPER FUNCTIONS
    function truncateDescription(content) {
        var trimmedContent = "";
        if (content.length > 172) {
            trimmedContent = content.substring(0, 170);
        } else {
            trimmedContent = content;
        }
        return trimmedContent;
    }
});
//CLOSE ON DOM READY

// VOICES OBJECT
(function($, a) {
    var vo = {
        //GLOBAL ARRAY VARIABLES (NOTE: SO THEY DON'T GET OVERWRITTEN WHEN YOU PUSH DATA)
        searchterms: [],
        differenceClone: [],
        searchTrendingList: [],
        sTerms: [],
        checkedCount: 0,
        var_rank: 0,
        search: true,

        // INITIALIZATION FOR TRENDING
        init_t: function(t_config) {
            this.t_url = t_config.tt_url;
            this.t_template = t_config.t_template;
            this.t_container = t_config.t_container;
        },
        // INITIALIZATION FOR FEEDS
        init_f: function(f_config) {
            this.f_url = f_config.f_url;
            this.f_unro_template = f_config.f_unro_template;
            this.f_container = f_config.f_container;
            this.f_reso_template = f_config.f_reso_template;
        },
        t_attach_template: function(data) {
            var newData = data;
            this.t_container.append(this.t_template.render(newData));
        },
        st_attach_template: function(data) {
            var newData = data;
            this.t_container.append($("#st_template").render(newData));
        },
        // FETCH TRENDING JSON OBJECT
        f_fetch_trending: function() {
            var self = this, url = self.t_url;
            $.getJSON(url + "?callback=?", {
                type: "GET",
                dataType: "jsop",
                contentType: "application/json"
            }, function(data) {
                // RESULTS OF THE JSON DATA IS MAPPED AND STORED TO THE NEW ARRAY filter_tweets
                if (data && data.trending && data.trending.indexOf(",") > -1) {
                    var rec_data = data.trending.trim() || null;
                    // rec_data is an array, need to convert it into an object self.t_newlist
                    rec_data = $.makeArray(rec_data);
                    // rec_data = $.extend({}, rec_data);
                    self.trendinglist = rec_data[0].split(",");
                }
                self.t_newlist = $.map(rec_data[0].split(","), function(list, index) {
                    //returns an object to the trending template
                    return {
                        t_list: $.makeArray(list)
                    };
                });
                self.searchTrendingList = self.trendinglist.slice(0);
                self.t_attach_template(self.t_newlist);
            }).promise();
        },
        // FETCH FEED JSON OBJECT
        f_fetch_feeds: function() {
            var self = this, url = self.f_url;
            self.f_addspinner();
            return $.ajax({
                url: url + "?callback=?",
                type: "GET",
                contentType: "application/json",
                dataType: "jsonp",
                data: {
                    rank: self.var_rank,
                    noOfItems: 20,
                    filter: self.searchterms.toString() || null
                }
            }).promise();
        },
        f_attach_reso_temp: function(reso_data) {
            //Modify the timestamp and the content attr and wrap href
            this.f_container.append(this.f_reso_template.render(this.f_modify_datafeed(reso_data)));
        },
        f_attach_unro_temp: function(unro_data) {
            //Modify the timestamp and the content attr and wrap href
            this.f_container.append(this.f_unro_template.render(this.f_modify_datafeed(unro_data)));
        },
        // MODIFY DATA AND PRELOAD IMAGES
        f_modify_datafeed: function(data) {
            var self = this, feed_data = data || null;
            try {
                if(feed_data == "" || feed_data == undefined) {
                    var $result = $('.ibm_cci--sr p');
                    $result.append("Data not available");
                }
                if (feed_data){
                    console.log("_____________________________________");
                    console.log(decodeURI(feed_data.title));
                    
                    feed_data.title = decodeURI(feed_data.title.toString());

                    feed_data.rank = this.f_mod_rank(feed_data.rank || "");                    
                    feed_data.content = this.f_mod_content(feed_data.content || "");
                    feed_data.published = this.f_pretty_date(feed_data.published || "");
                    feed_data.domain = this.f_truncateDomain(feed_data.domain || "");
                    if (feed_data.mediaURL || feed_data.altMediaURL || "") {
                        feed_data.mediaURL = this.f_preloadImages(feed_data.mediaURL || "");
                        feed_data.altMediaURL = this.f_preloadImages(feed_data.altMediaURL || "");
                    }
                    if (feed_data.refTweets && feed_data.refTweets.length > 0) {
                        for (var i = 0; i < feed_data.refTweets.length; i++) {
                            if (feed_data.refTweets[i].content) {
                                feed_data.refTweets[i].content = this.f_mod_content(feed_data.refTweets[i].content || "");
                                feed_data.refTweets[i].published = this.f_pretty_date(feed_data.refTweets[i].published || "");
                            }
                            if (feed_data.userAvatar || feed_data.refTweets.userAvatar) {
                                feed_data.userAvatar = this.f_preloadImages(feed_data.userAvatar || "");
                                feed_data.refTweets[i].userAvatar = this.f_preloadImages(feed_data.refTweets[i].userAvatar || "");
                            }
                        }
                    }
                }
                return feed_data;
            } catch (e) {
                console.log("Error inside the modify_datafeed: "+e);
            }
        },
        f_mod_rank: function(rank){
            var newRank = 0;
            if(rank < 10) {
                newRank = '0'+rank;
            }else{
                newRank = rank;
            }
            return newRank;
        },
        f_preloadImages: function(imgURL, callback) {
            var img = new Image(),
                regex = /\.(jpeg|jpg|gif|png|ico|jpg:large)$/,
                imgWidth = 0;
                img.src = imgURL;

                try{
                    if(imgURL.indexOf("youtube") > -1){
                        // console.log("*****YOUTUBE IF STATEMETNT CALLED****");
                        return imgURL;
                    }else if(imgURL.match(regex) != null && img.src.readyState != 4){
                        // CODE DOES NOT WAIT FOR THE ONLOAD TO COMPETE BEFORE RETURNING
                        img.onload = function(){
                            imgWidth = img.naturalWidth;
                            if(imgWidth > 1000){
                                // console.log("*****IMGONLOAD INSIDE****: "+imgWidth+" : "+img.src);
                                //return img.src;
                            }
                        }
                        // console.log("*****IMGONLOAD OUTSIDE****: "+imgWidth+" : "+img.src);
                        return img.src;
                    }
                }catch(e){
                    console.log('error inside preload images: '+e);
                }
        },
        f_truncateDomain: function(domain) {
            if (domain.indexOf(".com") > -1) {
                domain = domain.replace(".com", "");
            }
            if (domain.indexOf("www.") > -1) {
                domain = domain.replace("www.", "");
            }
            if (domain.indexOf(".net") > -1) {
                domain = domain.replace(".net.", "");
            }
            if (domain.indexOf(".org") > -1) {
                domain = domain.replace(".org", "");
            }
            if (domain.length > 20) {
                domain = domain.substring(0, 20);
            }
            return domain;
        },
        f_mod_content: function(data) {
            var update_content = data.replace(/(http(s)*\:\/\/[^\s]+\s*)/g, '<a href="$1">$1</a>').replace(/#([^\s]+)/g, '<a href="//twitter.com/search?q=%23$1">#$1</a>').replace(/@([^\s:]+)/g, '<a href="//twitter.com/$1">@$1</a>');
                return update_content;
        },
        f_pretty_date: function(timeVal) {
            try {
                var monthTxt = new Array();
                monthTxt[0] = "Jan";
                monthTxt[1] = "Feb";
                monthTxt[2] = "Mar";
                monthTxt[3] = "Apr";
                monthTxt[4] = "May";
                monthTxt[5] = "Jun";
                monthTxt[6] = "Jul";
                monthTxt[7] = "Aug";
                monthTxt[8] = "Sep";
                monthTxt[9] = "Oct";
                monthTxt[10] = "Nov";
                monthTxt[11] = "Dec";
                monthTxt[12] = "December";
                timeVal = timeVal + "";
                // create new Date
                var date = new Date(parseInt(timeVal.trim()) || ""), // get difference from current time
                diff = (new Date().getTime() - date.getTime()) / 1e3, //get day difference
                day_diff = Math.floor(diff / 86400);
                if (isNaN(day_diff) || day_diff < 0) return;
                var retVal = day_diff == 0 && (diff < 60 && "just now" || diff < 120 && "1m" || diff < 3600 && Math.floor(diff / 60) + "m" || diff < 7200 && "1h" || diff < 86400 && Math.floor(diff / 3600) + "h") || // day_diff >= 1 && date.getDate() + " " + monthTxt[parseInt(date.getMonth(), 10)];
                day_diff >= 1 && day_diff + "d";
                return retVal;
            } catch (e) {
                console.log("error inside the f_pretty_data function: " + e);
            }
        },
        f_addspinner: function() {
            $("#ibm_cci-widget-js").append('<span class="ibm-spinner-small"></span>');
        },
        // FETCH DISTRIBUTE DATA
        f_distribute: function(data) {
            var self = this,
                widgetNodes = $("#ibm_cci-widget-js").children(".ibm-col-1-1");
            if (vo.search) {
                // REMOVES THE NODES FOR SEARCH
                vo.f_removeNodes(widgetNodes);
            }
            try{
                if(data.entries && data.entries != 'undefined' && data.entries.length > 0){
                    self.feed = data.entries;
                    self.feed_length = data.entries.length || 0;
                }
            }catch(e){
                console.log("testing f_distribute: "+e);
            }

            try {
                if(self.feed) {
                    for (var i = 0; i < self.feed_length; i++) {
                        if (self.feed[i].type && self.feed[i].type === "URLREF") {
                            // For unresolved Tweets
                            self.f_attach_reso_temp(self.feed[i]);
                        } else if (self.feed[i].type && self.feed[i].type === "TWEET") {
                            // For resolved Tweets you need to store the Object
                            self.f_attach_unro_temp(self.feed[i]);
                        }
                    }
                }
            } catch (e) {
                console.log("Error logged in the DOM ready $.when: "+e);
            }
        },
        f_removeNodes: function(nodes) {
            // Need to add condition to only remove trending search nodes count > 9
            nodes.remove();
        },
        f_totalSearchCount: function(count) {
            var self = this;
                searchResultNode = $(".ibm_cci--sr > p");
                searchResultNode.text("Results found: " + count).removeClass("ibm_cci-toggleDisplay");
        },
        f_buildtiles: function() {
            //MASONRY HELPER
            var $sortable = $(".ibm-sortable"), masonryItems = $sortable.find(".ibm-card");
            $sortable.imagesLoaded(function() {
                $sortable.masonry({
                    gutter: 0,
                    itemSelector: ".ibm-card",
                    transitionDuration: "10s"
                }, true);
            });
        },
        f_appendTrendinglist: function(searchterms) {
            var self = this;
            self.sTerms = [];
            self.sTerms.push(searchterms);
            self.similar = [];
            self.difference = [];

            if (vo.search) {
                $.grep(self.sTerms[0], function(e, i) {
                    //Similar values
                    if ($.inArray(e, self.searchTrendingList) !== -1) {
                        if (self.similar.length == 0) {
                            self.similar.push(e);
                        } else if (self.similar.length > 0) {
                            if ($.inArray(e, self.similar) !== -1) return false;
                            if ($.inArray(e, self.similar) === -1) self.similar.push(e);
                        }
                    } else if ($.inArray(e, self.searchTrendingList) === -1) {
                        if (self.difference.length == 0) {
                            self.difference.push(e);
                        } else if (self.difference.length > 0) {
                            if ($.inArray(e, self.difference) !== -1) return false;
                            if ($.inArray(e, self.difference) === -1) self.difference.push(e);
                        }
                    }
                });
                // NEED TO ADD THE DIFFERENCE DATA INSIDE SEARCHTRENDINGLIST
                $.grep(self.difference, function(e, i) {
                    if ($.inArray(e, self.searchTrendingList) !== -1) {
                        return false;
                    } else if ($.inArray(e, self.searchTrendingList) === -1) {
                        self.searchTrendingList.push(e);
                        self.differenceClone.push(self.difference);
                    }
                });
                self.newSearchTermList = $.map(self.difference, function(e, i) {
                    return {
                        t_list: $.makeArray(e)
                    };
                });
                var $targetNode = $(".ibm_cci__ml-li a.ibm_cci-voices-tt-text");
                try {
                    for (var i = 0; i < $targetNode.length; i++) {
                        for (var j = 0; j < self.similar.length; j++) {
                            if (self.similar[j] == $targetNode[i].text) {
                                $($targetNode[i]).parent().addClass("ibm_cci-clicked");
                                $($targetNode[i]).siblings().addClass("ibm_cci-close");
                                if ($("#ibm_cci__ml_t-js").hasClass("ibm_cci-clicked")) {
                                    $("#ibm_cci__ml_t-js").removeClass("ibm_cci-clicked");
                                }
                            }
                        }
                    }
                } catch (e) {
                    console.log("error in f_appendTrendinglist" + e);
                }
                $("#ibm_cci__ml_t-js").removeClass("ibm_cci-clicked");
                self.st_attach_template(self.newSearchTermList);
                self.search = false;
            }
        },
        f_constructURL: function(searchterms) {
            // if searchterm is empty condition need to be considered
            var self = this;
            try{
                if(searchterms.length === 0){
                        self.f_fetch_feeds().done(function(data) {
                            self.f_removeNodes($("#ibm_cci-widget-js > span"));
                            self.search = true;
                            // SEARCH TRUE
                            self.totalSearchCountNum = data.entries.length;
                            self.f_distribute(data);
                        // if(data.entries.length < 20) $(window).data("ajaxReq", false);
                            self.f_reTweetToggle();
                            $("#ibm_cci__ml_t-js").addClass("ibm_cci-clicked");
                            $("#ibm_cci-widget-js").masonry("reload");
                            setTimeout(function() {
                                $("#ibm_cci-widget-js").masonry();
                            }, 400);
                        });
                        if (self.searchterms.length == 0) $(window).data("ajaxReq", true);

                }else if(searchterms.length > 0){
                        self.filter_searchterms = [];
                        var searchEle = searchterms.trim().split(",");
                        for (var i = 0; i < searchEle.length; i++) {
                            self.filter_searchterms.push(searchEle[i]);
                    }
                    $.grep(self.filter_searchterms, function(e, i) {
                        if($.inArray(e, self.searchterms) === -1) self.searchterms.push(e);
                    });
                    $.unique(self.searchterms);

                    $.ajax(self.f_url + "?callback=?", {
                        type: "GET",
                        dataType: "jsonp",
                        contentType: "application/json",
                        data: {
                            rank: self.var_rank,
                            noOfItems: 20,
                            filter: self.searchterms.toString()
                        },
                        success: function(){
                            // console.log("inside f_constructURL ajax request with 20 noOfItems");
                        }
                    }).done(function(data, textStatus, jqXHR) {
                        var self = vo;
                        // Update this function to distribute loadmore and search terms
                        if (data.entries != "undefined" && data.entries.length > 0) {
                                self.search = true;
                                // SEARCH TRUE
                                self.totalSearchCountNum = data.totalCount || 0;
                                self.f_totalSearchCount(self.totalSearchCountNum);
                                self.f_distribute(data);
                            // if(data.entries.length < 20) $(window).data("ajaxReq", false);
                                self.f_reTweetToggle();
                                self.f_appendTrendinglist($.makeArray(data.terms.split(",")));
                                self.checkedCount = data.terms.split(",").length;
                                self.f_removeNodes($("#ibm_cci-widget-js > span"));
                                $(".ibm-sortable").append($(".ibm-card")).masonry("appended", $(".ibm-card"));
                                setTimeout(function() {
                                    $("#ibm_cci-widget-js").masonry();
                                }, 400);
                                if (vo.searchterms.length > 0) $(window).data("ajaxReq", true);
                        }else if(data.entries.length === 0) {
                                self.f_appendTrendinglist($.makeArray(data.terms.split(",")));
                                self.totalSearchCountNum = data.totalCount || 0;
                                self.f_totalSearchCount(self.totalSearchCountNum);
                                self.f_removeNodes($("#ibm_cci-widget-js .ibm-card"));
                                if (vo.searchterms.length == 0) $(window).data("ajaxReq", false);
                            }
                    }).fail(function() {
                        // console.log("error");
                    }).always(function() {
                        // console.log("complete");
                    });
                }
            }catch(e){
                console.log("error inside f_constructURL"+e);
            }
        },
        // CHECK SEARCH STATUS
        f_checkSearchstatus: function(status) {
            try {
                if (status == true) {
                    // console.log(status == true);
                    return null;
                } else {
                    return vo.searchterms.toString();
                }
            } catch (e) {
                console.log("check searchStatus error: " + e);
            }
        },
        // RETWEET TOGGLE (START)
        f_reTweetToggle: function() {
            try{
                $("#ibm_cci-widget-js ul.ibm_cci-relatedTweetContainer li").on("click", "a", function(event) {
                    // DISABLE DEFAULT ACTION
                    event.preventDefault();
                    // INITIATE VARIABLES
                    var eventTarget = $(this);
                    parent_dataID = eventTarget.parent().data("userid");
                    targetDiv = eventTarget.parentsUntil("div.ibm-col-1-1").children('div[data-userid="' + parent_dataID + '"]');
                    if (eventTarget.children("img").hasClass("selected")) {
                        return;
                    } else {
                        eventTarget.parent("li").siblings("li").find("a img").removeClass("selected");
                        eventTarget.children("img").addClass("selected");
                        eventTarget.parentsUntil("div.ibm-col-1-1").children("div").css("display", "none");
                        targetDiv.css("display", "visible");
                        $(".ibm-sortable").masonry("reload");
                    }
                });
            }
            catch(e){
                console.log("error in f_reTweetToggle function: "+e);
            }
        },
        f_checkBrowserWidth: function(){
            var self = vo,
                browserinnerWidth = window.innerWidth,
                winHash = window.location.hash,
                marginLeft = self.f_calculateFluidMargin();

                if(marginLeft !== 0){
                    marginLeft = marginLeft - 10;
                }else if(marginLeft === 0){
                    marginLeft = marginLeft + 150;
                }

            if(window.location.hash === "#voices-grid" && window.innerWidth > 1280){
                $("#ibm_cci-widget-js.ibm-columns").css("margin-left", marginLeft);
                $("#ibm_cci-widget-js.ibm-columns").css("width", "auto");
            }

            // $("#ibm_cci-widget-js").masonry("reload");
        },
        f_calculateFluidMargin: function(){
            var widgetJSWidth = $("#ibm_cci-widget-js").outerWidth(true);
                return ((widgetJSWidth % 320)/2);
        }

    };
    //vo (END)
    a.vo = vo;
})(jQuery, window);

// MASONRY (START)
(function(e,t,n,r){"use strict";var i=t.event,s;i.special.smartresize={setup:function(){t(this).bind("resize",i.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",i.special.smartresize.handler)},handler:function(e,t){var n=this,r=arguments;e.type="smartresize",s&&clearTimeout(s),s=setTimeout(function(){i.dispatch.apply(n,r)},t==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection),u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){a.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function n(){e.call(i,s)}function r(e){var i=e.target;i.src!==u&&t.inArray(i,a)===-1&&(a.push(i),--o<=0&&(setTimeout(n),s.unbind(".imagesLoaded",r)))}var i=this,s=i.find("img").add(i.filter("img")),o=s.length,u="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",a=[];return o||n(),s.bind("load.imagesLoaded error.imagesLoaded",r).each(function(){var e=this.src;this.src=u,this.src=e}),i};var o=function(t){e.console&&e.console.error(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){o("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){o("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,jQuery,vo);
