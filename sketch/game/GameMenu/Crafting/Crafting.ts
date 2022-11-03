class Crafting extends Menu {
  widthOffset: number = 100;
  heightOffset: number = 100;
  craftingRecipes: craftingRecipesInterface[];
  buttons: CraftingButton[] = [];
  private BUTTONSIZE: number = 100;
  constructor() {
    super();
    getRecipes();
  }

  afterGettingDataconstructor() {
    for (let i = 0; i < this.craftingRecipes.length; i++)
      this.buttons.push(
        new CraftingButton(
          this.craftingRecipes[i].item,
          this.BUTTONSIZE * i + this.BUTTONSIZE,
          this.BUTTONSIZE,
          this.BUTTONSIZE,
          this.BUTTONSIZE,
          translateItemNameToId(this.craftingRecipes[i].item),
          translateItemNameToItemReipe(this.craftingRecipes[i].name),
          20
        )
      );
  }

  show() {
    push();
    translate(-game.OFFSETX, -game.OFFSETY);

    rect(
      0 + this.widthOffset,
      0 + this.heightOffset,
      width - this.widthOffset * 2,
      height - this.heightOffset * 2
    );
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

  hasEnoughMaterials(itemId: craftingList): boolean {
    let inventory = game.getPlayer().getInventory();
    switch (itemId) {
      case craftingList.test:
        let item = this.craftingRecipes[itemId].items_requrment;

        for (let i = 0; i < item.length; i++)
          if (inventory.hasItem(itemList.Grass)) {
            let pos = inventory.findItem(itemList.Grass, item[i].amount);
            if (pos.x === -1 || pos.y === -1) return false;
          }
    }
    return false;
  }
}

interface craftingRecipesInterface {
  name: string;
  items_requrment: [{ name: string; amount: number }];
  item: string;
}
