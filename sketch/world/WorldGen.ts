class WorldGenerator {
  public world: number[][];
  constructor(world: World) {
    this.world = new Array(WORLDWIDTH);
    for (let i = 0; i < WORLDWIDTH; i++) {
      this.world[i] = new Array(WORLDHEIGHT);
    }

    for (let i = 0; i < this.world.length; i++) {
      for (let j = 0; j < this.world[i].length; j++) {
        this.world[i][j] = 0;
      }
    }

    for (let i = 0; i < this.world.length; i++) {
      for (let j = 0; j < 3; j++) {
        this.world[i][this.world[i].length - j - 1] = 2;
      }
    }
    for (let i = 0; i < this.world.length; i++) {
      this.world[i][this.world[i].length - 1] = 3;
    }
    // this.world[this.world.length - 5][
    //   this.world[this.world.length - 5].length - 2
    // ] = 2;
  }

  public getWorld(): number[][] {
    return this.world;
  }
}
