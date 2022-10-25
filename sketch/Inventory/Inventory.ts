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

  public giveItem(itemID: itemList) {
    let pos = this.findEmptySlot();
    if (pos.x === -1 || pos.y === -1) {
      console.log("No space!");
      return;
    }
    switch (itemID) {
      case 1:
        this.backpack[pos.x][pos.y].item = new StoneItem(pos.x, pos.y);
        break;
      case 3:
        this.backpack[pos.x][pos.y].item = new Pickaxe(pos.x, pos.y);
        break;
      case itemList.Grass:
        this.backpack[pos.x][pos.y].item = new GrasItem(pos.x, pos.y);
        break;
      default:
        console.log("No itemID:", itemID);
    }
  }

  private findEmptySlot(): Coords {
    let x = -1;
    let y = -1;
    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].item.id === itemList.Air) {
          x = i;
          y = j;
          break;
        }
      }
      if (x != -1) break;
    }
    return { x, y };
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
