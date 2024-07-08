import Settings from '../data/Settings';

class Loading extends Phaser.Scene {
  constructor() {
    super('Loading');
  }

  private _config: IpreloadConfig;

  public init(): void {
    this._config = Settings.getPreloadConfig();
  }

  public preload(): void {
    const build = this.add.text(10, 10, 'build: ' + process.env.BUILD_TIME, {
      font: '25px Triomphe',
      color: '#3B175C'
    });
    const { centerX, centerY } = this.cameras.main;
    const sprite = this.add.sprite(centerX, centerY, 'loading');
    this.add.tween({
      targets: sprite,
      rotation: Math.PI * 2,
      repeat: -1,
      duration: 2000
    });
    const bounds = sprite.getBounds();
    const text = this.add.text(centerX, bounds.bottom + 50, 'Загрузка...0%', {
      font: '70px Triomphe',
      color: '#3B175C'
    }).setOrigin(.5, .5);

    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText('Загрузка...' + percent + '%');
    }, this);
    this.load.on(Phaser.Loader.Events.COMPLETE, (): void => {
      this.load.removeAllListeners();
      sprite.destroy();
      text.destroy();
      build.destroy();
      this.scene.start(this._config.scene);
    }, this);

    this._loading();
  }

  private _loading(): void {
    this._loadImages();
    this._loadSounds();
    this._loadSpritesheets();
    this._createTextures();
  }

  private _loadImages(): void {
    for (const key in this._config.images) {
      this.load.image(key, this._config.images[key]);
    }
  }

  private _loadSounds(): void {
    for (const key in this._config.sounds) {
      this.load.audio(key, this._config.sounds[key]);
    }
  }

  private _loadSpritesheets(): void {
    for (const key in this._config.spritesheets) {
      const data = this._config.spritesheets[key];
      this.load.spritesheet(key, data.asset, { frameWidth: data.width, frameHeight: data.height });
    }
  }

  private _createTextures(): void {
    this._createRectangle(200, 50, 0x000000, 'button');
  }

  private _createRectangle(width: number, height: number, color: number, key: string): void {
    const texture = this.add.renderTexture(0, 0, width, height);
    const rectangle = this.add.rectangle(0, 0, width, height, color).setOrigin(0, 0);
    texture.draw(rectangle, 0, 0);
    rectangle.destroy();
    texture.saveTexture(key);
    texture.destroy();
  }

  private _createCircle(radius: number, color: number, key: string): void {
    const texture = this.add.renderTexture(0, 0, radius * 2, radius * 2);
    const rectangle = this.add.circle(0, 0, radius, color).setOrigin(0, 0);
    texture.draw(rectangle, 0, 0);
    rectangle.destroy();
    texture.saveTexture(key);
    texture.destroy();
  }
}

export default Loading;