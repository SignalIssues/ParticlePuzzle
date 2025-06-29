import Phaser from 'phaser';
import { Sand } from '../particles/Sand';
import InteractionMap from '../utils/InteractionMap';

export default class Sandbox extends Phaser.Scene {
  create() {
    // spawn sand on pointer drag
    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (ptr.isDown) {
        new Sand(this.matter.world, ptr.x, ptr.y);
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
}
