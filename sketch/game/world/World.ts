class World {
  public world: number[][];
  public tiles: Tile[][];
  constructor() {
    this.world = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 1, 0, 0, 0, 0, 0, 0, 1, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
      [3, 0, 0, 0, 0, 0, 0, 0, 1, 3],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
      [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
    ];

    this.tiles = new Array(this.world.length);
    for (let i: number = 0; i < this.tiles.length; i++) {
      this.tiles[i] = new Array(this.world[i].length);
    }
    this.load();
  }

  private load() {
    for (let i: number = 0; i < this.world.length; i++) {
      this.tiles[i] = [];
      for (let j: number = 0; j < this.world[i].length; j++) {
        this.tiles[i][j] = this.createTile(this.world[i][j], i, j);
      }
    }
  }

  public show() {
    for (let i: number = 0; i < this.world.length; i++) {
      for (let j: number = 0; j < this.world[i].length; j++) {
        this.tiles[i][j].show();
      }
    }
  }

  public setWorld(world: number[][]) {
    this.world = world;
    this.load();
  }

  public changeTile(x: number, y: number, tile: tileList, tempTile?: tileList, regenerationSpeed?: number) {
    this.world[x][y] = tile;
    this.tiles[x][y] = this.createTile(tile, x, y, tempTile, regenerationSpeed);
  }

  private createTile(tileId: tileList, x: number, y: number, tempTile?: tileList, regenerationSpeed?: number): Tile {
    return TilesGen.tilePicker(tileId, x, y, tempTile, regenerationSpeed);
  }
}
