import Phaser from 'phaser';
import { Sand } from '../particles/Sand';
import { Water } from '../particles/Water';
import { Stone } from '../particles/Stone';
import InteractionMap from '../utils/InteractionMap';
import OptionsPanel from '../ui/OptionsPanel';

export default class Sandbox extends Phaser.Scene {
  private options!: OptionsPanel;
  create() {
    this.options = new OptionsPanel(this);
    this.options.init();
    // spawn selected particle on pointer drag
    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (ptr.isDown) {
        const type = this.options.getParticleType();
        if (type === 'water') {
          new Water(this, ptr.x, ptr.y);
        } else if (type === 'stone') {
          new Stone(this, ptr.x, ptr.y);
        } else {
          new Sand(this, ptr.x, ptr.y);
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
}
