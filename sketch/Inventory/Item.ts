class Item {
  _id: itemList;
  _InventoryPosX: number;
  _InventoryPosY: number;
  _width: number = 64;

  constructor(InventoryPosX: number, InventoryPosY: number, id: itemList) {
    this._InventoryPosX = InventoryPosX;
    this._InventoryPosY = InventoryPosY;
    this._id = id;
  }
  showItem() {
    push();

    let itemBoxOffset = (Inventory.SLOTSIZE - this._width) / 2;

    let offsetX =
      width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
    let offsetY =
      height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;

    if (this._id === itemList.Pickaxe) fill(240, 3, 14);
    else fill(255, 255, 255);
    rect(
      this._InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset,
      this._InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset,
      this._width,
      this._width
    );
    pop();
  }
}

enum itemList {
  Air = 0,
  Pickaxe = 1,
}
