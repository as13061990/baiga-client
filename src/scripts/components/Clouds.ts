import Session from '../data/Session';
import Game from '../scenes/Game';

class Clouds extends Phaser.GameObjects.TileSprite {
  constructor(scene: Game) {
    super(scene, 0, 420, scene.cameras.main.width, 566, 'clouds');
    this._build();
  }

  private _build(): void {
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
  }

  public preUpdate(time: number, delta: number): void {
    if (!Session.isShowedTutorial()) return;
    this.tilePositionX += delta / 20;
  }
}

export default Clouds;