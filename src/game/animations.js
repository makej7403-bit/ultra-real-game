// src/game/animations.js
export class AnimationController {
  constructor(playerModel) {
    this.player = playerModel;
    this.state = "idle";
    this.speed = 0;
  }

  updateState(velocityY, isGrounded, keys) {
    if (!isGrounded) {
      this.state = "jump";
      return;
    }

    if (keys["w"] || keys["a"] || keys["s"] || keys["d"]) {
      if (keys["Shift"] || keys["shift"]) {
        this.state = "run";
        this.speed = 1.6;
      } else {
        this.state = "walk";
        this.speed = 1.0;
      }
    } else {
      this.state = "idle";
      this.speed = 0;
    }
  }

  applyAnimation() {
    if (!this.player) return;
    switch (this.state) {
      case "idle":
        this.player.rotation.x *= 0.9;
        break;
      case "walk":
        this.player.rotation.x += 0.04;
        break;
      case "run":
        this.player.rotation.x += 0.12;
        break;
      case "jump":
        this.player.rotation.x = -0.3;
        break;
    }
  }
}
