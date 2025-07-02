import Phaser from 'phaser';

export default class OptionsPanel {
  private floorCheckbox: HTMLInputElement | null;
  private floorBody?: MatterJS.BodyType;
  private particleSelect: HTMLSelectElement | null;
  private brushSizeInput: HTMLInputElement | null;
  private gravityXInput: HTMLInputElement | null;
  private gravityYInput: HTMLInputElement | null;
  private windXInput: HTMLInputElement | null;
  private saveBtn: HTMLButtonElement | null;
  private loadBtn: HTMLButtonElement | null;
  private resetBtn: HTMLButtonElement | null;
  private pauseBtn: HTMLButtonElement | null;
  private stepBtn: HTMLButtonElement | null;

  constructor(private scene: Phaser.Scene) {
    this.floorCheckbox = document.getElementById('floorToggle') as HTMLInputElement | null;
    this.particleSelect = document.getElementById('particleType') as HTMLSelectElement | null;
    this.brushSizeInput = document.getElementById('brushSize') as HTMLInputElement | null;
    this.gravityXInput = document.getElementById('gravityX') as HTMLInputElement | null;
    this.gravityYInput = document.getElementById('gravityY') as HTMLInputElement | null;
    this.windXInput = document.getElementById('windX') as HTMLInputElement | null;
    this.saveBtn = document.getElementById('saveBtn') as HTMLButtonElement | null;
    this.loadBtn = document.getElementById('loadBtn') as HTMLButtonElement | null;
    this.resetBtn = document.getElementById('resetBtn') as HTMLButtonElement | null;
    this.pauseBtn = document.getElementById('pauseBtn') as HTMLButtonElement | null;
    this.stepBtn = document.getElementById('stepBtn') as HTMLButtonElement | null;
  }

  init() {
    if (this.floorCheckbox) {
      this.floorCheckbox.addEventListener('change', () => this.updateFloor());
    }
    if (this.gravityXInput || this.gravityYInput) {
      const update = () => this.updateGravity();
      this.gravityXInput?.addEventListener('input', update);
      this.gravityYInput?.addEventListener('input', update);
      this.updateGravity();
    }
    this.saveBtn?.addEventListener('click', () => this.scene.events.emit('save'));
    this.loadBtn?.addEventListener('click', () => this.scene.events.emit('load'));
    this.resetBtn?.addEventListener('click', () => this.scene.events.emit('reset'));
    this.pauseBtn?.addEventListener('click', () => this.scene.events.emit('pause'));
    this.stepBtn?.addEventListener('click', () => this.scene.events.emit('step'));
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

  private updateGravity() {
    if (this.gravityXInput && this.gravityYInput) {
      const gx = parseFloat(this.gravityXInput.value);
      const gy = parseFloat(this.gravityYInput.value);
      this.scene.matter.world.gravity.x = gx;
      this.scene.matter.world.gravity.y = gy;
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

  getParticleType(): string {
    return this.particleSelect ? this.particleSelect.value : 'sand';
  }

  getBrushSize(): number {
    return this.brushSizeInput ? parseInt(this.brushSizeInput.value, 10) || 1 : 1;
  }

  getWindX(): number {
    return this.windXInput ? parseFloat(this.windXInput.value) || 0 : 0;
  }
}
