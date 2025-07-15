// JS 5
export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene');
  }

  init(data) {
    this.reactionTime = data.reactionTime;
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 40, 'Your Reaction Time:', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2, `${this.reactionTime} ms`, {
      fontSize: '32px',
      color: '#00ffcc'
    }).setOrigin(0.5);

    const restartText = this.add.text(width / 2, height / 2 + 80, 'Try Again', {
      fontSize: '20px',
      color: '#ffcc00'
    }).setOrigin(0.5).setInteractive();

    restartText.on('pointerdown', () => {
      this.scene.start('TitleScene');
    });
  }
}
