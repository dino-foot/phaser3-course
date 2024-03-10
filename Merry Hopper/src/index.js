import Game from "./scenes/gameScene.js";
import Preload from "./scenes/preloadScene.js";

const config = {
  width: 720,
  height: 1280,
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'gameCanvas',
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: [Preload, Game]
};

const game = new Phaser.Game(config);
