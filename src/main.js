import * as THREE from "three";
import { Player } from "./game/player.js";
import { World } from "./game/world.js";

const canvas = document.getElementById("game");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1.7, 5);

const world = new World(scene);
const player = new Player(scene, camera);

function animate() {
  requestAnimationFrame(animate);
  player.update();
  renderer.render(scene, camera);
}

animate();
