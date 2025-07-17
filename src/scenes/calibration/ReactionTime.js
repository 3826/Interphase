// JS 6
export default class ReactionTimeScene extends Phaser.Scene {
  constructor() {
    super('ReactionTimeScene');
    this.reactionStart = null;
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, height / 2 - 100, 'Setup: Click when screen turns green', {
      fontSize: '24px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.background = this.add.rectangle(0, 0, width * 2, height * 2, 0x222222).setOrigin(0);

    const delay = Phaser.Math.Between(1000, 3000);

    this.time.delayedCall(delay, () => {
      this.background.fillColor = 0x00cc66;

      this.signalShown = true;
      this.reactionStart = performance.now();

      this.input.once('pointerdown', () => {
        const reactionEnd = performance.now();
        const reactionTime = Math.floor(reactionEnd - this.reactionStart);

        // Sla baseline reactietijd op in registry
        this.registry.set('baselineRT', reactionTime);

        // Ga door naar Attention
        this.scene.start('AttentionScene');
      });
    });
  }
}
