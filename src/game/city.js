import * as THREE from "three";

export class City {
  constructor(scene) {
    this.scene = scene;
    this.createSky();
    this.createRoads();
    this.createBuildings();
  }

  createSky() {
    const sky = new THREE.Color(0x87ceeb);
    this.scene.background = sky;
  }

  createRoads() {
    const roadMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });

    for (let i = -5; i <= 5; i++) {
      const road = new THREE.Mesh(
        new THREE.BoxGeometry(400, 0.1, 10),
        roadMaterial
      );
      road.position.set(0, 0.05, i * 40);
      this.scene.add(road);
    }

    for (let i = -5; i <= 5; i++) {
      const road = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.1, 400),
        roadMaterial
      );
      road.position.set(i * 40, 0.05, 0);
      this.scene.add(road);
    }
  }

  createBuildings() {
    const buildingMaterial = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });

    for (let x = -5; x <= 5; x++) {
      for (let z = -5; z <= 5; z++) {
        if (x === 0 && z === 0) continue;

        const width = 8 + Math.random() * 15;
        const height = 20 + Math.random() * 100;
        const depth = 8 + Math.random() * 20;

        const building = new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          buildingMaterial
        );
        building.position.set(x * 40, height / 2, z * 40);

        this.scene.add(building);
      }
    }
  }
}
