import UI from '../scenes/UI';
import Button from '../components/Button';
import Settings from '../data/Settings';
import { screen } from '../types/enums';

class Rules3 {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, height } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#A6192E');
    this._scene.add.sprite(centerX, 100, 'logo').setOrigin(.5, 0);
    this._scene.add.sprite(centerX, 280, 'rules-3').setOrigin(.5, 0);

    const back = new Button(this._scene, centerX, height - 385, 'button-opacity');
    back.text = this._scene.add.text(back.x, back.y, 'назад'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(.5, .5);
    back.callback = this._back.bind(this);
    
    const menu = new Button(this._scene, centerX, height - 195, 'button-yellow');
    menu.text = this._scene.add.text(menu.x, menu.y, 'играть'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(.5, .5);
    menu.callback = this._menu.bind(this);
  }

  private _back(): void {
    Settings.setScreen(screen.RULES_2);
    this._scene.scene.restart();
  }

  private _menu(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.restart();
  }
}

export default Rules3;