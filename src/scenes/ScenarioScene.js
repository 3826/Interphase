import Phaser from 'phaser';

export default class ScenarioScene extends Phaser.Scene {
  constructor() {
    super('ScenarioScene');
  }

  create() {
    const { width, height } = this.scale;

    this.add.text(width / 2, 60, 'Select A Task', {
      fontSize: '32px',
      fontFamily: 'monospace',
      color: '#00ffcc'
    }).setOrigin(0.5);

    const missions = [
      { key: 'OrbitalDebrisScene', label: 'Orbital Debris' },
      { key: 'SampleAnalysisScene', label: 'Sample Analysis' },
      { key: 'SystemRepairScene', label: 'System Repair' }
    ];

    missions.forEach((mission, index) => {
      const y = 150 + index * 100;

      const card = this.add.rectangle(width / 2, y, 300, 60, 0x003344).setStrokeStyle(2, 0x00ffcc);
      card.setInteractive({ useHandCursor: true });
      card.on('pointerdown', () => {
        this.scene.start(mission.key);
      });

      this.add.text(width / 2, y, mission.label, {
        fontSize: '20px',
        fontFamily: 'monospace',
        color: '#ffffff'
      }).setOrigin(0.5);
    });
  }
}
