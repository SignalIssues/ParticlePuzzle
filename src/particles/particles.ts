import Phaser from 'phaser';

export abstract class Particle {
  protected sprite: Phaser.Physics.Matter.Image;

  constructor(
    world: Phaser.Physics.Matter.World,
    x: number,
    y: number,
    texture: string,
    options: any
  ) {
    this.sprite = world.add.image(x, y, texture, undefined, options);
    this.sprite.setScale(0.5);
    (this.sprite as any).instance = this; // for lookup in collisions
  }

  abstract update(delta: number): void;
}
