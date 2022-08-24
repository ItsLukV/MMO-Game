class Player extends Entity {
  gravity: boolean;
  GRAVITYSPEED: number;
  xSpeed: number;
  ySpeed: number;
  airRes: number;
  walkSpeed: number;
  Jumb: number;
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
    this.walkSpeed = 1;
    this.Jumb = 4;
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
  }

  tick() {
    this.tyndekraft();

    this.groundCollision();
    this.move();
    this.movement();
  }
  move() {
    if (this.left) this.xSpeed -= this.walkSpeed;
    if (this.right) this.xSpeed += this.walkSpeed;
    if (this.up) this.ySpeed -= this.Jumb;
    if (this.down) this.ySpeed += this.walkSpeed;
  }

  groundCollision() {
    if (GROUNDLEVEL <= this.y + this.h) {
      this.gravity = false;
      this.ySpeed = 0;
      this.y = GROUNDLEVEL - this.h;
    } else {
      this.gravity = true;
    }
  }

  movement() {
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

  tyndekraft() {
    if (this.gravity) this.ySpeed += this.GRAVITYSPEED;
  }
}
