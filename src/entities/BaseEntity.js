/*
 * @flow
 * A base Entity class defining the interface for Coquette entities to implement.
 */

var Game = require('../Game');
var Coquette = require('coquette');

class BaseEntity {
  // Interface hooks
  constructor(game: Game, settings: Object): void {}
  draw(ctx: any): void {}
  update(dt: number): void {}
  collision(other: BaseEntity): void {}
}

module.exports = BaseEntity;
