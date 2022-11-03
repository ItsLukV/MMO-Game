class SkillManager {
  mining: SkillMining;
  bars: Bar[] = [];
  constructor() {
    this.mining = new SkillMining();
    this.bars.push(new Bar(20, 20, 200, 20, this.mining.getBarColor()));
  }

  addXp(xpOrb: XP) {
    switch (xpOrb.type) {
      case SkillsList.mining:
        this.mining.addXp(xpOrb.xp);
        break;
    }
  }

  public show(): void {
    push();
    translate(-game.OFFSETX, -game.OFFSETY);
    this.bars.forEach((item) => {
      item.show(this.mining.getLvl());
    });
    pop();
  }
}
