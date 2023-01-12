package sketch.game.utilities;

import sketch.game.GameMenu.Inventory.Inventory;

public class Constants {
  public final int canvasWidth = 960;
  public final int canvasHeight = 640;
  public final int TILE_SIZE = 64;
  public final int PLAYER_SIZE = 32;
  
  public final int WORLDHEIGHT = 10;
  public final int WORLDWIDTH = 30;
  
  public final  int offsetX = canvasWidth / 2 - (Inventory.SlotSize * Inventory.BACKPACKWITDH) / 2;
  public final  int offsetY = canvasHeight / 2 - (Inventory.SlotSize * Inventory.BACKPACKHEIGHT) / 2;
  
  public enum tileList {
    Air,
    Grass,
    Stone,
    Bedrock,
    TempTile,
    Water,
    Dirt,
  }
  public enum itemList {
    Air,
    Stone,
    Grass,
    Pickaxe,
    TeleportStick,
    Bedrock,
  }
  
  enum menuList {
    game,
    inventory,
    crafting,
    skill,
  }
  
  enum itemName {
    Air,
    Stone,
    Grass,
    Pickaxe,
  }
  
  enum craftingList {
    test,
    recipe_pickaxe,
  }
  
  enum SkillsList {
    none,
    mining,
  }
}
