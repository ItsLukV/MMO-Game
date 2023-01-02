class WorldGenerator {
  public world: number[][];
  constructor(worldWidth: number = 30, worldHeight: number = 10) {
    this.world = new Array(worldWidth);
    for (let i = 0; i < this.world.length; i++) {
      this.world[i] = new Array(worldHeight);
    }

    for (let i = 0; i < this.world.length; i++) {
      for (let j = 0; j < this.world[i].length; j++) {
        this.world[i][j] = tileList.Air;
      }
    }

    for (let i = 0; i < this.world.length; i++) {
      for (let j = 0; j < 3; j++) {
        this.world[i][this.world[i].length - j - 1] = tileList.Stone;
      }
    }

    for (let i = 0; i < this.world.length; i++) {
      this.world[i][this.world[i].length - 1] = tileList.Bedrock;
    }

    // TODO remove tiles
    this.world[2][7] = 1;
    this.world[3][6] = 2;
    this.world[3][5] = 2;

    this.world[5][7] = tileList.Water;
    this.world[6][7] = tileList.Water;
  }

  public getWorld(): number[][] {
    return this.world;
  }
}
