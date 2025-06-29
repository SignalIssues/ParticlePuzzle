import Phaser from 'phaser';
import { Particle } from './Particle';
import { ensureCircleTexture } from '../utils/TextureGenerator';

export class Stone extends Particle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    ensureCircleTexture(scene, 'stoneTexture', 0xcccccc, 3);
    super(scene, x, y, 'stoneTexture', {
      shape: { type: 'circle', radius: 3 },
      density: 0.003,
      restitution: 0,
      friction: 0.3
    });
  }

  update(delta: number) {
    // custom stone behavior can be added here
  }
}
