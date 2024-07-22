import Settings from './Settings';
import { typeObject } from '../types/enums';

class Session {

  private _score: number = 0;
  private _coins: number = 0;
  private _id: number;
  private _hash: string = '';
  private _over: boolean;
  private _start: boolean;
  private _tutorial: boolean;
  private _speed: number;
  private _distance: number;
  private _lap: number;
  private _lapMark: boolean;
  private _place: number;
  private _objectsPull: IobjectsPull = null;
  private _accelerationDelay: number;
  private _shieldDelay: number;
  private _dirtDelay: number;
  private _obstacleDelay: number;
  private _acceleration: number;
  private _shield: number;
  private _dirt: number;

  public clear(): void {
    this._score = 0;
    this._coins = 0;
    this._over = false;
    this._start = false;
    this._tutorial = false;
    this._speed = 0;
    this._distance = 0;
    this._lap = 1;
    this._lapMark = false;
    this._objectsPull = {
      acceleration: false,
      shield: false,
      dirt: false,
      obstacle: false
    }
    this._accelerationDelay = Settings.getAccelerationDelay();
    this._shieldDelay = Settings.getShieldDelay();
    this._dirtDelay = Settings.getDirtDelay();
    this._obstacleDelay = Settings.getObstacleDelay();
    this._acceleration = 0;
    this._shield = 0;
    this._dirt = 0;
  }

  public setScore(score: number): void {
    this._score = score;
  }

  public getScore(): number {
    return this._score;
  }

  public setCoins(coins: number): void {
    this._coins = coins;
  }

  public getCoins(): number {
    return this._coins;
  }
  
  public getID(): number {
    return this._id;
  }

  public setID(id: number): void {
    this._id = id;
  }

  public getHash(): string {
    return this._hash;
  }

  public setHash(hash: string): void {
    this._hash = hash;
  }

  public setOver(): void {
    this._over = true;
  }

  public isOver(): boolean {
    return this._over;
  }

  public setStart(): void {
    this._start = true;
  }

  public isStarted(): boolean {
    return this._start;
  }

  public setTutorial(): void {
    this._tutorial = true;
  }

  public isShowedTutorial(): boolean {
    return this._tutorial;
  }

  public setSpeed(speed: number): void {
    this._speed = speed;
  }

  public getSpeed(): number {
    return this._speed;
  }

  public plusDistance(distance: number): void {
    this._distance += distance;
  }

  public getDistance(): number {
    return this._distance;
  }

  public setLap(lap: number): void {
    this._lap = lap;
    this._lapMark = false;
  }

  public getLap(): number {
    return this._lap;
  }

  public setLapMark(mark: boolean): void {
    this._lapMark = mark;
  }

  public getLapMark(): boolean {
    return this._lapMark;
  }

  public setPlace(place: number): void {
    this._place = place;
  }

  public getPlace(): number {
    return this._place
  }

  public getObjectsPull(): IobjectsPull {
    return this._objectsPull;
  }

  public resetObjectsPull(key: typeObject): void {
    this._objectsPull[key] = false;
    
    if (key === 'acceleration') {
      this._accelerationDelay = Settings.getAccelerationDelay();
    } else if (key === 'shield') {
      this._shieldDelay = Settings.getShieldDelay();
    } else if (key === 'dirt') {
      this._dirtDelay = Settings.getDirtDelay();
    } else if (key === 'obstacle') {
      this._obstacleDelay = Settings.getObstacleDelay();
    }
  }

  public minusObjectsPullDelay(): void {
    this._accelerationDelay > 0 && this._accelerationDelay--;
    this._shieldDelay > 0 && this._shieldDelay--;
    this._dirtDelay > 0 && this._dirtDelay--;
    this._obstacleDelay > 0 && this._obstacleDelay--;
    
    if (this._accelerationDelay === 0) {
      this._objectsPull.acceleration = true;
    }
    if (this._shieldDelay === 0) {
      this._objectsPull.shield = true;
    }
    if (this._dirtDelay === 0) {
      this._objectsPull.dirt = true;
    }
    if (this._obstacleDelay === 0) {
      this._objectsPull.obstacle = true;
    }
  }

  public plusAcceleration(acceleration: number): void {
    this._acceleration += acceleration;
  }

  public minusAcceleration(): void {
    this._acceleration > 0 && this._acceleration--;
  }

  public getAcceleration(): number {
    return this._acceleration;
  }

  public plusShield(shield: number): void {
    this._shield += shield;
  }

  public minusShield(): void {
    this._shield > 0 && this._shield--;
  }

  public resetShield(): void {
    this._shield = 0;
  }

  public getShield(): number {
    return this._shield;
  }

  public plusDirt(dirt: number): void {
    this._dirt += dirt;
  }

  public minusDirt(): void {
    this._dirt > 0 && this._dirt--;
  }

  public getDirt(): number {
    return this._dirt;
  }
}

export default new Session();