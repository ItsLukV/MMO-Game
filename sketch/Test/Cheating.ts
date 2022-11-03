class Cheating {
  constructor() {}
  giveItem(itemId: itemList, amount?: number) {
    if (amount === undefined) amount = 1;
    console.log(amount);
    for (let i = 0; i < amount; i++)
      game.getPlayer().getInventory().giveItem(itemId);
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
}

console.log("Cheating: Enabled");
let cheats = new Cheating();
