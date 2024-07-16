import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width, scene.cameras.main.height - 360, 'game-coin');
    this._build();
  }

  public scene: Game;

  private _build(): void {
    this.setOrigin(0, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.coins.add(this);
    this.scene.add.tween({
      targets: this,
      y: '-=20',
      duration: 1000,
      repeat: -1,
      yoyo: true
    });
  }

  protected preUpdate(time: number, delta: number): void {
    this.x -= Settings.getSpeed(delta);
  }
}

export default Coin;