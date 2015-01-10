/* @flow */

var Coquette = require('coquette');

var StateMachine = require('javascript-state-machine');
var addRegister = require('./lib/addRegister');
var AudioManager = require('./lib/AudioManager');
var AssetPreloader = require('./lib/AssetPreloader');
var setupFullscreen = require('./lib/setupFullscreen');

var assets = require('./assets');
var config = require('./config');

var UI = require('./entities/UI');
var Person = require('./entities/Person');
var Player = require('./entities/Player');

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

  constructor() {
    this.audioManager = new AudioManager();

    this.assets = assets;
    this.config = config;

    this.width = 640;
    this.height = 480;

    this.c = window.__coquette__ = new Coquette(this, 'game-canvas', this.width, this.height, 'black');
    this.c.renderer.getCtx().imageSmoothingEnabled = false;

    setupFullscreen(this.c.inputter.F);
    addRegister(this.c);

    this.fsm = StateMachine.create({
      initial: 'loading',
      events: [
        { name: 'loaded', from: ['loading'], to: 'attract' },
        { name: 'start', from: ['attract', 'ended'], to: 'playing' },
        { name: 'end', from: 'playing', to: 'ended' }
      ]
    });

    this.preloader = new AssetPreloader(assets, this.audioManager.ctx);
    this.ui = new UI(this, {});

    this.preloader.load().done((assets) => {
      this.loaded(assets);
    });
  }


  // State changes

  loaded(assets: AssetMap) {
    this.fsm.loaded();

    this.assets = assets;
    this.audioManager.setAudioMap(assets.audio);
  }

  start() {
    this.fsm.start();

    var paramour = new Person(this, {
      center: { x:320, y:200 },
      color: '#099'
    });

    var player = new Player(this, {
      center: { x:326, y:400 },
      color: '#f07'
    });
  }

  clearWorld() {
    var entities = [Player, Person];

    entities.forEach((type) => {
      var items = this.c.entities.all(type);
      items.forEach((item) => {
        this.c.entities.destroy(item);
      });
    });
  }

  end() {
    this.clearWorld();
    this.fsm.end();
  }


  // Coquette hooks

  update(dt: number) {
    if (this.c.inputter.isPressed(this.c.inputter.M)) {
      this.audioManager.toggleMute();
    }

    if (this.fsm.is('attract') || this.fsm.is('ended')) {
      if (this.c.inputter.isPressed(this.c.inputter.SPACE)) {
        setTimeout(() => {
          this.start(this.fsm);
        }, 0);
      }
    }
  }
}

module.exports = Game;
