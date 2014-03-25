/**
 * POC version of for our Js Asset Loader. Will be subject to drastic change. 
 * 
 */
/*
  How someone might use this:

  AssetLoader
    .load([
      "../js/loaded-resource-1.js", 
      "../js/loaded-resource-2.js", 
      "../js/loaded-resource-3.js"
    ])
    .complete(function() {
      console.warn('User-specified JS callback');
      $(function() {
        console.warn('document.ready');
        loadedFunction1();
        loadedFunction2();
        loadedFunction3();
      });
    });

*/




var $ = jQuery;

function sleep(ms)
{
  var dt = new Date();
  dt.setTime(dt.getTime() + ms);
  while (new Date().getTime() < dt.getTime());
}

AssetLoader = function(opts) {
  var defaults = {
        async: true       // Let us enable/disable async loading
      },
      self = this,
      config = {},
      completionCallbacks = [],
      assetQueue = [],    // How to keep these in sync?
      loadedAssets = [];  // Files get listed here when completed.
                          // These will probably be hashes or some other
                          //   data structure. 

  function config() {
    return config;
  }

  function loadComplete(filePath) {
    // mark the file as loaded in the loadedAssets list
    // fire off a notificaiton
    
    $.each(completionCallbacks, function(i, callback) {
      callback.apply(self);
    });
  }


  function load(pathOrArray) {
    var list = [];

    // Call whatever async loader we're using

    if (pathOrArray.constructor === String) {
      list.push(pathOrArray);
    } else if (pathOrArray.constructor === Array) {
      list = pathOrArray;
    } else {
      throw "Loader: bad parameters.";
    }
      
    Modernizr.load({
      load: pathOrArray,
      complete: function(url, result, key) {
        console.warn('modernizr complete:');
        console.log(arguments);

        loadComplete();
      },
      callback: function(url, result, key) {
        console.warn('modernizr callback for '+url);
        console.log(arguments);
      }
    });

    return self;
  }

  /**
   * Setter for completion callbacks. Runs when all assets are done loading. 
   * 
   * @return {Object} The Loader object. 
   */
  function complete(f) {
    console.warn('SAVING user-specified JS callback');
    completionCallbacks.push(f);

    return self;
  }

  $.extend(this, {
    load: load,
    complete: complete
  });

  return self;
}();


AssetLoader
  .load([
    "../js/mike/loaded-resource-1.js", 
    "../js/mike/loaded-resource-2.js", 
    "../js/mike/loaded-resource-3.js"
  ])
  .complete(function() {
    console.warn('RUNNING user-specified JS callback');
    $(function() {
      console.warn('document.ready');
      loadedFunction1();
      loadedFunction2();
      loadedFunction3();
    });
  });








