import * as THREE from "three";

export class World {
  constructor(scene) {
    this.scene = scene;

    this.addLights();
    this.addGround();
  }

  addLights() {
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5);
    this.scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);
  }

  addGround() {
    const groundGeo = new THREE.PlaneGeometry(500, 500);
    const groundMat = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeo, groundMat);

    ground.rotation.x = -Math.PI / 2;
    this.scene.add(ground);
  }
}
