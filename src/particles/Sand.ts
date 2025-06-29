import { Particle } from './Particle';

export class Sand extends Particle {
  constructor(world: Phaser.Physics.Matter.World, x: number, y: number) {
    super(world, x, y, 'sandTexture', {
      shape: { type: 'circle', radius: 4 },
      density: 0.001,
      restitution: 0,
      friction: 0.1
    });
  }

  update(delta: number) {
    // custom behavior (if any) per frame
  }
}
