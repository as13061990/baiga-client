import axios from 'axios';
import * as Webfont from 'webfontloader';
import Interval from '../actions/Interval';
import Sounds from '../actions/Sounds';
import Settings from '../data/Settings';
import User from '../data/User';
import PreloadConfig from '../data/PreloadConfig';
import { screen } from '../types/enums';

import loading from '../../assets/images/loading.png';
import loadingHeader from '../../assets/images/loading-header.png';

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        viewportHeight: number;
        viewportStableHeight: number;
        ready: () => void;
        expand: () => void;
        close: () => void;
        themeParams: {
          bg_color: string;
          text_color: string;
          hint_color: string;
          link_color: string;
          button_color: string;
          button_text_color: string;
          secondary_bg_color: string;
        },
        initData: string;
        initDataUnsafe: {
          user: {
            id: number;
            first_name: string;
            last_name: string;
            username: string;
            language_code: string;
            photo_url: string;
          }
        }
      };
    }
  }
}

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  private _fonts: boolean = false;
  private _user: boolean = false;

  public init(): void {
    Webfont.load({
      custom: {
        families: [
          'geometria_extrabold',
          'geometria_bold',
          'geometria_bolditalic'
        ]
      },
      active: (): void => {
        this._fonts = true;
      }
    });
    Settings.sounds = new Sounds(this);
    Settings.interval = new Interval(this);
    this._checkUser();
  }

  public preload(): void {
    this.load.image('loading', loading);
    this.load.image('loading-header', loadingHeader);
  }

  public update(): void {
    if (!this._fonts) return;
    if (!this._user) return;
    this._fonts = false;
    this._user = false;
    Settings.setPreloadConfig(PreloadConfig.get());
    this.scene.launch('Loading');
  }

  private async _checkUser(): Promise<void> {
    const telegram = window.Telegram.WebApp;
    telegram.ready();
    telegram.expand();

    try { User.setInitData(telegram.initData); }
    catch (e) { User.setInitData(''); }
    
    try { User.setID(telegram.initDataUnsafe.user.id); }
    catch (e) { User.setID(0); }
    
    try { User.setUsername(telegram.initDataUnsafe.user.username); }
    catch (e) { User.setUsername('username'); }

    try { User.setFirstName(telegram.initDataUnsafe.user.first_name); }
    catch (e) { User.setFirstName('noname'); }
    
    try { User.setLastName(telegram.initDataUnsafe.user.last_name); }
    catch (e) { User.setLastName(''); }

    await axios.post(process.env.API + '/getData', {
      init_data: User.getInitData(),
      id: User.getID(),
      username: User.getUsername(),
      first_name: User.getFirstName(),
      last_name: User.getLastName()
    }).then(res => {
      if (!res.data.error) {
        !res.data.data.old && Settings.setScreen(screen.RULES_1);
        User.setAttempts(res.data.data.attempts);
        User.setBalance(res.data.data.balance);
        User.setHorse2(res.data.data.horse_2);
        User.setHorse3(res.data.data.horse_3);
        User.setHorse4(res.data.data.horse_4);
        User.setHorse5(res.data.data.horse_5);
        User.setEquipment2(res.data.data.equipment_2);
        User.setEquipment3(res.data.data.equipment_3);
        User.setEquipment4(res.data.data.equipment_4);
        User.setEquipment5(res.data.data.equipment_5);
        User.setHorseActive(res.data.data.horse_active);
        User.setEquipmentActive(res.data.data.equipment_active);
      }
    }).catch(e => console.log(e));
    this._user = true;
  }
}

export default Boot;