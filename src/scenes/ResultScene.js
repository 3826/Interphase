// JS 5
export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  create() {
    const { width, height } = this.scale;
    this.add.text(width / 2, height / 2 - 20, 'Results', {
      fontSize: '28px',
      color: '#ffffff'
    }).setOrigin(0.5);

    const restartText = this.add.text(width / 2, height / 2 + 40, 'Back to Title', {
      fontSize: '20px',
      color: '#00ffcc'
    }).setOrigin(0.5).setInteractive();

    restartText.on('pointerdown', () => {
      this.scene.start('TitleScene');
    });
  }
}
