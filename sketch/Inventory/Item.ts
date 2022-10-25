class Item {
  id: itemList;
  InventoryPosX: number;
  InventoryPosY: number;
  width: number = 64;
  img: p5.Image;

  constructor(
    InventoryPosX: number,
    InventoryPosY: number,
    id: itemList,
    img?: p5.Image
  ) {
    this.InventoryPosX = InventoryPosX;
    this.InventoryPosY = InventoryPosY;
    this.id = id;
    this.img = img;
  }

  public showItem() {
    push();

    let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
    let offsetX =
      width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
    let offsetY =
      height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
    fill(255, 255, 255);
    rect(
      this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset,
      this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset,
      this.width,
      this.width
    );
    pop();
  }

  item(): itemList {
    return itemList.Air;
  }
}
