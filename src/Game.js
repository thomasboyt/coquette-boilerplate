/* @flow */

var Coquette = require('coquette');
var Person = require('./entities/Person');
var Player = require('./entities/Player');
var addRegister = require('./util/addRegister');

type AssetMap = {
  images: {
    [key: string]: Image;
  };
  audio: {
    [key:string]: ArrayBuffer;
  };
}

class Game {
  c: Coquette;
  assets: AssetMap;
  width: number;
  height: number;

  constructor(assets: AssetMap) {
    this.assets = assets;

    this.width = 500;
    this.height = 150;

    this.c = window.__coquette__ = new Coquette(this, 'game-canvas', this.width, this.height, 'black');
    this.c.renderer.getCtx().imageSmoothingEnabled = false;
    addRegister(this.c);

    // TODO: Figure out how to typecheck entities.create's settings
    var paramour = new Person(this, {
      center: { x:250, y:40 },
      color: '#099'
    });

    var player = new Player(this, {
      center: { x:256, y:110 },
      color: '#f07'
    });
  }
}

module.exports = Game;
