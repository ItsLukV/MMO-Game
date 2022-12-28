abstract class Skill {
  protected xp: number;
  protected lvl: number;
  abstract maxLvl: number;
  abstract barColor: Color;
  constructor() {
    this.lvl = 1;
    this.xp = lvlReq[this.lvl];
  }

  getMaxLvl() {
    return this.maxLvl;
  }

  addXp(xp: number): void {
    this.xp += xp;
    this.updateLvl();
    console.info(`${this.constructor.name} : ${this.xp} xp | ${this.lvl} lvl`);
  }

  getXp(): number {
    return this.xp;
  }

  getLvl(): number {
    return this.lvl;
  }

  updateLvl() {
    if (lvlReq[this.lvl + 1] <= this.xp) {
      this.lvl++;
      this.updateLvl();
    }
  }

  getBarColor() {
    return this.barColor;
  }
}
