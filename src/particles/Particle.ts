import Phaser from 'phaser';

export abstract class Particle {
  protected sprite: Phaser.Physics.Matter.Image;
  protected age = 0;
  protected lifespan = 10000; // ms
  protected scene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    options: any
  ) {
    this.scene = scene;
    this.sprite = scene.matter.add.image(x, y, texture, undefined, options);
    // slightly smaller visual scale for all particles
    this.sprite.setScale(0.3);
    // Store a reference to the particle via Phaser's data manager
    this.sprite.setData('instance', this);
  }

  reuse(x: number, y: number) {
    this.scene.matter.world.add(this.sprite.body);
    this.sprite.setPosition(x, y);
    this.sprite.setVelocity(0, 0);
    this.sprite.setAngularVelocity(0);
    this.sprite.setActive(true).setVisible(true);
    this.age = 0;
  }

  /**
   * Called each frame by the Scene.
   */
  step(delta: number) {
    this.age += delta;
    this.update(delta);
  }

  isDead(): boolean {
    const width = Number(this.scene.game.config.width);
    const height = Number(this.scene.game.config.height);
    if (this.age > this.lifespan) return true;
    if (
      this.sprite.x < -50 ||
      this.sprite.x > width + 50 ||
      this.sprite.y > height + 50
    ) {
      return true;
    }
    return false;
  }

  kill() {
    this.scene.matter.world.remove(this.sprite.body);
    this.sprite.setActive(false).setVisible(false);
  }

  abstract update(delta: number): void;
}
