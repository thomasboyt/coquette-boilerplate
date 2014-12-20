/* @flow */

var Coquette = require('coquette');
var Game = require('../Game');
var BaseEntity = require('./BaseEntity');

type Coordinates = {
  x: number;
  y: number;
};

type PersonOptions = {
  center: Coordinates;
  color: string;
};

class Person extends BaseEntity {
  c: Coquette;
  size: Coordinates;
  center: Coordinates;
  color: string;

  init(game: Game, settings: PersonOptions) {
    this.c = game.c;

    this.size = { x:9, y:9 };
    this.center = settings.center;
    this.color = settings.color;
  }

  draw(ctx: any) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.center.x - this.size.x / 2,
                 this.center.y - this.size.y / 2,
                 this.size.x,
                 this.size.y);
  }
}

module.exports = Person;
