export default class MemoryScene extends Phaser.Scene {
  constructor() {
    super('MemoryScene');
  }

  init() {
    this.sequence = [];
    this.userInput = '';
    this.level = 3; // startlengte sequentie
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, 50, 'Onthoud de getallenreeks', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.message = this.add.text(width / 2, height / 2 - 50, '', {
      fontSize: '32px',
      color: '#00ffcc'
    }).setOrigin(0.5);

    this.inputText = this.add.text(width / 2, height / 2 + 50, '', {
      fontSize: '28px',
      color: '#ffffff',
      backgroundColor: '#222',
      padding: { x: 10, y: 5 }
    }).setOrigin(0.5);

    this.input.keyboard.on('keydown', this.handleKey, this);

    this.showSequence();
  }

  showSequence() {
    this.sequence = [];

    for (let i = 0; i < this.level; i++) {
      this.sequence.push(Phaser.Math.Between(0, 9));
    }

    this.message.setText(this.sequence.join(' '));

    // Laat de reeks 2 seconden zien, daarna verberg
    this.time.delayedCall(2000, () => {
      this.message.setText('');
      this.inputText.setText('');
      this.userInput = '';
      this.message.setText('Typ de reeks in en druk op Enter');
    });
  }

  handleKey(event) {
    if (event.key === 'Enter') {
      this.checkInput();
      return;
    }

    if (/^\d$/.test(event.key)) {
      this.userInput += event.key;
      this.inputText.setText(this.userInput);
    }

    if (event.key === 'Backspace') {
      this.userInput = this.userInput.slice(0, -1);
      this.inputText.setText(this.userInput);
    }
  }

  checkInput() {
    if (this.userInput === this.sequence.join('')) {
      this.message.setText('Correct!');

      // Sla score op in registry, bijv. het aantal correcte digits
      this.registry.set('memoryScore', this.level);

      // Vergroot de moeilijkheid voor volgende keer (optioneel)
      this.level++;

      // Ga door naar volgende scene na korte pauze
      this.time.delayedCall(1500, () => {
        this.scene.start('FlexibilityScene');
      });
    } else {
      this.message.setText('Fout, probeer opnieuw');
      this.userInput = '';
      this.inputText.setText('');
    }
  }
}
