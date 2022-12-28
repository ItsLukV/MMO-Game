class Item {
  private id: itemList;
  private InventoryPosX: number;
  private InventoryPosY: number;
  width: number = 64;
  img: p5.Image;
  private stackSize: number;
  private abilities: Abilities[];

  constructor(obj: itemInput) {
    this.InventoryPosX = obj.InventoryPosX;
    this.InventoryPosY = obj.InventoryPosY;
    this.id = obj.id;
    this.img = obj.img;
    this.stackSize = obj.stackSize;
    this.abilities = obj.abilities;
  }

  showItem() {
    let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
    let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
    let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
    image(this.img, this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
  }
  // showItem() {
  //   push();

  //   let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
  //   let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
  //   let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
  //   fill(255, 255, 255);
  //   rect(this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
  //   pop();
  // }

  getStackSize(): number {
    return this.stackSize;
  }

  getItem(): Item {
    return this;
  }

  getInventoryPos(): Coords {
    return { x: this.InventoryPosX, y: this.InventoryPosY };
  }

  getId(): number {
    return this.id;
  }

  itemSelected(): void {
    this.abilities.forEach((element) => {
      element.abilitySelected();
    });
  }

  clicked(playerX: number, playerY: number) {
    this.abilities.forEach((element) => {
      element.abilityClicked(playerX, playerY);
    });
  }

  tick(playerX: number, playerY: number) {
    this.abilities.forEach((element) => {
      element.abilityTick(playerX, playerY);
    });
  }
}

interface itemInput {
  InventoryPosX: number;
  InventoryPosY: number;
  id: itemList;
  stackSize: number;
  img: p5.Image;
  abilities: Abilities[];
}
