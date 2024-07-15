import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Corral extends Phaser.GameObjects.Sprite {
  constructor(scene: Game) {
    super(scene, 0, 0, 'corral');
    this._build();
  }

  private _build(): void {
    this.setOrigin(0, 1);
    this.setDepth(2);
    this.setY(this.scene.cameras.main.height - 187);
    this.scene.add.existing(this);
  }

  protected preUpdate(time: number, delta: number): void {
    this.x -= Settings.getSpeed(delta);
    this.getBounds().right < 0 && this.destroy();
  }
}

export default Corral;