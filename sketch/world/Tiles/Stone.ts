class Stone extends Tile {
  constructor(x: number, y: number, w: number, id: number) {
    super(x, y, w, id);
  }

  show() {
    image(tilesImg[this.id], this.x, this.y, this.w, this.w);
  }

  isSoild(): boolean {
    return true;
  }
}
