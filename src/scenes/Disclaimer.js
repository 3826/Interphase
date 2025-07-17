export default class Disclaimer extends Phaser.Scene {
  constructor() {
    super('Disclaimer');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 60,
      'D I S C L A I M E R', { fontSize: '28px', color: '#fff' }).setOrigin(0.5);

    this.add.text(width / 2, height / 2,
      "This game is designed to test, use and improve your cognitive skills.\nIf you going to use external tools, such as a notepad or calculator, please consider playing something else.\nYour experience will be uniquely tailored.", {
        fontSize: '20px', color: '#ccc', align: 'center'
      }).setOrigin(0.5);

    const startBtn = this.add.text(width / 2, height / 2 + 80, "I'm ready", {
      fontSize: '24px', color: '#00ffcc', backgroundColor: '#004040', padding: { x: 10, y: 5 }
    }).setOrigin(0.5).setInteractive();

    startBtn.on('pointerdown', () => {
      this.scene.start('ReactionTimeScene');
    });
  }
}
