class Mining extends Abilities {
  manaCost: number = 0;
  abilitySelected(): void {
    console.info("A mining item a been selected");
  }
  constructor() {
    super();
  }
  abilityTick(playerX: number, playerY: number): void {
    this.mouseHover();
  }
  abilityClicked(): void {
    let tile = TileLookUp(mouseX - game.OffSetX, mouseY - game.OffSetY);
    let inventory = game.getPlayer().getInventory();
    if (!tile.isSolid()) return;
    if (!tile.isBreakable()) return;
    if (inventory.showBackpack) return;
    if (inventory.getSelectedItemId() != itemList.Pickaxe) return;

    if (tile.getBreakingLevel() < breakingImg.length - 1) {
      tile.setBreakingLevel(tile.getBreakingLevel() + 1);
    } else if (tile.getBreakingLevel() === breakingImg.length - 1) {
      let worldTile = GameWorldToTile(tile.getX(), tile.getY());
      inventory.giveItem(tile.getItem());
      // game.getWorld().changeTile(worldTile.x, worldTile.y, tileList.TempTile, tile.getId(), tile.getRegenerationSpeed());
      game.getWorld().changeTile(worldTile.x, worldTile.y, tileList.Air);
      game.getPlayer().getSkillManager().addXp(tile.xp());
    }
  }
  mouseHover() {
    try {
      if (game.getPlayer().showMenu != menuList.game) return;

      if (!TileLookUp(mouseX - game.OffSetX, mouseY - game.OffSetY).isHoverable()) return;
      push();
      let mouseTile = GameWorldToTile(mouseX - game.OffSetX, mouseY - game.OffSetY);
      let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
      noFill();
      strokeWeight(5);
      rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);
      pop();
    } catch (error) {
      //   if (error.message != "Mouse is outside of the grid") console.error(error);
    }
  }
}
