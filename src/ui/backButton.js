export function createBackButton(scene, targetSceneKey, options = {}) {
  const { x = scene.scale.width - 20, y = 20, text = 'Back' } = options;

  const back = scene.add.text(x, y, text, {
    fontSize: '18px',
    fontFamily: 'monospace',
    color: '#ff5555',
  })
    .setOrigin(1, 0)
    .setInteractive({ useHandCursor: true });

  back.on('pointerdown', () => {
    scene.scene.start(targetSceneKey);
  });

  return back;
}
