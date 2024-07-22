import UI from '../scenes/UI';
import Button from '../components/Button';
import Zone from '../components/Zone';
import Settings from '../data/Settings';
import User from '../data/User';
import Utils from '../data/Utils';
import { screen } from '../types/enums';

class Main {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;
  private _sound: Phaser.GameObjects.Sprite;

  private _build(): void {
    Settings.sounds.playMusic('menu');
    const { width, centerX, height } = this._scene.cameras.main;
    this._scene.add.sprite(centerX, height, 'bg-main').setOrigin(.5, 1);
    this._scene.add.sprite(centerX, 100, 'logo').setOrigin(.5, 0);

    const baiga = this._scene.add.text(centerX, Utils.getStretchPoint(height, 100, 16.9), 'Байга'.toUpperCase(), {
      font: '230px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(.5, 0);
    this._scene.add.text(centerX, baiga.getBounds().top + 259, 'Tennisi.kz'.toUpperCase(), {
      font: '80px geometria_extrabold',
      color: '#FFFFFF'
    }).setOrigin(.5, 0);
    
    const y = height - 610;
    const rules = new Button(this._scene, 210, y, 'btn-rules');
    rules.callback = this._rules.bind(this);
    const ratings = new Button(this._scene, centerX, y, 'btn-ratings');
    ratings.callback = this._ratings.bind(this);
    const store = new Button(this._scene, width - 210, y, 'btn-store');
    store.callback = this._store.bind(this);
    this._scene.add.sprite(375, y, 'yellow-circle');
    this._scene.add.sprite(width - 375, y, 'yellow-circle');

    const board = this._scene.add.sprite(centerX, height - 310, 'button-white').setOrigin(.5, 1);
    const attempts = this._scene.add.text(centerX - 10, board.getBounds().top + 25, 'Осталось попыток: ', {
      font: '36px geometria_bold',
      color: '#A6192E'
    }).setOrigin(.5, 0);
    this._scene.add.text(attempts.getBounds().right, attempts.y, User.getAttempts().toString(), {
      font: '36px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(0, 0);
    const indent = User.getBalance().toString().length * 10;
    const balance = this._scene.add.text(centerX - 15 - indent, board.getBounds().bottom - 25, 'Баланс: ', {
      font: '36px geometria_bold',
      color: '#A6192E'
    }).setOrigin(.5, 1);
    const count = this._scene.add.text(balance.getBounds().right, balance.y, User.getBalance().toString(), {
      font: '36px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(0, 1);
    this._scene.add.sprite(count.getBounds().right + 7, count.getBounds().centerY, 'coin').setScale(.5).setOrigin(0, .5);

    const play = new Button(this._scene, centerX, height - 195, 'button-yellow');
    play.text = this._scene.add.text(play.x, play.y, 'играть'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(.5, .5);
    play.callback = this._play.bind(this);

    this._sound = this._scene.add.sprite(width - 150, 132, this._getSoundTexture());
    const sound = Zone.createFromObject(this._sound);
    sound.clickCallback = this._mute.bind(this);
  }

  private _rules(): void {
    Settings.setScreen(screen.RULES_1);
    this._scene.scene.restart();
  }
  
  private _ratings(): void {
    Settings.setScreen(screen.RATINGS);
    this._scene.scene.restart();
  }

  private _store(): void {
    Settings.setScreen(screen.STORE);
    this._scene.scene.restart();
  }

  private _play(): void {
    User.getAttempts() > 0 && this._scene.scene.start('Game');
  }

  public _mute(): void {
    Settings.sounds.mute(!Settings.sounds.isMute());
    this._sound.setTexture(this._getSoundTexture());
  }

  private _getSoundTexture(): string {
    return Settings.sounds.isMute() ? 'sound-disable' : 'sound-enable';
  }
}

export default Main;