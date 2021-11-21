// Sketchfab Viewer API: Pick/Raycast from 2D screen position to 3D model
// HOW TO use the sample
// Change x,y or move the mesh to make it interesect the ray
// check results of query below the canvas
/////////////////
// PICK BEGIN
/////////////////
function PickScreen(api, pos2D) {
    // The actual API CALL
    // https://sketchfab.com/developers/viewer/functions#api-pickFromScreen
    // pos2D is the position in the canvas screen
    api.pickFromScreen(pos2D, function (err, info) {
      // handle any error
      // calling it before scene is loaded, etc
      if (err) {
        console.error(err);
        return;
      } // show result in the texfield below the iframe canvas
  
  
      var jsonClassName = 'JSON';
  
      function getWin() {
        return window;
      }
  
      var result = info ? getWin()[jsonClassName].stringify(info, null, 4) : 'no results';
      document.getElementById('Info').innerHTML = result;
    });
  } /////////////////
  // PICK END
  /////////////////
  
  
  var startValues; //////////////////////////////////
  // BOILERPLATE:
  // BASIC API INITIALISATION BEGIN
  //////////////////////////////////
  // BoilerPlate Code for sketchfab API
  // not specific to the raycast sample.
  // encapsulate the whole sketchfab webpage actions we do
  
  function actionSkfb() {
    // initialize
    var iframe = document.getElementById('api-frame');
  
    if (!iframe) {
      console.log('no target');
    } // chose version
  
  
    var version = '1.10.3'; // choose model
  
    var urlid = '08d42a018aa84eaebf31ff95bdf419a3'; // make sure
    // https://static.sketchfab.com/api/sketchfab-viewer-1.3.2.js is loaded
  
    if (!window.Sketchfab) {
      console.log('no Sketchfab library');
    }
  
    var client = new window.Sketchfab(version, iframe); //  all error catching function
  
    var error = function error() {
      console.error('Sketchfab API error');
    }; // when the embed did load
    // and API connected
  
  
    var success = function success(api) {
      api.start(function () {
        console.log('model start displaying');
      });
  
      function pickEveryOtherFrame() {
        var pos2DStart = [startValues.x, startValues.y];
        PickScreen(api, pos2DStart);
        window.requestAnimationFrame(pickEveryOtherFrame);
      }
  
      api.addEventListener('viewerready', function () {
        pickEveryOtherFrame();
      });
    };
  
    client.init(urlid, {
      success: success,
      error: error,
      autostart: 1,
      preload: 1
    });
  } // Launch the sample
  
  
  actionSkfb(); //////////////////////////////////
  // BASIC API INITIALISATION END
  //////////////////////////////////
  //////////////////////////////////
  // GUI Code
  //////////////////////////////////
  ///
  // ray 2D Screen position values
  
  startValues = {
    x: 0,
    y: 0
  };
  
  function initGui() {
    var gui = new window.dat.GUI({
      autoPlace: true
    });
    var start = gui.addFolder('rayStart');
    var iframe = document.getElementById('api-frame');
    start.add(startValues, 'x', 0.0, parseInt(window.getComputedStyle(iframe).width));
    start.add(startValues, 'y', 0.0, parseInt(window.getComputedStyle(iframe).height));
    start.open();
  }

  if (false)
    initGui(); //////////////////////////////////
  // GUI Code end
  //////////////////////////////////