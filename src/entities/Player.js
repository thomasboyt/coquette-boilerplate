/* @flow */

var Coquette = require('coquette');
var Person = require('./Person');

class Player extends Person {
  update(dt: number) {
    if (this.c.inputter.isDown(this.c.inputter.UP_ARROW)) {
      this.center.y -= 0.4;
    }
  }

  collision(other: Object) {
    if (other instanceof Person) {
      // TODO: this block doesn't appear to be typechecking correctly :(
      other.center.y = this.center.y; // follow the player
    }
  }
}

module.exports = Player;
