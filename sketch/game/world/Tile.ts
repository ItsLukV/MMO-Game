abstract class Tile {
  private _x: number;
  private _y: number;
  private _w: number;
  private _id: number;
  private _breakingLevel: number = 0;
  protected regenerationSpeed: number = 1000;
  constructor(x: number, y: number, w: number, id: number) {
    this._x = x;
    this._y = y;
    this._w = w;
    this._id = id;
  }

  public show() {
    image(tilesImg[this._id], this._x, this._y, this._w, this._w);
    image(breakingImg[this._breakingLevel], this._x, this._y, this._w, this._w);
  }

  public isSoild(): boolean {
    return false;
  }

  public isBreakable(): boolean {
    return false;
  }

  public item() {
    return itemList.Air;
  }

  // Getters and setters

  public getRegenerationSpeed() {
    return this.regenerationSpeed;
  }

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get x(): number {
    return this._x;
  }

  public set xx(x: number) {
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this._y = y;
  }

  public get w(): number {
    return this._w;
  }

  public set w(w: number) {
    this._w = w;
  }

  public get breakingLevel(): number {
    return this._breakingLevel;
  }

  public set breakingLevel(v: number) {
    this._breakingLevel = v;
  }
}
