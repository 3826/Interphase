// JS 2
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // preload assets here later
  }

  create() {
    this.scene.start('TitleScene');
  }
}
