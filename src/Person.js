/* @flow */

var Coquette = require('coquette');
var Game = require('./Game');

type Coordinates = {
  x: number;
  y: number;
};

class Person {
  c: Coquette;
  size: Coordinates;
  center: Coordinates;
  color: string;

  constructor(game: Game, settings: any) {
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
