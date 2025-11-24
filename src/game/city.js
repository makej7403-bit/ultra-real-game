// src/game/city.js
import * as THREE from "three";

export class City {
  constructor(scene) {
    this.scene = scene;
    this.createSky();
    this.createGrid();
  }

  createSky() {
    this.scene.background = new THREE.Color(0x87ceeb);
  }

  createGrid() {
    const roadMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
    const bldMat = new THREE.MeshPhongMaterial({ color: 0x9aa3a8 });

    // Create a small grid (12x12 blocks)
    const size = 40;
    const half = 6;
    for (let x = -half; x <= half; x++) {
      for (let z = -half; z <= half; z++) {
        // roads
        const road = new THREE.Mesh(new THREE.BoxGeometry(size, 0.1, size), roadMat);
        road.position.set(x * size, 0.05, z * size);
        this.scene.add(road);

        // buildings (randomly)
        if (Math.random() > 0.25) {
          const w = 8 + Math.random() * 16;
          const d = 8 + Math.random() * 16;
          const h = 12 + Math.random() * 90;
          const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bldMat);
          b.position.set(x * size + (Math.random()-0.5) * 10, h / 2, z * size + (Math.random()-0.5) * 10);
          this.scene.add(b);
        }

        // occasional lamp
        if (Math.random() > 0.85) {
          const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,6,8), new THREE.MeshStandardMaterial({color:0x444444}));
          pole.position.set(x*size + 12, 3, z*size + 12);
          const lamp = new THREE.PointLight(0xfff0cc, 1.6, 30);
          lamp.position.set(x*size + 12, 6, z*size + 12);
          this.scene.add(pole);
          this.scene.add(lamp);
        }
      }
    }
  }
}
