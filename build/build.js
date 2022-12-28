class Game {
    constructor(world) {
        this.world = world;
        this.player = new Player(300, 100, PLAYER_SIZE, PLAYER_SIZE, playerImg);
        this.showMenu = menuList.game;
    }
    tick() {
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
    mousePressed() {
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
            case 66:
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
    itemImg[itemList.Air] = loadImage("sketch/assets/item/air.png");
    itemImg[itemList.Stone] = loadImage("sketch/assets/item/stone.png");
    itemImg[itemList.Grass] = loadImage("sketch/assets/item/grass.png");
    itemImg[itemList.Pickaxe] = loadImage("sketch/assets/item/pickaxe.png");
    itemImg[itemList.TeleportStick] = loadImage("sketch/assets/item/TeleportStick.png");
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
    constructor() {
        console.log("Cheating: Enabled");
    }
    giveItem(itemId, amount) {
        if (amount === undefined)
            amount = 1;
        for (let i = 0; i < amount; i++)
            game.getPlayer().getInventory().giveItem(itemId);
        console.log(`Gived: ${itemList[itemId]}: ${amount}`);
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
    testCraft() {
        this.giveItem(itemList.Grass, 99);
        this.giveItem(itemList.Stone, 99);
    }
}
let cheats = new Cheating();
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
        this.manaManager = new ManaManager();
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
            if (game.getWorld().tiles[rightCorner.x][rightCorner.y].isSolid() || game.getWorld().tiles[leftCorner.x][leftCorner.y].isSolid()) {
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
            if (game.getWorld().tiles[tilePos.x + 1][tilePos.y].isSolid()) {
                if (this.x + this.w / 2 > (tilePos.x + 1) * TILE_SIZE) {
                    this.xSpeed = 0;
                    this.x = (tilePos.x + 1) * TILE_SIZE - this.w / 2 - 1;
                }
            }
            if (game.getWorld().tiles[tilePos.x - 1][tilePos.y].isSolid()) {
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
    getManaManager() {
        return this.manaManager;
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
        this.craftingRecipes = [
            {
                name: "test",
                items_requirement: [
                    { name: itemList.Grass, amount: 1 },
                    { name: itemList.Stone, amount: 3 },
                ],
                item: itemList.Grass,
            },
            {
                name: "recipe_pickaxe",
                items_requirement: [
                    { name: itemList.Stone, amount: 3 },
                    { name: itemList.Air, amount: 2 },
                ],
                item: itemList.Pickaxe,
            },
        ];
        for (let i = 0; i < this.craftingRecipes.length; i++)
            this.buttons.push(new CraftingButton(itemList[this.craftingRecipes[i].item], this.BUTTONSIZE * i + this.BUTTONSIZE, this.BUTTONSIZE, this.BUTTONSIZE, this.BUTTONSIZE, this.craftingRecipes[i].item, translateItemNameToItemReipe(this.craftingRecipes[i].name), 20));
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
        let itemReq = this.craftingRecipes[itemId].items_requirement;
        let arr = [];
        for (let i = 0; i < itemReq.length; i++) {
            arr.push(inventory.hasItem(itemReq[i].name, itemReq[i].amount));
        }
        if (!arr.every((v) => v === true))
            return false;
        for (let i = 0; i < itemReq.length; i++) {
            if (inventory.hasItem(itemReq[i].name, itemReq[i].amount)) {
                inventory.removeItem(itemReq[i].name, itemReq[i].amount);
            }
        }
        return true;
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
            if (crafting.hasEnoughMaterials(this.recipeId)) {
                game.getPlayer().getInventory().giveItem(this.itemId);
            }
        }
    }
}
class Inventory {
    constructor() {
        this.showBackpack = false;
        this.selected = null;
        this.backpack = new Array(Inventory.BACKPACKWITDH);
        for (let i = 0; i < this.backpack.length; i++) {
            this.backpack[i] = new Array(Inventory.BACKPACKHEIGHT);
        }
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                this.backpack[i][j] = new InventorySlot(ItemGen.getEmpty(i, j), i, j);
            }
        }
        this.backpack[0][0].addItem(ItemGen.getPickaxe(0, 0));
        this.backpack[1][0].addItem(ItemGen.getTeleportStick(1, 0));
    }
    giveItem(itemID, amount = 1) {
        let pos = this.findSlot(itemID);
        if (pos.x === -1 || pos.y === -1) {
            throw "No space";
        }
        for (let i = 0; i < amount; i++) {
            this.backpack[pos.x][pos.y].addItem(ItemGen.itempicker(itemID, pos.x, pos.y));
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
        let backpack = game.getPlayer().getInventory().backpack;
        for (let i = 0; i < backpack.length; i++) {
            for (let j = 0; j < backpack[i].length; j++) {
                if (backpack[i][j].items[0].getId() === itemID && backpack[i][j].items[0].getStackSize() > backpack[i][j].items.length) {
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
                if (this.backpack[i][j].items[0].getId() === itemList.Air) {
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
                if (this.backpack[i][j].items[0].getId() === itemId) {
                    if (this.backpack[i][j].items.length >= amount) {
                        return { x: i, y: j };
                    }
                }
            }
        }
        return { x, y };
    }
    hasItem(itemId, amount) {
        for (let i = 0; i < this.backpack.length; i++) {
            for (let j = 0; j < this.backpack[i].length; j++) {
                if (this.backpack[i][j].items[0].getId() === itemId) {
                    if (this.backpack[i][j].items.length >= amount) {
                        return true;
                    }
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
    getSelectedItem() {
        if (this.selected !== null) {
            return this.selected.items;
        }
    }
    getSelectedItemId() {
        return this.selected.items[0].getId();
    }
    boxSelector(x, y) {
        x = Math.floor((x - offsetX) / Inventory.SLOTSIZE);
        y = Math.floor((y - offsetY) / Inventory.SLOTSIZE);
        return { x, y };
    }
    removeItem(item, amount) {
        for (let i = 0; i < amount; i++) {
            let pos = this.findItem(item, 1);
            let items = this.backpack[pos.x][pos.y].items;
            items.pop();
            if (items.length === 0) {
                this.backpack[pos.x][pos.y].items[0] = ItemGen.getEmpty(pos.x, pos.y);
            }
        }
    }
    mousePressed() {
        this.itemSelector();
        if (this.selected !== null)
            this.selected.items.forEach((element) => {
                element.itemSelected();
            });
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
        text(this.items.length, this.InventoryPosX * Inventory.SLOTSIZE + offsetX + Inventory.SLOTSIZE / 2, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + Inventory.SLOTSIZE / 2);
    }
    showItems() {
        for (let item of this.items) {
            item.showItem();
        }
    }
    addItem(item) {
        if (this.items[0].getId() === itemList.Air) {
            this.items = [];
            this.items.push(item);
        }
        else {
            this.items.push(item);
        }
    }
}
class Item {
    constructor(obj) {
        this.width = 64;
        this.InventoryPosX = obj.InventoryPosX;
        this.InventoryPosY = obj.InventoryPosY;
        this.id = obj.id;
        this.img = obj.img;
        this.stackSize = obj.stackSize;
        this.abilities = obj.abilities;
    }
    showItem() {
        let itemBoxOffset = (Inventory.SLOTSIZE - this.width) / 2;
        let offsetX = width / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKWITDH) / 2;
        let offsetY = height / 2 - (Inventory.SLOTSIZE * Inventory.BACKPACKHEIGHT) / 2;
        image(this.img, this.InventoryPosX * Inventory.SLOTSIZE + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SLOTSIZE + offsetY + itemBoxOffset, this.width, this.width);
    }
    getStackSize() {
        return this.stackSize;
    }
    getItem() {
        return this;
    }
    getInventoryPos() {
        return { x: this.InventoryPosX, y: this.InventoryPosY };
    }
    getId() {
        return this.id;
    }
    itemSelected() {
        this.abilities.forEach((element) => {
            element.abilitySelected();
        });
    }
    clicked(playerX, playerY) {
        this.abilities.forEach((element) => {
            element.abilityClicked(playerX, playerY);
        });
    }
    tick(playerX, playerY) {
        this.abilities.forEach((element) => {
            element.abilityTick(playerX, playerY);
        });
    }
}
class ItemGen {
    static getPickaxe(InventoryPosX, InventoryPosY) {
        let item = {
            InventoryPosX: InventoryPosX,
            InventoryPosY: InventoryPosY,
            id: itemList.Pickaxe,
            img: itemImg[itemList.Pickaxe],
            stackSize: 1,
            abilities: [new Mining()],
        };
        return new Item(item);
    }
    static getEmpty(InventoryPosX, InventoryPosY) {
        let item = {
            InventoryPosX: InventoryPosX,
            InventoryPosY: InventoryPosY,
            id: itemList.Air,
            img: itemImg[itemList.Air],
            stackSize: 1,
            abilities: [],
        };
        return new Item(item);
    }
    static getStone(InventoryPosX, InventoryPosY) {
        let item = {
            InventoryPosX: InventoryPosX,
            InventoryPosY: InventoryPosY,
            id: itemList.Stone,
            img: itemImg[itemList.Stone],
            stackSize: 99,
            abilities: [],
        };
        return new Item(item);
    }
    static getGrass(InventoryPosX, InventoryPosY) {
        let item = {
            InventoryPosX: InventoryPosX,
            InventoryPosY: InventoryPosY,
            id: itemList.Grass,
            img: itemImg[itemList.Grass],
            stackSize: 99,
            abilities: [],
        };
        return new Item(item);
    }
    static getTeleportStick(InventoryPosX, InventoryPosY) {
        let item = {
            InventoryPosX: InventoryPosX,
            InventoryPosY: InventoryPosY,
            id: itemList.TeleportStick,
            img: itemImg[itemList.TeleportStick],
            stackSize: 1,
            abilities: [new Teleport(10 * TILE_SIZE)],
        };
        return new Item(item);
    }
    static itempicker(itemID, InventoryPosX, InventoryPosY) {
        let item;
        switch (itemID) {
            case itemList.Air:
                item = ItemGen.getEmpty(InventoryPosX, InventoryPosY);
                break;
            case itemList.Grass:
                item = ItemGen.getGrass(InventoryPosX, InventoryPosY);
                break;
            case itemList.Stone:
                item = ItemGen.getStone(InventoryPosX, InventoryPosY);
                break;
            case itemList.Pickaxe:
                item = ItemGen.getPickaxe(InventoryPosX, InventoryPosY);
                break;
            case itemList.TeleportStick:
                item = ItemGen.getTeleportStick(InventoryPosX, InventoryPosY);
                break;
        }
        return item;
    }
}
class Stick extends Item {
}
class Abilities {
    constructor() { }
}
class Mining extends Abilities {
    constructor() {
        super();
        this.manaCost = 0;
    }
    abilitySelected() {
        throw new Error("Method not implemented.");
    }
    abilityTick(playerX, playerY) {
        this.mouseHover();
    }
    abilityClicked() {
        let tile = TileLookUp(mouseX - game.OFFSETX, mouseY - game.OFFSETY);
        let inventory = game.getPlayer().getInventory();
        if (!tile.isSolid())
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
            game.getWorld().changeTile(worldTile.x, worldTile.y, tileID.TempTile, tile.id, tile.getRegenerationSpeed());
            game.getPlayer().getSkillManager().addXp(tile.xp());
        }
    }
    mouseHover() {
        try {
            if (game.getPlayer().getInventory().showBackpack)
                return;
            if (!TileLookUp(mouseX - game.OFFSETX, mouseY - game.OFFSETY).isSolid())
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
}
class Teleport extends Abilities {
    constructor(diameter) {
        super();
        this.manaCost = 50;
        this.diameter = diameter;
    }
    abilitySelected() {
        throw new Error("Method not implemented.");
    }
    abilityClicked(playerX, playerY) {
        this.tpPlayer(playerX, playerY);
    }
    tpPlayer(playerX, playerY) {
        let mana = game.getPlayer().getManaManager().getMana();
        let mouseTile = GameWorldToTile(mouseX - game.OFFSETX, mouseY - game.OFFSETY);
        let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
        let rangeCheck = this.diameter / 2 >= dist(playerX, playerY, mousePos.x, mousePos.y);
        if (!rangeCheck)
            return;
        if (TileLookUp(mousePos.x, mousePos.y).isSolid())
            return;
        if (this.manaCost > mana)
            return;
        game.getPlayer().x = mousePos.x + TILE_SIZE / 2;
        game.getPlayer().y = mousePos.y + TILE_SIZE / 2;
        game.getPlayer().getManaManager().useMana(this.manaCost);
    }
    abilityTick(playerX, playerY) {
        this.abilityPreview(playerX, playerY);
    }
    abilityPreview(playerX, playerY) {
        let mouseTile = GameWorldToTile(mouseX - game.OFFSETX, mouseY - game.OFFSETY);
        let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
        push();
        strokeWeight(3);
        fill(0, 0, 0, 0);
        rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);
        strokeWeight(1);
        fill(76, 255, 0, 100);
        ellipse(playerX, playerY, this.diameter, this.diameter);
        pop();
    }
}
class Skill {
    constructor() {
        this.lvl = 1;
        this.xp = lvlReq[this.lvl];
    }
    getMaxLvl() {
        return this.maxLvl;
    }
    addXp(xp) {
        this.xp += xp;
        this.updateLvl();
        console.info(`${this.constructor.name} : ${this.xp} xp | ${this.lvl} lvl`);
    }
    getXp() {
        return this.xp;
    }
    getLvl() {
        return this.lvl;
    }
    updateLvl() {
        if (lvlReq[this.lvl + 1] <= this.xp) {
            this.lvl++;
            this.updateLvl();
        }
    }
    getBarColor() {
        return this.barColor;
    }
}
class SkillManager {
    constructor() {
        this.bars = [];
        this.widthOffset = 100;
        this.heightOffset = 100;
        this.mining = new SkillMining();
        this.bars[SkillsList.mining] = new Bar(50 + this.widthOffset, 50 + this.heightOffset, 200, 20, this.mining.getBarColor());
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
        rect(this.widthOffset, this.heightOffset, width - this.widthOffset * 2, height - this.heightOffset * 2);
        this.bars[SkillsList.mining].setMinValue(lvlReq[this.mining.getLvl()]);
        this.bars[SkillsList.mining].setMaxValue(lvlReq[this.mining.getLvl() + 1]);
        this.bars[SkillsList.mining].setValue(this.mining.getXp());
        this.bars[SkillsList.mining].show();
        pop();
    }
}
class SkillMining extends Skill {
    constructor() {
        super();
        this.barColor = { r: 100, g: 100, b: 100 };
        this.maxLvl = 100;
    }
}
const lvlReq = [2];
for (let i = 0; i < 100; i++) {
    lvlReq.push(Math.floor(lvlReq[lvlReq.length - 1] * 1.5));
}
class ManaManager {
    constructor() {
        this.mana = 100;
        this.maxMana = 100;
        this.manaBar = new Bar(5, 5, 300, 20, { r: 71, g: 184, b: 255 }, 5);
        this.manaBar.setMinValue(0);
        this.manaBar.setMaxValue(100);
    }
    useMana(manaCost) {
        this.mana -= manaCost;
    }
    show() {
        this.manaBar.setValue(this.mana);
        this.manaBar.show();
    }
    tick() {
        this.manaRegeneration();
    }
    manaRegeneration() {
        if (this.mana < this.maxMana)
            this.mana += 1;
    }
    getMana() {
        return this.mana;
    }
    getMaxMana() {
        return this.maxMana;
    }
}
class Bar {
    constructor(x, y, maxWidth, h, color, margin) {
        this.value = 0;
        this.minValue = 0;
        this.maxValue = 100;
        margin === undefined ? (this.margin = 5) : (this.margin = margin);
        this.x = x;
        this.y = y;
        this.w = 0;
        this.maxWidth = maxWidth;
        this.h = h;
        color === undefined ? (this.color = { r: 0, g: 0, b: 0 }) : (this.color = color);
    }
    show() {
        push();
        translate(-game.OFFSETX, -game.OFFSETY);
        fill(this.color.r - 20, this.color.g - 20, this.color.b - 20, 90);
        rect(this.x - this.margin, this.y - this.margin, this.maxWidth + this.margin * 2, this.h + this.margin * 2);
        fill(this.color.r, this.color.g, this.color.b);
        rect(this.x, this.y, map(this.value, this.minValue, this.maxValue, 0, this.maxWidth), this.h);
        pop();
    }
    setMinValue(minValue) {
        this.minValue = minValue;
    }
    setMaxValue(maxValue) {
        this.maxValue = maxValue;
    }
    setValue(value) {
        this.value = value;
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
    itemList[itemList["TeleportStick"] = 4] = "TeleportStick";
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
        default:
            throw "no name/list";
    }
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
    isSolid() {
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
        this.world[3][6] = 2;
        this.world[3][5] = 2;
    }
    getWorld() {
        return this.world;
    }
}
class AirTile extends Tile {
    constructor(x, y, w) {
        super(x, y, w, tileID.Air);
    }
    isSolid() {
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
    isSolid() {
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
    isSolid() {
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
    isSolid() {
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