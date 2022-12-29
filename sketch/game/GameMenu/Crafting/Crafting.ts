class Crafting extends Menu {
  widthOffset: number = 100;
  heightOffset: number = 100;
  craftingRecipes: {
    name: string;
    items_requirement: { name: itemList; amount: number }[];
    item: itemList;
  }[];
  buttons: CraftingButton[] = [];
  private BUTTONSIZE: number = 100;
  constructor() {
    super();
    this.craftingRecipes = [
      {
        name: "test",
        items_requirement: [
          { name: itemList.Grass, amount: 1 },
          { name: itemList.Stone, amount: 3 },
        ],
        item: itemList.Grass,
      },
      {
        name: "recipe_pickaxe",
        items_requirement: [
          { name: itemList.Stone, amount: 3 },
          { name: itemList.Air, amount: 2 },
        ],
        item: itemList.Pickaxe,
      },
    ];
    for (let i = 0; i < this.craftingRecipes.length; i++)
      this.buttons.push(
        new CraftingButton(
          itemList[this.craftingRecipes[i].item],
          this.BUTTONSIZE * i + this.BUTTONSIZE,
          this.BUTTONSIZE,
          this.BUTTONSIZE,
          this.BUTTONSIZE,
          this.craftingRecipes[i].item,
          translateItemNameToItemReipe(this.craftingRecipes[i].name),
          20
        )
      );
  }

  show() {
    push();
    translate(-game.OffSetX, -game.OffSetY);

    rect(0 + this.widthOffset, 0 + this.heightOffset, width - this.widthOffset * 2, height - this.heightOffset * 2);
    this.buttons.forEach((item) => {
      item.show();
    });
    pop();
  }

  clicked() {
    this.buttons.forEach((item) => {
      item.clicked(this);
    });
  }

  /**
   * Checks if player has enoughs items in inventory and removes them
   * @param itemId
   * @returns
   */
  hasEnoughMaterials(itemId: craftingList): boolean {
    let inventory = game.getPlayer().getInventory();
    let itemReq: { name: itemList; amount: number }[] = this.craftingRecipes[itemId].items_requirement;
    let arr = [];

    for (let i = 0; i < itemReq.length; i++) {
      arr.push(inventory.hasItem(itemReq[i].name, itemReq[i].amount));
    }

    if (!arr.every((v) => v === true)) return false;

    for (let i = 0; i < itemReq.length; i++) {
      if (inventory.hasItem(itemReq[i].name, itemReq[i].amount)) {
        inventory.removeItem(itemReq[i].name, itemReq[i].amount);
      }
    }
    return true;
  }
}
