class World {
  // public world: number[][];
  private worldGenerator: WorldGenerator;
  public tiles: Tile[][];
  constructor() {
    this.tiles = new Array();
    this.worldGenerator = new WorldGenerator();
    this.setWorld(this.worldGenerator.getWorld());
  }

  /**
   * Translates and sets a world in numbers to a array with Tiles
   * @param world
   */
  private load(world: number[][]) {
    for (let i: number = 0; i < world.length; i++) {
      this.tiles[i] = new Array();
      for (let j: number = 0; j < world[i].length; j++) {
        this.tiles[i][j] = this.createTile(world[i][j], i, j);
      }
    }
  }

  /**
   * Shows the world
   */
  public show() {
    for (let i: number = 0; i < this.tiles.length; i++) {
      for (let j: number = 0; j < this.tiles[i].length; j++) {
        this.tiles[i][j].show();
      }
    }
  }

  public setWorld(world: number[][]) {
    this.load(world);
  }

  public changeTile(x: number, y: number, tile: tileList, tempTile?: tileList, regenerationSpeed?: number) {
    this.tiles[x][y] = this.createTile(tile, x, y, tempTile, regenerationSpeed);
  }

  /**
   * breakTile
   */
  public breakTile(x: number, y: number, regenerationSpeed?: number) {
    return TilesGen.tilePicker(tileList.Air, x, y, regenerationSpeed);
  }

  private createTile(tileId: tileList, x: number, y: number, newTile?: tileList, regenerationSpeed?: number): Tile {
    return TilesGen.tilePicker(tileId, x, y, newTile, regenerationSpeed);
  }

  public getWorldGen(): WorldGenerator {
    return this.worldGenerator;
  }
}
