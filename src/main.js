// src/main.js
import * as THREE from "three";
import { AnimationController } from "./game/animations.js";
import { CityWorld } from "./game/world.js";
import { Player } from "./game/player.js";
import { Car } from "./game/vehicles/car.js";
import { Traffic } from "./game/ai/traffic.js";
import { NPCManager } from "./game/npc/npcManager.js";

/* === Renderer & Canvas === */
const canvas = document.getElementById("game");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

/* === Scene & Camera === */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 2, 8);

/* === World / City === */
const city = new CityWorld(scene);

/* === Player === */
const player = new Player(scene, camera);

/* === Vehicle & Traffic === */
const car = new Car(scene, camera);
car.enter(new THREE.Vector3(5, 1, 5));

const traffic = new Traffic(scene);

/* === NPCs === */
const npcs = new NPCManager(scene);

/* === Animation Controller for player visual body === */
const animationController = new AnimationController(player.visual || player);

/* === Input & State === */
let driving = false;
window.addEventListener("keydown", (e) => {
  if (e.key === "e") driving = !driving;
});

/* responsiveness */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* === Main loop === */
function animate() {
  requestAnimationFrame(animate);

  if (driving) car.update();
  else player.update();

  traffic.update();
  npcs.update(player.physics.position || new THREE.Vector3(), car.car.position || new THREE.Vector3());

  // animation controller expects (velocityY, isGrounded, keys)
  if (player && player.physics && player.keys) {
    animationController.updateState(player.physics.velocity.y, player.physics.position.y <= player.height, player.keys);
    animationController.applyAnimation();
  }

  renderer.render(scene, camera);
}

animate();
