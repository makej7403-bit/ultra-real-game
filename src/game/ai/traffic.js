import * as THREE from "three";

export class Traffic {
  constructor(scene) {
    this.scene = scene;
    this.cars = [];

    this.spawnTraffic();
  }

  spawnTraffic() {
    for (let i = 0; i < 20; i++) {
      const car = this.createAICar();
      this.scene.add(car);
      this.cars.push({
        mesh: car,
        speed: 0.02 + Math.random() * 0.03,
        dir: Math.random() * Math.PI * 2
      });
    }
  }

  createAICar() {
    return new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.6, 4),
      new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    );
  }

  update() {
    this.cars.forEach((car) => {
      car.mesh.position.x += Math.sin(car.dir) * car.speed;
      car.mesh.position.z += Math.cos(car.dir) * car.speed;

      if (Math.random() < 0.005) {
        car.dir = Math.random() * Math.PI * 2;
      }
    });
  }
}
