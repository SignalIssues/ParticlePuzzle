import Phaser from 'phaser';

export default class OptionsPanel {
  private floorCheckbox: HTMLInputElement | null;
  private floorBody?: MatterJS.BodyType;

  constructor(private scene: Phaser.Scene) {
    this.floorCheckbox = document.getElementById('floorToggle') as HTMLInputElement | null;
  }

  init() {
    if (this.floorCheckbox) {
      this.floorCheckbox.addEventListener('change', () => this.updateFloor());
    }
    this.updateFloor();
  }

  private updateFloor() {
    if (!this.floorCheckbox) return;
    if (this.floorCheckbox.checked) {
      if (!this.floorBody) this.createFloor();
    } else {
      this.removeFloor();
    }
  }

  private createFloor() {
    const width = Number(this.scene.game.config.width);
    const height = Number(this.scene.game.config.height);
    this.floorBody = this.scene.matter.add.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      { isStatic: true }
    );
  }

  private removeFloor() {
    if (this.floorBody) {
      this.scene.matter.world.remove(this.floorBody);
      this.floorBody = undefined;
    }
  }
}
