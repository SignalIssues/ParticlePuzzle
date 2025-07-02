import Phaser from 'phaser';
import { Sand } from '../particles/Sand';
import { Water } from '../particles/Water';
import { Stone } from '../particles/Stone';
import { Fire } from '../particles/Fire';
import { Plant } from '../particles/Plant';
import InteractionMap from '../utils/InteractionMap';
import OptionsPanel from '../ui/OptionsPanel';
import ParticlePool from '../utils/ParticlePool';
import { Particle } from '../particles/Particle';

export default class Sandbox extends Phaser.Scene {
  private options!: OptionsPanel;
  private sandPool!: ParticlePool<Sand>;
  private waterPool!: ParticlePool<Water>;
  private stonePool!: ParticlePool<Stone>;
  private firePool!: ParticlePool<Fire>;
  private plantPool!: ParticlePool<Plant>;
  private activeParticles: Particle[] = [];
  private paused = false;
  private stepOnce = false;
  create() {
    this.options = new OptionsPanel(this);
    this.options.init();
    this.sandPool = new ParticlePool<Sand>((x, y) => new Sand(this, x, y));
    this.waterPool = new ParticlePool<Water>((x, y) => new Water(this, x, y));
    this.stonePool = new ParticlePool<Stone>((x, y) => new Stone(this, x, y));
    this.firePool = new ParticlePool<Fire>((x, y) => new Fire(this, x, y));
    this.plantPool = new ParticlePool<Plant>((x, y) => new Plant(this, x, y));

    this.events.on('save', this.saveState, this);
    this.events.on('load', this.loadState, this);
    this.events.on('reset', this.resetWorld, this);
    this.events.on('pause', () => (this.paused = !this.paused));
    this.events.on('step', () => (this.stepOnce = true));
    const spawnAtPointer = (ptr: Phaser.Input.Pointer) => {
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
        } else if (type === 'fire') {
          p = this.firePool.spawn(x, y);
        } else if (type === 'plant') {
          p = this.plantPool.spawn(x, y);
        } else {
          p = this.sandPool.spawn(x, y);
        }
        this.activeParticles.push(p);
      }
    };

    // spawn selected particle on pointer drag or click
    this.input.on('pointerdown', spawnAtPointer);
    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (ptr.isDown) {
        spawnAtPointer(ptr);
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
    if (this.paused && !this.stepOnce) {
      return;
    }
    const wind = this.options.getWindX();
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const p = this.activeParticles[i];
      p.applyForce(wind, 0);
      p.step(delta);
      if (p.isDead()) {
        if (p instanceof Sand) {
          this.sandPool.recycle(p);
        } else if (p instanceof Water) {
          this.waterPool.recycle(p);
        } else if (p instanceof Stone) {
          this.stonePool.recycle(p);
        } else if (p instanceof Fire) {
          this.firePool.recycle(p);
        } else if (p instanceof Plant) {
          this.plantPool.recycle(p);
        }
        this.activeParticles.splice(i, 1);
      }
    }
    this.stepOnce = false;
  }

  private resetWorld() {
    for (const p of this.activeParticles) {
      if (p instanceof Sand) this.sandPool.recycle(p);
      else if (p instanceof Water) this.waterPool.recycle(p);
      else if (p instanceof Stone) this.stonePool.recycle(p);
      else if (p instanceof Fire) this.firePool.recycle(p);
      else if (p instanceof Plant) this.plantPool.recycle(p);
    }
    this.activeParticles = [];
  }

  private saveState() {
    const data = this.activeParticles.map(p => {
      const pos = p.getPosition();
      const vel = p.getVelocity();
      let type = 'sand';
      if (p instanceof Water) type = 'water';
      else if (p instanceof Stone) type = 'stone';
      else if (p instanceof Fire) type = 'fire';
      else if (p instanceof Plant) type = 'plant';
      return { type, x: pos.x, y: pos.y, vx: vel.x, vy: vel.y };
    });
    localStorage.setItem('sandboxSave', JSON.stringify(data));
  }

  private loadState() {
    const raw = localStorage.getItem('sandboxSave');
    if (!raw) return;
    this.resetWorld();
    const arr = JSON.parse(raw) as any[];
    for (const obj of arr) {
      let p: Particle;
      const { type, x, y, vx, vy } = obj;
      if (type === 'water') p = this.waterPool.spawn(x, y);
      else if (type === 'stone') p = this.stonePool.spawn(x, y);
      else if (type === 'fire') p = this.firePool.spawn(x, y);
      else if (type === 'plant') p = this.plantPool.spawn(x, y);
      else p = this.sandPool.spawn(x, y);
      p.setState(x, y, vx, vy);
      this.activeParticles.push(p);
    }
  }
}
