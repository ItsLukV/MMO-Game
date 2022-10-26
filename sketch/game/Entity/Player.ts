class Player extends Entity {
  gravity: boolean;
  GRAVITYSPEED: number;
  xSpeed: number;
  ySpeed: number;
  airRes: number;
  walkSpeed: number;
  JumbBoost: number;
  jump: boolean;
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  inventory: Inventory;

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
  }

  tick() {
    this.tyndekraft();
    this.wallCollision();
    this.groundCollision();
    this.wallRoof();
    this.move();
    let tilePos = GameWorldToTile(this.x, this.y);

    this.calcSpeed();
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
      let leftCorner = GameWorldToTile(
        this.x + this.w / 2,
        this.y + this.h / 2
      );
      let rightCorner = GameWorldToTile(
        this.x - this.w / 2,
        this.y + this.h / 2
      );
      // Check under player
      if (
        game.getWorld().tiles[rightCorner.x][rightCorner.y].isSoild() ||
        game.getWorld().tiles[leftCorner.x][leftCorner.y].isSoild()
      ) {
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
      if (game.getWorld().tiles[tilePos.x + 1][tilePos.y].isSoild()) {
        if (this.x + this.w / 2 > (tilePos.x + 1) * TILE_SIZE) {
          this.xSpeed = 0;
          this.x = (tilePos.x + 1) * TILE_SIZE - this.w / 2 - 1;
        }
      }

      // Check left for player
      if (game.getWorld().tiles[tilePos.x - 1][tilePos.y].isSoild()) {
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
      let tilePos = GameWorldToTile(this.x, this.y);
      let left = GameWorldToTile(this.x - this.w / 2, this.y - this.w / 2);
      let right = GameWorldToTile(this.x + this.w / 2, this.y - this.h / 2);

      if (
        game.getWorld().tiles[left.x][left.y].isSoild() ||
        game.getWorld().tiles[right.x][right.y].isSoild()
      ) {
        this.ySpeed = 0;
        this.y = (right.y + 1) * TILE_SIZE + this.h / 2 + 1;
      }

      if (
        game.getWorld().tiles[left.x][left.y - 1].isSoild() ||
        game.getWorld().tiles[right.x][right.y - 1].isSoild()
      ) {
        if (this.y - this.h / 2 < right.y * TILE_SIZE + 1) {
          this.ySpeed = 0;
          this.y = right.y * TILE_SIZE + this.h / 2 + 1;
        }
      } else {
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
}
