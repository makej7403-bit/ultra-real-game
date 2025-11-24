// src/game/player.js
import * as THREE from "three";
import { Physics } from "./physics.js";

export class Player {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.height = 1.7;
    this.speed = 0.08;
    this.runSpeed = 0.16;
    this.keys = { w:false, s:false, a:false, d:false, Shift:false, " ":false };

    // physics controller
    this.physics = new Physics(this.height);

    // visual representation (simple low-poly body)
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 1.4, 0.4),
      new THREE.MeshPhongMaterial({ color: 0x2b2b2b })
    );
    body.position.set(0, this.height, 0);
    scene.add(body);
    this.visual = body;

    // camera offset behind player
    this.cameraOffset = new THREE.Vector3(0, 1.5, 3);

    // input
    this.addListeners();
  }

  addListeners() {
    window.addEventListener("keydown", (e) => {
      const k = e.key;
      if (this.keys[k] !== undefined) this.keys[k] = true;
      if (k === "Shift") this.keys["Shift"] = true;
      if (k === " ") this.keys[" "] = true;
    });
    window.addEventListener("keyup", (e) => {
      const k = e.key;
      if (this.keys[k] !== undefined) this.keys[k] = false;
      if (k === "Shift") this.keys["Shift"] = false;
      if (k === " ") this.keys[" "] = false;
    });
  }

  update() {
    const moveSpeed = this.keys["Shift"] ? this.runSpeed : this.speed;
    let dirX = 0, dirZ = 0;
    if (this.keys.w) dirZ = -1;
    if (this.keys.s) dirZ = 1;
    if (this.keys.a) dirX = -1;
    if (this.keys.d) dirX = 1;

    // apply movement to physics
    this.physics.move(dirX * moveSpeed, dirZ * moveSpeed);

    // sync visual with physics position
    const pos = this.physics.position;
    if (this.visual) this.visual.position.set(pos.x, pos.y, pos.z);

    // camera follow (smooth)
    const camPos = new THREE.Vector3(
      pos.x + this.cameraOffset.x,
      pos.y + this.cameraOffset.y,
      pos.z + this.cameraOffset.z
    );
    this.camera.position.lerp(camPos, 0.12);
    this.camera.lookAt(pos.x, pos.y + 1.2, pos.z);
  }
}
