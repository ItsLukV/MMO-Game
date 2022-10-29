// const GROUNDLEVEL: number = 640 - 64;
const canvasWidth = 960;
const canvasHeight = 640;
const TILE_SIZE: number = 64;
const PLAYER_SIZE: number = 32;

const WORLDHEIGHT = 10;
const WORLDWIDTH = 30;

const offsetX =
  canvasWidth / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
const offsetY =
  canvasHeight / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;

enum tileID {
  Air = 0,
  Grass = 1,
  Stone = 2,
  Bedrock = 3,
  TempTile = 4,
}

enum itemList {
  Air = 0,
  Stone = 1,
  Grass = 2,
  Pickaxe = 3,
}

enum menuList {
  game = 0,
  inventory = 1,
  crafting = 2,
}

enum itemName {
  Air = "Air",
  Stone = "Stone",
  Grass = "Grass",
  Pickaxe = "Pickaxe",
}

enum craftingList {
  test = 0,
  recipe_pickaxe = 1,
}
