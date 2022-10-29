class GrasItem extends Item {
  constructor(InventoryPosX: number, InventoryPosY: number) {
    super(InventoryPosX, InventoryPosY, itemList.Grass);
  }

  public showItem() {
    let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
    let offsetX =
      width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
    let offsetY =
      height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
    fill(0, 127, 0);
    rect(
      this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset,
      this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset,
      this.width,
      this.width
    );
  }
  stackSize(): number {
    return 99;
  }
}
