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