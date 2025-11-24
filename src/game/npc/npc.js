// src/game/npc/npc.js
import * as THREE from "three";

export class NPC {
  constructor(scene, startPos) {
    this.scene = scene;
    this.speed = 0.03;
    this.targetDirection = Math.random() * Math.PI * 2;

    this.npc = this.createHuman();
    this.npc.position.copy(startPos);
    this.walkTime = 0;
  }

  createHuman() {
    const group = new THREE.Group();
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6,1,0.3), new THREE.MeshPhongMaterial({color:0xffffff}));
    body.position.y = 1.2;
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.35,0.35,0.35), new THREE.MeshPhongMaterial({color:0xffd6b3}));
    head.position.y = 1.8;
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.2,0.7,0.2), new THREE.MeshPhongMaterial({color:0x222222}));
    const rightLeg = leftLeg.clone();
    leftLeg.position.set(-0.15,0.35,0);
    rightLeg.position.set(0.15,0.35,0);
    group.add(body, head, leftLeg, rightLeg);
    this.leftLeg = leftLeg;
    this.rightLeg = rightLeg;
    return group;
  }

  walkAnimation() {
    this.walkTime += 0.12;
    this.leftLeg.rotation.x = Math.sin(this.walkTime) * 0.6;
    this.rightLeg.rotation.x = Math.sin(this.walkTime + Math.PI) * 0.6;
  }

  update(playerPos, carPos) {
    const distToPlayer = this.npc.position.distanceTo(playerPos);
    const distToCar = this.npc.position.distanceTo(carPos);

    if (distToPlayer < 3 || distToCar < 4) {
      // run away
      const away = new THREE.Vector3().subVectors(this.npc.position, (distToCar < distToPlayer) ? carPos : playerPos).normalize();
      this.npc.position.add(away.multiplyScalar(this.speed * 2));
      this.walkAnimation();
      return;
    }

    // walk forward
    const forward = new THREE.Vector3(Math.sin(this.targetDirection), 0, Math.cos(this.targetDirection));
    this.npc.position.add(forward.multiplyScalar(this.speed));
    this.npc.rotation.y = this.targetDirection;

    this.walkAnimation();

    if (Math.random() < 0.007) this.targetDirection = Math.random() * Math.PI * 2;
  }
}
