class TilesGen {
  constructor() {}

  /**
   * Creates and returns a Bedrock tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @returns
   */
  static getBedrockTile(x: number, y: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.Bedrock,
      image: tilesImg[tileList.Bedrock],
      item: itemList.Bedrock,
      breakingLevel: 0,
      regenerationSpeed: 1000,
      isSolid: true,
      isBreakable: false,
      hoverable: true,
      xp: { xp: 0, type: SkillsList.none },
    };

    return new Tile(tile);
  }

  /**
   * Creates and returns a Air tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @returns
   */
  static getAirTile(x: number, y: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.Air,
      image: tilesImg[tileList.Air],
      item: itemList.Air,
      breakingLevel: 0,
      regenerationSpeed: 1000,
      isSolid: false,
      isBreakable: false,
      hoverable: false,
      xp: { xp: 0, type: SkillsList.none },
    };
    return new Tile(tile);
  }

  /**
   * Creates and returns a Grass tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @returns
   */
  static getGrassTile(x: number, y: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.Grass,
      image: tilesImg[tileList.Grass],
      item: itemList.Grass,
      breakingLevel: 0,
      regenerationSpeed: 1000 * 60,
      isSolid: true,
      isBreakable: true,
      hoverable: true,
      xp: { xp: 1, type: SkillsList.mining },
    };
    return new Tile(tile);
  }

  /**
   * Creates and returns a Grass tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @returns
   */
  static getDirtTile(x: number, y: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.Grass,
      image: tilesImg[tileList.Dirt],
      item: itemList.Grass,
      breakingLevel: 0,
      regenerationSpeed: 1000 * 60,
      isSolid: true,
      isBreakable: true,
      hoverable: true,
      xp: { xp: 1, type: SkillsList.mining },
    };
    return new Tile(tile);
  }

  /**
   * Creates and returns a Stone tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @returns
   */
  static getStoneTile(x: number, y: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.Stone,
      image: tilesImg[tileList.Stone],
      item: itemList.Stone,
      breakingLevel: 0,
      regenerationSpeed: 1000 * 60,
      isSolid: true,
      isBreakable: true,
      hoverable: true,
      xp: { xp: 1, type: SkillsList.mining },
    };
    return new Tile(tile);
  }

  /**
   * Creates and returns a Temp tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @param afterId TileList id of the tile it changes to
   * @param regenerationSpeed How long the tempTile is alive
   * @returns
   */
  static getTempTile(x: number, y: number, afterId: tileList, regenerationSpeed: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.TempTile,
      image: tilesImg[tileList.Bedrock],
      item: itemList.Air,
      breakingLevel: 0,
      regenerationSpeed: 1000,
      isSolid: true,
      isBreakable: false,
      hoverable: true,
      xp: { xp: 0, type: SkillsList.mining },
      creationFunction: () => {
        setTimeout(() => {
          let worldTile = GameWorldToTile(x, y);
          game.getWorld().changeTile(worldTile.x, worldTile.y, afterId);
        }, regenerationSpeed);
      },
    };
    return new Tile(tile);
  }

  /**
   * Creates and returns a Water tile
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @returns
   */
  static getWaterTile(x: number, y: number): Tile {
    let tile: TileInput = {
      x: x,
      y: y,
      w: TILE_SIZE,
      id: tileList.Water,
      image: tilesImg[tileList.Water],
      item: itemList.Air,
      breakingLevel: 0,
      regenerationSpeed: 1000 * 60,
      isSolid: false,
      isBreakable: false,
      hoverable: true,
      xp: { xp: 0, type: SkillsList.none },
    };
    return new Tile(tile);
  }

  /**
   * Returns a tile based on tileId
   * @param tileId Id of the tile in question
   * @param x pos in world/tiles array
   * @param y pos in world/tiles array
   * @param afterId TileList id of the tile it changes to
   * @param regenerationSpeed How long the tempTile is alive
   * @returns
   */
  static tilePicker(tileId: tileList, x: number, y: number, afterId?: tileList, regenerationSpeed?: number): Tile {
    switch (tileId) {
      case tileList.Air:
        return TilesGen.getAirTile(x, y);
      case tileList.Grass:
        return TilesGen.getGrassTile(x, y);
      case tileList.Stone:
        return TilesGen.getStoneTile(x, y);
      case tileList.Bedrock:
        return TilesGen.getBedrockTile(x, y);
      case tileList.TempTile:
        return TilesGen.getTempTile(x, y, afterId, regenerationSpeed);
      case tileList.Water:
        return TilesGen.getWaterTile(x, y);
      case tileList.Dirt:
        return TilesGen.getDirtTile(x, y);
    }
  }
}
