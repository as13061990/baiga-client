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
      font: '25px geometria_extrabold',
      color: '#EFDD00'
    });
    const { centerX, height } = this.cameras.main;
    const bg = this.add.sprite(centerX, height, 'loading').setOrigin(.5, 1);
    const header = this.add.sprite(centerX, 0, 'loading-header').setOrigin(.5, 0);

    const text = this.add.text(centerX, height - 127, '0%', {
      font: '36px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(.5, 1);

    this.load.on(Phaser.Loader.Events.PROGRESS, (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText(percent + '%');
    }, this);
    this.load.on(Phaser.Loader.Events.COMPLETE, (): void => {
      this.load.removeAllListeners();
      bg.destroy();
      header.destroy();
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
    this._createCircle(7.5, 0xEFDD00, 'yellow-circle');

    const dark = this.add.graphics();
    dark.fillStyle(0x121212, 1);
    dark.fillRoundedRect(0, 0, 960, 78, 40);
    dark.fillStyle(0x121212, 1);
    const darkTexture = this.add.renderTexture(0, 0, 960, 78);
    darkTexture.draw(dark, dark.x, dark.y);
    darkTexture.saveTexture('ratings-dark');
    darkTexture.destroy();
    dark.destroy();

    const red = this.add.graphics();
    red.fillStyle(0xA6192E, 1);
    red.fillRoundedRect(0, 0, 960, 78, 40);
    red.fillStyle(0xA6192E, 1);
    const redTexture = this.add.renderTexture(0, 0, 960, 78);
    redTexture.draw(red, red.x, red.y);
    redTexture.saveTexture('ratings-red');
    redTexture.destroy();
    red.destroy();
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