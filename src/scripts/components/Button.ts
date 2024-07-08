class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this._init();
  }

  private _press: boolean;
  private _simple: boolean = false;
  public text: Phaser.GameObjects.Text;
  public icon: Phaser.GameObjects.Sprite;
  public callback: Function = (): void => {};

  private _init(): void {
    this.scene.add.existing(this);
    this.pressButton();
  }

  public setSimpleClick(): void {
    this._simple = true;
  }
  
  public destroy(): this {
    super.destroy();
    this.text?.destroy();
    this.icon?.destroy();
    return this;
  }

  public setAlpha(alpha: number): this {
    super.setAlpha(alpha);
    this.text?.setAlpha(alpha);
    this.icon?.setAlpha(alpha);
    return this;
  }

  public setX(x: number): this {
    super.setX(x);
    this.text?.setX(x);
    this.icon?.setX(x);
    return this;
  }

  public setY(y: number): this {
    super.setY(y);
    this.text?.setY(y);
    this.icon?.setY(y);
    return this;
  }

  public setPosition(x: number, y: number): this {
    super.setPosition(x, y);
    this.text?.setPosition(x, y);
    this.icon?.setPosition(x, y);
    return this;
  }

  public setVisible(value: boolean): this {
    super.setVisible(value);
    this.text?.setVisible(value);
    this.icon?.setVisible(value);
    return this;
  }

  protected pressButton(): void {
    this.setInteractive({ cursor: 'pointer' });
    this.on(Phaser.Input.Events.POINTER_DOWN, (): void => {
      this._press = true;
      let counter = 0;
      const interval = this.scene.time.addEvent({ delay: 5, callback: (): void => {
        if (!this._simple) {
          this.y = Math.round(this.y + 1);
          this.text?.setY(Math.round(this.text?.y + 1));
          this.icon?.setY(Math.round(this.icon?.y + 1));
        }
        counter++;
        counter >= 3 && interval.remove(false);
      }, callbackScope: this, loop: true });
    });
  
    this.on(Phaser.Input.Events.POINTER_OUT, (): void => {
      if (this._press) {
        this._press = false;
        let counter = 0;

        const interval = this.scene.time.addEvent({ delay: 10, callback: (): void => {
          if (!this._simple) {
            this.y = Math.round(this.y - 1);
            this.text?.setY(Math.round(this.text?.y - 1));
            this.icon?.setY(Math.round(this.icon?.y - 1));
          }
          counter++;
          counter >= 3 && interval.remove(false);
        }, callbackScope: this, loop: true });
      }
    });
  
    this.on(Phaser.Input.Events.POINTER_UP, (): void => {
      if (this._press) {
        this._press = false;
        let counter = 0;
        const interval = this.scene.time.addEvent({ delay: 10, callback: (): void => {
          if (!this._simple) {
            this.y = Math.round(this.y - 1);
            this.text?.setY(Math.round(this.text?.y - 1));
            this.icon?.setY(Math.round(this.icon?.y - 1));
          }
          counter++;
          counter >= 3 && interval.remove(false);
        }, callbackScope: this, loop: true });
        this.callback();
      }
    });
  }
}

export default Button;