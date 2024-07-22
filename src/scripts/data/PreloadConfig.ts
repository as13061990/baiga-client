import bg from '../../assets/images/bg.jpg';
import bgMain from '../../assets/images/bg-main.jpg';
import logo from '../../assets/images/logo.png';
import buttonYellow from '../../assets/images/button-yellow.png';
import buttonWhite from '../../assets/images/button-white.png';
import buttonOpacity from '../../assets/images/button-opacity.png';
import buttonRed from '../../assets/images/button-red.png';
import btnStore from '../../assets/images/btn-store.png';
import btnRules from '../../assets/images/btn-rules.png';
import btnRatings from '../../assets/images/btn-ratings.png';
import btnResult from '../../assets/images/btn-result.png';
import btnPause from '../../assets/images/btn-pause.png';
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
import land from '../../assets/images/land.png';
import corral from '../../assets/images/corral.png';
import clouds from '../../assets/images/clouds.png';
import pausePopup from '../../assets/images/pause-popup.png';
import btnPauseYellow from '../../assets/images/btn-pause-yellow.png';
import btnPauseRed from '../../assets/images/btn-pause-red.png';
import tutorial from '../../assets/images/tutorial.png';
import fence from '../../assets/images/fence.png';
import scoreBar from '../../assets/images/score-bar.png';
import balanceBar from '../../assets/images/balance-bar.png';
import horse1 from '../../assets/images/horse-1.png';
import horse2 from '../../assets/images/horse-2.png';
import horse3 from '../../assets/images/horse-3.png';
import horse4 from '../../assets/images/horse-4.png';
import horse5 from '../../assets/images/horse-5.png';
import player1 from '../../assets/images/player-1.png';
import player2 from '../../assets/images/player-2.png';
import player3 from '../../assets/images/player-3.png';
import player4 from '../../assets/images/player-4.png';
import player5 from '../../assets/images/player-5.png';
import finish from '../../assets/images/finish.png';
import opponentPlace from '../../assets/images/opponent-place.png';
import playerPlace from '../../assets/images/player-place.png';
import gameCoin from '../../assets/images/game-coin.png';
import soundEnable from '../../assets/images/sound-enable.png';
import soundDisable from '../../assets/images/sound-disable.png';

import win13 from '../../assets/sounds/win-1-3.mp3';
import win45 from '../../assets/sounds/win-4-5.mp3';
import menu from '../../assets/sounds/menu.mp3';
import score from '../../assets/sounds/score.wav';
import crowd from '../../assets/sounds/crowd.mp3';
import start from '../../assets/sounds/start.wav';
import shoot from '../../assets/sounds/shoot.mp3';
import horses from '../../assets/sounds/horses.mp3';
import hooves from '../../assets/sounds/hooves.mp3';
import shop from '../../assets/sounds/shop.mp3';

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
      "button-red": buttonRed,
      "btn-store": btnStore,
      "btn-rules": btnRules,
      "btn-ratings": btnRatings,
      "btn-result": btnResult,
      "btn-pause": btnPause,
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
      "land": land,
      "corral": corral,
      "clouds": clouds,
      "pause-popup": pausePopup,
      "btn-pause-yellow": btnPauseYellow,
      "btn-pause-red": btnPauseRed,
      "tutorial": tutorial,
      "fence": fence,
      "score-bar": scoreBar,
      "balance-bar": balanceBar,
      "player-1": player1,
      "player-2": player2,
      "player-3": player3,
      "player-4": player4,
      "player-5": player5,
      "finish": finish,
      "opponent-place": opponentPlace,
      "player-place": playerPlace,
      "game-coin": gameCoin,
      "sound-enable": soundEnable,
      "sound-disable": soundDisable,

    },
    "spritesheets": {
      "horse-1": {
        asset: horse1,
        width: 450,
        height: 265
      },
      "horse-2": {
        asset: horse2,
        width: 450,
        height: 265
      },
      "horse-3": {
        asset: horse3,
        width: 450,
        height: 265
      },
      "horse-4": {
        asset: horse4,
        width: 450,
        height: 265
      },
      "horse-5": {
        asset: horse5,
        width: 450,
        height: 265
      },
    },
    "sounds": {
      "win-1-3": win13,
      "win-4-5": win45,
      "menu": menu,
      "crowd": crowd,
      "shoot": shoot,
      "horses": horses,
      "hooves": hooves,
      "shop": shop,
      "score": score,
      "start": start,
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