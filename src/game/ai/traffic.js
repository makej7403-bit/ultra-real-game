// src/game/ai/traffic.js
import * as THREE from "three";

export class Traffic {
  constructor(scene) {
    this.scene = scene;
    this.cars = [];
    this.spawnTraffic();
  }

  spawnTraffic() {
    for (let i = 0; i < 18; i++) {
      const c = this.createAICar();
      c.position.set((Math.random()-0.5)*500, 0.5, (Math.random()-0.5)*500);
      this.scene.add(c);
      this.cars.push({ mesh: c, speed: 0.02 + Math.random()*0.03, dir: Math.random()*Math.PI*2 });
    }
  }

  createAICar() {
    return new THREE.Mesh(new THREE.BoxGeometry(2,0.6,4), new THREE.MeshPhongMaterial({color:0x00aa00}));
  }

  update() {
    this.cars.forEach(car => {
      car.mesh.position.x += Math.sin(car.dir) * car.speed;
      car.mesh.position.z += Math.cos(car.dir) * car.speed;
      if (Math.random() < 0.003) car.dir = Math.random()*Math.PI*2;
    });
  }
}
