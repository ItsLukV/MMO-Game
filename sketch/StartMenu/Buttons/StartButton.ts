/// <reference path="StartMenuButton.ts"/>
class StartButton extends StartMenuButton {
  constructor(txt: string, x: number, y: number, w: number, h: number, txtSize?: number) {
    super(txt, x, y, w, h, txtSize);
  }

  public clicked(): void {
    if (this.mouseCollions()) {
      gameState = GameStateList.Playing;
    }
  }
}
