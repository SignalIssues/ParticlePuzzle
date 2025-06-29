import Phaser from 'phaser';
import { Particle } from '../particles/Particle';
import { Sand } from '../particles/Sand';

type ParticleInstance = Particle;

export default {
  handle(
    aGO: Phaser.GameObjects.GameObject,
    bGO: Phaser.GameObjects.GameObject,
    world: Phaser.Physics.Matter.World
  ) {
    const a = aGO.getData('instance') as ParticleInstance | undefined;
    const b = bGO.getData('instance') as ParticleInstance | undefined;
    if (!a || !b) return;

    // Example rule: sand colliding with sand currently has no effect.
    if (a instanceof Sand && b instanceof Sand) {
      return;
    }

    // Additional interaction rules can be added here.
  }
};
