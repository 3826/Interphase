export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load assets here if needed
  }

  create() {
    this.scene.start('TitleScene');
  }
}
