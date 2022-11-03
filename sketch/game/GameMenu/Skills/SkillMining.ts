class SkillMining extends Skill {
  constructor() {
    super();
    this.maxLvl = 100;
    this.barColor = { r: 100, g: 100, b: 100 };
  }

  getBarColor() {
    return this.barColor;
  }
}
