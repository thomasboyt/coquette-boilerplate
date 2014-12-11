/* @flow */

var Coquette = require('coquette');
var Person = require('./Person');
var BaseEntity = require('./BaseEntity');

class Player extends Person {
  update(dt: number) {
    if (this.c.inputter.isDown(this.c.inputter.UP_ARROW)) {
      this.center.y -= 0.4;
    }
  }

  collision(other: BaseEntity) {
    if (other instanceof Person) {
      other.center.y = this.center.y; // follow the player
    }
  }
}

module.exports = Player;
