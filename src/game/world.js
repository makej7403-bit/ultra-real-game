import * as THREE from "three";
import { City } from "./city.js";

export class World {
  constructor(scene) {
    this.scene = scene;

    this.addLights();
    this.addGround();
    this.city = new City(scene);
  }

  addLights() {
    const sun = new THREE.DirectionalLight(0xffffff, 1);
    sun.position.set(5, 20, 5);
    this.scene.add(sun);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);
  }

  addGround() {
    const groundGeo = new THREE.PlaneGeometry(2000, 2000);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x4d4d4d });
    const ground = new THREE.Mesh(groundGeo, groundMat);

    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
  }
}
