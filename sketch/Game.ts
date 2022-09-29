class Game {
  private player: Player;
  private world: World;
  mining: Mining;
  public OFFSETX: number;
  public OFFSETY: number;

  constructor(world: World) {
    this.world = world;
    this.player = new Player(300, 100, PLAYER_SIZE, PLAYER_SIZE, playerImg);
    this.mining = new Mining();
    this.OFFSETX = width / 2 - this.player.x - this.player.w / 2;
    this.OFFSETY = height / 2 - this.player.y - this.player.h / 2;
  }

  public tick() {
    this.OFFSETX = width / 2 - this.player.x - this.player.w / 2;
    this.OFFSETY = height / 2 - this.player.y - this.player.h / 2;
    translate(this.OFFSETX, this.OFFSETY);

    this.player.tick();

    this.world.show();
    this.player.show();
    this.mining.mouseHover();
    this.player.getInventory().show();
  }

  public mousePressed() {
    this.mining.mousePressed();
    this.player.getInventory().itemSelector();
  }

  public KeyPressed() {
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
    if (keyCode === 69) {
      this.player.getInventory().showBackpack =
        !this.player.getInventory().showBackpack;
    }
  }

  public KeyReleased() {
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

  getPlayer(): Player {
    return this.player;
  }
}
