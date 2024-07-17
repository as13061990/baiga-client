import Game from '../scenes/Game';
import Session from '../data/Session';
import User from '../data/User';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, 144, scene.cameras.main.height - 212, 'horse-' + User.getHorseActive());
    this._build();
  }

  public scene: Game;
  private _horseman: Phaser.GameObjects.Sprite;
  private _placeIcon: Phaser.GameObjects.Sprite;
  private _placeText: Phaser.GameObjects.Text;
  private _tween: boolean = false;

  private _build(): void {
    this.anims.create({
      key: 'horse-' + User.getHorseActive(),
      frames: this.anims.generateFrameNumbers('horse-' + User.getHorseActive(), { start: 0, end: 6 }),
      frameRate: 12,
      repeat: -1
    });
    this.setOrigin(.5, 1);
    this.setDepth(1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this._horseman = this.scene.add.sprite(this.getBounds().centerX + 46, this.getBounds().top + 57, 'player-' + User.getEquipmentActive());
    this._horseman.setDepth(this.depth);
    this._placeIcon = this.scene.add.sprite(this.getBounds().centerX + 75, this._horseman.getBounds().top - 20, 'player-place').setOrigin(.5, 1).setDepth(this.depth).setAlpha(0);
    this._placeText = this.scene.add.text(this._placeIcon.getBounds().centerX, this._placeIcon.getBounds().top + 10, this.getPlace().toString(), {
      font: '40px geometria_bold',
      color: '#EFDD00'
    }).setOrigin(.5, 0).setDepth(this.depth).setAlpha(0);
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

  public getPlace(): number {
    let place = 1;
    const distance = Session.getDistance();
    if (this.scene.opponent1.getDistance() > distance) place++;
    if (this.scene.opponent2.getDistance() > distance) place++;
    if (this.scene.opponent3.getDistance() > distance) place++;
    if (this.scene.opponent4.getDistance() > distance) place++;
    return place;
  }

  protected preUpdate(time: number, delta: number): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    super.preUpdate(time, delta);
    const msPerFrame = 140 - Math.round(Session.getSpeed() * .6);
    this.anims.msPerFrame = msPerFrame;
    this.anims.play('horse-' + User.getHorseActive(), true);
    this._setPlace();
    this._horseman.setX(this.getBounds().centerX + 46);
    this._placeIcon.setX(this.getBounds().centerX + 75);
    this._placeText.setX(this._placeIcon.x);
    const place = this.getPlace().toString();
    place !== this._placeText.text && this._placeText.setText(place);
  }
}

export default Player;