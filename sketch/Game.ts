class Game {
  private player: Player;
  private world: World;
  public OFFSETX: number;
  public OFFSETY: number;
  showMenu: menuList;

  constructor(world: World) {
    this.world = world;
    this.player = new Player(300, 100, PLAYER_SIZE, PLAYER_SIZE, playerImg);
    this.showMenu = menuList.game;
  }

  public tick() {
    this.OFFSETX = width / 2 - this.player.x - this.player.w / 2;
    this.OFFSETY = height / 2 - this.player.y - this.player.h / 2;
    translate(this.OFFSETX, this.OFFSETY);

    this.player.tick();

    this.world.show();
    this.player.show();
    let itemSelected = this.player.getInventory().getSelectedItem();
    if (itemSelected !== undefined)
      itemSelected.forEach((Element) => {
        Element.tick(this.player.x, this.player.y);
      });
    switch (this.showMenu) {
      case menuList.crafting:
        this.player.getCrafting().show();
        break;
      case menuList.inventory:
        this.player.getInventory().show();
        break;
      case menuList.skill:
        this.player.getSkillManager().show();
        break;
    }
    this.player.getManaManager().show();
  }

  public mousePressed() {
    switch (this.showMenu) {
      case menuList.inventory:
        this.player.getInventory().mousePressed();
        break;
      case menuList.crafting:
        this.player.getCrafting().clicked();
        break;
      default:
        let itemSelected = this.player.getInventory().getSelectedItem();
        if (itemSelected !== undefined)
          itemSelected.forEach((element) => {
            element.clicked(this.player.x, this.player.y);
          });
        break;
    }
  }

  public KeyPressed() {
    this.player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
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
      case 66:
        if (this.showMenu === menuList.skill) {
          this.showMenu = menuList.game;
        } else {
          this.showMenu = menuList.skill;
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
