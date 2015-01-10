// This file is purposely not type-checked!
// Flow does not like Webpack's non-module requires

require('../assets/game.css');

var Game = require('./Game');

window.onload = () => {
  new Game();
};
