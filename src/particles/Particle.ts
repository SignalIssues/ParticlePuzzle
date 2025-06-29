import Phaser from 'phaser';

export abstract class Particle {
  protected sprite: Phaser.Physics.Matter.Image;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    options: any
  ) {
    this.sprite = scene.matter.add.image(x, y, texture, undefined, options);
    this.sprite.setScale(0.5);
    // Store a reference to the particle via Phaser's data manager
    this.sprite.setData('instance', this);
  }

  abstract update(delta: number): void;
}
