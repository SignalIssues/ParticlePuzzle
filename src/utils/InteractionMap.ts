import Phaser from 'phaser';

type ParticleInstance = any;

export default {
  handle(aGO: Phaser.GameObjects.GameObject, bGO: Phaser.GameObjects.GameObject, world: Phaser.Physics.Matter.World) {
    const a: ParticleInstance = (aGO as any).instance;
    const b: ParticleInstance = (bGO as any).instance;
    // example: sand + nothing → no reaction
    // add rules here, e.g. fire + water → spawn smoke
  }
};
