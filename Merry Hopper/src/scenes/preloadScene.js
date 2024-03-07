export default class Preload extends Phaser.Scene {
    constructor() {
        super('preload');
    }

    init() {
        this.load.on('complete', () => {
            this.scene.start('game');
        });
    }

    preload() {
        this.load.image('background', 'public/images/background.png');
        this.load.image('island', 'public/images/island.png');
        this.load.image('sheep', 'public/images/sheep.png');
        this.load.image('carrot', 'public/images/carrot.png');
        this.load.image('apple', 'public/images/apple.png');
    }

    // create() { }
}