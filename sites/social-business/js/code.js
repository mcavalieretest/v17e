var sbi = sbi || {};
sbi.hp = sbi.hp || {};
sbi.twitterWidget || {};
sbi.listView || {};
sbi.detailView || {};

sbi.doSidebar || {};


sbi.hp = {
	init : function(){
		sbi.twitterWidget.getTweets();
		this.contentWidget();
		sbi.doArchives.init();
	
	},

	contentWidget : function(){
		var _curr_ad = 'nav_main', 
		_buttons = dojo.query('.ibm_cci--toggle-widget-nav li a');
		_buttons.forEach(function(_obj, _index){
		    dojo.connect(_obj, 'click', function(e){
		    	
		        var _rel = dojo.attr(_obj, 'id');
		        if(_rel != _curr_ad){
		        	dojo.attr(dojo.query('.ibm_cci--toggle-widget-nav li a.selected')[0], 'aria-selected', 'false');
		            dojo.removeClass(dojo.query('.ibm_cci--toggle-widget-nav li a.selected')[0], 'selected');
		            dojo.removeClass(dojo.query('.ibm_cci--toggle-widget-content.selected')[0], 'selected');
		             var _new_piece = dojo.byId(_rel);
		              dojo.addClass(_new_piece, 'selected');
		             _rel = _rel.replace('nav_', 'sbi-blog-list_');
		             _new_piece = dojo.byId(_rel);
		            dojo.addClass(_new_piece, 'selected');
		            _curr_ad = _rel;
		        }
		        e.preventDefault();
		    });
		});
	}
}

sbi.listView = {
	init :function (){
		sbi.twitterWidget.getTweets();
	}
}

sbi.detailView = {
	init :function (){
		sbi.twitterWidget.getTweets();
	}
}


sbi.twitterWidget = {
	getTweets : function(){
		!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

	}
}

sbi.doArchives = {
	init : function (){
		dojo.query(".ibm_cci--sbi-show-hide").onclick(function(e){
			e.preventDefault();
			console.info(this.parentNode.childNodes);

		});
	}
}





