// JS 2
import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene');
  }

  create() {
    const { width, height } = this.scale;

    this.greetingPrefix = this.add.text(width / 2 - 80, height / 2, `Hello, worker 105z.\nName:`, {
      fontSize: '28px',
      color: '#ccc',
      fontFamily: 'monospace'
    }).setOrigin(1, 0.5);

    this.nameInput = this.add.dom(width / 2 + 10, height / 2).createFromHTML(`
      <input 
        type="text" 
        placeholder="name" 
        style="
          font-size: 28px; 
          color: #ccc; 
          background: transparent; 
          border: none; 
          outline: none; 
          font-family: monospace;
          width: 180px;"
        autofocus
      />
    `);
    this.nameInput.node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const inputValue = this.nameInput.node.querySelector('input').value;
        if (inputValue && inputValue.trim().length > 0) {
          this.handleName(inputValue.trim());
        }
        else {
          this.handleName("X");
        }
      }
    });
    this.startBtn = this.add.text(width / 2, height / 2 + 90, 'Enter', {
      fontSize: '28px',
      color: '#00ffcc',
      backgroundColor: '#003333',
      padding: { x: 20, y: 10 },
      fontFamily: 'monospace',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.startBtn.setVisible(false); // Hide initially
    this.startBtn.on('pointerdown', () => {
      this.scene.start('OrbitalDebrisScene');
    });
  }

  handleName(name) {
    // Remove input and previous text
    this.nameInput.destroy();
    if (this.greetingPrefix) this.greetingPrefix.destroy();
    const { width, height } = this.scale;

    // Wait 0.5s, then show full greeting in same position
    this.time.delayedCall(500, () => {
      this.fullGreeting = this.add.text(width / 2 - 80, height / 2, `
        ${name}, welcome to [some intro narrative]\n
        I will launch you into space, your tasks are awaiting.
        `, {
        fontSize: '28px',
        color: '#ccc',
        fontFamily: 'monospace'
      }).setOrigin(0, 0.5);

      // Reserve space for dialog text (blank for now)
      this.dialogText = this.add.text(width / 2, height / 2 + 50, ``, {
        fontSize: '24px',
        color: '#ccc',
        fontFamily: 'monospace',
        wordWrap: { width: width - 100 }
      }).setOrigin(0.5);

      this.time.delayedCall(1500, () => {
        console.log('cakked');
        this.startBtn.setVisible(true);
      });
    });
  }
}
