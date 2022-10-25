class InventorySlot {
  item: Item;
  selected: boolean;
  _InventoryPosX: number;
  _InventoryPosY: number;
  constructor(item: Item, InventoryPosX: number, InventoryPosY: number) {
    this.item = item;
    this.selected = false;
    this._InventoryPosX = InventoryPosX;
    this._InventoryPosY = InventoryPosY;
  }

  showSlot() {
    if (this.selected) fill(0, 255, 0);
    else fill(220);
    rect(
      this._InventoryPosX * Inventory.SLOTSIZE + offsetX,
      this._InventoryPosY * Inventory.SLOTSIZE + offsetY,
      Inventory.SLOTSIZE,
      Inventory.SLOTSIZE
    );
  }

  // checkStack(): itemList {
  //   return this.item[0].id;
  // }
}
