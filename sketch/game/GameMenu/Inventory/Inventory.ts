class Inventory {
  public backpack: InventorySlot[][];

  public showBackpack: boolean = false;
  public selected: InventorySlot = null;

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
        this.backpack[i][j] = new InventorySlot(ItemGen.getEmpty(i, j), i, j);
      }
    }

    //TODO dev pickaxe
    this.backpack[0][0].addItem(ItemGen.getPickaxe(0, 0));
    this.backpack[1][0].addItem(ItemGen.getTeleportStick(1, 0));
  }

  public giveItem(itemID: itemList, amount: number = 1) {
    let pos = this.findSlot(itemID);
    if (pos.x === -1 || pos.y === -1) {
      throw "No space";
    }
    for (let i = 0; i < amount; i++) {
      this.backpack[pos.x][pos.y].addItem(ItemGen.itempicker(itemID, pos.x, pos.y));
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
    let backpack = game.getPlayer().getInventory().backpack;
    for (let i = 0; i < backpack.length; i++) {
      for (let j = 0; j < backpack[i].length; j++) {
        if (backpack[i][j].items[0].getId() === itemID && backpack[i][j].items[0].getStackSize() > backpack[i][j].items.length) {
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
        if (this.backpack[i][j].items[0].getId() === itemList.Air) {
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
    translate(-game.OffSetX, -game.OffSetY);

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
        if (this.backpack[i][j].items[0].getId() === itemId) {
          if (this.backpack[i][j].items.length >= amount) {
            return { x: i, y: j };
          }
        }
      }
    }
    // throw "no items";
    return { x, y };
  }

  hasItem(itemId: itemList, amount: number): boolean {
    for (let i = 0; i < this.backpack.length; i++) {
      for (let j = 0; j < this.backpack[i].length; j++) {
        if (this.backpack[i][j].items[0].getId() === itemId) {
          if (this.backpack[i][j].items.length >= amount) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private itemSelector() {
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

  public getSelectedItem(): Item[] {
    if (this.selected !== null) {
      return this.selected.items;
    }
  }

  public getSelectedItemId() {
    return this.selected.items[0].getId();
  }

  private boxSelector(x: number, y: number): Coords {
    x = Math.floor((x - offsetX) / Inventory.SLOTSIZE);
    y = Math.floor((y - offsetY) / Inventory.SLOTSIZE);
    return { x, y };
  }

  public removeItem(item: itemList, amount: number) {
    for (let i = 0; i < amount; i++) {
      let pos = this.findItem(item, 1);
      let items = this.backpack[pos.x][pos.y].items;
      items.pop();

      if (items.length === 0) {
        this.backpack[pos.x][pos.y].items[0] = ItemGen.getEmpty(pos.x, pos.y);
      }
    }
  }

  public mousePressed() {
    this.itemSelector();
    if (this.selected !== null)
      this.selected.items.forEach((element) => {
        element.itemSelected();
      });
  }
}
