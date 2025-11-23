import * as THREE from "three";

export class NPC {
  constructor(scene, startPos) {
    this.scene = scene;

    this.speed = 0.03;
    this.turnSpeed = 0.02;
    this.targetDirection = Math.random() * Math.PI * 2;

    this.npc = this.createHuman();
    this.npc.position.copy(startPos);

    this.walkTime = 0;
  }

  createHuman() {
    const group = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(0.6, 1, 0.3);
    const bodyMat = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    group.add(body);

    // Head
    const headGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const headMat = new THREE.MeshPhongMaterial({ color: 0xffe0bd });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.9;
    group.add(head);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.25, 0.8, 0.25);
    const legMat = new THREE.MeshPhongMaterial({ color: 0x000000 });

    this.leftLeg = new THREE.Mesh(legGeo, legMat);
    this.rightLeg = new THREE.Mesh(legGeo, legMat);

    this.leftLeg.position.set(-0.2, 0.4, 0);
    this.rightLeg.position.set(0.2, 0.4, 0);

    group.add(this.leftLeg);
    group.add(this.rightLeg);

    return group;
  }

  walkAnimation() {
    this.walkTime += 0.15;
    this.leftLeg.rotation.x = Math.sin(this.walkTime) * 0.5;
    this.rightLeg.rotation.x = Math.sin(this.walkTime + Math.PI) * 0.5;
  }

  update(playerPos, carPos) {
    // Avoid player
    const distToPlayer = this.npc.position.distanceTo(playerPos);
    const distToCar = this.npc.position.distanceTo(carPos);

    if (distToPlayer < 3 || distToCar < 4) {
      // Run away
      const away = new THREE.Vector3().subVectors(this.npc.position, carPos);
      away.normalize();
      this.npc.position.add(away.multiplyScalar(this.speed * 2));
      return;
    }

    // Normal walking
    this.npc.rotation.y = this.targetDirection;

    const forward = new THREE.Vector3(
      Math.sin(this.targetDirection),
      0,
      Math.cos(this.targetDirection)
    );

    this.npc.position.add(forward.multiplyScalar(this.speed));

    // Animation
    this.walkAnimation();

    // Random direction change
    if (Math.random() < 0.01) {
      this.targetDirection = Math.random() * Math.PI * 2;
    }
  }
}
