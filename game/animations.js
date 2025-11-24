// animations.js
// Realistic human animation controller for Ultimate City Game

export class AnimationController {
    constructor(playerModel) {
        this.player = playerModel;

        // State tracking
        this.state = "idle"; // idle, walk, run, jump
        this.speed = 0;
    }

    updateState(velocityY, isGrounded, keys) {
        if (!isGrounded) {
            this.state = "jump";
            return;
        }

        if (keys["w"] || keys["a"] || keys["s"] || keys["d"]) {
            if (keys["Shift"]) {
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
        switch(this.state) {
            case "idle":
                this.player.rotation.x = 0;
                break;

            case "walk":
                this.player.rotation.x += 0.05;
                break;

            case "run":
                this.player.rotation.x += 0.15;
                break;

            case "jump":
                this.player.rotation.x = -0.3;
                break;
        }
    }
}
