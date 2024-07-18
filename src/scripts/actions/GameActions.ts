import Game from '../scenes/Game';
import Session from '../data/Session';
import Settings from '../data/Settings';
import User from '../data/User';
import Utils from '../data/Utils';
import Corral from '../components/Corral';
import Clouds from '../components/Clouds';
import Bar from '../components/Bar';
import Button from '../components/Button';
import Zone from '../components/Zone';
import Fence from '../components/Fence';
import Player from '../components/Player';
import Opponent from '../components/Opponent';
import Lap from '../components/Lap';
import Coin from '../components/Coin';
import { screen } from '../types/enums';

const MIN_SPEED = 30;

class GameActions {
  constructor(scene: Game) {
    this._scene = scene;
  }

  private _scene: Game;
  private _bar: Bar;

  public init(): void {
    this._createWorld();
    this._createTutorial();
    this._createClickZone();
    this._setCollisions();
  }

  private _createWorld(): void {
    Settings.sounds.stopMusic();
    const { centerX, height } = this._scene.cameras.main;
    this._scene.add.sprite(centerX, height, 'land').setOrigin(.5, 1);
    new Corral(this._scene);
    new Clouds(this._scene);
    new Fence(this._scene);
    this._scene.laps = this._scene.physics.add.group();
    this._scene.coins = this._scene.physics.add.group();
    this._scene.opponents = this._scene.physics.add.group();
    this._scene.opponent1 = new Opponent(this._scene, 2);
    this._scene.opponent2 = new Opponent(this._scene, 3);
    this._scene.opponent3 = new Opponent(this._scene, 4);
    this._scene.opponent4 = new Opponent(this._scene, 5);
    this._scene.player = new Player(this._scene);
    this._bar = new Bar(this._scene);
  }
  
  private _createTutorial(): void {
    const depth = 3;
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const bg = this._scene.add.rectangle(centerX, centerY, width, height, 0x000000, .85).setDepth(depth);
    bg.setInteractive({ cursor: 'default' });
    const tutorial = this._scene.add.sprite(centerX, Utils.getStretchPoint(height, 100, 16.9), 'tutorial').setOrigin(.5, 0).setDepth(depth);
    const platform = Settings.isMobile() ? 'Тапайте по экрану' : 'Кликайте мышкой';
    const text = platform + ', чтобы увеличить\nскорость лошади.\n\nСобирайте монетки, покупайте\nновых скакунов и экипировку.\n\nПридите к финишу первым!';
    const descr = this._scene.add.text(centerX, tutorial.getBounds().bottom + 60, text, {
      font: '44px geometria_bold',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(.5, 0).setLineSpacing(10).setDepth(depth);
    const go = new Button(this._scene, centerX, height - 195, 'button-yellow').setDepth(depth);
    go.text = this._scene.add.text(go.x, go.y, 'погнали'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(.5, .5).setDepth(depth);
    go.callback = () => {
      Session.setTutorial();
      bg.destroy();
      tutorial.destroy();
      descr.destroy();
      go.destroy();
      this._bar.start();
      Settings.sounds.play('start');
    }
  }

  private _createClickZone(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    const zone = new Zone(this._scene, centerX, centerY, width, height);
    zone.clickCallback = this._click.bind(this);
  }
  
  private _setCollisions(): void {
    this._scene.physics.add.overlap(
      this._scene.player,
      this._scene.laps,
      this._lapsCollision.bind(this)
    );
    this._scene.physics.add.overlap(
      this._scene.player,
      this._scene.coins,
      this._playerCoinsCollision.bind(this)
    );
    this._scene.physics.add.overlap(
      this._scene.opponents,
      this._scene.coins,
      this._opponentsCoinsCollision.bind(this)
    );
  }

  private _lapsCollision(): void {
    if (!Session.getLapMark()) return;
    if (Session.getLap() >= Settings.laps) {
      Session.setPlace(this._scene.player.getPlace());
      this._gameOver();
      return;
    }
    Session.setLap(Session.getLap() + 1);
  }

  private _playerCoinsCollision(player: Player, coin: Coin): void {
    const coins = 5;
    const score = 5;
    Session.setCoins(Session.getCoins() + coins);
    Session.setScore(Session.getScore() + score);
    coin.destroy();
    Settings.sounds.play('score');
  }

  private _opponentsCoinsCollision(opponent: Opponent, coin: Coin): void {
    coin.destroy();
  }

  private _gameOver(): void {
    if (Session.isOver()) return;
    Session.setOver();
    Settings.setScreen(screen.RESULT);
    this._scene.scene.start('UI');
  }

  private _click(): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    const a = User.getHorseActive();
    const e = User.getEquipmentActive();
    const max = a === 5 ? 100 : a === 4 ? 90 : a === 3 ? 80 : a === 2 ? 70 : 60;
    const points = e === 5 ? 12 : e === 4 ? 11 : e === 3 ? 10 : e === 2 ? 9 : 8;
    const speed = Session.getSpeed() + points > max ? max : Session.getSpeed() + points;
    Session.setSpeed(speed);
  }

  public update(time: number, delta: number): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    const e = User.getEquipmentActive();
    const co = delta / 100;
    const minus = (e === 5 ? 2 : e === 4 ? 2.5 : e === 3 ? 3 : e === 2 ? 3.5 : 4) * co;
    const speed = Session.getSpeed() - minus < MIN_SPEED ? MIN_SPEED : Session.getSpeed() - minus;
    Session.setSpeed(speed);
    Session.plusDistance(Session.getSpeed());
    const lap = Math.ceil(Session.getDistance() / Settings.lapDistance);

    if (lap > Session.getLap() && !Session.getLapMark()) {
      Session.setLapMark(true);
      new Lap(this._scene);
      lap === Settings.laps + 1 && Settings.sounds.play('crowd');
    }
  }

  public createCoin(): void {
    const place = this._scene.player.getPlace();
    const delay = Phaser.Math.Between(2000, 3000);
    const part = delay / 5;
    this._scene.time.addEvent({ delay: delay + part * place, callback: (): void => {
      if (Session.isOver()) return;
      new Coin(this._scene);
      this.createCoin();
    }, loop: false });
  }
}

export default GameActions;