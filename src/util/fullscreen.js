var screenfull = require('screenfull');

function setupFullscreen() {

  document.addEventListener(screenfull.raw.fullscreenchange, function() {
    var canvas = document.querySelector('#game-canvas');

    if (screenfull.isFullscreen) {

      var scale = {
        x: window.innerWidth / canvas.width,
        y: window.innerHeight / canvas.height
      };

      if (scale.x < scale.y) {
        scale = scale.x + ', ' + scale.x;
      } else {
        scale = scale.y + ', ' + scale.y;
      }

      canvas.setAttribute('style',
                          '-ms-transform-origin: center;' +
                          '-webkit-transform-origin: center;' +
                          '-moz-transform-origin: center;' +
                          '-o-transform-origin: center;' +
                          'transform-origin: center;' +

                          '-ms-transform: scale(' + scale + ');' +
                          '-webkit-transform: scale3d(' + scale + ', 1);' +
                          '-moz-transform: scale(' + scale + ');' +
                          '-o-transform: scale(' + scale + ');' +
                          'transform: scale(' + scale + ');');


    } else {
      canvas.setAttribute('style', '');
    }
  });

  window.addEventListener('keydown', function(e) {
    if (e.keyCode === 70) {  // F
      screenfull.toggle();
    }
  });
}

module.exports = setupFullscreen;
