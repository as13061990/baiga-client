class Tap extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tap');
    this._build();
  }

  private _build(): void {
    this.setDepth(3);
    this.scene.add.existing(this);
    this.scene.add.tween({
      targets: this,
      alpha: 0,
      scale: .1,
      duration: 500,
      onComplete: this.destroy.bind(this)
    });
  }
}

export default Tap;