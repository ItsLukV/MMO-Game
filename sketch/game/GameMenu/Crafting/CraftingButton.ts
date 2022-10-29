class CraftingButton extends StartMenuButtons {
  itemId: itemList;
  recipeId: craftingList;
  constructor(
    txt: string,
    x: number,
    y: number,
    w: number,
    h: number,
    itemId: itemList,
    recipeId: craftingList,
    txtSize?: number
  ) {
    super(txt, x, y, w, h, txtSize);
    this.itemId = itemId;
    this.recipeId = recipeId;
  }

  clicked(crafting: Crafting): void {
    if (this.mouseCollions()) {
      if (crafting.hasEnoughMaterials(this.recipeId))
        game.getPlayer().getInventory().giveItem(this.itemId);
    }
  }
}
