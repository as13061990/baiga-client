import axios from 'axios';
import Button from '../components/Button';
import Settings from '../data/Settings';
import UI from '../scenes/UI';
import { screen } from '../types/enums';
import User from '../data/User';

class Ratings {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;
  private _rating: Irating[] = [];

  private _build(): void {
    this._scene.cameras.main.setBackgroundColor('#000000');
    const { centerX, height } = this._scene.cameras.main;
    this._scene.add.sprite(centerX, 100, 'logo').setOrigin(.5, 0);

    const table = this._scene.add.text(135, 280, 'таблица'.toUpperCase(), {
      font: '76px geometria_extrabold',
      color: '#FFFFFF'
    }).setOrigin(0, 0);
    this._scene.add.text(table.getBounds().right + 30, table.y, 'лидеров'.toUpperCase(), {
      font: '76px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(0, 0);

    const back = new Button(this._scene, centerX, height - 195, 'button-opacity');
    back.text = this._scene.add.text(back.x, back.y, 'НАЗАД', {
      font: '54px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(.5, .5);
    back.callback = this._back.bind(this);

    this._getRating();
  }

  private _back(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.restart();
  }

  private _getRating(): void {
    axios.post(process.env.API + '/getRating', {
      id: User.getID()
    }).then((res): void => {
      if (!res.data.error) {
        this._rating = res.data.data;
        this._showRating();
      }
    });
  }
  
  private _showRating(): void {
    if (Settings.getScreen() !== screen.RATINGS) return;
    const { centerX, centerY, width } = this._scene.cameras.main;
    const spacing = 81;
    const y = centerY - 400;

    this._rating.map((user, i) => {
      const yellow = '#EFDD00';
      const grey = '#D6D6D6';
      const orange = '#EF7300';
      const dark = '#575756';
      const place = user.place === 1 ? yellow : user.place === 2 ? grey : user.place === 3 ? orange : dark;
      const color = user.self ? yellow : place;
      const position = y + i * spacing;
      const indent = user.place > 10 ? 35 : 0;

      this._scene.add.text(100, position + indent, user.place.toString().toUpperCase(), {
        font: '30px geometria_bold',
        color: color
      }).setOrigin(0, 0);
      const name = this._scene.add.text(210, position + indent, user.name.toUpperCase(), {
        font: '30px geometria_bold',
        color: color
      }).setOrigin(0, 0);
      this._scene.add.text(width - 100, position + indent, user.record.toString(), {
        font: '30px geometria_bold',
        color: color
      }).setOrigin(1, 0);

      i % 2 !== 0 && !user.self && this._scene.add.sprite(centerX, name.getBounds().centerY, 'ratings-dark').setDepth(-1);
      user.self && this._scene.add.sprite(centerX, name.getBounds().centerY, 'ratings-red').setDepth(-1);
    });
  }
}

export default Ratings;