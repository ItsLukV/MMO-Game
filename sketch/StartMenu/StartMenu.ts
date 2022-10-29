class StartMenu {
  private startBtn: StartButton;
  private worldGen: WorldGenButton;
  constructor() {
    this.startBtn = new StartButton(
      "Start",
      width / 2 - 100,
      height / 3 - 50,
      200,
      100
    );
    this.worldGen = new WorldGenButton(
      "World Gen",
      width / 2 - 100,
      (height / 3) * 2 - 50,
      200,
      100
    );
  }

  public show() {
    this.startBtn.show();
    this.startBtn.hover();
    this.worldGen.show();
    this.worldGen.hover();
  }

  public clicked() {
    this.startBtn.clicked();
    this.worldGen.clicked();
  }
}
