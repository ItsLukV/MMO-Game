abstract class Tile {
  x: number;
  y: number;
  w: number;
  id: number;
  constructor(x: number, y: number, w: number, id: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.id = id;
  }

  show() {
    rect(this.x, this.y, this.w, this.w);
  }

  isSoild(): boolean {
    return false;
  }
}
