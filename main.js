import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#242424',
  scene: {
    preload: function() {
      // load assets here if needed
    },
    create: function() {
      this.add.text(400, 300, 'MindStation', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
    }
  }
};

const game = new Phaser.Game(config);
