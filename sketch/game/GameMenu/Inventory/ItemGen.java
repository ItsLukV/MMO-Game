package sketch.game.GameMenu.Inventory;

import java.util.ArrayList;

import sketch.game.utilities.Constants;

public class ItemGen {
  
  static Item getPickaxe(int InventoryPosX,int InventoryPosY) {
    itemInput item = {
      InventoryPosX: InventoryPosX,
      InventoryPosY: InventoryPosY,
      id: itemList.Pickaxe,
      img: itemImg[itemList.Pickaxe],
      stackSize: 1,
      abilities: [new Mining()],
    };
    return new Item(item);
  }

  public static Item getEmpty(int InventoryPosX1,int InventoryPosY1) {
    itemInput item = new itemInput() {
      int InventoryPosX = InventoryPosX1;
      int InventoryPosY = InventoryPosY1;
      int stackSize = 1;
      Constants.itemList id = Constants.itemList.Air;
      ArrayList<Abilities> abilities = new ArrayList<Abilities>();
      p5.Image img = itemImg[Integer.parseInt(Constants.itemList.Air.toString())];
      
    }
    return new Item(item);
  }

  static getStone(InventoryPosX: number, InventoryPosY: number): Item {
    itemInput item = {
      InventoryPosX: InventoryPosX,
      InventoryPosY: InventoryPosY,
      id: itemList.Stone,
      img: itemImg[itemList.Stone],
      stackSize: 99,
      abilities: [],
    };
    return new Item(item);
  }

  static getGrass(InventoryPosX: number, InventoryPosY: number): Item {
    let item: itemInput = {
      InventoryPosX: InventoryPosX,
      InventoryPosY: InventoryPosY,
      id: itemList.Grass,
      img: itemImg[itemList.Grass],
      stackSize: 99,
      abilities: [],
    };
    return new Item(item);
  }

  static Item getTeleportStick(int InventoryPosX,int InventoryPosY){
    let item: itemInput = {
      InventoryPosX: InventoryPosX,
      InventoryPosY: InventoryPosY,
      id: itemList.TeleportStick,
      img: itemImg[itemList.TeleportStick],
      stackSize: 1,
      abilities: [new Teleport(10 * TILE_SIZE)],
    };
    return new Item(item);
  }

  static Item itemPicker(Constants.itemList itemID, int InventoryPosX,int InventoryPosY) {
    Item item;
    switch (itemID) {
      case Air:
        item = ItemGen.getEmpty(InventoryPosX, InventoryPosY);
        break;
      case Grass:
        item = ItemGen.getGrass(InventoryPosX, InventoryPosY);
        break;
      case Stone:
        item = ItemGen.getStone(InventoryPosX, InventoryPosY);
        break;
      case Pickaxe:
        item = ItemGen.getPickaxe(InventoryPosX, InventoryPosY);
        break;
      case TeleportStick:
        item = ItemGen.getTeleportStick(InventoryPosX, InventoryPosY);
        break;
      default:
        break;
    }
    return item;
  }
}
