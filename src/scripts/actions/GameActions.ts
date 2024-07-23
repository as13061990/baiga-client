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
import Booster from '../components/Booster';
import { screen, typeObject } from '../types/enums';
import Tap from '../components/Tap';

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
    this._createControls();
    this._setCollisions();

    const cursors = this._scene.input.keyboard.createCursorKeys();
    cursors.shift.on('down', (): void => {
      // Session.plusAcceleration(10);
      // Session.plusShield(10);
      // Session.plusDirt(5);
      // this._scene.player.flash();
    });
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
    this._scene.boosters = this._scene.physics.add.group();
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
    const platform = Settings.isMobile() ? 'Тапайте по экрану' : 'Нажимайте на пробел';
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

  private _createControls(): void {
    if (Settings.isMobile()) {
      const { centerX, centerY, width, height } = this._scene.cameras.main;
      const zone = new Zone(this._scene, centerX, centerY, width, height);
      zone.clickCallback = this._press.bind(this);
    } else {
      const cursors = this._scene.input.keyboard.createCursorKeys();
      cursors.space.on('down', this._press.bind(this));
    }
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
    this._scene.physics.add.overlap(
      this._scene.player,
      this._scene.boosters,
      this._playerBoostersCollision.bind(this)
    );
    this._scene.physics.add.overlap(
      this._scene.opponents,
      this._scene.boosters,
      this._opponentsBoostersCollision.bind(this)
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

  private _playerBoostersCollision(player: Player, booster: Booster): void {
    if (!booster.isActive()) return;
    booster.setDisable();

    if (booster.getType() === 'acceleration') {
      Session.plusAcceleration(10);
      booster.destroy();
    }

    if (booster.getType() === 'shield') {
      Session.plusShield(10);
      booster.destroy();
    }

    if (booster.getType() === 'dirt') {

      if (Session.getShield() > 0) {
        Session.resetShield();
        booster.destroy();
      } else {
        Session.plusDirt(5);
      }
    }

    if (booster.getType() === 'obstacle') {

      if (Session.getShield() > 0) {
        Session.resetShield();
        booster.destroy();
      } else {
        Session.setSpeed(MIN_SPEED);
        this._scene.player.flash();
      }
    }
  }

  private _opponentsBoostersCollision(opponent: Opponent, booster: Booster): void {
    if (!booster.isActive()) return;

    if (booster.getType() === 'obstacle' || booster.getType() === 'dirt') {
      booster.setDisable();
      booster.destroy();
      opponent.setLowSpeed();
    }
  }

  private _gameOver(): void {
    if (Session.isOver()) return;
    Session.setOver();
    Settings.setScreen(screen.RESULT);
    this._scene.scene.start('UI');
  }

  private _press(pointer: Phaser.Input.Pointer): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    Settings.isMobile() && new Tap(this._scene, pointer.worldX, pointer.worldY);
    const e = User.getEquipmentActive();
    const max = Settings.getMaxSpeed();
    const points = e === 5 ? 12 : e === 4 ? 11 : e === 3 ? 10 : e === 2 ? 9 : 8;
    const speed = Session.getSpeed() + points > max ? max : Session.getSpeed() + points;
    Session.setSpeed(speed);
  }

  private _createCoin(): void {
    const place = this._scene.player.getPlace();
    const min = 2000, max = 3000;
    const delay = Settings.measuring ? min : Phaser.Math.Between(min, max);
    const part = delay / 5;
    this._scene.time.addEvent({ delay: delay + part * place, callback: (): void => {
      if (Session.isOver()) return;
      new Coin(this._scene);
      this._createCoin();
    }, loop: false });
  }

  public update(time: number, delta: number): void {
    if (Session.isOver()) return;
    if (!Session.isStarted()) return;
    const e = User.getEquipmentActive();
    const co = delta / 100;
    const minus = (e === 5 ? 2 : e === 4 ? 2.5 : e === 3 ? 3 : e === 2 ? 3.5 : 4) * co;
    const speed = Session.getSpeed() - minus < MIN_SPEED ? MIN_SPEED : Session.getSpeed() - minus;

    const result = Settings.measuring ? Settings.getMaxSpeed() : Session.getAcceleration() > 0 ? Settings.getMaxSpeed() + 10 : speed
    Session.setSpeed(result);
    
    Session.plusDistance(Session.getSpeed());
    const lap = Math.ceil(Session.getDistance() / Settings.lapDistance);

    if (lap > Session.getLap() && !Session.getLapMark()) {
      Session.setLapMark(true);
      new Lap(this._scene);
      lap === Settings.laps + 1 && Settings.sounds.play('crowd');
    }
  }

  public start(): void {
    this._createCoin();
    this._scene.time.addEvent({ delay: 1000, callback: (): void => {
      if (Session.isOver()) return;
      Session.minusObjectsPullDelay();
      Session.minusAcceleration();
      Session.minusShield();
      Session.minusDirt();
      const pull = Session.getObjectsPull();

      if (pull.acceleration || pull.shield || pull.dirt || pull.obstacle) {
        const keys: typeObject[] = [];
        pull.acceleration && keys.push('acceleration');
        pull.shield && keys.push('shield');
        pull.dirt && keys.push('dirt');
        pull.obstacle && keys.push('obstacle');
        const type = keys[Phaser.Math.Between(0, keys.length - 1)];
        const time = Session.getAcceleration() === 0 && Session.getShield() === 0 && Session.getDirt() === 0;
        const booster = this._scene.boosters.getLength() === 0;

        if (type === 'obstacle') {
          Session.getAcceleration() === 0 && booster && new Booster(this._scene, type);
        } else {
          time && booster && new Booster(this._scene, type);
        }
      }
    }, loop: true });
  }
}

export default GameActions;