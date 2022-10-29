class Inventory {
  public backpack: InventorySlot[][];

  public showBackpack: boolean = false;
  public selected: InventorySlot;

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
    this.backpack[0][0].addItem(new Pickaxe(0, 0));
  }

  public giveItem(itemID: itemList) {
    let pos = this.findSlot(itemID);
    if (pos.x === -1 || pos.y === -1) {
      throw "No space";
    }
    switch (itemID) {
      case itemList.Stone:
        this.backpack[pos.x][pos.y].addItem(new StoneItem(pos.x, pos.y));
        break;
      case itemList.Pickaxe:
        this.backpack[pos.x][pos.y].addItem(new Pickaxe(pos.x, pos.y));
        break;
      case itemList.Grass:
        this.backpack[pos.x][pos.y].addItem(new GrasItem(pos.x, pos.y));
        break;
      default:
        console.log("No itemID:", itemID);
    }
  }

  private findSlot(itemID: itemList): Coords {
    let stackslot = this.stackItem(itemID);
    if (stackslot.x != -1 || stackslot.y != -1) {
      return stackslot;
    }
    return this.findEmptySlot();
  }
  stackItem(itemID: itemList): Coords {
    let x = -1;
    let y = -1;
    let backpack = game.getPlayer().inventory.backpack;
    for (let i = 0; i < backpack.length; i++) {
      for (let j = 0; j < backpack[i].length; j++) {
        if (
          backpack[i][j].items[0].id === itemID &&
          backpack[i][j].items[0].stackSize() > backpack[i][j].items.length
        ) {
          x = backpack[i][j].InventoryPosX;
          y = backpack[i][j].InventoryPosY;
        }
      }
    }
    return {
      x: x,
      y: y,
    };
  }

  private findEmptySlot(): Coords {
    let x = -1;
    let y = -1;
    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items[0].id === itemList.Air) {
          x = i;
          y = j;
          break;
        }
      }
      if (x != -1) break;
    }

    return { x, y };
  }

  public show() {
    push();
    translate(-game.OFFSETX, -game.OFFSETY);

    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        this.backpack[i][j].showSlot();
        this.backpack[i][j].showItems();
        this.backpack[i][j].showStackSize();
      }
    }
    pop();
  }

  findItem(itemId: itemList, amount: number): Coords {
    let x = -1;
    let y = -1;
    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items[0].id === itemId) {
          if (this.backpack[i][j].items.length === amount) {
            return { x: i, y: j };
          }
        }
      }
    }
    // throw "no items";
    return { x, y };
  }

  hasItem(itemId: itemList): boolean {
    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items[0].id === itemId) {
          return true;
        }
      }
    }
    return false;
  }

  public itemSelector() {
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

  public getSelectedItemId() {
    return this.selected.items[0].id;
  }

  private boxSelector(x: number, y: number): Coords {
    x = Math.floor((x - offsetX) / Inventory.SLOTSIZE);
    y = Math.floor((y - offsetY) / Inventory.SLOTSIZE);
    return { x, y };
  }
}
