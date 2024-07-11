import UI from '../scenes/UI';

class Ratings {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    console.log('Ratings');
  }
}

export default Ratings;