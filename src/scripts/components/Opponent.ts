import Game from '../scenes/Game';
import Session from '../data/Session';
import Settings from '../data/Settings';

class Opponent extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, level: 2 | 3 | 4 | 5) {
    super(scene, 144, scene.cameras.main.height - 212, 'horse-' + Phaser.Math.Between(1, 5));
    this._level = level;
    this._build();
  }

  public scene: Game;
  private _horseman: Phaser.GameObjects.Sprite;
  private _placeIcon: Phaser.GameObjects.Sprite;
  private _placeText: Phaser.GameObjects.Text;
  private _level: 2 | 3 | 4 | 5;
  private _distance: number = 0;
  private _tween: boolean = false;

  private _build(): void {
    this.setOrigin(.5, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.opponents.add(this);
    this._horseman = this.scene.add.sprite(this.getBounds().centerX + 46, this.getBounds().top + 57, 'player-' + Phaser.Math.Between(1, 5));
    this._placeIcon = this.scene.add.sprite(this.getBounds().centerX + 75, this._horseman.getBounds().top - 20, 'opponent-place').setOrigin(.5, 1).setDepth(this.depth).setAlpha(0);
    this._placeText = this.scene.add.text(this._placeIcon.getBounds().centerX, this._placeIcon.getBounds().top + 10, this._getPlace().toString(), {
      font: '40px geometria_bold',
      color: '#A6192E'
    }).setOrigin(.5, 0).setDepth(this.depth).setAlpha(0);
  }

  private _getSpeed(): number {
    if (this._level === 2) return 50;
    if (this._level === 3) return 65;
    if (this._level === 4) return 80;
    return 90;
  }

  private _setPlace(): void {
    if (this._tween) return;
    this._tween = true;
    this.scene.add.tween({
      targets: [this._placeIcon, this._placeText],
      alpha: 1,
      delay: 1000
    });
  }


  public getDistance(): number {
    return this._distance;
  }

  private _getPlace(): number {
    let place = 1;
    const distance = this._distance;
    if (this.scene.opponent1?.getDistance() > distance && this._level !== 2) place++;
    if (this.scene.opponent2?.getDistance() > distance && this._level !== 3) place++;
    if (this.scene.opponent3?.getDistance() > distance && this._level !== 4) place++;
    if (this.scene.opponent4?.getDistance() > distance && this._level !== 5) place++;
    if (Session.getDistance() > distance) place++;
    return place;
  }

  protected preUpdate(): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    this._setPlace();
    this._distance += this._getSpeed();
    const distance = Session.getDistance() - this._distance;
    const indent = distance * Settings.co;
    this.setX(this.scene.player.x - indent);
    this._horseman.setX(this.getBounds().centerX + 46);
    this._placeIcon.setX(this.getBounds().centerX + 75);
    this._placeText.setX(this._placeIcon.x);
    const place = this._getPlace().toString();
    place !== this._placeText.text && this._placeText.setText(place);
  }
}

export default Opponent;