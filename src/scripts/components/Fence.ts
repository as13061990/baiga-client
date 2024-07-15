import Session from '../data/Session';
import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Fence extends Phaser.GameObjects.TileSprite {
  constructor(scene: Game) {
    super(scene, 0, scene.cameras.main.height - 277, scene.cameras.main.width, 199, 'fence');
    this._build();
  }

  private _build(): void {
    this.setOrigin(0, 1);
    this.scene.add.existing(this);
  }

  public preUpdate(time: number, delta: number): void {
    if (!Session.isStarted()) return;
    this.tilePositionX += Settings.getSpeed(delta);
  }
}

export default Fence;