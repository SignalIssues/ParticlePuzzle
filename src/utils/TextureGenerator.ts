import Phaser from 'phaser';

export function ensureCircleTexture(
  scene: Phaser.Scene,
  key: string,
  color: number,
  radius: number
) {
  if (scene.textures.exists(key)) return;
  const size = radius * 2;
  const graphics = scene.add.graphics({ x: 0, y: 0 });
  graphics.fillStyle(color, 1);
  graphics.fillCircle(radius, radius, radius);
  graphics.generateTexture(key, size, size);
  graphics.destroy();
}
