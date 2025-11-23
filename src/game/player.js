import * as THREE from "three";
import { Physics } from "./physics.js";

export class Player {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    // Player body
    this.height = 1.7;
    this.speed = 0.08;
    this.runSpeed = 0.16;

    // Player physics controller
    this.physics = new Physics(this.height);

    // Camera offset behind player
    this.cameraOffset = new THREE.Vector3(0, 1.5, 3);

    // Player direction
    this.direction = new THREE.Vector3();

    // Keyboard keys
    this.keys = {
      w: false,
      s: false,
      a: false,
      d: false,
      shift: false
    };

    this.addListeners();
  }

  addListeners() {
    window.addEventListener("keydown", (e) => {
      if (this.keys[e.key.toLowerCase()] !== undefined)
        this.keys[e.key.toLowerCase()] = true;
    });

    window.addEventListener("keyup", (e) => {
      if (this.keys[e.key.toLowerCase()] !== undefined)
        this.keys[e.key.toLowerCase()] = false;
    });
  }

  update() {
    const moveSpeed = this.keys.shift ? this.runSpeed : this.speed;

    this.direction.set(0, 0, 0);

    if (this.keys.w) this.direction.z = -1;
    if (this.keys.s) this.direction.z = 1;
    if (this.keys.a) this.direction.x = -1;
    if (this.keys.d) this.direction.x = 1;

    this.direction.normalize();

    this.physics.move(this.direction.x * moveSpeed, this.direction.z * moveSpeed);

    const pos = this.physics.position;

    // Smooth camera follow
    const cameraPosition = new THREE.Vector3(
      pos.x + this.cameraOffset.x,
      pos.y + this.cameraOffset.y,
      pos.z + this.cameraOffset.z
    );

    this.camera.position.lerp(cameraPosition, 0.1);
    this.camera.lookAt(pos.x, pos.y + 1.5, pos.z);
  }
}
