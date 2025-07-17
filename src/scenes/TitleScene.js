export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 100, 'Interphase', {
      fontSize: '86px',
      color: '#00ffcc',
      fontFamily: 'monospace',
    }).setOrigin(0.5);

    const startBtn = this.add.text(width / 2, height / 2 + 40, 'Begin Sequence', {
      fontSize: '28px',
      color: '#00ffcc',
      backgroundColor: '#003333',
      padding: { x: 20, y: 10 },
      fontFamily: 'monospace',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    startBtn.on('pointerdown', () => {
      this.scene.start('ScenarioScene');
    });
  }
}
