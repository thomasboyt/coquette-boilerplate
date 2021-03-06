/*
 * @flow
 * Displays the current UI for any given game state.
 */

var Entity = require('./Entity');

class UI extends Entity {
  init(settings: any) {
    // By default, this Entity draws *over* anything else.
    this.zindex = 1;
  }

  drawAttract(ctx: any) {
    ctx.font = '64px Helvetica';
    ctx.textAlign = "center";

    ctx.fillText("boilerplate demo", 320, 210);
    ctx.fillText("press space", 320, 280);
  }

  drawPlaying(ctx: any) {
  }

  drawEnd(ctx: any) {
    ctx.font = '64px Helvetica';
    ctx.textAlign = "center";

    ctx.fillText("you escaped!", 320, 210);
    ctx.fillText("press space to replay", 320, 280);
  }

  drawLoading(ctx: any) {
    this._drawLoadingBar(ctx, 100, 250, 450, 20);
  }

  _drawLoadingBar(ctx: any, x: number, y: number, width: number, height: number) {
    var numTotal = this.game.preloader.numTotal;
    var numLoaded = this.game.preloader.numLoaded;

    var fillPercent = numLoaded / numTotal;
    var barWidth = width * fillPercent;

    ctx.strokeRect(x, y, width, height);
    ctx.fillRect(x, y, barWidth, height);
  }

  draw(ctx: any) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';

    var fsm = this.game.fsm;

    if (fsm.is('playing')) {
      this.drawPlaying(ctx);
    } else if (fsm.is('ended')) {
      this.drawEnd(ctx);
    } else if (fsm.is('attract')) {
      this.drawAttract(ctx);
    } else if (fsm.is('loading')) {
      this.drawLoading(ctx);
    }

  }
}

module.exports = UI;
