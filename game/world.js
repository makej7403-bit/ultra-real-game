// world.js – City Generator for Ultimate City Game

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

export class CityWorld {
    constructor(scene) {
        this.scene = scene;
        this.buildings = [];
        this.roads = [];
        this.streetLights = [];

        this.generateCity();
        this.createSky();
    }

    // -------------------------
    // SKY & LIGHT SYSTEM
    // -------------------------
    createSky() {
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0x666666, 1.3);
        this.scene.add(hemiLight);

        let sun = new THREE.DirectionalLight(0xffffff, 2);
        sun.position.set(50, 80, 20);
        this.scene.add(sun);
    }

    // -------------------------
    // CITY GENERATOR
    // -------------------------
    generateCity() {
        const blockSize = 20;
        const blocks = 12; // number of blocks in each direction

        for (let x = -blocks; x <= blocks; x++) {
            for (let z = -blocks; z <= blocks; z++) {
                const worldX = x * blockSize;
                const worldZ = z * blockSize;

                // Create buildings randomly
                if (Math.random() > 0.2) {
                    this.createBuilding(worldX, worldZ);
                }

                // Create roads
                this.createRoad(worldX, worldZ);

                // Create street lights
                if (Math.random() > 0.7) {
                    this.createStreetLight(worldX, worldZ);
                }
            }
        }
    }

    // -------------------------
    // BUILDING FACTORY
    // -------------------------
    createBuilding(x, z) {
        const height = Math.random() * 18 + 6;
        const geo = new THREE.BoxGeometry(8, height, 8);
        const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(`hsl(${Math.random() * 360}, 20%, 40%)`)
        });

        const building = new THREE.Mesh(geo, mat);
        building.position.set(x, height / 2, z);

        this.scene.add(building);
        this.buildings.push(building);
    }

    // -------------------------
    // ROAD GENERATOR
    // -------------------------
    createRoad(x, z) {
        const roadGeo = new THREE.PlaneGeometry(20, 20);
        const roadMat = new THREE.MeshStandardMaterial({ color: 0x222222 });

        const road = new THREE.Mesh(roadGeo, roadMat);
        road.rotation.x = -Math.PI / 2;
        road.position.set(x, 0.02, z);

        this.scene.add(road);
        this.roads.push(road);
    }

    // -------------------------
    // STREET LIGHTS
    // -------------------------
    createStreetLight(x, z) {
        let poleGeo = new THREE.CylinderGeometry(0.2, 0.2, 6, 12);
        let poleMat = new THREE.MeshStandardMaterial({ color: 0x444444 });

        let pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(x + 5, 3, z + 5);

        let lamp = new THREE.PointLight(0xffeecc, 2, 18);
        lamp.position.set(x + 5, 6, z + 5);

        this.scene.add(pole);
        this.scene.add(lamp);

        this.streetLights.push(pole);
    }
}
