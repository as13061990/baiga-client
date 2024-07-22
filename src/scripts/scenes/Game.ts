import axios from 'axios';
import GameActions from '../actions/GameActions';
import Session from '../data/Session';
import User from '../data/User';
import Player from '../components/Player';
import Opponent from '../components/Opponent';

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  public actions: GameActions = new GameActions(this);
  public player: Player;
  public opponent1: Opponent;
  public opponent2: Opponent;
  public opponent3: Opponent;
  public opponent4: Opponent;
  public opponents: Phaser.Physics.Arcade.Group;
  public laps: Phaser.Physics.Arcade.Group;
  public coins: Phaser.Physics.Arcade.Group;
  public boosters: Phaser.Physics.Arcade.Group;
  
  public init(): void {
    Session.clear();
  }

  public create(): void {
    this._minusAttempt();
    this.actions.init();
  }

  public update(time: number, delta: number): void {
    this.actions.update(time, delta);
  }

  private _minusAttempt(): void {
    axios.post(process.env.API + '/startGame', {
      init_data: User.getInitData(),
      id: User.getID()
    }).then(res => {
      if (!res.data.error) {
        Session.setHash(res.data.data.hash);
        Session.setID(res.data.data.session);
        User.setAttempts(User.getAttempts() > 0 ? User.getAttempts() - 1 : 0);
      } else {
        window.location.reload();
      }
    });
  }
}

export default Game;