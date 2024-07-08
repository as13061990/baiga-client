import UI from '../scenes/UI';

class Main {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    console.log('Main');
  }
}

export default Main;