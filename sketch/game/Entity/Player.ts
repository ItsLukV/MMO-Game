class Player extends Entity {
  private gravity: boolean;
  private GRAVITYSPEED: number;
  private xSpeed: number;
  private ySpeed: number;
  private airRes: number;
  private walkSpeed: number;
  private JumbBoost: number;
  private jump: boolean;
  private up: boolean;
  private down: boolean;
  private left: boolean;
  private right: boolean;
  private inventory: Inventory;
  private crafting: Crafting;
  private skillManager: SkillManager;
  private manaManager: ManaManager;
  showMenu: menuList;

  constructor(x: number, y: number, w: number, h: number, img: p5.Image) {
    super(x, y, w, h, img);
    this.GRAVITYSPEED = 2;
    this.gravity = true;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.airRes = 0.8;
    this.walkSpeed = 2;
    this.JumbBoost = 40;
    this.jump = true;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.inventory = new Inventory();
    this.crafting = new Crafting();
    this.skillManager = new SkillManager();
    this.manaManager = new ManaManager();
    this.showMenu = menuList.game;
  }

  tick() {
    this.tyndekraft();
    this.wallCollision();
    this.groundCollision();
    this.wallRoof();
    this.move();

    this.calcSpeed();

    this.manaManager.tick();
  }

  mousePressed() {
    switch (this.showMenu) {
      case menuList.inventory:
        this.getInventory().mousePressed();
        break;
      case menuList.crafting:
        this.getCrafting().clicked();
        break;
      default:
        let itemSelected = this.getInventory().getSelectedItem();
        if (itemSelected !== undefined)
          itemSelected.forEach((element) => {
            element.clicked(this.x, this.y);
          });
        break;
    }
  }

  show() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    pop();
    switch (this.showMenu) {
      case menuList.crafting:
        this.getCrafting().show();
        break;
      case menuList.inventory:
        this.getInventory().show();
        break;
      case menuList.skill:
        this.getSkillManager().show();
        break;
    }
    let itemSelected = this.getInventory().getSelectedItem();
    if (itemSelected !== undefined)
      itemSelected.forEach((Element) => {
        Element.tick(this.x, this.y);
      });
    this.getManaManager().show();
  }

  private move() {
    if (this.left) this.xSpeed -= this.walkSpeed;
    if (this.right) this.xSpeed += this.walkSpeed;
    if (this.jump) if (this.up) this.ySpeed -= this.JumbBoost;
    if (this.down) this.ySpeed += this.walkSpeed;
  }

  private groundCollision() {
    try {
      let tilePos = GameWorldToTile(this.x, this.y);
      let leftCorner = GameWorldToTile(this.x + this.w / 2, this.y + this.h / 2);
      let rightCorner = GameWorldToTile(this.x - this.w / 2, this.y + this.h / 2);
      // Check under player
      if (game.getWorld().tiles[rightCorner.x][rightCorner.y].isSolid() || game.getWorld().tiles[leftCorner.x][leftCorner.y].isSolid()) {
        this.gravity = false;
        this.jump = true;
        this.ySpeed = 0;
        this.y = (tilePos.y + 1) * TILE_SIZE - this.h / 2;
      } else {
        this.gravity = true;
        this.jump = false;
      }
    } catch (error) {
      // console.error(error);
    }
  }

  private wallCollision() {
    try {
      let tilePos = GameWorldToTile(this.x, this.y);

      // Check right for player
      if (game.getWorld().tiles[tilePos.x + 1][tilePos.y].isSolid()) {
        if (this.x + this.w / 2 > (tilePos.x + 1) * TILE_SIZE) {
          this.xSpeed = 0;
          this.x = (tilePos.x + 1) * TILE_SIZE - this.w / 2 - 1;
        }
      }

      // Check left for player
      if (game.getWorld().tiles[tilePos.x - 1][tilePos.y].isSolid()) {
        if (this.x - this.w / 2 < tilePos.x * TILE_SIZE) {
          this.xSpeed = 0;
          this.x = tilePos.x * TILE_SIZE + this.w / 2;
        }
      }
    } catch (error) {
      // console.error(error);
    }
  }

  private wallRoof(): void {
    try {
      let left = GameWorldToTile(this.x - this.w / 2, this.y - this.w / 2);
      let right = GameWorldToTile(this.x + this.w / 2, this.y - this.h / 2);

      if (game.getWorld().tiles[left.x][left.y].isSolid() || game.getWorld().tiles[right.x][right.y].isSolid()) {
        this.ySpeed = 0;
        this.y = (right.y + 1) * TILE_SIZE + this.h / 2 + 1;
      }

      if (game.getWorld().tiles[left.x][left.y - 1].isSolid() || game.getWorld().tiles[right.x][right.y - 1].isSolid()) {
        if (this.y - this.h / 2 < right.y * TILE_SIZE + 1) {
          this.ySpeed = 0;
          this.y = right.y * TILE_SIZE + this.h / 2 + 1;
        }
      }
    } catch (error) {
      // console.error(error);
    }
  }

  private calcSpeed() {
    this.xSpeed *= this.airRes;
    this.ySpeed *= this.airRes;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  public pressed(left: boolean, right: boolean, up: boolean, down: boolean) {
    if (left) this.left = true;
    if (right) this.right = true;
    if (up) this.up = true;
    if (down) this.down = true;
  }

  public released(left: boolean, right: boolean, up: boolean, down: boolean) {
    if (left) this.left = false;
    if (right) this.right = false;
    if (up) this.up = false;
    if (down) this.down = false;
  }

  private tyndekraft() {
    if (this.gravity) this.ySpeed += this.GRAVITYSPEED;
  }

  public getInventory(): Inventory {
    return this.inventory;
  }

  public getCrafting() {
    return this.crafting;
  }

  public getSkillManager() {
    return this.skillManager;
  }

  public getManaManager(): ManaManager {
    return this.manaManager;
  }
}
