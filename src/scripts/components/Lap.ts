import Settings from '../data/Settings';
import Game from '../scenes/Game';

class Lap extends Phaser.GameObjects.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width, scene.cameras.main.height - 157, 'finish');
    this._build();
  }

  public scene: Game;

  private _build(): void {
    this.setDepth(3);
    this.setOrigin(0, 1);
    this.scene.add.existing(this);
    this.scene.laps.add(this);
  }

  protected preUpdate(time: number, delta: number): void {
    this.x -= Settings.getSpeed(delta);
  }
}

export default Lap;