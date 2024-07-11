import UI from '../scenes/UI';
import Button from '../components/Button';
import Settings from '../data/Settings';
import { screen } from '../types/enums';

class Rules1 {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    const { centerX, height } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#A6192E');
    this._scene.add.sprite(centerX, 100, 'logo').setOrigin(.5, 0);
    this._scene.add.sprite(centerX, 280, 'rules-1').setOrigin(.5, 0);

    const text = 'Участвуйте в Байге!\n\nПридите к финишу первым,\nзарабатывайте баллы и выигрывайте\nфрибеты от Tennisi.kz!\n\nВ день у вас будет всего 3 попытки.\nЕсли хотите получить больше -\nпригласите друга.';
    this._scene.add.text(centerX, 700, text, {
      font: '44px geometria_bold',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(.5, 0);
    
    const next = new Button(this._scene, centerX, height - 195, 'button-yellow');
    next.text = this._scene.add.text(next.x, next.y, 'далее'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#A6192E'
    }).setOrigin(.5, .5);
    next.callback = this._next.bind(this);
  }

  private _next(): void {
    Settings.setScreen(screen.RULES_2);
    this._scene.scene.restart();
  }
}

export default Rules1;