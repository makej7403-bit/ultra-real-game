// src/game/physics.js
import * as THREE from "three";

export class Physics {
  constructor(height) {
    this.position = new THREE.Vector3(0, height, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.gravity = -0.009;
    this.ground = 0;
    this.height = height;
  }

  move(dx, dz) {
    this.position.x += dx;
    this.position.z += dz;

    // gravity
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;

    // ground collision
    if (this.position.y <= this.height) {
      this.position.y = this.height;
      this.velocity.y = 0;
    }
  }
}
