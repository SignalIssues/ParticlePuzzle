import Phaser from 'phaser';
import { Sand } from '../particles/Sand';
import { Water } from '../particles/Water';
import { Stone } from '../particles/Stone';
import InteractionMap from '../utils/InteractionMap';
import OptionsPanel from '../ui/OptionsPanel';
import ParticlePool from '../utils/ParticlePool';
import { Particle } from '../particles/Particle';

export default class Sandbox extends Phaser.Scene {
  private options!: OptionsPanel;
  private sandPool!: ParticlePool<Sand>;
  private waterPool!: ParticlePool<Water>;
  private stonePool!: ParticlePool<Stone>;
  private activeParticles: Particle[] = [];
  create() {
    this.options = new OptionsPanel(this);
    this.options.init();
    this.sandPool = new ParticlePool<Sand>((x, y) => new Sand(this, x, y));
    this.waterPool = new ParticlePool<Water>((x, y) => new Water(this, x, y));
    this.stonePool = new ParticlePool<Stone>((x, y) => new Stone(this, x, y));
    // spawn selected particle on pointer drag
    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (ptr.isDown) {
        const type = this.options.getParticleType();
        const count = this.options.getBrushSize();
        for (let i = 0; i < count; i++) {
          const offsetX = Phaser.Math.Between(-count / 2, count / 2);
          const offsetY = Phaser.Math.Between(-count / 2, count / 2);
          const x = ptr.x + offsetX;
          const y = ptr.y + offsetY;
          let p: Particle;
          if (type === 'water') {
            p = this.waterPool.spawn(x, y);
          } else if (type === 'stone') {
            p = this.stonePool.spawn(x, y);
          } else {
            p = this.sandPool.spawn(x, y);
          }
          this.activeParticles.push(p);
        }
      }
    });

    // handle collisions
    this.matter.world.on('collisionstart', (events: any) => {
      for (const pair of events.pairs) {
        const a = pair.bodyA.gameObject;
        const b = pair.bodyB.gameObject;
        if (a && b) InteractionMap.handle(a, b, this.matter.world);
      }
    });
  }

  update(_time: number, delta: number) {
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const p = this.activeParticles[i];
      p.step(delta);
      if (p.isDead()) {
        if (p instanceof Sand) {
          this.sandPool.recycle(p);
        } else if (p instanceof Water) {
          this.waterPool.recycle(p);
        } else if (p instanceof Stone) {
          this.stonePool.recycle(p);
        }
        this.activeParticles.splice(i, 1);
      }
    }
  }
}
