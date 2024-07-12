import axios from 'axios';
import Settings from './Settings';

type choice = 1 | 2 | 3 | 4 | 5;

class User {

  private _initData: string;
  private _id: number;
  private _username: string;
  private _firstname: string;
  private _lastname: string;
  private _attempts: number = 0;
  private _balance: number = 0;
  private _horse2: boolean = false;
  private _horse3: boolean = false;
  private _horse4: boolean = false;
  private _horse5: boolean = false;
  private _equipment2: boolean = false;
  private _equipment3: boolean = false;
  private _equipment4: boolean = false;
  private _equipment5: boolean = false;
  private _horseActive: choice = 1;
  private _equipmentActive: choice = 1;

  public getInitData(): string {
    return this._initData;
  }

  public setInitData(data: string): void {
    this._initData = data;
  }

  public setID(id: number): void {
    this._id = id;
  }

  public getID(): number {
    return this._id;
  }

  public setUsername(username: string): void {
    this._username = username;
  }

  public getUsername(): string {
    return this._username;
  }

  public setFirstName(firstname: string): void {
    this._firstname = firstname;
  }

  public getFirstName(): string {
    return this._firstname;
  }

  public setLastName(lastname: string): void {
    this._lastname = lastname;
  }

  public getLastName(): string {
    return this._lastname;
  }

  public setAttempts(attempts: number): void {
    this._attempts = attempts;
  }

  public getAttempts(): number {
    return this._attempts;
  }

  public setBalance(balance: number): void {
    this._balance = balance;
  }

  public getBalance(): number {
    return this._balance;
  }

  public setHorse2(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.horse2);
    buy && this.setHorseActive(2);
    buy && this._buyHorse(2);
    this._horse2 = value;
  }

  public getHorse2(): boolean {
    return this._horse2;
  }

  public setHorse3(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.horse3);
    buy && this.setHorseActive(3);
    buy && this._buyHorse(3);
    this._horse3 = value;
  }

  public getHorse3(): boolean {
    return this._horse3;
  }

  public setHorse4(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.horse4);
    buy && this.setHorseActive(4);
    buy && this._buyHorse(4);
    this._horse4 = value;
  }

  public getHorse4(): boolean {
    return this._horse4;
  }

  public setHorse5(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.horse5);
    buy && this.setHorseActive(5);
    buy && this._buyHorse(5);
    this._horse5 = value;
  }

  public getHorse5(): boolean {
    return this._horse5;
  }

  public setEquipment2(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.equipment2);
    buy && this.setEquipmentActive(2);
    buy && this._buyEquipment(2);
    this._equipment2 = value;
  }

  public getEquipment2(): boolean {
    return this._equipment2;
  }

  public setEquipment3(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.equipment3);
    buy && this.setEquipmentActive(3);
    buy && this._buyEquipment(3);
    this._equipment3 = value;
  }

  public getEquipment3(): boolean {
    return this._equipment3;
  }

  public setEquipment4(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.equipment4);
    buy && this.setEquipmentActive(4);
    buy && this._buyEquipment(4);
    this._equipment4 = value;
  }

  public getEquipment4(): boolean {
    return this._equipment4;
  }

  public setEquipment5(value: boolean, buy?: boolean): void {
    buy && this.setBalance(this.getBalance() - Settings.price.equipment5);
    buy && this.setEquipmentActive(5);
    buy && this._buyEquipment(5);
    this._equipment5 = value;
  }

  public getEquipment5(): boolean {
    return this._equipment5;
  }

  public setHorseActive(value: choice, store?: boolean): void {
    this._horseActive = value;
    
    if (store) {
      axios.post(process.env.API + '/setActiveHorse', {
        init_data: this.getInitData(),
        id: this.getID(),
        horse: value
      }).then(res => {
        res.data.error && window.location.reload();
      });
    }
  }

  public getHorseActive(): choice {
    return this._horseActive;
  }

  public setEquipmentActive(value: choice, store?: boolean): void {
    this._equipmentActive = value;
        
    if (store) {
      axios.post(process.env.API + '/setActiveEquipment', {
        init_data: this.getInitData(),
        id: this.getID(),
        equipment: value
      }).then(res => {
        res.data.error && window.location.reload();
      });
    }
  }

  public getEquipmentActive(): choice {
    return this._equipmentActive;
  }

  private _buyHorse(horse: 2 | 3 | 4 | 5): void {
    axios.post(process.env.API + '/buyHorse', {
      init_data: this.getInitData(),
      id: this.getID(),
      horse: horse
    }).then(res => {
      res.data.error && window.location.reload();
    });
  }

  private _buyEquipment(equipment: 2 | 3 | 4 | 5): void {
    axios.post(process.env.API + '/buyEquipment', {
      init_data: this.getInitData(),
      id: this.getID(),
      equipment: equipment
    }).then(res => {
      res.data.error && window.location.reload();
    });
  }
}

export default new User();