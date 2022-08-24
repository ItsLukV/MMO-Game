let player;
let playerImg;
const GROUNDLEVEL = 700 - 100;
function preload() {
    playerImg = loadImage("sketch/assets/player.png");
}
function setup() {
    createCanvas(1000, 700);
    player = new Player(100, 100, 100, 100, playerImg);
}
function draw() {
    background(220);
    player.tick();
    player.show();
    console.log(keyCode);
}
function keyPressed() {
    player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
}
function keyReleased() {
    player.released(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
}
class Entity {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
    }
    show() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}
class Player extends Entity {
    constructor(x, y, w, h, img) {
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
        if (this.left)
            this.xSpeed -= this.walkSpeed;
        if (this.right)
            this.xSpeed += this.walkSpeed;
        if (this.up)
            this.ySpeed -= this.Jumb;
        if (this.down)
            this.ySpeed += this.walkSpeed;
    }
    groundCollision() {
        if (GROUNDLEVEL <= this.y + this.h) {
            this.gravity = false;
            this.ySpeed = 0;
            this.y = GROUNDLEVEL - this.h;
        }
        else {
            this.gravity = true;
        }
    }
    movement() {
        this.xSpeed = this.xSpeed * this.airRes;
        this.ySpeed = this.ySpeed * this.airRes;
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
    pressed(left, right, up, down) {
        if (left)
            this.left = true;
        if (right)
            this.right = true;
        if (up)
            this.up = true;
        if (down)
            this.down = true;
    }
    released(left, right, up, down) {
        if (left)
            this.left = false;
        if (right)
            this.right = false;
        if (up)
            this.up = false;
        if (down)
            this.down = false;
    }
    tyndekraft() {
        if (this.gravity)
            this.ySpeed += this.GRAVITYSPEED;
    }
}
class Objects {
    constructor(x, y, w, h, img) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    show() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}
//# sourceMappingURL=build.js.map