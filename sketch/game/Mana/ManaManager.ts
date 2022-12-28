class ManaManager {
  private mana: number;
  private maxMana: number;
  private manaBar: Bar;
  constructor() {
    this.mana = 100;
    this.maxMana = 100;
    this.manaBar = new Bar(5, 5, 300, 20, { r: 71, g: 184, b: 255 }, 5);
    this.manaBar.setMinValue(0);
    this.manaBar.setMaxValue(100);
  }

  useMana(manaCost: number) {
    this.mana -= manaCost;
  }

  show() {
    this.manaBar.setValue(this.mana);
    this.manaBar.show();
  }

  tick() {
    this.manaRegeneration();
  }

  private manaRegeneration() {
    if (this.mana < this.maxMana) this.mana += 1;
  }

  getMana(): number {
    return this.mana;
  }

  getMaxMana() {
    return this.maxMana;
  }
}
