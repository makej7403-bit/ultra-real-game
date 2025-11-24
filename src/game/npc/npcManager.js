// src/game/npc/npcManager.js
import * as THREE from "three";
import { NPC } from "./npc.js";

export class NPCManager {
  constructor(scene) {
    this.scene = scene;
    this.npcs = [];
    this.spawnNPCs();
  }

  spawnNPCs() {
    for (let i = 0; i < 28; i++) {
      const pos = new THREE.Vector3((Math.random()-0.5)*600, 1, (Math.random()-0.5)*600);
      const npc = new NPC(this.scene, pos);
      this.scene.add(npc.npc);
      this.npcs.push(npc);
    }
  }

  update(playerPos, carPos) {
    this.npcs.forEach(npc => npc.update(playerPos, carPos));
  }
}
