import Session from './Session';
import { screen } from '../types/enums';

class Settings {

  public readonly sizes = {
    width: 1080,
    minHeight: 1600,
    maxHeight: 2500
  }
  public readonly price = {
    horse2: 150,
    horse3: 300,
    horse4: 750,
    horse5: 1500,
    equipment2: 150,
    equipment3: 300,
    equipment4: 750,
    equipment5: 1500
  }
  public readonly lapDistance = 40000;
  public readonly laps = 10;
  public readonly co = .2;
  private _screen: screen = screen.MAIN;
  private _mobile: boolean = false;
  public sounds: Isounds;
  private _preloadConfig: IpreloadConfig;

  public setScreen(screen: screen): screen {
    this._screen = screen;
    return this._screen;
  }

  public getScreen(): screen {
    return this._screen;
  }

  public isMobile(): boolean {
    return this._mobile;
  }

  public setMobile(mobile: boolean): void {
    this._mobile = mobile;
  }

  public setPreloadConfig(config: IpreloadConfig): void {
    this._preloadConfig = config;
  }

  public getPreloadConfig(): IpreloadConfig {
    return this._preloadConfig;
  }

  public getSpeed(delta: number): number {
    return delta / 100 * Session.getSpeed();
  }
}

export default new Settings();