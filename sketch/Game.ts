class Game {
  player: Player;
  world: World;
  private OFFSETX: number;
  private OFFSETY: number;

  constructor(world: World) {
    this.world = world;
    this.player = new Player(256, 450, PLAYER_SIZE, PLAYER_SIZE, playerImg);
    this.OFFSETX = width / 2 - this.player.x - this.player.w / 2;
    this.OFFSETY = height / 2 - this.player.y - this.player.h / 2;
  }

  public tick() {
    translate(this.OFFSETX, this.OFFSETY);

    this.player.tick();

    this.world.show();
    this.player.show();
    this.mouseHover();
  }

  public pressed() {
    this.player.pressed(
      keyCode === 65,
      keyCode === 68,
      keyCode === 87,
      keyCode === 83
    );
    if (keyCode === 32) {
      this.player.x = 256;
      this.player.y = 450;
    }
  }

  public released() {
    this.player.released(
      keyCode === 65,
      keyCode === 68,
      keyCode === 87,
      keyCode === 83
    );
  }
  getWorld(): World {
    return this.world;
  }

  mouseHover() {
    try {
      if (!TileLookUp(mouseX - this.OFFSETX, mouseY - this.OFFSETY).isSoild())
        return;
      push();
      let mouseTile = GameWorldToTile(
        mouseX - this.OFFSETX,
        mouseY - this.OFFSETY
      );
      let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
      noFill();
      strokeWeight(5);
      rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);
      pop();
    } catch (error) {}
  }
}
