import { Particle } from './Particle';
import { ensureCircleTexture } from '../utils/TextureGenerator';
import Phaser from 'phaser';

export class Fire extends Particle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    ensureCircleTexture(scene, 'fireTexture', 0xff6600, 3);
    super(scene, x, y, 'fireTexture', {
      shape: { type: 'circle', radius: 3 },
      density: 0.0005,
      restitution: 0,
      friction: 0
    });
    this.lifespan = 5000;
  }

  update(_delta: number) {
    // Fire slowly rises a bit
    this.sprite.applyForce({ x: 0, y: -0.00001 });
  }
}
