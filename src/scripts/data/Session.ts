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
}

export default new Session();