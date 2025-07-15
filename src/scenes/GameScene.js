// JS 4
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2, 'Game Scene (placeholder)', {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.time.delayedCall(2000, () => {
      this.scene.start('ResultScene');
    });
  }
}
