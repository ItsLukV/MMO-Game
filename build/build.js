class Game {
    constructor(world) {
        this.loading = true;
        this.world = world;
        this.player = new Player(300, 100, PLAYER_SIZE, PLAYER_SIZE, playerImg);
        this.mining = new Mining();
        this.showMenu = menuList.game;
    }
    tick() {
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
            case menuList.skill:
                this.player.skillManager.show();
                break;
        }
    }
    mousePressed() {
        this.mining.mousePressed();
        switch (this.showMenu) {
            case menuList.inventory:
                this.player.getInventory().itemSelector();
                break;
            case menuList.crafting:
                this.player.getCrafting().clicked();
        }
    }
    KeyPressed() {
        this.player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
        switch (keyCode) {
            case 69:
                if (this.showMenu === menuList.inventory) {
                    this.showMenu = menuList.game;
                }
                else {
                    this.showMenu = menuList.inventory;
                }
                break;
            case 67:
                if (this.showMenu === menuList.crafting) {
                    this.showMenu = menuList.game;
                }
                else {
                    this.showMenu = menuList.crafting;
                }
                break;
            case 75:
                if (this.showMenu === menuList.skill) {
                    this.showMenu = menuList.game;
                }
                else {
                    this.showMenu = menuList.skill;
                }
                break;
        }
    }
    KeyReleased() {
        this.player.released(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
    }
    getWorld() {
        return this.world;
    }
    getPlayer() {
        return this.player;
    }
}
let playerImg;
let tilesImg = [];
let breakingImg = [];
let itemImg = [];
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
    tilesImg.push(loadImage("sketch/assets/Air.png"));
    tilesImg.push(loadImage("sketch/assets/Grass.png"));
    tilesImg.push(loadImage("sketch/assets/Stone.png"));
    tilesImg.push(loadImage("sketch/assets/Bedrock.png"));
    itemImg[itemList.Air] = null;
    itemImg[itemList.Stone] = null;
    itemImg[itemList.Grass] = null;
    itemImg[itemList.Pickaxe] = loadImage("sketch/assets/item/pickaxe.png");
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_0.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_1.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_2.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_3.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_4.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_5.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_6.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_7.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_8.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_9.png"));
    breakingImg.push(loadImage("sketch/assets/breaking/destroy_stage_10.png"));
}
function setup() {
    createCanvas(960, 640);
    world = new World();
    worldGenerator = new WorldGenerator(world);
    world.setWorld(worldGenerator.getWorld());
    game = new Game(world);
    menu = new StartMenu();
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
            game.KeyPressed();
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
            game.KeyReleased();
            break;
        case GameStateList.WorldGen:
            break;
        default:
            throw "Missing GameState";
    }
}
function mousePressed() {
    switch (gameState) {
        case GameStateList.Menu:
            menu.clicked();
            break;
        case GameStateList.Playing:
            game.mousePressed();
            break;
    }
}
class StartMenuButtons {
    constructor(txt, x, y, w, h, txtSize) {
        this.txt = txt;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        txtSize === undefined ? (this.txtSize = 30) : (this.txtSize = txtSize);
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
    clicked(e) { }
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
class StartMenu {
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
class StartButton extends StartMenuButtons {
    constructor(txt, x, y, w, h, txtSize) {
        super(txt, x, y, w, h, txtSize);
    }
    clicked() {
        if (this.mouseCollions()) {
            gameState = GameStateList.Playing;
        }
    }
}
class WorldGenButton extends StartMenuButtons {
    constructor(txt, x, y, w, h, txtSize) {
        super(txt, x, y, w, h, txtSize);
    }
    clicked() {
        if (this.mouseCollions()) {
            gameState = GameStateList.WorldGen;
        }
    }
}
class Cheating {
    constructor() { }
    giveItem(itemId, amount) {
        if (amount === undefined)
            amount = 1;
        console.log(amount);
        for (let i = 0; i < amount; i++)
            game.getPlayer().getInventory().giveItem(itemId);
    }
    setPlayer(x, y) {
        game.getPlayer().x = x;
        game.getPlayer().y = y;
    }
    changeTile(x, y, tileId) {
        game.getWorld().changeTile(x, y, tileId);
    }
    giveXp(xp, type) {
        game.getPlayer().getSkillManager().addXp({ xp: xp, type: type });
    }
}
console.log("Cheating: Enabled");
let cheats = new Cheating();
class Mining {
    constructor() { }
    mouseHover() {
        try {
            if (game.getPlayer().getInventory().showBackpack)
                return;
            if (!TileLookUp(mouseX - game.OFFSETX, mouseY - game.OFFSETY).isSoild())
                return;
            push();
            let mouseTile = GameWorldToTile(mouseX - game.OFFSETX, mouseY - game.OFFSETY);
            let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
            noFill();
            strokeWeight(5);
            rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);
            pop();
        }
        catch (error) {
        }
    }
    mousePressed() {
        try {
            let tile = TileLookUp(mouseX - game.OFFSETX, mouseY - game.OFFSETY);
            let inventory = game.getPlayer().getInventory();
            if (!tile.isSoild())
                return;
            if (!tile.isBreakable())
                return;
            if (inventory.showBackpack)
                return;
            if (inventory.getSelectedItemId() != itemList.Pickaxe)
                return;
            if (tile.breakingLevel < breakingImg.length - 1)
                tile.breakingLevel++;
            else if (tile.breakingLevel === breakingImg.length - 1) {
                let worldTile = GameWorldToTile(tile.x, tile.y);
                inventory.giveItem(tile.item());
                game
                    .getWorld()
                    .changeTile(worldTile.x, worldTile.y, tileID.TempTile, tile.id, tile.getRegenerationSpeed());
                game.getPlayer().skillManager.addXp(tile.xp());
            }
        }
        catch (error) {
        }
    }
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
        this.inventory = new Inventory();
        this.crafting = new Crafting();
        this.skillManager = new SkillManager();
    }
    tick() {
        this.tyndekraft();
        this.wallCollision();
        this.groundCollision();
        this.wallRoof();
        this.move();
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
            if (game.getWorld().tiles[rightCorner.x][rightCorner.y].isSoild() ||
                game.getWorld().tiles[leftCorner.x][leftCorner.y].isSoild()) {
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
        }
    }
    wallCollision() {
        try {
            let tilePos = GameWorldToTile(this.x, this.y);
            if (game.getWorld().tiles[tilePos.x + 1][tilePos.y].isSoild()) {
                if (this.x + this.w / 2 > (tilePos.x + 1) * TILE_SIZE) {
                    this.xSpeed = 0;
                    this.x = (tilePos.x + 1) * TILE_SIZE - this.w / 2 - 1;
                }
            }
            if (game.getWorld().tiles[tilePos.x - 1][tilePos.y].isSoild()) {
                if (this.x - this.w / 2 < tilePos.x * TILE_SIZE) {
                    this.xSpeed = 0;
                    this.x = tilePos.x * TILE_SIZE + this.w / 2;
                }
            }
        }
        catch (error) {
        }
    }
    wallRoof() {
        try {
            let tilePos = GameWorldToTile(this.x, this.y);
            let left = GameWorldToTile(this.x - this.w / 2, this.y - this.w / 2);
            let right = GameWorldToTile(this.x + this.w / 2, this.y - this.h / 2);
            if (game.getWorld().tiles[left.x][left.y].isSoild() ||
                game.getWorld().tiles[right.x][right.y].isSoild()) {
                this.ySpeed = 0;
                this.y = (right.y + 1) * TILE_SIZE + this.h / 2 + 1;
            }
            if (game.getWorld().tiles[left.x][left.y - 1].isSoild() ||
                game.getWorld().tiles[right.x][right.y - 1].isSoild()) {
                if (this.y - this.h / 2 < right.y * TILE_SIZE + 1) {
                    this.ySpeed = 0;
                    this.y = right.y * TILE_SIZE + this.h / 2 + 1;
                }
            }
        }
        catch (error) {
        }
    }
    calcSpeed() {
        this.xSpeed *= this.airRes;
        this.ySpeed *= this.airRes;
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
    getInventory() {
        return this.inventory;
    }
    getCrafting() {
        return this.crafting;
    }
    getSkillManager() {
        return this.skillManager;
    }
}
class Menu {
    constructor() { }
}
class Crafting extends Menu {
    constructor() {
        super();
        this.widthOffset = 100;
        this.heightOffset = 100;
        this.buttons = [];
        this.BUTTONSIZE = 100;
        getRecipes();
    }
    afterGettingDataconstructor() {
        for (let i = 0; i < this.craftingRecipes.length; i++)
            this.buttons.push(new CraftingButton(this.craftingRecipes[i].item, this.BUTTONSIZE * i + this.BUTTONSIZE, this.BUTTONSIZE, this.BUTTONSIZE, this.BUTTONSIZE, translateItemNameToId(this.craftingRecipes[i].item), translateItemNameToItemReipe(this.craftingRecipes[i].name), 10));
    }
    show() {
        push();
        translate(-game.OFFSETX, -game.OFFSETY);
        rect(0 + this.widthOffset, 0 + this.heightOffset, width - this.widthOffset * 2, height - this.heightOffset * 2);
        this.buttons.forEach((item) => {
            item.show();
        });
        pop();
    }
    clicked() {
        this.buttons.forEach((item) => {
            item.clicked(this);
        });
    }
    hasEnoughMaterials(itemId) {
        let inventory = game.getPlayer().getInventory();
        switch (itemId) {
            case craftingList.test:
                let item = this.craftingRecipes[itemId].items_requrment;
                for (let i = 0; i < item.length; i++)
                    if (inventory.hasItem(itemList.Grass)) {
                        let pos = inventory.findItem(itemList.Grass, item[i].amount);
                        if (pos.x === -1 || pos.y === -1)
                            return false;
                    }
        }
        return false;
    }
}
class CraftingButton extends StartMenuButtons {
    constructor(txt, x, y, w, h, itemId, recipeId, txtSize) {
        super(txt, x, y, w, h, txtSize);
        this.itemId = itemId;
        this.recipeId = recipeId;
    }
    clicked(crafting) {
        if (this.mouseCollions()) {
            if (crafting.hasEnoughMaterials(this.recipeId))
                game.getPlayer().getInventory().giveItem(this.itemId);
        }
    }
}
class Inventory {
    constructor() {
        this.showBackpack = false;
        this.backpack = new Array(Inventory.BACKPACKWITDH);
        for (let i = 0; i < this.backpack.length; i++) {
            this.backpack[i] = new Array(Inventory.BACKPACKHEIGHT);
        }
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                this.backpack[i][j] = new InventorySlot(new Item(i, j, itemList.Air), i, j);
            }
        }
        this.backpack[0][0].addItem(new Pickaxe(0, 0));
    }
    giveItem(itemID) {
        let pos = this.findSlot(itemID);
        if (pos.x === -1 || pos.y === -1) {
            throw "No space";
        }
        switch (itemID) {
            case itemList.Stone:
                this.backpack[pos.x][pos.y].addItem(new StoneItem(pos.x, pos.y));
                break;
            case itemList.Pickaxe:
                this.backpack[pos.x][pos.y].addItem(new Pickaxe(pos.x, pos.y));
                break;
            case itemList.Grass:
                this.backpack[pos.x][pos.y].addItem(new GrasItem(pos.x, pos.y));
                break;
            default:
                console.log("No itemID:", itemID);
        }
    }
    findSlot(itemID) {
        let stackslot = this.stackItem(itemID);
        if (stackslot.x != -1 || stackslot.y != -1) {
            return stackslot;
        }
        return this.findEmptySlot();
    }
    stackItem(itemID) {
        let x = -1;
        let y = -1;
        let backpack = game.getPlayer().inventory.backpack;
        for (let i = 0; i < backpack.length; i++) {
            for (let j = 0; j < backpack[i].length; j++) {
                if (backpack[i][j].items[0].id === itemID &&
                    backpack[i][j].items[0].stackSize() > backpack[i][j].items.length) {
                    x = backpack[i][j].InventoryPosX;
                    y = backpack[i][j].InventoryPosY;
                }
            }
        }
        return {
            x: x,
            y: y,
        };
    }
    findEmptySlot() {
        let x = -1;
        let y = -1;
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                if (this.backpack[i][j].items[0].id === itemList.Air) {
                    x = i;
                    y = j;
                    break;
                }
            }
            if (x != -1)
                break;
        }
        return { x, y };
    }
    show() {
        push();
        translate(-game.OFFSETX, -game.OFFSETY);
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                this.backpack[i][j].showSlot();
                this.backpack[i][j].showItems();
                this.backpack[i][j].showStackSize();
            }
        }
        pop();
    }
    findItem(itemId, amount) {
        let x = -1;
        let y = -1;
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                if (this.backpack[i][j].items[0].id === itemId) {
                    if (this.backpack[i][j].items.length === amount) {
                        return { x: i, y: j };
                    }
                }
            }
        }
        return { x, y };
    }
    hasItem(itemId) {
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                if (this.backpack[i][j].items[0].id === itemId) {
                    return true;
                }
            }
        }
        return false;
    }
    itemSelector() {
        let mouseTilePos = this.boxSelector(mouseX, mouseY);
        let slot = this.backpack[mouseTilePos.x][mouseTilePos.y];
        if (slot.selected === true) {
            slot.selected = false;
            this.selected = null;
        }
        else {
            if (this.selected != null)
                this.selected.selected = false;
            slot.selected = true;
            this.selected = slot;
        }
    }
    getSelectedItemId() {
        return this.selected.items[0].id;
    }
    boxSelector(x, y) {
        x = Math.floor((x - offsetX) / Inventory.SLOTSIZE);
        y = Math.floor((y - offsetY) / Inventory.SLOTSIZE);
        return { x, y };
    }
}
Inventory.SLOTSIZE = 74;
Inventory.BACKPACKWITDH = 10;
Inventory.BACKPACKHEIGHT = 3;
class InventorySlot {
    constructor(item, InventoryPosX, InventoryPosY) {
        this.items = [];
        this.items.push(item);
        this.selected = false;
        this.InventoryPosX = InventoryPosX;
        this.InventoryPosY = InventoryPosY;
    }
    showSlot() {
        if (this.selected)
            fill(0, 255, 0);
        else
            fill(220);
        rect(this.InventoryPosX * Inventory.SLOTSIZE + offsetX, this.InventoryPosY * Inventory.SLOTSIZE + offsetY, Inventory.SLOTSIZE, Inventory.SLOTSIZE);
    }
    showStackSize() {
        if (this.items.length <= 1)
            return;
        fill(0);
        text(this.items.length, this.InventoryPosX * Inventory.SLOTSIZE +
            offsetX +
            Inventory.SLOTSIZE / 2, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + Inventory.SLOTSIZE / 2);
    }
    showItems() {
        for (let item of this.items) {
            item.showItem();
        }
    }
    addItem(item) {
        if (this.items[0].id === itemList.Air) {
            this.items = [];
            this.items.push(item);
        }
        else {
            this.items.push(item);
        }
    }
}
class Item {
    constructor(InventoryPosX, InventoryPosY, id, img) {
        this.width = 64;
        this.InventoryPosX = InventoryPosX;
        this.InventoryPosY = InventoryPosY;
        this.id = id;
        this.img = img;
    }
    showItem() {
        push();
        let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
        let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
        let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
        fill(255, 255, 255);
        rect(this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
        pop();
    }
    stackSize() {
        return 1;
    }
    item() {
        return itemList.Air;
    }
}
class GrasItem extends Item {
    constructor(InventoryPosX, InventoryPosY) {
        super(InventoryPosX, InventoryPosY, itemList.Grass);
    }
    showItem() {
        let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
        let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
        let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
        fill(0, 127, 0);
        rect(this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
    }
    stackSize() {
        return 99;
    }
}
class Pickaxe extends Item {
    constructor(InventoryPosX, InventoryPosY) {
        super(InventoryPosX, InventoryPosY, itemList.Pickaxe, itemImg[itemList.Pickaxe]);
    }
    showItem() {
        let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
        let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
        let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
        image(this.img, this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
    }
    stackSize() {
        return 1;
    }
}
class StoneItem extends Item {
    constructor(InventoryPosX, InventoryPosY) {
        super(InventoryPosX, InventoryPosY, itemList.Stone);
    }
    showItem() {
        let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
        let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
        let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
        fill(128, 128, 128);
        rect(this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
    }
    stackSize() {
        return 99;
    }
}
class Skill {
    constructor() {
        this.xp = 0;
        this.lvl = 0;
    }
    getMaxLvl() {
        return this.maxLvl;
    }
    addXp(xp) {
        this.xp += xp;
        if (this.lvl < this.maxLvl)
            this.setLvl(this.XpToLvl(this.xp));
        console.info(this.constructor.name + ":", this.xp + " xp", "|", this.lvl + " lvl");
    }
    setLvl(lvl) {
        this.lvl = lvl;
    }
    XpToLvl(xp) {
        return Math.floor(Math.pow(xp, 0.5));
    }
    getXp() {
        return this.xp;
    }
    getLvl() {
        return this.lvl;
    }
}
class SkillManager {
    constructor() {
        this.bars = [];
        this.mining = new SkillMining();
        this.bars.push(new Bar(20, 20, 200, 20, this.mining.getBarColor()));
    }
    addXp(xpOrb) {
        switch (xpOrb.type) {
            case SkillsList.mining:
                this.mining.addXp(xpOrb.xp);
                break;
        }
    }
    show() {
        push();
        translate(-game.OFFSETX, -game.OFFSETY);
        this.bars.forEach((item) => {
            item.show(this.mining.getLvl());
        });
        pop();
    }
}
class SkillMenu extends Menu {
    clicked() {
        throw new Error("Method not implemented.");
    }
    show() {
        throw new Error("Method not implemented.");
    }
}
class SkillMining extends Skill {
    constructor() {
        super();
        this.maxLvl = 100;
        this.barColor = { r: 100, g: 100, b: 100 };
    }
    getBarColor() {
        return this.barColor;
    }
}
class Bar {
    constructor(x, y, maxWidth, h, color, margin) {
        margin === undefined ? (this.margin = 5) : (this.margin = margin);
        this.x = x;
        this.y = y;
        this.w = 0;
        this.maxWidth = maxWidth;
        this.h = h;
        color === undefined
            ? (this.color = { r: 0, g: 0, b: 0 })
            : (this.color = color);
    }
    show(value) {
        push();
        fill(this.color.r - 20, this.color.g - 20, this.color.b - 20, 90);
        rect(this.x - this.margin, this.y - this.margin, this.maxWidth + this.margin * 2, this.h + this.margin * 2);
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.x, this.y, map(value, 0, 100, 0, this.maxWidth), this.h);
        pop();
    }
}
const canvasWidth = 960;
const canvasHeight = 640;
const TILE_SIZE = 64;
const PLAYER_SIZE = 32;
const WORLDHEIGHT = 10;
const WORLDWIDTH = 30;
const offsetX = canvasWidth / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
const offsetY = canvasHeight / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
var tileID;
(function (tileID) {
    tileID[tileID["Air"] = 0] = "Air";
    tileID[tileID["Grass"] = 1] = "Grass";
    tileID[tileID["Stone"] = 2] = "Stone";
    tileID[tileID["Bedrock"] = 3] = "Bedrock";
    tileID[tileID["TempTile"] = 4] = "TempTile";
})(tileID || (tileID = {}));
var itemList;
(function (itemList) {
    itemList[itemList["Air"] = 0] = "Air";
    itemList[itemList["Stone"] = 1] = "Stone";
    itemList[itemList["Grass"] = 2] = "Grass";
    itemList[itemList["Pickaxe"] = 3] = "Pickaxe";
})(itemList || (itemList = {}));
var menuList;
(function (menuList) {
    menuList[menuList["game"] = 0] = "game";
    menuList[menuList["inventory"] = 1] = "inventory";
    menuList[menuList["crafting"] = 2] = "crafting";
    menuList[menuList["skill"] = 3] = "skill";
})(menuList || (menuList = {}));
var itemName;
(function (itemName) {
    itemName["Air"] = "Air";
    itemName["Stone"] = "Stone";
    itemName["Grass"] = "Grass";
    itemName["Pickaxe"] = "Pickaxe";
})(itemName || (itemName = {}));
var craftingList;
(function (craftingList) {
    craftingList[craftingList["test"] = 0] = "test";
    craftingList[craftingList["recipe_pickaxe"] = 1] = "recipe_pickaxe";
})(craftingList || (craftingList = {}));
var SkillsList;
(function (SkillsList) {
    SkillsList[SkillsList["none"] = 0] = "none";
    SkillsList[SkillsList["mining"] = 1] = "mining";
})(SkillsList || (SkillsList = {}));
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
        let tile = game.getWorld().tiles[tileCoords.x][tileCoords.y];
        return tile;
    }
    catch (error) {
        switch (error.message) {
            case "game.getWorld().tiles[tileCoords.x] is undefined":
                throw new Error("Mouse is outside of the grid");
            case "game.getWorld().tiles[tileCoords.y] is undefined":
                throw new Error("Mouse is outside of the grid");
            default:
        }
    }
}
function translateItemNameToId(itemName) {
    switch (itemName.toUpperCase()) {
        case "STONE":
            return itemList.Stone;
        case "AIR":
            return itemList.Air;
        case "GRASS":
            return itemList.Grass;
        case "PICKAXE":
            return itemList.Pickaxe;
    }
    throw "No Item Name" + itemName;
}
function translateItemNameToItemReipe(itemName) {
    switch (itemName.toUpperCase()) {
        case "TEST":
            return craftingList.test;
        case "RECIPE_PICKAXE":
            craftingList.recipe_pickaxe;
    }
    return;
}
async function getRecipes() {
    fetch("sketch/data/crafting/items.json")
        .then((response) => response.json())
        .then((json) => {
        game.getPlayer().getCrafting().craftingRecipes = json;
        game.getPlayer().getCrafting().afterGettingDataconstructor();
        game.loading = false;
    });
}
function itemListToName(itemId) {
    switch (itemId) {
        case itemList.Air:
            return itemName.Air;
        case itemList.Stone:
            return itemName.Stone;
        case itemList.Grass:
            return itemName.Grass;
        case itemList.Pickaxe:
            return itemName.Pickaxe;
    }
    throw "no name/list";
}
class Tile {
    constructor(x, y, w, id) {
        this._breakingLevel = 0;
        this.regenerationSpeed = 1000;
        this._x = x;
        this._y = y;
        this._w = w;
        this._id = id;
    }
    show() {
        image(tilesImg[this._id], this._x, this._y, this._w, this._w);
        image(breakingImg[this._breakingLevel], this._x, this._y, this._w, this._w);
    }
    isSoild() {
        return false;
    }
    isBreakable() {
        return false;
    }
    item() {
        return itemList.Air;
    }
    getRegenerationSpeed() {
        return this.regenerationSpeed;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get x() {
        return this._x;
    }
    set xx(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get w() {
        return this._w;
    }
    set w(w) {
        this._w = w;
    }
    get breakingLevel() {
        return this._breakingLevel;
    }
    set breakingLevel(v) {
        this._breakingLevel = v;
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
                this.tiles[i][j] = this.createTile(this.world[i][j], i, j);
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
    changeTile(x, y, tile, tempTile, regenerationSpeed) {
        this.world[x][y] = tile;
        this.tiles[x][y] = this.createTile(tile, x, y, tempTile, regenerationSpeed);
    }
    createTile(tileId, x, y, tempTile, regenerationSpeed) {
        let tile;
        switch (tileId) {
            case tileID.Air:
                tile = new AirTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
                break;
            case tileID.Grass:
                tile = new GrassTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
                break;
            case tileID.Stone:
                tile = new StoneTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
                break;
            case tileID.Bedrock:
                tile = new BedrockTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE);
                break;
            case tileID.TempTile:
                tile = new TempTile(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, tempTile, regenerationSpeed);
                break;
            default:
                throw new Error(`No Tile with the id: ${tileId}`);
        }
        return tile;
    }
}
class WorldGenerator {
    constructor(world) {
        this.world = new Array(WORLDWIDTH);
        for (let i = 0; i < WORLDWIDTH; i++) {
            this.world[i] = new Array(WORLDHEIGHT);
        }
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[i].length; j++) {
                this.world[i][j] = 0;
            }
        }
        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < 3; j++) {
                this.world[i][this.world[i].length - j - 1] = 2;
            }
        }
        for (let i = 0; i < this.world.length; i++) {
            this.world[i][this.world[i].length - 1] = 3;
        }
        this.world[2][7] = 1;
    }
    getWorld() {
        return this.world;
    }
}
class AirTile extends Tile {
    constructor(x, y, w) {
        super(x, y, w, tileID.Air);
    }
    isSoild() {
        return false;
    }
    isBreakable() {
        return false;
    }
    xp() {
        return { xp: 0, type: SkillsList.none };
    }
}
class BedrockTile extends Tile {
    constructor(x, y, w) {
        super(x, y, w, tileID.Bedrock);
    }
    isSoild() {
        return true;
    }
    isBreakable() {
        return false;
    }
    xp() {
        return { xp: 0, type: SkillsList.none };
    }
}
class GrassTile extends Tile {
    constructor(x, y, w) {
        super(x, y, w, tileID.Grass);
        this.regenerationSpeed = 1000 * 60;
    }
    xp() {
        return { xp: 1, type: SkillsList.mining };
    }
    isSoild() {
        return true;
    }
    isBreakable() {
        return true;
    }
    item() {
        return itemList.Grass;
    }
}
class StoneTile extends Tile {
    constructor(x, y, w) {
        super(x, y, w, tileID.Stone);
        this.regenerationSpeed = 1000 * 60 * 2;
    }
    xp() {
        return { xp: 1, type: SkillsList.mining };
    }
    isSoild() {
        return true;
    }
    isBreakable() {
        return true;
    }
    item() {
        return itemList.Stone;
    }
}
class TempTile extends BedrockTile {
    constructor(x, y, w, afterId, regenerationSpeed) {
        super(x, y, w);
        setTimeout(() => {
            let worldTile = GameWorldToTile(x, y);
            game.getWorld().changeTile(worldTile.x, worldTile.y, afterId);
        }, regenerationSpeed);
    }
    xp() {
        return { xp: 0, type: SkillsList.none };
    }
}
//# sourceMappingURL=build.js.map