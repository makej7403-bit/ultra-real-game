// src/game/world.js
import * as THREE from "three";
import { City } from "./city.js";

export class CityWorld {
  constructor(scene) {
    this.scene = scene;
    this.addLights();
    this.addGround();
    this.city = new City(scene);
  }

  addLights() {
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    this.scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(50, 100, 50);
    this.scene.add(sun);
  }

  addGround() {
    const geo = new THREE.PlaneGeometry(4000, 4000);
    const mat = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }
}
