class World {
  private world: Array<Array<number>>;
  tiles: Tile[][];
  constructor() {
    this.world = [
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1, 1],
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
            this.tiles[i][j] = new Air(i * 100, j * 100, 100, this.world[i][j]);
            break;
          case 1:
            this.tiles[i][j] = new Grass(
              i * 100,
              j * 100,
              100,
              this.world[i][j]
            );
            break;

          default:
            throw new Error(`No Tile with the id ${this.world[i][j]}`);
        }
      }
    }
  }

  show() {
    for (let i: number = 0; i < this.world.length; i++) {
      for (let j: number = 0; j < this.world[i].length; j++)
        this.tiles[i][j].show();
    }
  }
}
