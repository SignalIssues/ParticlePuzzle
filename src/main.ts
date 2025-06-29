import Phaser from 'phaser';
import Sandbox from './scenes/Sandbox';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  physics: {
    default: 'matter',
    matter: {
      gravity: { x: 0, y: 1 }
    }
  },
  scene: [Sandbox]
};

new Phaser.Game(config);
