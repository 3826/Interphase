export default class ProcessingScene extends Phaser.Scene {
  constructor() {
    super('ProcessingScene');
  }

  init() {
    this.trials = 5;
    this.correct = 0;
    this.current = 0;
    this.startTime = 0;
    this.responseTimes = [];
  }

  create() {
    const { width, height } = this.scale;

    this.instruction = this.add.text(width / 2, 80, 'Klik zo snel mogelijk als je BLAUW ziet', {
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.box = this.add.rectangle(width / 2, height / 2, 150, 150, 0x000000)
      .setInteractive();

    this.feedback = this.add.text(width / 2, height - 100, '', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.box.on('pointerdown', () => this.handleClick());

    this.time.delayedCall(1000, () => this.nextTrial());
  }

  nextTrial() {
    if (this.current >= this.trials) {
      const avgTime = this.responseTimes.length
        ? Math.round(this.responseTimes.reduce((a, b) => a + b) / this.responseTimes.length)
        : 0;

      this.registry.set('processingSpeed', avgTime); // lagere waarde = sneller

      this.scene.start('TitleScene'); // naar hoofdmenu
      return;
    }

    this.feedback.setText('');
    this.box.setFillStyle(0x000000); // zwart voor reset
    this.clicked = false;

    this.current++;

    const delay = Phaser.Math.Between(1000, 2500); // willekeurige wachttijd
    this.time.delayedCall(delay, () => {
      this.box.setFillStyle(0x0000ff); // blauw
      this.startTime = performance.now();
      this.ready = true;
    });
  }

  handleClick() {
    if (!this.ready || this.clicked) return;

    this.clicked = true;
    const reactionTime = Math.round(performance.now() - this.startTime);
    this.responseTimes.push(reactionTime);
    this.feedback.setText(`${reactionTime} ms`);
    this.ready = false;

    this.time.delayedCall(1000, () => this.nextTrial());
  }
}
