export default class AttentionScene extends Phaser.Scene {
  constructor() {
    super('AttentionScene');
  }

  init() {
    this.score = 0;
    this.totalTargets = 0;
    this.clicks = 0;
    this.startTime = 0;
    this.trials = 10;
    this.trialIndex = 0;
  }

  create() {
    const { width, height } = this.scale;

    this.instructions = this.add.text(width / 2, height / 2 - 100,
      'Klik alleen op de blauwe cirkels\nNegeer de rode', {
        fontSize: '20px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);

    this.time.delayedCall(2000, () => this.startTrial());
  }

  startTrial() {
    if (this.trialIndex >= this.trials) {
      this.finishTest();
      return;
    }

    const { width, height } = this.scale;
    this.trialIndex++;
    this.clicks = 0;

    // Remove previous if any
    if (this.target) this.target.destroy();
    if (this.distractor) this.distractor.destroy();

    // Target: blue circle (clickable)
    this.target = this.add.circle(
      Phaser.Math.Between(100, width - 100),
      Phaser.Math.Between(100, height - 100),
      30, 0x0000ff
    ).setInteractive();

    this.target.on('pointerdown', () => {
      if (this.clicks === 0) {
        const rt = this.time.now - this.startTime;
        this.score += rt;
        this.totalTargets++;
        this.clicks++;
        this.startTrial(); // go to next trial
      }
    });

    // Distractor: red circle (do not click)
    this.distractor = this.add.circle(
      Phaser.Math.Between(100, width - 100),
      Phaser.Math.Between(100, height - 100),
      30, 0xff0000
    ).setInteractive();

    this.distractor.on('pointerdown', () => {
      // penalty: increase average reaction time
      if (this.clicks === 0) {
        this.score += 2000;
        this.totalTargets++;
        this.clicks++;
        this.startTrial();
      }
    });

    this.startTime = this.time.now;
  }

  finishTest() {
    const avgRT = Math.round(this.score / this.totalTargets);
    this.registry.set('attentionAvgRT', avgRT);
    this.scene.start('MemoryScene');
  }
}
