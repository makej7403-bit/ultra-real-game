// src/game/vehicles/car.js
import * as THREE from "three";

export class Car {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.car = null;
    this.speed = 0;
    this.maxSpeed = 0.8;
    this.acceleration = 0.03;
    this.friction = 0.01;
    this.turnSpeed = 0.03;

    this.keys = { w:false, s:false, a:false, d:false };
    this.createCarModel();
    this.addListeners();
  }

  createCarModel() {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.7, 4),
      new THREE.MeshPhongMaterial({ color: 0xff3333 })
    );
    body.position.y = 0.5;
    this.car = new THREE.Group();
    this.car.add(body);
    this.scene.add(this.car);
  }

  addListeners() {
    window.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();
      if (this.keys[k] !== undefined) this.keys[k] = true;
    });
    window.addEventListener("keyup", (e) => {
      const k = e.key.toLowerCase();
      if (this.keys[k] !== undefined) this.keys[k] = false;
    });
  }

  enter(position) {
    if (!this.car) return;
    this.car.position.copy(position);
  }

  update() {
    // accelerate & brake
    if (this.keys.w) {
      this.speed += this.acceleration;
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    }
    if (this.keys.s) {
      this.speed -= this.acceleration;
      if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;
    }

    // friction
    if (!this.keys.w && !this.keys.s) {
      if (this.speed > 0) this.speed -= this.friction;
      if (this.speed < 0) this.speed += this.friction;
      if (Math.abs(this.speed) < 0.004) this.speed = 0;
    }

    // steering
    if (this.speed !== 0) {
      if (this.keys.a) this.car.rotation.y += this.turnSpeed * (this.speed / this.maxSpeed);
      if (this.keys.d) this.car.rotation.y -= this.turnSpeed * (this.speed / this.maxSpeed);
    }

    // movement
    this.car.position.x -= Math.sin(this.car.rotation.y) * this.speed;
    this.car.position.z -= Math.cos(this.car.rotation.y) * this.speed;

    // camera follow
    const camPos = new THREE.Vector3(
      this.car.position.x + Math.sin(this.car.rotation.y) * 6,
      this.car.position.y + 3,
      this.car.position.z + Math.cos(this.car.rotation.y) * 6
    );
    this.camera.position.lerp(camPos, 0.08);
    this.camera.lookAt(this.car.position);
  }
}
