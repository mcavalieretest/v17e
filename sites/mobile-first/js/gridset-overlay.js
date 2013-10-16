// Gridset Overlay JS

gs = {

	init: function () {
		
		if (window.location.href.match('gridset=show')) gs.show();
	
		gs.bind(document, 'keydown', function (e) { 
		
			if (!e) var e = window.event;
		
			if(e.metaKey || e.ctrlKey) {
				
				switch (e.which || e.keyCode) {
					case 71:
					
						var gw = document.querySelectorAll('.gridsetoverlaywrap, #gridsetoverlaystyles, #gridscreenwidthwrap');
					
						if (gw.length == 0) window.location.href = window.location.href + '?gridset=show';
						else window.location.href = window.location.href.replace('?gridset=show', '');
						
						gs.prevent(e);
						break;
						
				}
				
			}
		
		
		});
	
	},
	
	width: function () {
		
		var swv = document.getElementById('gridscreenwidthval');
		if (swv) swv.innerHTML = window.innerWidth + 'px';
		
	},

	show: function () {
	
		var b = document.getElementsByTagName('body')[0],
				gridareas = document.querySelectorAll('[class*=-showgrid]'),
				areacount = gridareas.length,
				wrapper = document.querySelectorAll('.main'),
			
				newwidth = document.createElement('div'),
				head = document.getElementsByTagName('head'),
				newfavicon = document.createElement('link'),
				newgsstyles = document.createElement('link');
		
		
		
		newwidth.id = 'gridscreenwidthwrap';
		newwidth.innerHTML = '<p id="gridscreenwidth">Screen width: <strong id="gridscreenwidthval"></strong></p>';
		
		b.appendChild(newwidth);
		
		var newwidthdisplay = (newwidth.currentStyle) ? newwidth.currentStyle.display : getComputedStyle(newwidth, null).display;
		
		if (newwidthdisplay != 'block') {
		
			newgsstyles.rel = "stylesheet";
			newgsstyles.id = "gridsetstyles";
			newgsstyles.href = "./css/gridset.css";
			head[0].appendChild(newgsstyles);
		
		}
		
		if (areacount) {
			
			var j = areacount;
			
			while (j-- > 0) {
			
				var area = gridareas[j];
			
				gs.buildgrid(area, j, areacount);
				
				if (window.getComputedStyle(area,null).getPropertyValue("position") == 'static') area.style.position = 'relative';
				
			}
			
		}
		else {
			
			if (!b.className.match('gridsetnoareas')) b.className += ' gridsetnoareas';
			
			gs.buildgrid(b, j, areacount);
		
		}
		
		gs.width();
		gs.bind(window, 'resize', gs.width);
	
	},
	
	buildgrid: function (area, j, showgrid) {
		
		var set = JSON.parse('{"name":"IBMSE","widths":{"940":{"width":940,"grids":{"twelveCol":{"name":"Desktop 12col","prefix":"twelveCol","width":940,"columns":{"twelveCol1":{"name":"twelveCol1","unit":"%","percent":6.38741135,"px":60.04},"twelveCol2":{"name":"twelveCol2","unit":"%","percent":6.38741135,"px":60.04},"twelveCol3":{"name":"twelveCol3","unit":"%","percent":6.38741135,"px":60.04},"twelveCol4":{"name":"twelveCol4","unit":"%","percent":6.38741135,"px":60.04},"twelveCol5":{"name":"twelveCol5","unit":"%","percent":6.38741135,"px":60.04},"twelveCol6":{"name":"twelveCol6","unit":"%","percent":6.38741135,"px":60.04},"twelveCol7":{"name":"twelveCol7","unit":"%","percent":6.38741135,"px":60.04},"twelveCol8":{"name":"twelveCol8","unit":"%","percent":6.38741135,"px":60.04},"twelveCol9":{"name":"twelveCol9","unit":"%","percent":6.38741135,"px":60.04},"twelveCol10":{"name":"twelveCol10","unit":"%","percent":6.38741135,"px":60.04},"twelveCol11":{"name":"twelveCol11","unit":"%","percent":6.38741135,"px":60.04},"twelveCol12":{"name":"twelveCol12","unit":"%","percent":6.38741135,"px":60.04}},"gutter":{"unit":"%","px":19.928,"percent":2.12},"ratio":{"name":"even","value":1}},"fiveCol":{"name":"Desktop 5col","prefix":"fiveCol","width":940,"columns":{"fiveCol1":{"name":"fiveCol1","unit":"%","percent":18.28723404,"px":171.9},"fiveCol2":{"name":"fiveCol2","unit":"%","percent":18.28723404,"px":171.9},"fiveCol3":{"name":"fiveCol3","unit":"%","percent":18.28723404,"px":171.9},"fiveCol4":{"name":"fiveCol4","unit":"%","percent":18.28723404,"px":171.9},"fiveCol5":{"name":"fiveCol5","unit":"%","percent":18.28723404,"px":171.9}},"gutter":{"unit":"%","px":19.928,"percent":2.12},"ratio":{"name":"even","value":1}}}}},"prefixes":{"index":["twelveCol","fiveCol"],"940":["twelveCol","fiveCol"]}}'),
		
				gridwrap = document.createElement('div'),
				gridinner = (showgrid) ? '<div class="gridwrap"><div class="gridoverlay">' : '<div class="gridwrap"><div class="gridoverlay wrapper">',
				
				awidth = area.clientWidth,
				apadleft = (parseFloat(gs.getstyle(area, 'padding-left')) / awidth) * 100,
				apadright = (parseFloat(gs.getstyle(area, 'padding-right')) / awidth) * 100;
		
		if (showgrid) gridwrap.className = 'gridsetoverlaywrap';
		else gridwrap.className = 'gridsetoverlaywrap';
		
		for (w in set.widths) {
			
			var width = set.widths[w],
					hides = '';
			
			for (p in set.prefixes) {
				
				if (p != w && p != 'index') hides += set.prefixes[p][0] + "-hide ";
				
			}
			
			gridinner += '<div class="gridset ' + hides + '">';
			
			for (j in width.grids) {
			
				var grid = width.grids[j],
						showreg = new RegExp('(^| )' + grid.prefix + '-showgrid( |$)');
				
				if (!showgrid || area.className.match(showreg)) {
				
					gridinner += '<div style="padding-left:' + apadleft + '%;padding-right:' + apadright + '%;">';
					
					for (k in grid.columns) {
						
						var col = grid.columns[k];
						
						gridinner += '<div class="' + col.name + '"><small>' + col.name + '</small></div>';
					
					}
					
					gridinner += '</div>';
				
				}
			}
			
			gridinner += '</div>';
		
		}
		
		gridinner += '</div></div>';
		
		gridwrap.innerHTML = gridinner;
		
		area.appendChild(gridwrap);
		
	},
	
	bind : function (t, e, f) {
		
		if (t.attachEvent) t.attachEvent('on' + e, f);
		else t.addEventListener(e, f, false);
	
	},
	
	prevent : function (e) {
	
		if (e.preventDefault) e.preventDefault();
		else event.returnValue = false;
	
	},
	
	getstyle : function (t, p){
	
	 if (t.currentStyle) return t.currentStyle[p];
	 else if (document.defaultView && document.defaultView.getComputedStyle) return document.defaultView.getComputedStyle(t, "").getPropertyValue(p);
	 else return t.style[p];
	 
	}


};

gs.init();