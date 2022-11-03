class Mining {
  constructor() {}
  mouseHover() {
    try {
      if (game.getPlayer().getInventory().showBackpack) return;

      if (!TileLookUp(mouseX - game.OFFSETX, mouseY - game.OFFSETY).isSoild())
        return;
      push();
      let mouseTile = GameWorldToTile(
        mouseX - game.OFFSETX,
        mouseY - game.OFFSETY
      );
      let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
      noFill();
      strokeWeight(5);
      rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);
      pop();
    } catch (error) {
      //   if (error.message != "Mouse is outside of the grid") console.error(error);
    }
  }

  public mousePressed() {
    try {
      let tile = TileLookUp(mouseX - game.OFFSETX, mouseY - game.OFFSETY);
      let inventory = game.getPlayer().getInventory();
      if (!tile.isSoild()) return;
      if (!tile.isBreakable()) return;
      if (inventory.showBackpack) return;
      if (inventory.getSelectedItemId() != itemList.Pickaxe) return;
      if (tile.breakingLevel < breakingImg.length - 1) tile.breakingLevel++;
      else if (tile.breakingLevel === breakingImg.length - 1) {
        let worldTile = GameWorldToTile(tile.x, tile.y);
        inventory.giveItem(tile.item());
        game
          .getWorld()
          .changeTile(
            worldTile.x,
            worldTile.y,
            tileID.TempTile,
            tile.id,
            tile.getRegenerationSpeed()
          );
        game.getPlayer().skillManager.addXp(tile.xp());
      }
    } catch (error) {
      //   if (error.message != "Mouse is outside of the grid") console.error(error);
    }
  }
}
