class Inventory {
  backpack: InventorySlot[][];

  public showBackpack: boolean = false;
  selected: InventorySlot;

  static SLOTSIZE: number = 74;
  static BACKPACKWITDH: number = 10;
  static BACKPACKHEIGHT: number = 3;
  constructor() {
    this.backpack = new Array(Inventory.BACKPACKWITDH);
    for (let i = 0; i < this.backpack.length; i++) {
      this.backpack[i] = new Array(Inventory.BACKPACKHEIGHT);
    }
    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        this.backpack[i][j] = new InventorySlot(
          new Item(i, j, itemList.Air),
          i,
          j
        );
      }
    }

    //TODO dev pickaxe
    this.backpack[0][0].item = new Pickaxe(0, 0);
  }

  public giveItem(itemID: number, slotX: number, slotY: number) {
    switch (itemID) {
      case 0:
        this.backpack[slotX][slotY].item = new Pickaxe(slotX, slotY);
        break;
    }
  }

  show() {
    if (this.showBackpack === false) return;
    push();
    translate(-game.OFFSETX, -game.OFFSETY);

    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        this.backpack[i][j].showSlot();
        this.backpack[i][j].item.showItem();
      }
    }

    pop();
  }

  public itemSelector() {
    if (this.showBackpack === false) return;

    let mouseTilePos = this.boxSelector(mouseX, mouseY);

    let slot = this.backpack[mouseTilePos.x][mouseTilePos.y];
    if (slot.selected === true) {
      slot.selected = false;
      this.selected = null;
    } else {
      if (this.selected != null) this.selected.selected = false;
      slot.selected = true;
      this.selected = slot;
    }
  }

  private boxSelector(x: number, y: number): Coords {
    x = Math.floor((x - offsetX) / Inventory.SLOTSIZE);
    y = Math.floor((y - offsetY) / Inventory.SLOTSIZE);
    return { x, y };
  }
}
