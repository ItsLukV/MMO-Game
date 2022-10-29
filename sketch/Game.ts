class Game {
  private player: Player;
  private world: World;
  mining: Mining;
  public OFFSETX: number;
  public OFFSETY: number;
  showMenu: menuList;
  loading: boolean = true;

  constructor(world: World) {
    this.world = world;
    this.player = new Player(300, 100, PLAYER_SIZE, PLAYER_SIZE, playerImg);
    this.mining = new Mining();
    this.showMenu = menuList.game;
  }

  public tick() {
    if (this.loading) {
      rect(100, 100, 100, 100);
      return;
    }

    this.OFFSETX = width / 2 - this.player.x - this.player.w / 2;
    this.OFFSETY = height / 2 - this.player.y - this.player.h / 2;
    translate(this.OFFSETX, this.OFFSETY);

    this.player.tick();

    this.world.show();
    this.player.show();
    this.mining.mouseHover();
    switch (this.showMenu) {
      case menuList.crafting:
        this.player.getCrafting().show();
        break;
      case menuList.inventory:
        this.player.getInventory().show();
        break;
    }
  }

  public mousePressed() {
    this.mining.mousePressed();
    switch (this.showMenu) {
      case menuList.inventory:
        this.player.getInventory().itemSelector();
        break;
      case menuList.crafting:
        this.player.getCrafting().clicked();
    }
  }

  public KeyPressed() {
    this.player.pressed(
      keyCode === 65,
      keyCode === 68,
      keyCode === 87,
      keyCode === 83
    );
    switch (keyCode) {
      case 69:
        if (this.showMenu === menuList.inventory) {
          this.showMenu = menuList.game;
        } else {
          this.showMenu = menuList.inventory;
        }
        break;
      case 67:
        if (this.showMenu === menuList.crafting) {
          this.showMenu = menuList.game;
        } else {
          this.showMenu = menuList.crafting;
        }
        break;
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
