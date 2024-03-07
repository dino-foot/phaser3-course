import Game from "./scenes/gameScene.js";

const config = {
  width: 1280,
  height: 720,
  type: Phaser.AUTO,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    parent: 'gameCanvas',
  },
  scene: [Game]
};

const game = new Phaser.Game(config);
