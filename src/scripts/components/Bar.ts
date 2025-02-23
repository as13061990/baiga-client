import Game from '../scenes/Game';
import Settings from '../data/Settings';
import Session from '../data/Session';
import Zone from './Zone';
import Utils from '../data/Utils';
import User from '../data/User';
import { screen } from '../types/enums';

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
  private _sound: Phaser.GameObjects.Sprite;
  private _accelerationIcon: Phaser.GameObjects.Sprite;
  private _acceleration: Phaser.GameObjects.Text;
  private _shieldIcon: Phaser.GameObjects.Sprite;
  private _shield: Phaser.GameObjects.Text;

  private _build(): void {
    this.scene.add.existing(this);
    const pause = Zone.createFromObject(this).setDepth(2);
    pause.clickCallback = this._pause.bind(this);

    const { width } = this.scene.cameras.main;
    this._sound = this.scene.add.sprite(width - 210, 150, this._getSoundTexture());
    const sound = Zone.createFromObject(this._sound).setDepth(2);
    sound.clickCallback = this._mute.bind(this);
    
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
      font: '54px geometria_extrabold',
      color: '#FFFFFF'
    }).setOrigin(.5, .5);

    this._balance = this.scene.add.text(balance.getBounds().centerX - 20, balance.getBounds().centerY, (User.getBalance() + Session.getCoins()).toString(), {
      font: '48px geometria_bold',
      color: '#A6192E'
    }).setOrigin(.5, .5);
    this._coin = this.scene.add.sprite(this._balance.getBounds().right + 10, this._balance.getBounds().centerY, 'coin').setScale(.66).setOrigin(0, .5);

    this._accelerationIcon = this.scene.add.sprite(width - 85, 266, 'acceleration');
    this._acceleration = this.scene.add.text(this._accelerationIcon.x - 5, this._accelerationIcon.getBounds().bottom + 10, Utils.convertTimeSeconds(Session.getAcceleration()), {
      font: '32px geometria_bold',
      color: '#960A25'
    }).setOrigin(.5, 0);
    
    this._shieldIcon = this.scene.add.sprite(width - 91, 262, 'shield').setScale(.817);
    this._shield = this.scene.add.text(this._shieldIcon.x, this._shieldIcon.getBounds().bottom + 10, Utils.convertTimeSeconds(Session.getShield()), {
      font: '32px geometria_bold',
      color: '#960A25'
    }).setOrigin(.5, 0);
  }

  private _pause(): void {
    if (!Session.isStarted()) return;
    if (Session.isOver()) return;
    Settings.sounds.pauseMusic();
    Settings.setScreen(screen.PAUSE);
    this.scene.scene.pause();
    this.scene.scene.launch('UI');
  }

  public _mute(): void {
    if (!Session.isStarted()) return;
    if (Session.isOver()) return;
    Settings.sounds.mute(!Settings.sounds.isMute());
    this._sound.setTexture(this._getSoundTexture());
  }

  private _getSoundTexture(): string {
    return Settings.sounds.isMute() ? 'sound-disable' : 'sound-enable';
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
        this.scene.actions.start();
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
    const balance = Utils.formatSum(User.getBalance() + Session.getCoins());

    if (balance !== this._balance.text) {
      this._balance.setText(balance);
      this._coin.setX(this._balance.getBounds().right + 10);
    }

    if (Session.getAcceleration() > 0 && !this._acceleration.visible) {
      this._accelerationIcon.setVisible(true);
      this._acceleration.setVisible(true);
    }

    if (Session.getAcceleration() === 0 && this._acceleration.visible) {
      this._accelerationIcon.setVisible(false);
      this._acceleration.setVisible(false);
    }

    if (Session.getAcceleration() > 0) {
      const acceleration = Utils.convertTimeSeconds(Session.getAcceleration());
      acceleration !== this._acceleration.text && this._acceleration.setText(acceleration);
    }

    if (Session.getShield() > 0 && !this._shield.visible) {
      this._shieldIcon.setVisible(true);
      this._shield.setVisible(true);
    }

    if (Session.getShield() === 0 && this._shield.visible) {
      this._shieldIcon.setVisible(false);
      this._shield.setVisible(false);
    }

    if (Session.getShield() > 0) {
      const shield = Utils.convertTimeSeconds(Session.getShield());
      shield !== this._shield.text && this._shield.setText(shield);
    }
  }
}

export default Bar;