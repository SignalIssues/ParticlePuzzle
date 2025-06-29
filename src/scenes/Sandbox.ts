import Phaser from 'phaser';
import { Sand } from '../particles/Sand';
import InteractionMap from '../utils/InteractionMap';
import OptionsPanel from '../ui/OptionsPanel';

export default class Sandbox extends Phaser.Scene {
  private options!: OptionsPanel;
  create() {
    this.options = new OptionsPanel(this);
    this.options.init();
    // spawn sand on pointer drag
    this.input.on('pointermove', (ptr: Phaser.Input.Pointer) => {
      if (ptr.isDown) {
        new Sand(this, ptr.x, ptr.y);
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
