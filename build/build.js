let player;
let playerImg;
let world;
let tilesImg;
function preload() {
    playerImg = loadImage("sketch/assets/Player.png");
    tilesImg = [];
    tilesImg.push(loadImage("sketch/assets/Air.png"));
    tilesImg.push(loadImage("sketch/assets/Grass.png"));
    tilesImg.push(loadImage("sketch/assets/Stone.png"));
    tilesImg.push(loadImage("sketch/assets/Bedrock.png"));
}
function setup() {
    createCanvas(960, 640);
    player = new Player(256, 450, 64, 64, playerImg);
    world = new World();
}
function draw() {
    background(220);
    translate(width / 2 - player.x - player.w / 2, height / 2 - player.y - player.h / 2);
    player.tick();
    world.show();
    player.show();
}
function keyPressed() {
    player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
    if (keyCode === 32) {
        player.x = 256;
        player.y = 450;
    }
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
    setOffSet(x, y) {
        this.x += x;
        this.y += y;
    }
    show() {
        push();
        imageMode(CENTER);
        image(this.img, this.x, this.y, this.w, this.h);
        pop();
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
        this.wallCollision();
        this.move();
        let tilePos = GameWorldToTile(this.x, this.y);
        this.calcSpeed();
    }
    move() {
        if (this.left)
            this.xSpeed -= this.walkSpeed;
        if (this.right)
            this.xSpeed += this.walkSpeed;
        if (this.jump)
            if (this.up)
                this.ySpeed -= this.JumbBoost;
        if (this.down)
            this.ySpeed += this.walkSpeed;
    }
    groundCollision() {
        try {
            let tilePos = GameWorldToTile(this.x, this.y);
            let right = GameWorldToTile(this.x - this.w / 2, this.y + this.w / 2);
            ellipse(right.x * TileSize + TileSize, right.y * TileSize, 50, 50);
            ellipse(this.x - this.w / 2, this.y + this.w / 2, 50, 50);
            if (world.tiles[tilePos.x - 1][tilePos.y + 1].isSoild()) {
                this.gravity = false;
                this.jump = true;
                this.ySpeed = 0;
                this.y = tilePos.y * TileSize + this.h / 2;
            }
            else {
                this.gravity = true;
                this.jump = false;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    wallCollision() {
        try {
            let tilePos = GameWorldToTile(this.x, this.y);
            if (world.tiles[tilePos.x + 1][tilePos.y].isSoild()) {
                if (this.x + this.w / 2 > (tilePos.x + 1) * TileSize) {
                    this.xSpeed = 0;
                    this.x = tilePos.x * TileSize + this.w / 2;
                }
            }
            if (world.tiles[tilePos.x - 1][tilePos.y].isSoild()) {
                if (this.x - this.w / 2 < tilePos.x * TileSize) {
                    this.xSpeed = 0;
                    this.x = (tilePos.x + 1) * TileSize - this.w / 2;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    calcSpeed() {
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
        this.img = img;
    }
    setOffSet(x, y) {
        this.x += x;
        this.y += y;
    }
    show() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
}
const TileSize = 64;
function GameWorldToTile(x, y) {
    let x2 = Math.floor(x / TileSize);
    let y2 = Math.floor(y / TileSize);
    return { x: x2, y: y2 };
}
function TileLookUp(x, y) {
    let tileCoords = GameWorldToTile(x, y);
    let tile = world.world[tileCoords.x][tileCoords.y];
    return tile;
}
class Tile {
    constructor(x, y, w, id) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.id = id;
    }
    show() {
        rect(this.x, this.y, this.w, this.w);
    }
    isSoild() {
        return false;
    }
}
class World {
    constructor() {
        this.world = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 1, 0, 0, 0, 0, 0, 0, 1, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 0, 3],
            [3, 0, 0, 0, 0, 0, 0, 0, 1, 3],
            [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            [0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
        ];
        this.tiles = new Array(this.world.length);
        for (let i = 0; i < this.tiles.length; i++) {
            this.tiles[i] = new Array(this.world[i].length);
        }
        this.load();
    }
    load() {
        for (let i = 0; i < this.world.length; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < this.world[i].length; j++) {
                switch (this.world[i][j]) {
                    case 0:
                        this.tiles[i][j] = new Air(i * TileSize, j * TileSize, TileSize, this.world[i][j]);
                        break;
                    case 1:
                        this.tiles[i][j] = new Grass(i * TileSize, j * TileSize, TileSize, this.world[i][j]);
                        break;
                    case 2:
                        this.tiles[i][j] = new Stone(i * TileSize, j * TileSize, TileSize, this.world[i][j]);
                        break;
                    case 3:
                        this.tiles[i][j] = new Bedrock(i * TileSize, j * TileSize, TileSize, this.world[i][j]);
                        break;
                    default:
                        throw new Error(`No Tile with the id ${this.world[i][j]}`);
                }
            }
        }
    }
    show() {
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[i].length; j++)
                this.tiles[i][j].show();
        }
    }
}
class Air extends Tile {
    constructor(x, y, w, id) {
        super(x, y, w, id);
    }
    show() {
        image(tilesImg[this.id], this.x, this.y, this.w, this.w);
    }
    static isSoild() {
        return false;
    }
}
class Bedrock extends Tile {
    constructor(x, y, w, id) {
        super(x, y, w, id);
    }
    show() {
        image(tilesImg[this.id], this.x, this.y, this.w, this.w);
    }
    isSoild() {
        return true;
    }
}
class Grass extends Tile {
    constructor(x, y, w, id) {
        super(x, y, w, id);
    }
    show() {
        image(tilesImg[this.id], this.x, this.y, this.w, this.w);
    }
    isSoild() {
        return true;
    }
}
class Stone extends Tile {
    constructor(x, y, w, id) {
        super(x, y, w, id);
    }
    show() {
        image(tilesImg[this.id], this.x, this.y, this.w, this.w);
    }
    isSoild() {
        return true;
    }
}
//# sourceMappingURL=build.js.map