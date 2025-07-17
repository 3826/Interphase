export default class FlexibilityScene extends Phaser.Scene {
  constructor() {
    super('FlexibilityScene');
  }

  init() {
    this.trials = 6;
    this.current = 0;
    this.correct = 0;
    this.expecting = ''; // 'Z' of 'M'
    this.switchRule = true;
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, 60, 'Regel 1: cijfer → Z knop | Regel 2: letter → M knop', {
      fontSize: '18px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.stimulusText = this.add.text(width / 2, height / 2 - 40, '', {
      fontSize: '64px',
      color: '#00ffcc'
    }).setOrigin(0.5);

    this.feedback = this.add.text(width / 2, height - 100, '', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    // Buttons
    this.buttonZ = this.add.text(width / 2 - 100, height / 2 + 60, 'Z', {
      fontSize: '32px',
      backgroundColor: '#222',
      color: '#ffffff',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    this.buttonM = this.add.text(width / 2 + 100, height / 2 + 60, 'M', {
      fontSize: '32px',
      backgroundColor: '#222',
      color: '#ffffff',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    this.buttonZ.on('pointerdown', () => this.handleClick('Z'));
    this.buttonM.on('pointerdown', () => this.handleClick('M'));

    this.nextTrial();
  }

  nextTrial() {
    if (this.current >= this.trials) {
      const score = Math.round((this.correct / this.trials) * 100);
      this.registry.set('flexibilityScore', score);
      this.scene.start('ProcessingScene');
      return;
    }

    this.feedback.setText('');
    this.current++;

    this.switchRule = !this.switchRule;

    const isNumber = this.switchRule;
    this.stimulus = isNumber
      ? Phaser.Math.Between(0, 9).toString()
      : String.fromCharCode(Phaser.Math.Between(65, 90));

    this.expecting = isNumber ? 'Z' : 'M';
    this.stimulusText.setText(this.stimulus);
  }

  handleClick(choice) {
    if (choice === this.expecting) {
      this.correct++;
      this.feedback.setText('✔ Correct');
    } else {
      this.feedback.setText('✖ Fout');
    }

    this.time.delayedCall(1000, () => this.nextTrial());
  }
}
