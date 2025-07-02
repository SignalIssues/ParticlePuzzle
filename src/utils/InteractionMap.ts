import Phaser from 'phaser';
import { Particle } from '../particles/Particle';
import { Sand } from '../particles/Sand';
import { Fire } from '../particles/Fire';
import { Water } from '../particles/Water';
import { Plant } from '../particles/Plant';

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

    // sand with sand -> no effect
    if (a instanceof Sand && b instanceof Sand) {
      return;
    }

    // fire burns plant
    if ((a instanceof Fire && b instanceof Plant) || (a instanceof Plant && b instanceof Fire)) {
      if (a instanceof Plant) a.kill();
      if (b instanceof Plant) b.kill();
      return;
    }

    // water extinguishes fire
    if ((a instanceof Fire && b instanceof Water) || (a instanceof Water && b instanceof Fire)) {
      if (a instanceof Fire) a.kill();
      if (b instanceof Fire) b.kill();
      return;
    }

    // Additional interaction rules can be added here.
  }
};
