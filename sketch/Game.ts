class Game {
  private player: Player;
  private world: World;
  public OffSetX: number;
  public OffSetY: number;

  constructor(world: World) {
    this.world = world;
    this.player = new Player(300, 100, PLAYER_SIZE, PLAYER_SIZE, playerImg);
  }

  public tick() {
    this.OffSetX = width / 2 - this.player.x - this.player.w / 2;
    this.OffSetY = height / 2 - this.player.y - this.player.h / 2;
    translate(this.OffSetX, this.OffSetY);

    this.player.tick();

    this.world.show();
    this.player.show();
  }

  public mousePressed() {
    this.player.mousePressed();
  }

  public KeyPressed() {
    this.player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
    switch (keyCode) {
      case 69:
        if (this.player.showMenu === menuList.inventory) {
          this.player.showMenu = menuList.game;
        } else {
          this.player.showMenu = menuList.inventory;
        }
        break;
      case 67:
        if (this.player.showMenu === menuList.crafting) {
          this.player.showMenu = menuList.game;
        } else {
          this.player.showMenu = menuList.crafting;
        }
        break;
      case 66:
        if (this.player.showMenu === menuList.skill) {
          this.player.showMenu = menuList.game;
        } else {
          this.player.showMenu = menuList.skill;
        }
        break;
    }
  }

  public KeyReleased() {
    this.player.released(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
  }
  getWorld(): World {
    return this.world;
  }

  getPlayer(): Player {
    return this.player;
  }
}
