import axios from 'axios';
import UI from '../scenes/UI';
import Session from '../data/Session';
import User from '../data/User';
import Settings from '../data/Settings';
import Utils from '../data/Utils';
import Button from '../components/Button';
import { screen } from '../types/enums';

class Result {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const place = Session.getPlace();
    const attempts = User.getAttempts();
    Settings.sounds.stopMusic();
    Settings.sounds.play(place > 3 ? 'win-4-5' : 'win-1-3');

    if (place === 1) {
      Session.setScore(Session.getScore() + 100);
      Session.setCoins(Session.getCoins() + 100);
    } else if (place === 2) {
      Session.setScore(Session.getScore() + 60);
      Session.setCoins(Session.getCoins() + 60);
    } else if (place === 3) {
      Session.setScore(Session.getScore() + 30);
      Session.setCoins(Session.getCoins() + 30);
    } else if (place === 4) {
      Session.setScore(Session.getScore() + 15);
    } else {
      Session.setScore(Session.getScore() + 5);
    }

    const { centerX, width, height } = this._scene.cameras.main;
    this._scene.add.sprite(centerX, height, 'bg').setOrigin(.5, 1);
    this._scene.add.sprite(centerX, 100, 'logo').setOrigin(.5, 0);

    const header = this._scene.add.text(centerX, Utils.getStretchPoint(height, 100, 16.9), 'ПОЗДРАВЛЯЕМ\nС ' + place + ' МЕСТОМ!', {
      font: '76px geometria_extrabold',
      color: '#EFDD00',
      align: 'center'
    }).setOrigin(.5, 0).setLineSpacing(12);
    const score = this._scene.add.text(centerX, header.getBounds().bottom + 95, 'Счет:'.toUpperCase(), {
      font: '44px geometria_bold',
      color: '#FFFFFF',
    }).setOrigin(.5, 0);
    Session.getScore().toString();
    const result = this._scene.add.text(centerX, score.getBounds().bottom + 20, Session.getScore().toString(), {
      font: '128px geometria_extrabold',
      color: '#EFDD00',
      align: 'center'
    }).setOrigin(.5, 0);
    
    if (attempts > 0) {

      if (place > 3) {
        this._scene.add.text(centerX, result.getBounds().bottom + 60, 'Можно лучше!', {
          font: '54px geometria_bold',
          color: '#FFFFFF'
        }).setOrigin(.5, 0);
        this._scene.add.text(centerX, result.getBounds().bottom + 150, 'Купите нового скакуна\nили экипировку!', {
          font: '54px geometria_bold',
          color: '#FFFFFF',
          align: 'center'
        }).setOrigin(.5, 0).setLineSpacing(10);
        const menu = new Button(this._scene, 310, height - 385, 'btn-result');
        menu.text = this._scene.add.text(menu.x, menu.y, 'меню'.toUpperCase(), {
          font: '54px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        menu.callback = this._menu.bind(this);
        const store = new Button(this._scene, width - 310, height - 385, 'btn-result');
        store.text = this._scene.add.text(store.x, store.y, 'магазин'.toUpperCase(), {
          font: '54px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        store.callback = this._store.bind(this);
      } else {
        this._scene.add.text(centerX, result.getBounds().bottom + 60, 'Отлично!', {
          font: '54px geometria_bold',
          color: '#FFFFFF'
        }).setOrigin(.5, 0);
        this._scene.add.text(centerX, result.getBounds().bottom + 150, 'Так держать!', {
          font: '54px geometria_bold',
          color: '#FFFFFF'
        }).setOrigin(.5, 0);
        const menu = new Button(this._scene, centerX, height - 385, 'button-red');
        menu.text = this._scene.add.text(menu.x, menu.y, 'меню'.toUpperCase(), {
          font: '54px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        menu.callback = this._menu.bind(this);
      }
      const again = new Button(this._scene, centerX, height - 195, 'button-yellow');
      again.text = this._scene.add.text(again.x, again.y, 'еще раз'.toUpperCase(), {
        font: '54px geometria_extrabold',
        color: '#A6192E'
      }).setOrigin(.5, .5);
      again.callback = this._again.bind(this);
    } else {

      if (place > 3) {
        this._scene.add.text(centerX, result.getBounds().bottom + 60, 'Можно лучше!', {
          font: '54px geometria_bold',
          color: '#FFFFFF'
        }).setOrigin(.5, 0);
        this._scene.add.text(centerX, result.getBounds().bottom + 150, 'Пригласите друга для новой\nпопытки!', {
          font: '54px geometria_bold',
          color: '#FFFFFF',
          align: 'center'
        }).setOrigin(.5, 0).setLineSpacing(10);
      } else {
        this._scene.add.text(centerX, result.getBounds().bottom + 60, 'Отлично!', {
          font: '54px geometria_bold',
          color: '#FFFFFF'
        }).setOrigin(.5, 0);
        this._scene.add.text(centerX, result.getBounds().bottom + 150, 'Пригласите друга для\nполучения новой попытки!', {
          font: '54px geometria_bold',
          color: '#FFFFFF',
          align: 'center'
        }).setOrigin(.5, 0).setLineSpacing(10);
      }
      const menu = new Button(this._scene, centerX, height - 195, 'button-red');
      menu.text = this._scene.add.text(menu.x, menu.y, 'меню'.toUpperCase(), {
        font: '54px geometria_extrabold',
        color: '#EFDD00'
      }).setOrigin(.5, .5);
      menu.callback = this._menu.bind(this);
    }
    this._sendResult();
  }

  private _menu(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.restart();
  }

  private _store(): void {
    Settings.setScreen(screen.STORE);
    this._scene.scene.restart();
  }

  private _again(): void {
    User.getAttempts() > 0 && this._scene.scene.start('Game');
  }

  private _sendResult(): void {
    axios.post(process.env.API + '/sendResult', {
      init_data: User.getInitData(),
      id: User.getID(),
      score: Session.getScore(),
      coins: Session.getCoins(),
      hash: Session.getHash(),
      session: Session.getID()
    });
    User.setBalance(User.getBalance() + Session.getCoins());
  }
}

export default Result;