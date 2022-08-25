function GameWorldToTile(x: number, y: number) {
  let x2 = Math.floor(x / TileSize);
  let y2 = Math.floor(y / TileSize);
  return { x: x2, y: y2 };
}

function TileLookUp(x: number, y: number) {
  let tileCoords = GameWorldToTile(x, y);
  let tile = world.world[tileCoords.x][tileCoords.y];
  return tile;
}
