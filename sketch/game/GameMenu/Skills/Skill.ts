abstract class Skill {
  private xp: number;
  private lvl: number;
  protected maxLvl: number;
  protected barColor: Color;
  constructor() {
    this.xp = 0;
    this.lvl = 0;
  }

  getMaxLvl() {
    return this.maxLvl;
  }

  addXp(xp: number): void {
    this.xp += xp;
    if (this.lvl < this.maxLvl) this.setLvl(this.XpToLvl(this.xp));
    console.info(
      this.constructor.name + ":",

      this.xp + " xp",
      "|",
      this.lvl + " lvl"
    );
  }

  setLvl(lvl: number) {
    this.lvl = lvl;
  }
  private XpToLvl(xp: number): number {
    return Math.floor(Math.pow(xp, 0.5));
  }
  getXp(): number {
    return this.xp;
  }

  getLvl(): number {
    return this.lvl;
  }
}
