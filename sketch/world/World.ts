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
        switch (this.world[i][j]) {
          case 0:
            this.tiles[i][j] = new Air(
              i * TILE_SIZE,
              j * TILE_SIZE,
              TILE_SIZE,
              this.world[i][j]
            );
            break;
          case 1:
            this.tiles[i][j] = new Grass(
              i * TILE_SIZE,
              j * TILE_SIZE,
              TILE_SIZE,
              this.world[i][j]
            );
            break;
          case 2:
            this.tiles[i][j] = new Stone(
              i * TILE_SIZE,
              j * TILE_SIZE,
              TILE_SIZE,
              this.world[i][j]
            );
            break;
          case 3:
            this.tiles[i][j] = new Bedrock(
              i * TILE_SIZE,
              j * TILE_SIZE,
              TILE_SIZE,
              this.world[i][j]
            );
            break;
          default:
            throw new Error(`No Tile with the id ${this.world[i][j]}`);
        }
      }
    }
  }

  public show() {
    for (let i: number = 0; i < this.world.length; i++) {
      for (let j: number = 0; j < this.world[i].length; j++)
        this.tiles[i][j].show();
    }
  }

  public setWorld(world: number[][]) {
    this.world = world;
    this.load();
  }
}
