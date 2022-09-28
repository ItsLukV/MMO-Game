class Game {
    constructor(world) {
        this.world = world;
        this.player = new Player(256, 450, PLAYER_SIZE, PLAYER_SIZE, playerImg);
        this.OFFSETX = width / 2 - this.player.x - this.player.w / 2;
        this.OFFSETY = height / 2 - this.player.y - this.player.h / 2;
    }
    tick() {
        translate(this.OFFSETX, this.OFFSETY);
        this.player.tick();
        this.world.show();
        this.player.show();
        this.mouseHover();
    }
    pressed() {
        this.player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
        if (keyCode === 32) {
            this.player.x = 256;
            this.player.y = 450;
        }
    }
    released() {
        this.player.released(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
    }
    getWorld() {
        return this.world;
    }
    mouseHover() {
        try {
            if (!TileLookUp(mouseX - this.OFFSETX, mouseY - this.OFFSETY).isSoild())
                return;
            push();
            let mouseTile = GameWorldToTile(mouseX - this.OFFSETX, mouseY - this.OFFSETY);
            let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
            noFill();
            strokeWeight(5);
            rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);
            pop();
        }
        catch (error) { }
    }
}
let playerImg;
let tilesImg;
let menu;
let game;
let world;
let worldGenerator;
var GameStateList;
(function (GameStateList) {
    GameStateList[GameStateList["Menu"] = 0] = "Menu";
    GameStateList[GameStateList["Playing"] = 1] = "Playing";
    GameStateList[GameStateList["WorldGen"] = 2] = "WorldGen";
})(GameStateList || (GameStateList = {}));
let gameState = GameStateList.Menu;
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
    world = new World();
    worldGenerator = new WorldGenerator(world);
    world.setWorld(worldGenerator.getWorld());
    game = new Game(world);
    menu = new Menu();
}
function draw() {
    background(220);
    switch (gameState) {
        case GameStateList.Menu:
            menu.show();
            break;
        case GameStateList.Playing:
            game.tick();
            break;
        case GameStateList.WorldGen:
            break;
        default:
            throw "Missing GameState";
    }
}
function keyPressed() {
    switch (gameState) {
        case GameStateList.Menu:
            break;
        case GameStateList.Playing:
            game.pressed();
            break;
        case GameStateList.WorldGen:
            break;
        default:
            throw "Missing GameState";
    }
}
function keyReleased() {
    switch (gameState) {
        case GameStateList.Menu:
            break;
        case GameStateList.Playing:
            game.released();
            break;
        case GameStateList.WorldGen:
            break;
        default:
            throw "Missing GameState";
    }
}
function mousePressed() {
    menu.clicked();
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
        this.JumbBoost = 40;
        this.jump = true;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
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
            let leftCorner = GameWorldToTile(this.x + this.w / 2, this.y + this.h / 2);
            let rightCorner = GameWorldToTile(this.x - this.w / 2, this.y + this.h / 2);
            if (game.world.tiles[rightCorner.x][rightCorner.y].isSoild() ||
                game.world.tiles[leftCorner.x][leftCorner.y].isSoild()) {
                this.gravity = false;
                this.jump = true;
                this.ySpeed = 0;
                this.y = (tilePos.y + 1) * TILE_SIZE - this.h / 2;
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
            if (game.world.tiles[tilePos.x + 1][tilePos.y].isSoild()) {
                if (this.x + this.w / 2 > (tilePos.x + 1) * TILE_SIZE) {
                    this.xSpeed = 0;
                    this.x = (tilePos.x + 1) * TILE_SIZE - this.w / 2 - 1;
                }
            }
            if (game.world.tiles[tilePos.x - 1][tilePos.y].isSoild()) {
                if (this.x - this.w / 2 < tilePos.x * TILE_SIZE) {
                    this.xSpeed = 0;
                    this.x = tilePos.x * TILE_SIZE + this.w / 2;
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    wallRoof() {
        try {
            let tilePos = GameWorldToTile(this.x, this.y);
            let left = GameWorldToTile(this.x - this.w / 2, this.y - this.w / 2);
            let right = GameWorldToTile(this.x + this.w / 2, this.y - this.h / 2);
            if (game.world.tiles[left.x][left.y].isSoild() ||
                game.world.tiles[right.x][right.y].isSoild()) {
                this.ySpeed = 0;
                this.y = (right.y + 1) * TILE_SIZE + this.h / 2 + 1;
            }
            if (game.world.tiles[left.x][left.y - 1].isSoild() ||
                game.world.tiles[right.x][right.y - 1].isSoild()) {
                if (this.y - this.h / 2 < right.y * TILE_SIZE + 1) {
                    this.ySpeed = 0;
                    this.y = right.y * TILE_SIZE + this.h / 2 + 1;
                }
            }
            else {
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
class Menu {
    constructor() {
        this.startBtn = new StartButton("Start", width / 2 - 100, height / 3 - 50, 200, 100);
        this.worldGen = new WorldGenButton("World Gen", width / 2 - 100, (height / 3) * 2 - 50, 200, 100);
    }
    show() {
        this.startBtn.show();
        this.startBtn.hover();
        this.worldGen.show();
        this.worldGen.hover();
    }
    clicked() {
        this.startBtn.clicked();
        this.worldGen.clicked();
    }
}
class Buttons {
    constructor(txt, x, y, w, h, txtSize) {
        this.txt = txt;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        txtSize ? this.txtSize : (this.txtSize = 30);
        this.backgroundColor = 255;
    }
    show() {
        push();
        fill(this.backgroundColor);
        stroke(0);
        textSize(this.txtSize);
        rect(this.x, this.y, this.w, this.h);
        textAlign(CENTER);
        let textheight = textAscent() + textDescent();
        fill(0);
        text(this.txt, this.x, this.y + this.h / 2 - textheight / 2, this.w, this.h);
        pop();
    }
    hover() {
        if (this.mouseCollions()) {
            this.backgroundColor = 220;
        }
        else {
            this.backgroundColor = 255;
        }
    }
    clicked() { }
    mouseCollions() {
        if (mouseX > this.x && mouseX < this.x + this.w) {
            if (mouseY > this.y && mouseY < this.y + this.h) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
}
class StartButton extends Buttons {
    constructor(txt, x, y, w, h, txtSize) {
        super(txt, x, y, w, h, txtSize);
    }
    clicked() {
        if (this.mouseCollions()) {
            gameState = GameStateList.Playing;
        }
    }
}
class WorldGenButton extends Buttons {
    constructor(txt, x, y, w, h, txtSize) {
        super(txt, x, y, w, h, txtSize);
    }
    clicked() {
        if (this.mouseCollions()) {
            gameState = GameStateList.WorldGen;
        }
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
const TILE_SIZE = 64;
const PLAYER_SIZE = 32;
const WORLDHEIGHT = 10;
const WORLDWIDTH = 10;
function GameWorldToTile(x, y) {
    x = Math.floor(x / TILE_SIZE);
    y = Math.floor(y / TILE_SIZE);
    return { x: x, y: y };
}
function TileToGameWorld(x, y) {
    x *= TILE_SIZE;
    y *= TILE_SIZE;
    return { x, y };
}
function TileLookUp(x, y) {
    try {
        let tileCoords = GameWorldToTile(x, y);
        let tile = game.world.tiles[tileCoords.x][tileCoords.y];
        return tile;
    }
    catch (error) {
        switch (error.message) {
            case "game.world.tiles[tileCoords.x] is undefined":
                throw new Error("Mouse is outside of the grid");
            case "game.world.tiles[tileCoords.y] is undefined":
                throw new Error("Mouse is outside of the grid");
            default:
                console.error(error);
        }
    }
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
                        this.tiles[i][j] = new Air(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, this.world[i][j]);
                        break;
                    case 1:
                        this.tiles[i][j] = new Grass(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, this.world[i][j]);
                        break;
                    case 2:
                        this.tiles[i][j] = new Stone(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, this.world[i][j]);
                        break;
                    case 3:
                        this.tiles[i][j] = new Bedrock(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, this.world[i][j]);
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
    setWorld(world) {
        this.world = world;
        this.load();
    }
}
class WorldGenerator {
    constructor(world) {
        this.world = new Array(WORLDHEIGHT);
        for (let i = 0; i < WORLDHEIGHT; i++) {
            this.world[i] = new Array(WORLDWIDTH);
        }
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[i].length; j++) {
                this.world[i][j] = 0;
            }
        }
        for (let i = 0; i < this.world.length; i++) {
            this.world[i][this.world.length - 1] = 3;
        }
        this.world[this.world.length - 5][this.world.length - 2] = 2;
    }
    getWorld() {
        return this.world;
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