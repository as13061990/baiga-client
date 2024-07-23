import Game from '../scenes/Game';
import Session from '../data/Session';
import Settings from '../data/Settings';

const HORSEMAN_INDENT = 20;
const PLACE_INDENT = 75;
const DIRT_ALPHA = .7;

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
  private _lowSpeed: boolean = false;

  private _build(): void {
    this.anims.create({
      key: this.texture.key,
      frames: this.anims.generateFrameNumbers(this.texture.key, { start: 0, end: 6 }),
      frameRate: 7 + this._level,
      repeat: -1
    });
    this.setOrigin(.5, 1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.opponents.add(this);
    this._horseman = this.scene.add.sprite(this.getBounds().centerX + HORSEMAN_INDENT, this.getBounds().top + 57, 'player-' + Phaser.Math.Between(1, 5));
    this._horseman.anims.create({
      key: this._horseman.texture.key,
      frames: this.anims.generateFrameNumbers(this._horseman.texture.key, { start: 0, end: 3 }),
      frameRate: (7 + this._level) * .66,
      repeat: -1
    });
    this._placeIcon = this.scene.add.sprite(this.getBounds().centerX + PLACE_INDENT, this._horseman.getBounds().top - 20, 'opponent-place').setOrigin(.5, 1).setDepth(this.depth).setAlpha(0);
    this._placeText = this.scene.add.text(this._placeIcon.getBounds().centerX, this._placeIcon.getBounds().top + 10, this._getPlace().toString(), {
      font: '40px geometria_bold',
      color: '#A6192E'
    }).setOrigin(.5, 0).setDepth(this.depth).setAlpha(0);
  }

  private _getSpeed(): number {
    const low = this._lowSpeed ? 10 : 0;
    if (this._level === 2) return 50 - low;
    if (this._level === 3) return 65 - low;
    if (this._level === 4) return 80 - low;
    return 90 - low;
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

  public getDistance(): number {
    return this._distance;
  }

  public setLowSpeed(): void {
    this._lowSpeed = true;
    this.scene.time.addEvent({ delay: 5000, callback: (): void => {
      this._lowSpeed = false;
    }, loop: false });
  }

  protected preUpdate(time: number, delta: number): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    super.preUpdate(time, delta);
    this.anims.play(this.texture.key, true);
    this._horseman.anims.play(this._horseman.texture.key, true);
    this._setPlace();
    this._distance += this._getSpeed();
    const distance = Session.getDistance() - this._distance;
    const indent = distance * Settings.co;
    this.setX(this.scene.player.x - indent);
    this._horseman.setX(this.getBounds().centerX + HORSEMAN_INDENT);
    this._placeIcon.setX(this.getBounds().centerX + PLACE_INDENT);
    this._placeText.setX(this._placeIcon.x);
    const place = this._getPlace().toString();
    place !== this._placeText.text && this._placeText.setText(place);

    if (this._lowSpeed && this.alpha !== DIRT_ALPHA) {
      this.setAlpha(DIRT_ALPHA);
      this._horseman.setAlpha(DIRT_ALPHA);
    } else if (!this._lowSpeed && this.alpha === DIRT_ALPHA) {
      this.setAlpha(1);
      this._horseman.setAlpha(1);
    }
  }
}

export default Opponent;