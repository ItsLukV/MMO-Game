class TilesGen {
  constructor() {}
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
    }
  }
}
