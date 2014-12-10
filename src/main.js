/* @flow */

var Game = require('./Game');
var AssetPreloader = require('./util/AssetPreloader');

function init() {
  var preloader = new AssetPreloader({
    images: null,
    audio: null
  });

  preloader.load().done(function(assets) {
    new Game(assets);
  });
}

window.onload = init;
