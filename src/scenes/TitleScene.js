// JS 3
export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 50, 'MindStation', {
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5);

    const playText = this.add.text(width / 2, height / 2 + 20, 'Play', {
      fontSize: '24px',
      color: '#00ffcc',
    }).setOrigin(0.5).setInteractive();

    playText.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
