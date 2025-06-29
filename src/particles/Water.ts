import Phaser from 'phaser';
import { Particle } from './Particle';
import { ensureCircleTexture } from '../utils/TextureGenerator';

export class Water extends Particle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    ensureCircleTexture(scene, 'waterTexture', 0x3399ff, 3);
    super(scene, x, y, 'waterTexture', {
      shape: { type: 'circle', radius: 3 },
      density: 0.0008,
      restitution: 0,
      friction: 0.05
    });
  }

  update(delta: number) {
    // custom water behavior can be added here
  }
}
