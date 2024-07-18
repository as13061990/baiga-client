import Game from '../scenes/Game';
import Settings from '../data/Settings';
import Session from '../data/Session';
import Zone from './Zone';
import { screen } from '../types/enums';
import Utils from '../data/Utils';

class Bar extends Phaser.GameObjects.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width - 90, 150, 'btn-pause');
    this._build();
  }

  public scene: Game;
  private _speed: Phaser.GameObjects.Text;
  private _place: Phaser.GameObjects.Text;
  private _lap: Phaser.GameObjects.Text;
  private _score: Phaser.GameObjects.Text;
  private _balance: Phaser.GameObjects.Text;
  private _coin: Phaser.GameObjects.Sprite;

  private _build(): void {
    this.scene.add.existing(this);
    const pause = Zone.createFromObject(this).setDepth(2);
    pause.clickCallback = this._pause.bind(this);

    this._speed = this.scene.add.text(400, 105, '0 км/ч'.toUpperCase(), {
      font: '40px geometria_bold',
      color: '#A6192E'
    });
    this._place = this.scene.add.text(400, 185, this._getPlaceText(), {
      font: '40px geometria_bold',
      color: '#A6192E'
    });
    this._lap = this.scene.add.text(400, 265, this._getLapText(), {
      font: '40px geometria_bold',
      color: '#A6192E'
    });

    const score = this.scene.add.sprite(40, 100, 'score-bar').setOrigin(0, 0);
    const balance = this.scene.add.sprite(40, 240, 'balance-bar').setOrigin(0, 0);

    this._score = this.scene.add.text(score.getBounds().centerX, score.getBounds().centerY, Session.getScore().toString(), {
      font: '54px Geometria-ExtraBoldItalic',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);

    this._balance = this.scene.add.text(balance.getBounds().centerX - 20, balance.getBounds().centerY, Session.getCoins().toString(), {
      font: '48px geometria_bolditalic',
      color: '#A6192E'
    }).setOrigin(.5, .5);
    this._coin = this.scene.add.sprite(this._balance.getBounds().right + 10, this._balance.getBounds().centerY, 'coin').setScale(.66).setOrigin(0, .5);
  }

  private _pause(): void {
    if (!Session.isStarted()) return;
    if (Session.isOver()) return;
    Settings.setScreen(screen.PAUSE);
    this.scene.scene.pause();
    this.scene.scene.launch('UI');
  }
  
  private _getPlaceText(): string {
    return ('место: ' + this.scene.player.getPlace() + '/5').toUpperCase();
  }

  private _getLapText(): string {
    const current = Session.getLap();
    const laps = Settings.laps;
    const lap = current > laps ? laps : current;
    return ('круг: ' + lap + '/' + laps).toUpperCase();
  }

  public start(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    let timer = 3;
    const text = this.scene.add.text(centerX, centerY, timer.toString(), {
      font: '250px geometria_bold',
      color: '#FFFFFF'
    }).setOrigin(.5, 1).setStroke('#000000', 20);
    const loop = this.scene.time.addEvent({ delay: 1000, callback: (): void => {
      timer--;
      text.setText(timer.toString());
      if (timer === 0) {
        text.destroy();
        loop.destroy();
        Session.setStart();
        this.scene.actions.createCoin();
        Settings.sounds.play('shoot');
        Settings.sounds.play('horses');
        Settings.sounds.playMusic('hooves');
      }
    }, loop: true });
  }

  protected preUpdate(): void {
    const speed = Math.round(Session.getSpeed()) + ' км/ч'.toUpperCase();
    speed !== this._speed.text && this._speed.setText(speed);
    const place = this._getPlaceText();
    place !== this._place.text && this._place.setText(place);
    const lap = this._getLapText();
    lap !== this._lap.text && this._lap.setText(lap);
    const score = Utils.formatSum(Session.getScore());
    score !== this._score.text && this._score.setText(score);
    const balance = Utils.formatSum(Session.getCoins());

    if (balance !== this._balance.text) {
      this._balance.setText(balance);
      this._coin.setX(this._balance.getBounds().right + 10);
    }
  }
}

export default Bar;