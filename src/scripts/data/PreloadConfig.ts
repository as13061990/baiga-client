import bg from '../../assets/images/bg.jpg';
import bgMain from '../../assets/images/bg-main.jpg';
import logo from '../../assets/images/logo.png';
import buttonYellow from '../../assets/images/button-yellow.png';
import buttonWhite from '../../assets/images/button-white.png';
import buttonOpacity from '../../assets/images/button-opacity.png';
import btnStore from '../../assets/images/btn-store.png';
import btnRules from '../../assets/images/btn-rules.png';
import btnRatings from '../../assets/images/btn-ratings.png';
import coin from '../../assets/images/coin.png';
import rules1 from '../../assets/images/rules-1.png';
import rules2 from '../../assets/images/rules-2.png';
import switchStore from '../../assets/images/switch-store.png';
import equipmentIcon1 from '../../assets/images/equipment-icon-1.png';
import equipmentIcon2 from '../../assets/images/equipment-icon-2.png';
import equipmentIcon3 from '../../assets/images/equipment-icon-3.png';
import equipmentIcon4 from '../../assets/images/equipment-icon-4.png';
import equipmentIcon5 from '../../assets/images/equipment-icon-5.png';
import horseIcon1 from '../../assets/images/horse-icon-1.png';
import horseIcon2 from '../../assets/images/horse-icon-2.png';
import horseIcon3 from '../../assets/images/horse-icon-3.png';
import horseIcon4 from '../../assets/images/horse-icon-4.png';
import horseIcon5 from '../../assets/images/horse-icon-5.png';
import storeLine from '../../assets/images/store-line.png';
import storeActive from '../../assets/images/store-active.png';
import storeChoice from '../../assets/images/store-choice.png';
import equipmentActive from '../../assets/images/equipment-active.png';
import horseActive from '../../assets/images/horse-active.png';

class PreloadConfig {
  private _data: IpreloadConfig = {
    "scene": "UI",
    "images": {
      "bg": bg,
      "bg-main": bgMain,
      "logo": logo,
      "button-yellow": buttonYellow,
      "button-white": buttonWhite,
      "button-opacity": buttonOpacity,
      "btn-store": btnStore,
      "btn-rules": btnRules,
      "btn-ratings": btnRatings,
      "coin": coin,
      "rules-1": rules1,
      "rules-2": rules2,
      "switch-store": switchStore,
      "equipment-icon-1": equipmentIcon1,
      "equipment-icon-2": equipmentIcon2,
      "equipment-icon-3": equipmentIcon3,
      "equipment-icon-4": equipmentIcon4,
      "equipment-icon-5": equipmentIcon5,
      "horse-icon-1": horseIcon1,
      "horse-icon-2": horseIcon2,
      "horse-icon-3": horseIcon3,
      "horse-icon-4": horseIcon4,
      "horse-icon-5": horseIcon5,
      "store-line": storeLine,
      "store-active": storeActive,
      "store-choice": storeChoice,
      "equipment-active": equipmentActive,
      "horse-active": horseActive,

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