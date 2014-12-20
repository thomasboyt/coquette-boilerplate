/* @flow */

var Coquette = require('coquette');
var Person = require('./Person');
var Entity = require('./Entity');

class Player extends Person {
  update(dt: number) {
    if (this.c.inputter.isDown(this.c.inputter.UP_ARROW)) {
      this.center.y -= 0.4;
    }
  }

  collision(other: Entity) {
    if (other instanceof Person) {
      other.center.y = this.center.y; // follow the player
    }
  }
}

module.exports = Player;
