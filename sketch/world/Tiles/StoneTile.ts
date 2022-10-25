class StoneTile extends Tile {
  constructor(x: number, y: number, w: number) {
    super(x, y, w, tileID.Stone);
  }

  isSoild(): boolean {
    return true;
  }

  isBreakable(): boolean {
    return true;
  }

  item(): itemList {
    return itemList.Stone;
  }
}
