// main.js – Ultimate City Game Core Engine (Updated)

// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { AnimationController } from "./game/animations.js";

// SETUP SCENE
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// CAMERA
let camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1.8, 4);

// RENDERER
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// PLAYER MODEL (simple box for now)
let playerGeometry = new THREE.BoxGeometry(1, 1.8, 1);
let playerMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
let player = new THREE.Mesh(playerGeometry, playerMaterial);
player.position.set(0, 1, 0);
scene.add(player);

// LIGHTING
let light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5);
scene.add(light);

// GROUND
let groundGeometry = new THREE.PlaneGeometry(200, 200);
let groundMaterial = new THREE.MeshStandardMaterial({ color: 0x444444 });
let ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// CONTROLS & INPUT
let keys = {};
document.addEventListener("keydown", (e) => (keys[e.key] = true));
document.addEventListener("keyup", (e) => (keys[e.key] = false));

// CAMERA MOUSE LOOK
let mouseDown = false;
let mouseX = 0,
    mouseY = 0;
let camRotationX = 0;
let camRotationY = 0;

document.addEventListener("mousedown", () => (mouseDown = true));
document.addEventListener("mouseup", () => (mouseDown = false));

document.addEventListener("mousemove", (e) => {
    if (!mouseDown) return;
    camRotationY -= e.movementX * 0.002;
    camRotationX -= e.movementY * 0.002;
});

// MOVEMENT VARIABLES
let velocityY = 0;
let isGrounded = false;
let speed = 0.08;
let runMultiplier = 2.0;

// ENERGY & STAMINA
let stamina = 100;
let maxStamina = 100;
let staminaRecovery = 0.4;
let staminaDrain = 0.7;

// ANIMATION CONTROLLER
const animationController = new AnimationController(player);

// GRAVITY SYSTEM
function applyGravity() {
    velocityY -= 0.02;
    player.position.y += velocityY;

    if (player.position.y <= 1) {
        player.position.y = 1;
        isGrounded = true;
        velocityY = 0;
    } else {
        isGrounded = false;
    }
}

// PLAYER MOVEMENT
function handleMovement() {
    let actualSpeed = speed;

    // Running
    if (keys["Shift"] && stamina > 1) {
        actualSpeed *= runMultiplier;
        stamina -= staminaDrain;

        if (stamina < 0) stamina = 0;
    } else {
        stamina += staminaRecovery;
        if (stamina > maxStamina) stamina = maxStamina;
    }

    let forward = new THREE.Vector3(
        Math.sin(camRotationY),
        0,
        Math.cos(camRotationY)
    );

    let right = new THREE.Vector3(
        Math.sin(camRotationY + Math.PI / 2),
        0,
        Math.cos(camRotationY + Math.PI / 2)
    );

    if (keys["w"]) player.position.add(forward.multiplyScalar(actualSpeed));
    if (keys["s"]) player.position.add(forward.multiplyScalar(-actualSpeed));
    if (keys["a"]) player.position.add(right.multiplyScalar(-actualSpeed));
    if (keys["d"]) player.position.add(right.multiplyScalar(actualSpeed));

    // Jump
    if (keys[" "] && isGrounded) {
        velocityY = 0.35;
        isGrounded = false;
        stamina -= 5;
    }
}

// CAMERA FOLLOW
function updateCamera() {
    camera.position.x = player.position.x;
    camera.position.z = player.position.z + 4;
    camera.position.y = player.position.y + 1.5;

    camera.rotation.x = camRotationX;
    camera.rotation.y = camRotationY;
}

// MAIN GAME LOOP
function animate() {
    requestAnimationFrame(animate);

    handleMovement();
    applyGravity();
    updateCamera();

    // Update animations
    animationController.updateState(velocityY, isGrounded, keys);
    animationController.applyAnimation();

    renderer.render(scene, camera);
}

animate();
