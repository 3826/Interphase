import Phaser from 'phaser';
import BootScene from './src/scenes/BootScene.js';
import TitleScene from './src/scenes/TitleScene.js';
import ScenarioScene from './src/scenes/ScenarioScene.js';
import IntroScene from './src/scenes/IntroScene.js';
import OrbitalDebrisScene from './src/scenes/OrbitalDebrisScene.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-container', // optional: attach to a specific div
    dom: {
        createContainer: true
    },
    scene: [
        BootScene,
        IntroScene,
        TitleScene,
        ScenarioScene,
        OrbitalDebrisScene,
    ]
};


const game = new Phaser.Game(config);
