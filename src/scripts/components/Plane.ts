class Plane extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene) {
    super(scene, scene.cameras.main.width, Phaser.Math.Between(400, 500), 'plane');
    this._build();
  }

  private _build(): void {
    this.anims.create({
      key: 'plane',
      frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1
    });
    this.setOrigin(0, 0);
    this.scene.add.existing(this);

    this.scene.add.tween({
      targets: this,
      duration: 10000,
      x: -this.displayWidth,
      onComplete: this.destroy.bind(this)
    });
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.anims.play('plane', true);
  }
}

export default Plane;