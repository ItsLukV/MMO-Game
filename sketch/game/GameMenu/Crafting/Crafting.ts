class Crafting extends Menu {
  widthOffset: number = 100;
  heightOffset: number = 100;
  showCraft: boolean;
  constructor() {
    super();
  }

  show() {
    if (this.showCraft)
      rect(
        0 + this.widthOffset,
        0 + this.heightOffset,
        width - this.widthOffset * 2,
        height - this.heightOffset * 2
      );
  }
}
