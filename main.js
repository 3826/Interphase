// JS 1
// import Phaser from 'phaser';
import BootScene from './src/scenes/BootScene.js';
import TitleScene from './src/scenes/TitleScene.js';
import GameScene from './src/scenes/GameScene.js';
import ResultScene from './src/scenes/ResultScene.js';
// const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [BootScene, TitleScene, GameScene, ResultScene]
};
const game = new Phaser.Game(config);
// export default game;
