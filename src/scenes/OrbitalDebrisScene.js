import Phaser from 'phaser';
import { createBackButton } from '../ui/backButton.js';

export default class OrbitalDebrisScene extends Phaser.Scene {
  constructor() {
    super('OrbitalDebrisScene');
  }

  create() {
    createBackButton(this, 'ScenarioScene');
    this.collected = 0;
    const { width } = this.scale;

    this.scoreText = this.add.text(20, 20, 'Collected: 0', {
      fontSize: '18px',
      fontFamily: 'monospace',
      color: '#00ffcc'
    });

    this.allowedLetters = ['A', 'B', 'C'];
    this.floatingOrbs = [];

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const letters = ['A', 'B', 'C', 'D', 'E'];
        const letter = Phaser.Utils.Array.GetRandom(letters);
        const orb = this.createOrb(letter);
        const x = Phaser.Math.Between(50, width - 50);
        orb.setPosition(x, -30);
        orb.setData('speed', Phaser.Math.FloatBetween(0.1, 2));
        orb.setInteractive({ useHandCursor: true });
        orb.on('pointerdown', () => this.handleClick(orb));
        this.floatingOrbs.push(orb);
      },
      loop: true
    });
  }

  createOrb(letter) {
        const container = this.add.container(0, 0);
        const circle = this.add.circle(0, 0, 25, 0x333366);
        const text = this.add.text(0, 0, letter, {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        container.add([circle, text]);
        container.setData('letter', letter);

        // ✅ Explicit hit area using a circular shape
        container.setInteractive(new Phaser.Geom.Circle(0, 0, 25), Phaser.Geom.Circle.Contains);

        return container;
    }


  update() {
    const { height } = this.scale;

    for (const orb of this.floatingOrbs) {
      orb.y += orb.getData('speed');
      if (orb.y > height + 30) {
        orb.destroy();
      }
    }

    this.floatingOrbs = this.floatingOrbs.filter(orb => orb.active);
  }

  handleClick(orb) {
    const letter = orb.getData('letter');
    if (this.allowedLetters.includes(letter)) {
      this.collected++;
      this.scoreText.setText(`Collected: ${this.collected}`);
    }
    orb.destroy();
  }
}
