import * as THREE from "three";

export class Car {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.createCarModel();

    this.speed = 0;
    this.maxSpeed = 0.6;
    this.acceleration = 0.02;
    this.friction = 0.01;
    this.turnSpeed = 0.03;

    this.keys = {
      w: false,
      s: false,
      a: false,
      d: false
    };

    this.addListeners();
  }

  createCarModel() {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.6, 4),
      new THREE.MeshPhongMaterial({ color: 0xff0000 })
    );

    this.car = new THREE.Group();
    this.car.add(body);

    this.scene.add(this.car);
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

  enter(position) {
    this.car.position.copy(position);
  }

  update() {
    // Accelerate
    if (this.keys.w) {
      this.speed += this.acceleration;
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    }

    // Brake
    if (this.keys.s) {
      this.speed -= this.acceleration;
      if (this.speed < -this.maxSpeed / 2) this.speed = -this.maxSpeed / 2;
    }

    // Friction
    if (!this.keys.w && !this.keys.s) {
      if (this.speed > 0) this.speed -= this.friction;
      if (this.speed < 0) this.speed += this.friction;
    }

    // Prevent tiny floating speed
    if (Math.abs(this.speed) < 0.005) this.speed = 0;

    // Turning only while moving
    if (this.speed !== 0) {
      if (this.keys.a) this.car.rotation.y += this.turnSpeed;
      if (this.keys.d) this.car.rotation.y -= this.turnSpeed;
    }

    // Movement
    this.car.position.x -= Math.sin(this.car.rotation.y) * this.speed;
    this.car.position.z -= Math.cos(this.car.rotation.y) * this.speed;

    // Camera follow
    const camPos = new THREE.Vector3(
      this.car.position.x + Math.sin(this.car.rotation.y) * 6,
      this.car.position.y + 3,
      this.car.position.z + Math.cos(this.car.rotation.y) * 6
    );

    this.camera.position.lerp(camPos, 0.08);
    this.camera.lookAt(this.car.position);
  }
}
