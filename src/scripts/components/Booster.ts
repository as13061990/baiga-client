import Game from '../scenes/Game';
import Session from '../data/Session';
import Settings from '../data/Settings';
import { typeObject } from '../types/enums';

class Booster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, type: typeObject) {
    super(scene, scene.cameras.main.width, 0, '');
    this._type = type;
    this._build();
  }

  public scene: Game;
  private _type: typeObject;
  private _activeBooster: boolean = true;

  private _build(): void {
    this.setOrigin(0, 1);
    this.setY(this._getY());
    this.setTexture(this._getTexture());
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.boosters.add(this);
    Session.resetObjectsPull(this._type);

    if (this._type === 'acceleration' || this._type === 'shield') {
      this.scene.add.tween({
        targets: this,
        y: '-=70',
        yoyo: true,
        repeat: -1
      });
    } else {
      this.setInteractive({ cursor: 'pointer' });
      this.on(Phaser.Input.Events.POINTER_DOWN, this.destroy.bind(this));
    }
  }

  private _getTexture(): string {
    if (this._type === 'acceleration') return 'acceleration';
    if (this._type === 'shield') return 'shield';
    if (this._type === 'dirt') return 'dirt';
    if (this._type === 'obstacle') {
      if (Phaser.Math.Between(1, 2) === 1) {
        return 'stone';
      } else {
        return 'branch';
      }
    }
  }

  private _getY(): number {
    const { height } = this.scene.cameras.main;
    if (this._type === 'acceleration') return height - 340;
    if (this._type === 'shield') return height - 340;
    if (this._type === 'dirt') return height - 180;
    if (this._type === 'obstacle') return height - 180;
  }

  public getType(): typeObject {
    return this._type;
  }

  public setDisable(): void {
    this._activeBooster = false;
  }

  public isActive(): boolean {
    return this._activeBooster;
  }

  protected preUpdate(time: number, delta: number): void {
    this.x -= Settings.getSpeed(delta);
    this.getBounds().right < 0 && this.destroy();
  }
}

export default Booster;