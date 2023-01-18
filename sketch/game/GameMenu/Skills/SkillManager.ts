class SkillManager {
  mining: SkillMining;
  bars: Bar[] = [];
  widthOffset: number = 100;
  heightOffset: number = 100;
  constructor() {
    this.mining = new SkillMining();
    this.bars[SkillsList.mining] = new Bar(150, 150, 300, 20, this.mining.getBarColor(), 5);
  }

  addXp(xpOrb: XP) {
    switch (xpOrb.type) {
      case SkillsList.mining:
        this.mining.addXp(xpOrb.xp);
        break;
    }
  }

  public show(): void {
    // ScreenOffset
    push();
    translate(-game.OffSetX, -game.OffSetY);
    rect(this.widthOffset, this.heightOffset, width - this.widthOffset * 2, height - this.heightOffset * 2);
    pop();

    this.bars[SkillsList.mining].setMinValue(lvlReq[this.mining.getLvl()]);
    this.bars[SkillsList.mining].setMaxValue(lvlReq[this.mining.getLvl() + 1]);
    this.bars[SkillsList.mining].setValue(this.mining.getXp());
    this.bars[SkillsList.mining].show();
  }
}
