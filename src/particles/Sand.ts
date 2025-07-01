import { Particle } from './Particle';
import { ensureCircleTexture } from '../utils/TextureGenerator';

export class Sand extends Particle {

  constructor(scene: Phaser.Scene, x: number, y: number) {
    ensureCircleTexture(scene, 'sandTexture', 0xc2b280, 3);
    super(scene, x, y, 'sandTexture', {
      shape: { type: 'circle', radius: 3 },
      density: 0.001,
      restitution: 0,
      friction: 0.2
    });
  }

  update(delta: number) {
    const height = Number(this.scene.game.config.height);
    if (this.sprite.y > height * 0.6) {
      this.sprite.setFixedRotation();
    }
  }
}
