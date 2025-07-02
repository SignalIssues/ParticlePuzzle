import { Particle } from './Particle';
import { ensureCircleTexture } from '../utils/TextureGenerator';
import Phaser from 'phaser';

export class Plant extends Particle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    ensureCircleTexture(scene, 'plantTexture', 0x33cc33, 3);
    super(scene, x, y, 'plantTexture', {
      shape: { type: 'circle', radius: 3 },
      density: 0.001,
      restitution: 0,
      friction: 0.2
    });
  }

  update(_delta: number) {
    // Plant does nothing special for now
  }
}
