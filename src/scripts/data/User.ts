class User {

  private _initData: string;
  private _id: number;
  private _username: string;
  private _firstname: string;
  private _lastname: string;
  private _attempts: number = 0;

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
}

export default new User();