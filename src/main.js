import * as THREE from "three";
import { Player } from "./game/player.js";
import { World } from "./game/world.js";
import { Car } from "./game/vehicles/car.js";
import { Traffic } from "./game/ai/traffic.js";

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

camera.position.set(0, 2, 8);

const world = new World(scene);
const player = new Player(scene, camera);

const car = new Car(scene, camera);
car.enter(new THREE.Vector3(5, 1, 5));

const traffic = new Traffic(scene);

let driving = false;

window.addEventListener("keydown", (e) => {
  if (e.key === "e") driving = !driving;
});

function animate() {
  requestAnimationFrame(animate);

  if (driving) car.update();
  else player.update();

  traffic.update();
  renderer.render(scene, camera);
}

animate();
