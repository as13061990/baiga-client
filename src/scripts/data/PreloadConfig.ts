class PreloadConfig {
  private _data: IpreloadConfig = {
    "scene": "UI",
    "images": {

    },
    "spritesheets": {

    },
    "sounds": {
      
    }
  }

  public get(): IpreloadConfig {
    return this._data;
  }

  public set(config: IpreloadConfig): void {
    this._data = config;
  }
}
export default new PreloadConfig;