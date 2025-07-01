import { Particle } from '../particles/Particle';

export default class ParticlePool<T extends Particle> {
  private pool: T[] = [];
  constructor(private createFn: (x: number, y: number) => T) {}

  spawn(x: number, y: number): T {
    if (this.pool.length > 0) {
      const p = this.pool.pop() as T;
      p.reuse(x, y);
      return p;
    }
    return this.createFn(x, y);
  }

  recycle(p: T) {
    p.kill();
    this.pool.push(p);
  }
}
