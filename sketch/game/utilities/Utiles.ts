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

function translateItemNameToId(itemName: string): itemList {
  switch (itemName.toUpperCase()) {
    case "STONE":
      return itemList.Stone;
    case "AIR":
      return itemList.Air;
    case "GRASS":
      return itemList.Grass;
    case "PICKAXE":
      return itemList.Pickaxe;
  }
  throw "No Item Name" + itemName;
}

function translateItemNameToItemReipe(itemName: string): craftingList {
  switch (itemName.toUpperCase()) {
    case "TEST":
      return craftingList.test;
    case "RECIPE_PICKAXE":
      craftingList.recipe_pickaxe;
  }
  return;
}
interface Coords {
  x: number;
  y: number;
}

function itemListToName(itemId: itemList): itemName {
  switch (itemId) {
    case itemList.Air:
      return itemName.Air;
    case itemList.Stone:
      return itemName.Stone;
    case itemList.Grass:
      return itemName.Grass;
    case itemList.Pickaxe:
      return itemName.Pickaxe;
    default:
      throw "no name/list";
  }
}

interface XP {
  xp: number;
  type: SkillsList;
}

interface Color {
  r: number;
  g: number;
  b: number;
}
