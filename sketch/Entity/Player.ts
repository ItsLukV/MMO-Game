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

  constructor(x: number, y: number, w: number, h: number, img: p5.Image) {
    super(x, y, w, h, img);
    this.GRAVITYSPEED = 2;
    this.gravity = true;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.airRes = 0.8;
    this.walkSpeed = 2;
    this.JumbBoost = 50;
    this.jump = true;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }

  tick() {
    this.tyndekraft();

    this.groundCollision();
    this.move();
    this.calcSpeed();
  }

  private move() {
    if (this.left) this.xSpeed -= this.walkSpeed;
    if (this.right) this.xSpeed += this.walkSpeed;
    if (this.jump) if (this.up) this.ySpeed -= this.JumbBoost;
    if (this.down) this.ySpeed += this.walkSpeed;
  }

  // TODO Make collison with other tiles than Ground
  private groundCollision() {
    try {
      let tilePos = GameWorldToTile(this.x, this.y);

      // Check under player
      if (world.tiles[tilePos.x][tilePos.y + 1].isSoild()) {
        if (this.y + this.h / 2 >= (tilePos.y + 1) * TileSize) {
          // Check if under corners is a soild tile
          let left = GameWorldToTile(this.x - this.w / 2, this.y + this.h / 2);
          let right = GameWorldToTile(this.x + this.w / 2, this.y + this.h / 2);
          if (
            world.tiles[left.x][left.y].isSoild() ||
            world.tiles[right.x][right.y].isSoild()
          ) {
            this.gravity = false;
            this.jump = true;
            this.ySpeed = 0;
            this.y = tilePos.y * TileSize + this.h / 2;
          }
          this.gravity = false;
          this.jump = true;
          this.ySpeed = 0;
          this.y = tilePos.y * TileSize + this.h / 2;
        }
      } else {
        this.gravity = true;
        this.jump = false;
      }

      if (world.tiles[tilePos.x + 1][tilePos.y].isSoild()) {
        // Check right for player
        if (this.x + this.w / 2 > (tilePos.x + 1) * TileSize) {
          this.xSpeed = 0;
          this.x = tilePos.x * TileSize + this.w / 2;
        }
      }
      if (world.tiles[tilePos.x - 1][tilePos.y].isSoild()) {
        // Check left for player
        if (this.x - this.w / 2 < (tilePos.x - 1) * TileSize) {
          this.xSpeed = 0;
          this.x = tilePos.x * TileSize + this.w / 2;
        }
      }
    } catch (e: unknown) {
      // console.log(e);
    }
  }

  private calcSpeed() {
    this.xSpeed = this.xSpeed * this.airRes;
    this.ySpeed = this.ySpeed * this.airRes;
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
}
