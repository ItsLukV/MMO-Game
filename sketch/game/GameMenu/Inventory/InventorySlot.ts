class InventorySlot {
  items: Item[] = [];
  selected: boolean;
  InventoryPosX: number;
  InventoryPosY: number;
  constructor(item: Item, InventoryPosX: number, InventoryPosY: number) {
    this.items.push(item);
    this.selected = false;
    this.InventoryPosX = InventoryPosX;
    this.InventoryPosY = InventoryPosY;
  }

  showSlot() {
    if (this.selected) fill(0, 255, 0);
    else fill(220);
    rect(
      this.InventoryPosX * Inventory.SLOTSIZE + offsetX,
      this.InventoryPosY * Inventory.SLOTSIZE + offsetY,
      Inventory.SLOTSIZE,
      Inventory.SLOTSIZE
    );
  }

  showStackSize() {
    if (this.items.length <= 1) return;
    fill(0);
    text(
      this.items.length,
      this.InventoryPosX * Inventory.SLOTSIZE +
        offsetX +
        Inventory.SLOTSIZE / 2,
      this.InventoryPosY * Inventory.SLOTSIZE + offsetY + Inventory.SLOTSIZE / 2
    );
  }

  public showItems() {
    for (let item of this.items) {
      item.showItem();
    }
  }

  addItem(item: Item) {
    if (this.items[0].id === itemList.Air) {
      this.items = [];
      this.items.push(item);
    } else {
      this.items.push(item);
    }
  }

  // checkStack(): itemList {
  //   return this.item[0].id;
  // }
}
