export default class Game extends Phaser.Scene {
    centerX;
    centerY;
    staticPlatforms; // static Group platform
    player; // player 
    lastPlatformY; // position of last spawned platform
    numPlatformsSpawned = 0; // count the number of platform spawned
    cursorKeys; // cursor keys to handle movement
    Score = 0;
    scoreText;
    constructor() {
        super('game');
    }

    init() {
        this.centerX = this.cameras.main.centerX;
        this.centerY = this.cameras.main.centerY;
        const background = this.add.image(this.centerX, this.centerY, 'background').setOrigin(0.5);
        background.setDepth(0);
        // keep background move with player
        background.setScrollFactor(0, 0);

        this.scoreText = this.add.text(100, 50, `Score : ${this.Score}`, { fontSize: 32, color: '0x000000' }).setOrigin(0.5);
        this.scoreText.setDepth(3);
        this.scoreText.setScrollFactor(0, 0);
    }

    create() {
        this.cursorKeys = this.input.keyboard.createCursorKeys();

        // init platforms 
        this.staticPlatforms = this.physics.add.staticGroup();
        this.staticPlatforms.setDepth(1);
        this.staticPlatforms.create(500, this.centerY + 200, 'island').refreshBody();

        for (let i = 0; i < 5; i++) {
            const posX = Phaser.Math.Between(300, 600);
            let posY = 250 * i;
            this.staticPlatforms.create(posX, -this.centerY + posY, 'island').refreshBody();
        }

        this.player = this.physics.add.image(500, this.centerY, 'sheep').setOrigin(0.5);
        this.player.setDepth(2);
        this.player.setBounce(0, 1.5);
        this.player.body.checkCollision.up = false;
        this.player.body.checkCollision.left = false;
        this.player.body.checkCollision.right = false;

        this.physics.add.collider(this.player, this.staticPlatforms);

        // enable camera to follow vertically only 
        this.cameras.main.setDeadzone(this.scale.width * 1.50);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setFollowOffset(100, 100);
    }

    update() {
        // handle input
        this.handleInput();

        if (this.player.body.velocity.y < 0 && this.numPlatformsSpawned < 10) {
            this.spawnNextPlatforms();
        }

        // Check if player falls off the platforms
        if (this.player.y > this.game.config.height) {
            this.gameOver();
        }
    }

    handleInput() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-400);
        }
        else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(400);
        }
        else {
            this.player.setVelocityX(0);
        }
    }

    spawnNextPlatforms() {
        // Check if player moves upward
        this.staticPlatforms.children.iterate((child) => {
            const platform = child;
            const scrollY = this.cameras.main.scrollY;
            if (platform.y >= scrollY + 1600) {
                platform.y = scrollY - Phaser.Math.Between(150, 100);
                platform.refreshBody();
                this.addPickUpItem(platform);
            }
        });
    }

    addPickUpItem(sprite) {
        const y = sprite.y - sprite.displayHeight - 30;
        const item = this.physics.add.image(sprite.x, y, "carrot").setOrigin(0.5);
        this.physics.add.collider(item, this.staticPlatforms);
        this.physics.add.overlap(this.player, item, this.collectItem, null, this);
        return item;
    }

    collectItem(player, item) {
        item.destroy();
        this.Score += 10;
        this.scoreText.setText(`Score : ${this.Score}`);
    }

    gameOver() {
        const text = this.add.text(this.centerX, this.centerY, 'Game Over !', { fontSize: 40, color: '#000000' }).setOrigin(0.5);
        text.setDepth(4);
        text.setScrollFactor(0, 0);
    }
}