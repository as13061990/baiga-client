import UI from '../scenes/UI';

class Store {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;

  private _build(): void {
    console.log('Store');
  }
}

export default Store;