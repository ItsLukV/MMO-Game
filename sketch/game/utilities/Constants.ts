const canvasWidth = 960;
const canvasHeight = 640;
const TILE_SIZE: number = 64;
const PLAYER_SIZE: number = 32;

const WORLDHEIGHT = 10;
const WORLDWIDTH = 30;

const offsetX = canvasWidth / 2 - (Inventory.SlotSize * Inventory.BACKPACKWITDH) / 2;
const offsetY = canvasHeight / 2 - (Inventory.SlotSize * Inventory.BACKPACKHEIGHT) / 2;

enum tileList {
  Air = 0,
  Grass = 1,
  Stone = 2,
  Bedrock = 3,
  TempTile = 4,
  Water = 5,
}

enum itemList {
  Air = 0,
  Stone = 1,
  Grass = 2,
  Pickaxe = 3,
  TeleportStick = 4,
  Bedrock = 5,
}

enum menuList {
  game = 0,
  inventory = 1,
  crafting = 2,
  skill = 3,
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

enum SkillsList {
  none = 0,
  mining = 1,
}
