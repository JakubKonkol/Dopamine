export class User{
  private _uid: string;
  private _username: string;
  private _email: string;
  private _password: string;

  private _movieHistory: number[];
  private _watchList: number[];
  private _watchHours: number;


  constructor() {
    this._uid = "undefined";
    this._username = '';
    this._email = '';
    this._password = '';
    this._movieHistory = [];
    this._watchList = [];
    this._watchHours = 0;
  }


  get uid(): string {
    return this._uid;
  }

  set uid(value: string) {
    this._uid = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get movieHistory(): number[] {
    return this._movieHistory;
  }

  set movieHistory(value: number[]) {
    this._movieHistory = value;
  }

  get watchList(): number[] {
    return this._watchList;
  }

  set watchList(value: number[]) {
    this._watchList = value;
  }

  get watchHours(): number {
    return this._watchHours;
  }

  set watchHours(value: number) {
    this._watchHours = value;
  }
}
