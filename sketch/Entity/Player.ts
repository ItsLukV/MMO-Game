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
      console.log(tilePos);

      // Check under player
      if (world.tiles[tilePos.x][tilePos.y + 1].isSoild()) {
        this.gravity = false;
        this.jump = true;
        this.ySpeed = 0;
        this.y = tilePos.y * TileSize;
      } else {
        this.gravity = true;
        this.jump = false;
      }

      // Check left for player
      if (world.tiles[tilePos.x - 1][tilePos.y].isSoild()) {
        if (this.x > tilePos.x - 1 * TileSize) {
          this.xSpeed = 0;
          this.x = tilePos.x - 1 * TileSize;
        }
      }

      // Check right for player
      if (world.tiles[tilePos.x + 1][tilePos.y].isSoild()) {
        if (this.x + this.w > tilePos.x * TileSize) {
          this.xSpeed = 0;
          this.x = tilePos.x * TileSize;
        }
      }
    } catch (e: unknown) {
      console.log(e);
    }

    // if (GROUNDLEVEL <= this.y + this.h) {
    //   this.gravity = false;
    //   this.jump = true;
    //   this.ySpeed = 0;
    //   this.y = GROUNDLEVEL - this.h;
    // } else {
    //   this.gravity = true;
    //   this.jump = false;
    // }
  }

  private calcSpeed() {
    this.xSpeed = this.xSpeed * this.airRes;
    this.ySpeed = this.ySpeed * this.airRes;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  pressed(left: boolean, right: boolean, up: boolean, down: boolean) {
    if (left) this.left = true;
    if (right) this.right = true;
    if (up) this.up = true;
    if (down) this.down = true;
  }
  released(left: boolean, right: boolean, up: boolean, down: boolean) {
    if (left) this.left = false;
    if (right) this.right = false;
    if (up) this.up = false;
    if (down) this.down = false;
  }

  private tyndekraft() {
    if (this.gravity) this.ySpeed += this.GRAVITYSPEED;
  }
}
