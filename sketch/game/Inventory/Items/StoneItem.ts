class StoneItem extends Item {
  constructor(InventoryPosX: number, InventoryPosY: number) {
    super(InventoryPosX, InventoryPosY, itemList.Stone);
  }

  public showItem() {
    let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
    let offsetX =
      width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
    let offsetY =
      height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
    fill(128, 128, 128);
    rect(
      this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset,
      this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset,
      this.width,
      this.width
    );
  }
}
