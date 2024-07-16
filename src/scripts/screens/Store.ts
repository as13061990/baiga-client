import UI from '../scenes/UI';
import Button from '../components/Button';
import Zone from '../components/Zone';
import Settings from '../data/Settings';
import User from '../data/User';
import { screen } from '../types/enums';

class Store {
  constructor(scene: UI) {
    this._scene = scene;
    this._build();
  }

  private _scene: UI;
  private _horses: boolean = true;
  private _objects: Phaser.GameObjects.GameObject[] = []; 

  private _build(): void {
    const { centerX, height } = this._scene.cameras.main;
    this._scene.cameras.main.setBackgroundColor('#A6192E');
    this._scene.add.sprite(centerX, 100, 'logo').setOrigin(.5, 0);

    const back = new Button(this._scene, centerX, height - 195, 'button-opacity');
    back.text = this._scene.add.text(back.x, back.y, 'назад'.toUpperCase(), {
      font: '54px geometria_extrabold',
      color: '#EFDD00'
    }).setOrigin(.5, .5);
    back.callback = this._back.bind(this);

    this._createStore();
  }

  private _createStore(): void {
    this._createBalance();
    this._createSwitch();
    this._horses ? this._createHorses() : this._createEquipment();
  }

  private _createBalance(): void {
    const indent = User.getBalance().toString().length * 16;
    const store = this._scene.add.text(280 - indent, 270, 'магазин'.toUpperCase(), {
      font: '76px geometria_extrabold',
      color: '#FFFFFF'
    }).setOrigin(0, 0);
    const balance = this._scene.add.text(store.getBounds().right + 35, store.y, User.getBalance().toString(), {
      font: '76px geometria_bolditalic',
      color: '#EFDD00'
    }).setOrigin(0, 0);
    const coin = this._scene.add.sprite(balance.getBounds().right + 15, balance.getBounds().centerY + 5, 'coin').setOrigin(0, .5);
    this._objects.push(...[
      store,
      balance,
      coin
    ]);
  }

  private _createSwitch(): void {
    const { centerX } = this._scene.cameras.main;
    const bg = this._scene.add.sprite(centerX, 406, 'switch-store').setOrigin(.5, 0).setFlipX(this._horses);
    const horses = this._scene.add.text(bg.getBounds().centerX - 220, bg.getBounds().centerY, 'лошади'.toUpperCase(), {
      font: '44px geometria_extrabold',
      color: this._horses ? '#A6192E' : '#EFDD00'
    }).setOrigin(.5, .5);
    const equipment = this._scene.add.text(bg.getBounds().centerX + 220, bg.getBounds().centerY, 'экипировка'.toUpperCase(), {
      font: '44px geometria_extrabold',
      color: this._horses ? '#EFDD00' : '#A6192E'
    }).setOrigin(.5, .5);
    const horsesZone = new Zone(this._scene, horses.x, horses.y, bg.displayWidth / 2, bg.displayHeight);
    horsesZone.clickCallback = () => {
      if (this._horses) return;
      this._horses = true;
      this._update();
    }
    const equipmentZone = new Zone(this._scene, equipment.x, equipment.y, bg.displayWidth / 2, bg.displayHeight);
    equipmentZone.clickCallback = () => {
      if (!this._horses) return;
      this._horses = false;
      this._update();
    }
    this._objects.push(...[
      bg,
      horses,
      equipment,
      horsesZone
    ]);
  }

  private _createHorses(): void {
    const { centerX, width } = this._scene.cameras.main;
    const horseX = 195, buttonX = width - 205;
    const buttons = [];
    const icon1 = this._scene.add.sprite(horseX, 636, 'horse-icon-1');
    const icon2 = this._scene.add.sprite(horseX, icon1.getBounds().bottom + 95, 'horse-icon-2');
    const icon3 = this._scene.add.sprite(horseX, icon2.getBounds().bottom + 95, 'horse-icon-3');
    const icon4 = this._scene.add.sprite(horseX, icon3.getBounds().bottom + 95, 'horse-icon-4');
    const icon5 = this._scene.add.sprite(horseX, icon4.getBounds().bottom + 95, 'horse-icon-5');
    const a = User.getHorseActive();
    const activeY = a === 5 ? icon5.y : a === 4 ? icon4.y : a === 3 ? icon3.y : a === 2 ? icon2.y : icon1.y;
    const active = this._scene.add.sprite(horseX, activeY, 'horse-active');
    const line1 = this._scene.add.sprite(centerX, icon1.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);
    const line2 = this._scene.add.sprite(centerX, icon2.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);
    const line3 = this._scene.add.sprite(centerX, icon3.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);
    const line4 = this._scene.add.sprite(centerX, icon4.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);

    const name1 = this._scene.add.text(icon1.getBounds().right + 40, icon1.getBounds().centerY + 10, 'Чистокровная\nверховая лошадь'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 1 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1).setLineSpacing(7);
    const name2 = this._scene.add.text(icon2.getBounds().right + 40, icon2.getBounds().centerY, 'Меноркская лошадь'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 2 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);
    const name3 = this._scene.add.text(icon3.getBounds().right + 40, icon3.getBounds().centerY, 'Терская лошадь'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 3 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);
    const name4 = this._scene.add.text(icon4.getBounds().right + 40, icon4.getBounds().centerY + 10, 'Американский\nпейнтхорс'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 4 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1).setLineSpacing(7);
    const name5 = this._scene.add.text(icon5.getBounds().right + 40, icon5.getBounds().centerY, 'Изабелловая масть'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 5 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);

    const speed1 = this._scene.add.text(name1.x, name1.getBounds().bottom + 13, 'Скорость - 1х', {
      font: '20px geometria_bold',
      color: a === 1 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const speed2 = this._scene.add.text(name2.x, name2.getBounds().bottom + 13, 'Скорость - 1.1х', {
      font: '20px geometria_bold',
      color: a === 2 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const speed3 = this._scene.add.text(name3.x, name3.getBounds().bottom + 13, 'Скорость - 1.3х', {
      font: '20px geometria_bold',
      color: a === 3 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const speed4 = this._scene.add.text(name4.x, name4.getBounds().bottom + 13, 'Скорость - 1.5х', {
      font: '20px geometria_bold',
      color: a === 4 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const speed5 = this._scene.add.text(name5.x, name5.getBounds().bottom + 13, 'Скорость - 2х', {
      font: '20px geometria_bold',
      color: a === 5 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);

    if (a === 1) {
      const icon = this._scene.add.sprite(buttonX, icon1.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon1.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      zone.clickCallback = this._chooseHorse.bind(this, 1);
      const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
        font: '24px geometria_bold',
        color: '#EFDD00'
      }).setOrigin(.5, .5);
      buttons.push(...[icon, choice, zone]);
    }

    if (a === 2) {
      const icon = this._scene.add.sprite(buttonX, icon2.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon2.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getHorse2()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseHorse.bind(this, 2);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.horse2.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyHorse.bind(this, 2);
      }
    }
    
    if (a === 3) {
      const icon = this._scene.add.sprite(buttonX, icon3.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon3.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getHorse3()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseHorse.bind(this, 3);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.horse3.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyHorse.bind(this, 3);
      }
    }

    if (a === 4) {
      const icon = this._scene.add.sprite(buttonX, icon4.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon4.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getHorse4()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseHorse.bind(this, 4);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.horse4.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyHorse.bind(this, 4);
      }
    }

    if (a === 5) {
      const icon = this._scene.add.sprite(buttonX, icon5.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon5.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getHorse5()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseHorse.bind(this, 5);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.horse5.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyHorse.bind(this, 5);
      }
    }
    
    this._objects.push(...[
      icon1, icon2, icon3, icon4, icon5,
      active,
      line1, line2, line3, line4,
      name1, name2, name3, name4, name5,
      speed1, speed2, speed3, speed4, speed5
    ], ...buttons);
  }

  private _createEquipment(): void {
    const { centerX, width } = this._scene.cameras.main;
    const equipmentX = 185, buttonX = width - 205;
    const buttons = [];
    const icon1 = this._scene.add.sprite(equipmentX, 636, 'equipment-icon-1');
    const icon2 = this._scene.add.sprite(equipmentX, icon1.getBounds().bottom + 95, 'equipment-icon-2');
    const icon3 = this._scene.add.sprite(equipmentX, icon2.getBounds().bottom + 95, 'equipment-icon-3');
    const icon4 = this._scene.add.sprite(equipmentX, icon3.getBounds().bottom + 95, 'equipment-icon-4');
    const icon5 = this._scene.add.sprite(equipmentX, icon4.getBounds().bottom + 95, 'equipment-icon-5');
    const a = User.getEquipmentActive();
    const activeY = a === 5 ? icon5.y : a === 4 ? icon4.y : a === 3 ? icon3.y : a === 2 ? icon2.y : icon1.y;
    const active = this._scene.add.sprite(equipmentX, activeY, 'equipment-active');
    const line1 = this._scene.add.sprite(centerX, icon1.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);
    const line2 = this._scene.add.sprite(centerX, icon2.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);
    const line3 = this._scene.add.sprite(centerX, icon3.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);
    const line4 = this._scene.add.sprite(centerX, icon4.getBounds().bottom + 18, 'store-line').setOrigin(.5, 0);

    const name1 = this._scene.add.text(icon1.getBounds().right + 40, icon1.getBounds().centerY, 'Коричневая'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 1 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);
    const name2 = this._scene.add.text(icon2.getBounds().right + 40, icon2.getBounds().centerY, 'Серебряная'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 2 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);
    const name3 = this._scene.add.text(icon3.getBounds().right + 40, icon3.getBounds().centerY, 'Черная'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 3 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);
    const name4 = this._scene.add.text(icon4.getBounds().right + 40, icon4.getBounds().centerY, 'Золотая'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 4 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);
    const name5 = this._scene.add.text(icon5.getBounds().right + 40, icon5.getBounds().centerY, 'Tennisi.kz'.toUpperCase(), {
      font: '26px geometria_bold',
      color: a === 5 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 1);

    const manage1 = this._scene.add.text(name1.x, name1.getBounds().bottom + 13, 'Управляемость - 1х', {
      font: '20px geometria_bold',
      color: a === 1 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const manage2 = this._scene.add.text(name2.x, name2.getBounds().bottom + 13, 'Управляемость - 1.1х', {
      font: '20px geometria_bold',
      color: a === 2 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const manage3 = this._scene.add.text(name3.x, name3.getBounds().bottom + 13, 'Управляемость - 1.3х', {
      font: '20px geometria_bold',
      color: a === 3 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const manage4 = this._scene.add.text(name4.x, name4.getBounds().bottom + 13, 'Управляемость - 1.5х', {
      font: '20px geometria_bold',
      color: a === 4 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);
    const manage5 = this._scene.add.text(name5.x, name5.getBounds().bottom + 13, 'Управляемость - 2х', {
      font: '20px geometria_bold',
      color: a === 5 ? '#EFDD00' : '#FFFFFF'
    }).setOrigin(0, 0);

    if (a === 1) {
      const icon = this._scene.add.sprite(buttonX, icon1.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon1.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      zone.clickCallback = this._chooseEquipment.bind(this, 1);
      const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
        font: '24px geometria_bold',
        color: '#EFDD00'
      }).setOrigin(.5, .5);
      buttons.push(...[icon, choice, zone]);
    }

    if (a === 2) {
      const icon = this._scene.add.sprite(buttonX, icon2.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon2.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getEquipment2()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseEquipment.bind(this, 2);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.equipment2.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyEquipment.bind(this, 2);
      }
    }
    
    if (a === 3) {
      const icon = this._scene.add.sprite(buttonX, icon3.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon3.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getEquipment3()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseEquipment.bind(this, 3);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.equipment3.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyEquipment.bind(this, 3);
      }
    }

    if (a === 4) {
      const icon = this._scene.add.sprite(buttonX, icon4.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon4.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getEquipment4()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseEquipment.bind(this, 4);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.equipment4.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyEquipment.bind(this, 4);
      }
    }

    if (a === 5) {
      const icon = this._scene.add.sprite(buttonX, icon5.y, 'store-active');
      buttons.push(icon);
    } else {
      const icon = this._scene.add.sprite(buttonX, icon5.y, 'store-choice');
      const zone = Zone.createFromObject(icon);
      buttons.push(...[icon, zone]);

      if (User.getEquipment5()) {
        const choice = this._scene.add.text(icon.x, icon.y, 'Выбрать'.toUpperCase(), {
          font: '24px geometria_bold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        buttons.push(choice);
        zone.clickCallback = this._chooseEquipment.bind(this, 5);
      } else {
        const text = this._scene.add.text(icon.x - 18, icon.y, Settings.price.equipment5.toString(), {
          font: '36px geometria_extrabold',
          color: '#EFDD00'
        }).setOrigin(.5, .5);
        const coin = this._scene.add.sprite(text.getBounds().right + 8, text.y, 'coin').setOrigin(0, .5).setScale(.5);
        buttons.push(...[text, coin]);
        zone.clickCallback = this._buyEquipment.bind(this, 5);
      }
    }
    
    this._objects.push(...[
      icon1, icon2, icon3, icon4, icon5,
      active,
      line1, line2, line3, line4,
      name1, name2, name3, name4, name5,
      manage1, manage2, manage3, manage4, manage5
    ], ...buttons);
  }

  private _update(): void {
    this._objects.map(item => item.destroy());
    this._createStore();
  }

  private _back(): void {
    Settings.setScreen(screen.MAIN);
    this._scene.scene.restart();
  }

  private _chooseHorse(horse: 1 | 2 | 3 | 4 | 5): void {
    if (horse === 2 && !User.getHorse2()) return;
    if (horse === 3 && !User.getHorse3()) return;
    if (horse === 4 && !User.getHorse4()) return;
    if (horse === 5 && !User.getHorse5()) return;
    User.setHorseActive(horse, true);
    this._update();
  }

  private _buyHorse(horse: 2 | 3 | 4 | 5): void {
    const b = User.getBalance();
    horse === 2 && b >= Settings.price.horse2 && !User.getHorse2() && User.setHorse2(true, true);
    horse === 3 && b >= Settings.price.horse3 && !User.getHorse3() && User.setHorse3(true, true);
    horse === 4 && b >= Settings.price.horse4 && !User.getHorse4() && User.setHorse4(true, true);
    horse === 5 && b >= Settings.price.horse5 && !User.getHorse5() && User.setHorse5(true, true);
    this._update();
  }
  
  private _chooseEquipment(equipment: 1 | 2 | 3 | 4 | 5): void {
    if (equipment === 2 && !User.getEquipment2()) return;
    if (equipment === 3 && !User.getEquipment3()) return;
    if (equipment === 4 && !User.getEquipment4()) return;
    if (equipment === 5 && !User.getEquipment5()) return;
    User.setEquipmentActive(equipment, true);
    this._update();
  }

  private _buyEquipment(equipment: 2 | 3 | 4 | 5): void {
    const b = User.getBalance();
    equipment === 2 && b >= Settings.price.equipment2 && !User.getEquipment2() && User.setEquipment2(true, true);
    equipment === 3 && b >= Settings.price.equipment3 && !User.getEquipment3() && User.setEquipment3(true, true);
    equipment === 4 && b >= Settings.price.equipment4 && !User.getEquipment4() && User.setEquipment4(true, true);
    equipment === 5 && b >= Settings.price.equipment5 && !User.getEquipment5() && User.setEquipment5(true, true);
    this._update();
  }
}

export default Store;