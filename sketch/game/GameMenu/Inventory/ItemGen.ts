class ItemGen {
  static getPickaxe(InventoryPosX: number, InventoryPosY: number): Item {
    let item: itemInput = {
      InventoryPosX: InventoryPosX,
      InventoryPosY: InventoryPosY,
      id: itemList.Pickaxe,
      img: itemImg[itemList.Pickaxe],
      stackSize: 1,
      abilities: [new Mining()],
    };
    return new Item(item);
  }

  static getEmpty(InventoryPosX: number, InventoryPosY: number): Item {
    let item: itemInput = {
      InventoryPosX: InventoryPosX,
      InventoryPosY: InventoryPosY,
      id: itemList.Air,
      img: itemImg[itemList.Air],
      stackSize: 1,
      abilities: [],
    };
    return new Item(item);
  }

  static getStone(InventoryPosX: number, InventoryPosY: number): Item {
    let item: itemInput = {
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

  static getTeleportStick(InventoryPosX: number, InventoryPosY: number): Item {
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

  static itemPicker(itemID: itemList, InventoryPosX: number, InventoryPosY: number): Item {
    let item;
    switch (itemID) {
      case itemList.Air:
        item = ItemGen.getEmpty(InventoryPosX, InventoryPosY);
        break;
      case itemList.Grass:
        item = ItemGen.getGrass(InventoryPosX, InventoryPosY);
        break;
      case itemList.Stone:
        item = ItemGen.getStone(InventoryPosX, InventoryPosY);
        break;
      case itemList.Pickaxe:
        item = ItemGen.getPickaxe(InventoryPosX, InventoryPosY);
        break;
      case itemList.TeleportStick:
        item = ItemGen.getTeleportStick(InventoryPosX, InventoryPosY);
        break;
    }
    return item;
  }
}
