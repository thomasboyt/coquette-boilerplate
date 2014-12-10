/* @flow */

var Coquette = require('coquette');
var Person = require('./Person');
var Player = require('./Player');

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

    // TODO: Figure out how to typecheck entities.create's settings
    this.c.entities.create(Person, { center: { x:250, y:40 }, color: '#099' });
    this.c.entities.create(Player, { center: { x:256, y:110 }, color: '#f07' });
  }
}

module.exports = Game;
