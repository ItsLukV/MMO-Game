class GrassTile extends Tile {
  constructor(x: number, y: number, w: number) {
    super(x, y, w, tileID.Grass);
  }

  isSoild(): boolean {
    return true;
  }

  isBreakable(): boolean {
    return true;
  }
  item(): itemList {
    return itemList.Grass;
  }
}
