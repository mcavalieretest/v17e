

;(function ($) {
  // "use strict";

 window.grid = {
    toggleState : function() {
      // change our indicators of state
      if (window.grid.state == 'on') {
        window.grid.state = 'off' ;
      }
      else if( window.grid.state == 'off'){
        window.grid.state = 'on' ;
      }
    }
  } ;
  
  definegrid = function() {
		var browserWidth = $(window).width(); 
		if (browserWidth >= 990) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 940;
			columns = 6;
			columnwidth = 140;
			gutterwidth = 20;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		} 
		if (browserWidth <= 989) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 940;
			columns = 6;
			columnwidth = 140;
			gutterwidth = 20;
			pageleftmargin = 20;
			pagerightmargin = 20;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		} 
		if (browserWidth <= 800) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 640;
			columns = 6;
			columnwidth = 90;
			gutterwidth = 20;
			pageleftmargin = 80;
			pagerightmargin = 80;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
		if (browserWidth <= 768) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 640;
			columns = 6;
			columnwidth = 90;
			gutterwidth = 20;
			pageleftmargin = 65;
			pagerightmargin = 65;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
		if (browserWidth <= 640) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 520;
			columns = 6;
			columnwidth = 70;
			gutterwidth = 20;
			pageleftmargin = 60;
			pagerightmargin = 60;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
		if (browserWidth <= 580) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 520;
			columns = 6;
			columnwidth = 70;
			gutterwidth = 20;
			pageleftmargin = 40;
			pagerightmargin = 40;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
		if (browserWidth <= 568) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 300;
			columns = 1;
			columnwidth = 280;
			gutterwidth = 20;
			pageleftmargin = 130;
			pagerightmargin = 130;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
		if (browserWidth <= 480) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 300;
			columns = 1;
			columnwidth = 280;
			gutterwidth = 20;
			pageleftmargin = 92;
			pagerightmargin = 92;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
		if (browserWidth <= 320) 
		{
            pageUnits = 'px';
            colUnits = 'px';
			pagewidth = 280;
			columns = 1;
			columnwidth = 240;
			gutterwidth = 20;
			pageleftmargin = 20;
			pagerightmargin = 20;
			pagetopmargin = 0;
			rowheight = 20;
			gridonload = 'off';
			makegrid();
		}
	}

 
  makegrid = function () {

    // called at startup. Remove grids, clear state.
    initialCleanUp() ;
    
    /* Column Container */
    var gridDiv = document.createElement("div");
    gridDiv.id  = "grid";

    /* Left Margin Column */
    leftDiv = document.createElement("div");
    leftDiv.className = "mline mlineL";
    gridDiv.appendChild(leftDiv);

    /* Create Columns */
    for (var i = 0; i < (columns - 1); i++) {
      colDiv = document.createElement("div");
      colDiv.className = "gridcol";
      gridDiv.appendChild(colDiv);
      lineLDiv = document.createElement("div");
      lineLDiv.className = "lineL";
      colDiv.appendChild(lineLDiv);
      lineRDiv = document.createElement("div");
      lineRDiv.className = "lineR";
      colDiv.appendChild(lineRDiv);
    }

    /* Right Margin Column */
    rightDiv = document.createElement("div");
    rightDiv.className = "mline mlineR";
    gridDiv.appendChild(rightDiv);

    document.body.appendChild(gridDiv);

    /* If Rows */
    if (rowheight !== 0)  {
      /* Row Container */
      if ($(window).height() > $(document.body).height()){
        pageheight     = $(window).height();
      }else{
        pageheight     = $(document.body).height();
      }
      var gridRows = document.createElement("div") ;
      gridRows.id  = "gridRows";
      /* Create Rows */
      for (var i = 0; i < (pageheight / rowheight); i++) {
        rowDiv = document.createElement("div");
        rowDiv.className = "gridrow";
        gridRows.appendChild(rowDiv);
        lineB = document.createElement("div");
        lineB.className = "lineB";
        rowDiv.appendChild(lineB);
      }

      document.body.appendChild(gridRows);
    }

    /* Apply CSS Properties */
    $('#grid').css('width', pagewidth + pageUnits);

    if (typeof window.pageleftmargin === 'number') {
      $('#grid').css('left', pageleftmargin + pageUnits);
      $('#grid').css('margin', '0');
    } else if (typeof window.pagerightmargin === 'number') {
      $('#grid').css('right', pagerightmargin + pageUnits);
      $('#grid').css('left', 'auto');
      $('#grid').css('margin', '0');
    } else {
      if (pageUnits === '%') {
        $('#grid').css('left', ((100 - pagewidth) / 2) + pageUnits);
        $('#grid').css('margin-left', 'auto');
      } else {
        $('#grid').css('margin-left', '-' + (pagewidth / 2) + pageUnits);
      }
    }

    $('#grid div.gridcol').css('margin-left', columnwidth + colUnits);
    $('#grid div.gridcol').css('width', gutterwidth + colUnits);
    $('#gridRows').css('margin-top', pagetopmargin + 'px');
    $('#gridRows div.gridrow').css('margin-top', (rowheight - 1) + 'px');

    /* Create gridUX and button */
    var gridUX = document.createElement("div");
    gridUX.id = "gridUX";
    document.body.appendChild(gridUX);
    $('#gridUX').append('<div id="gridButtonBkgd"></div><button id="gridButton"></button>');
    $('#gridButton').append('<span id="gridbuttonON">ON</span>');
    $('#gridButton').append('<span id="gridbuttonOFF" style="display:none;">OFF</span>');

    /* On/Off Button - click functionality */
    $('#gridButton').click(function () {
      $('#gridButton').toggleClass('buttonisoff') ;
      $('#grid').toggle();
      $('#gridRows').toggle();
      $("#gridButton span").toggle();
      window.grid.toggleState() ;
    });
  };
  

function initialCleanUp() {
	    /* Remove Previously Existing Grid Elements */
	    $('#grid').remove();
	    $('#gridRows').remove();
	    $('#gridUX').remove();
    }


  setgridonload = function () {
    if ( typeof gridonload === "undefined" || gridonload === 'off') {
      $('#gridButton').toggleClass('buttonisoff') ;
      $('#grid').toggle();
      $('#gridRows').toggle();
      $("#gridButton span").toggle();
      window.grid.state = 'off'
    } else {
      window.grid.state = 'on'
    }
  } ;


  setgridonresize = function () {
    if ( window.grid.state === 'off') {
      $('#gridButton').toggleClass('buttonisoff') ;
      $('#grid').toggle();
      $('#gridRows').toggle();
      $("#gridButton span").toggle();
    }
  } ;

})(jQuery);