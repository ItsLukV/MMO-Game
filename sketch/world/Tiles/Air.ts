class Air extends Tile {
  constructor(x: number, y: number, w: number, id: number) {
    super(x, y, w, id);
  }

  isSoild(): boolean {
    return false;
  }

  isBreakable(): boolean {
    return false;
  }
}
