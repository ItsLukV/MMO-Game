function GameWorldToTile(x: number, y: number): Coords {
  x = Math.floor(x / TILE_SIZE);
  y = Math.floor(y / TILE_SIZE);
  return { x: x, y: y };
}

function TileToGameWorld(x: number, y: number): Coords {
  x *= TILE_SIZE;
  y *= TILE_SIZE;
  return { x, y };
}

function TileLookUp(x: number, y: number): Tile {
  try {
    let tileCoords = GameWorldToTile(x, y);
    let tile = game.getWorld().tiles[tileCoords.x][tileCoords.y];
    return tile;
  } catch (error) {
    switch (error.message) {
      case "game.getWorld().tiles[tileCoords.x] is undefined":
        throw new Error("Mouse is outside of the grid");
      case "game.getWorld().tiles[tileCoords.y] is undefined":
        throw new Error("Mouse is outside of the grid");
      default:
      // console.error(error);
    }
  }
}

interface Coords {
  x: number;
  y: number;
}
