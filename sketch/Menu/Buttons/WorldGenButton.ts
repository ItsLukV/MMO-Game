/// <reference path="../../utilities/Buttons.ts"/>

class WorldGenButton extends Buttons {
  constructor(
    txt: string,
    x: number,
    y: number,
    w: number,
    h: number,
    txtSize?: number
  ) {
    super(txt, x, y, w, h, txtSize);
  }

  public clicked(): void {
    if (this.mouseCollions()) {
      gameState = GameStateList.WorldGen;
    }
  }
}