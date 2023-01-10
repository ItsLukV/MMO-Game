class WorldGenerator {
  private world: number[][];

  private circleOccurrence: number = 0.1;
  static stoneBias: number = 3;
  static dirtBias: number = 1;
  static grassBias: number = 1;

  constructor(worldWidth: number = 200, worldHeight: number = WorldGenerator.stoneBias + WorldGenerator.dirtBias + WorldGenerator.grassBias + 1) {
    // this.world = new Array(worldWidth);
    // for (let i = 0; i < this.world.length; i++) {
    //   this.world[i] = new Array(worldHeight);
    // }

    // for (let i = 0; i < this.world.length; i++) {
    //   for (let j = 0; j < this.world[i].length; j++) {
    //     this.world[i][j] = tileList.Air;
    //   }
    // }

    // for (let i = 0; i < this.world.length; i++) {
    //   for (let j = 0; j < 3; j++) {
    //     this.world[i][this.world[i].length - j - 1] = tileList.Stone;
    //   }
    // }

    // for (let i = 0; i < this.world.length; i++) {
    //   this.world[i][this.world[i].length - 1] = tileList.Bedrock;
    // }

    // // TODO remove tiles
    // this.world[2][7] = tileList.Grass;
    // this.world[3][6] = tileList.Stone;
    // this.world[3][5] = tileList.Stone;

    // this.world[5][7] = tileList.Water;
    // this.world[6][7] = tileList.Water;
    this.randomWorldGen(124168153476, worldWidth, worldHeight);
  }

  public getWorld(): number[][] {
    return this.world;
  }
  /**
   * randomWorldGen
   */
  public randomWorldGen(seed: number, width: number, height: number) {
    this.world = new Array(width);
    for (let i = 0; i < width; i++) {
      this.world[i] = new Array(height);
    }
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height - 1; j++) {
        this.world[i][j] = tileList.Air;
      }
    }
    for (let i = 0; i < width; i++) {
      this.world[i][height - 1] = tileList.Bedrock;
    }
    for (let i = 0; i < height; i++) {
      this.world[0][i] = tileList.Bedrock;
      this.world[width - 1][i] = tileList.Bedrock;
    }
    randomSeed(seed);
    let circles: number[] = [];
    for (let i = 1; i < width - 1; i++) {
      if (random() < this.circleOccurrence) {
        circles[circles.length] = i;
      }
    }

    for (let x = 1; x < width - 1; x++) {
      for (let y = 0; y < height - 1; y++) {
        let dist = Infinity; // = 1.797693134862315E+308
        for (let i = 0; i < circles.length; i++) {
          dist = min(this.distance(x, y, circles[i], height), dist);
        }
        if (dist < WorldGenerator.stoneBias) {
          this.world[x][y] = tileList.Stone;
        } else if (dist < WorldGenerator.dirtBias + WorldGenerator.stoneBias) {
          this.world[x][y] = tileList.Dirt;
        } else if (dist < WorldGenerator.grassBias + WorldGenerator.dirtBias + WorldGenerator.stoneBias) {
          this.world[x][y] = tileList.Grass;
        }
      }
    }
  }
  private distance(x: number, y: number, circleX: number, circleY: number) {
    return Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2));
  }

  public safeSpawn(x: number): Coords {
    for (let i = 0; i < this.world[x].length; i++) {
      if (this.world[x][i] != tileList.Air) return { x: x, y: i - 2 };
    }
    return { x: -1, y: -1 };
  }
}
