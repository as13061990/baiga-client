import UI from '../scenes/UI';
import Settings from '../data/Settings';
import Button from '../components/Button';
import { screen } from '../types/enums';

class Pause {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, centerY, width, height } = this._scene.cameras.main;
    this._scene.add.rectangle(centerX, centerY, width, height, 0x000000, .85);
    const bg = this._scene.add.sprite(centerX, centerY, 'pause-popup');
    this._scene.add.text(centerX, bg.getBounds().top + 90, 'ПАУЗА', {
      font: '76px geometria_extrabold',
      color: '#FFFFFF'
    }).setOrigin(.5, 0);

    const menu = new Button(this._scene, centerX, bg.getBounds().top + 343, 'btn-pause-red');
    menu.text = this._scene.add.text(menu.x, menu.y, 'меню'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(.5, .5);
    menu.callback = this._menu.bind(this);

    const resume = new Button(this._scene, centerX, bg.getBounds().bottom - 167, 'btn-pause-yellow');
    resume.text = this._scene.add.text(resume.x, resume.y, 'продолжить'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(.5, .5);
    resume.callback = this._resume.bind(this);
  }

  private _menu(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.stop('Game');
    this._scene.scene.restart();
  }

  private _resume(): void {
    Settings.sounds.resumeMusic();
    this._scene.scene.resume('Game');
    this._scene.scene.stop();
  }
}

export default Pause;