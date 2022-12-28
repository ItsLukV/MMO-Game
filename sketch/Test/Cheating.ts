class Cheating {
  constructor() {
    console.log("Cheating: Enabled");
  }
  giveItem(itemId: itemList, amount?: number) {
    if (amount === undefined) amount = 1;
    for (let i = 0; i < amount; i++) game.getPlayer().getInventory().giveItem(itemId);
    console.log(`Gived: ${itemList[itemId]}: ${amount}`);
  }

  setPlayer(x: number, y: number) {
    game.getPlayer().x = x;
    game.getPlayer().y = y;
  }

  changeTile(x: number, y: number, tileId: tileID) {
    game.getWorld().changeTile(x, y, tileId);
  }

  giveXp(xp: number, type: SkillsList) {
    game.getPlayer().getSkillManager().addXp({ xp: xp, type: type });
  }

  testCraft() {
    this.giveItem(itemList.Grass, 99);
    this.giveItem(itemList.Stone, 99);
  }
}

let cheats = new Cheating();
