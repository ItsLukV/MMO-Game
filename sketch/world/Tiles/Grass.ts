class Grass extends Tile {
  constructor(x: number, y: number, w: number, id: number) {
    super(x, y, w, id);
  }

  public show(): void {
    image(tilesImg[this.id], this.x, this.y, this.w, this.w);
  }

  public isSoild(): boolean {
    return true;
  }
}
