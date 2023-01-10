class Game {
    constructor() {
        this.world = new World();
        let tryX = 2;
        let playerSpawn = this.world.getWorldGen().safeSpawn(tryX);
        while (playerSpawn.x === -1 || playerSpawn.y === -1) {
            tryX++;
            playerSpawn = this.world.getWorldGen().safeSpawn(tryX);
        }
        this.player = new Player(playerSpawn.x * TILE_SIZE, playerSpawn.y * TILE_SIZE, PLAYER_SIZE, PLAYER_SIZE, playerImg);
    }
    tick() {
        this.OffSetX = width / 2 - this.player.x - this.player.w / 2;
        this.OffSetY = height / 2 - this.player.y - this.player.h / 2;
        translate(this.OffSetX, this.OffSetY);
        this.player.tick();
        this.world.show();
        this.player.show();
    }
    mousePressed() {
        this.player.mousePressed();
    }
    KeyPressed() {
        this.player.pressed(keyCode === 65, keyCode === 68, keyCode === 87, keyCode === 83);
        switch (keyCode) {
            case 69:
                if (this.player.showMenu === menuList.inventory) {
                    this.player.showMenu = menuList.game;
                }
                else {
                    this.player.showMenu = menuList.inventory;
                }
                break;
            case 67:
                if (this.player.showMenu === menuList.crafting) {
                    this.player.showMenu = menuList.game;
                }
                else {
                    this.player.showMenu = menuList.crafting;
                }
                break;
            case 66:
                if (this.player.showMenu === menuList.skill) {
                    this.player.showMenu = menuList.game;
                }
                else {
                    this.player.showMenu = menuList.skill;
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
    playerImg = loadImage("assets/player.png");
    tilesImg[tileList.Air] = loadImage("assets/tiles/Air.png");
    tilesImg[tileList.Grass] = loadImage("assets/tiles/Grass.png");
    tilesImg[tileList.Stone] = loadImage("assets/tiles/Stone.png");
    tilesImg[tileList.Bedrock] = loadImage("assets/tiles/Bedrock.png");
    tilesImg[tileList.TempTile] = null;
    tilesImg[tileList.Water] = loadImage("assets/tiles/Water.png");
    tilesImg[tileList.Dirt] = loadImage("assets/tiles/Dirt.png");
    itemImg[itemList.Air] = loadImage("assets/item/air.png");
    itemImg[itemList.Stone] = loadImage("assets/item/stone.png");
    itemImg[itemList.Grass] = loadImage("assets/item/grass.png");
    itemImg[itemList.Pickaxe] = loadImage("assets/item/pickaxe.png");
    itemImg[itemList.TeleportStick] = loadImage("assets/item/TeleportStick.png");
    breakingImg.push(loadImage("assets/breaking/destroy_stage_0.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_1.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_2.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_3.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_4.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_5.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_6.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_7.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_8.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_9.png"));
    breakingImg.push(loadImage("assets/breaking/destroy_stage_10.png"));
}
function setup() {
    createCanvas(960, 640);
    game = new Game();
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
        case GameStateList.WorldGen:
            break;
        default:
            throw "Missing GameState";
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
        game.getPlayer().x = x * TILE_SIZE;
        game.getPlayer().y = y * TILE_SIZE;
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
        this.noClip = false;
        this.GravitySpeed = 2;
        this.gravity = true;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.airRes = 0.8;
        this.walkSpeed = 2;
        this.JumpBoost = 40;
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
        if (!this.noClip) {
            this.Gravity();
            this.wallCollision();
            this.groundCollision();
            this.wallRoof();
        }
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
    move() {
        if (this.left)
            this.xSpeed -= this.walkSpeed;
        if (this.right)
            this.xSpeed += this.walkSpeed;
        if (this.jump)
            if (this.up)
                this.ySpeed -= this.JumpBoost;
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
    Gravity() {
        if (this.gravity)
            this.ySpeed += this.GravitySpeed;
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
        translate(-game.OffSetX, -game.OffSetY);
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
            this.backpack[pos.x][pos.y].addItem(ItemGen.itemPicker(itemID, pos.x, pos.y));
        }
    }
    findSlot(itemID) {
        let stackSlot = this.stackItem(itemID);
        if (stackSlot.x != -1 || stackSlot.y != -1) {
            return stackSlot;
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
        translate(-game.OffSetX, -game.OffSetY);
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
        x = Math.floor((x - offsetX) / Inventory.SlotSize);
        y = Math.floor((y - offsetY) / Inventory.SlotSize);
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
Inventory.SlotSize = 74;
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
        rect(this.InventoryPosX * Inventory.SlotSize + offsetX, this.InventoryPosY * Inventory.SlotSize + offsetY, Inventory.SlotSize, Inventory.SlotSize);
    }
    showStackSize() {
        if (this.items.length <= 1)
            return;
        fill(0);
        text(this.items.length, this.InventoryPosX * Inventory.SlotSize + offsetX + Inventory.SlotSize / 2, this.InventoryPosY * Inventory.SlotSize + offsetY + Inventory.SlotSize / 2);
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
        let itemBoxOffset = (Inventory.SlotSize - this.width) / 2;
        let offsetX = width / 2 - (Inventory.SlotSize * Inventory.BACKPACKWITDH) / 2;
        let offsetY = height / 2 - (Inventory.SlotSize * Inventory.BACKPACKHEIGHT) / 2;
        image(this.img, this.InventoryPosX * Inventory.SlotSize + offsetX + itemBoxOffset, this.InventoryPosY * Inventory.SlotSize + offsetY + itemBoxOffset, this.width, this.width);
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
    static itemPicker(itemID, InventoryPosX, InventoryPosY) {
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
        console.info("A mining item a been selected");
    }
    abilityTick(playerX, playerY) {
        this.mouseHover();
    }
    abilityClicked() {
        let tile = TileLookUp(mouseX - game.OffSetX, mouseY - game.OffSetY);
        let inventory = game.getPlayer().getInventory();
        if (!tile.isSolid())
            return;
        if (!tile.isBreakable())
            return;
        if (inventory.showBackpack)
            return;
        if (inventory.getSelectedItemId() != itemList.Pickaxe)
            return;
        if (tile.getBreakingLevel() < breakingImg.length - 1)
            tile.setBreakingLevel(tile.getBreakingLevel() + 1);
        else if (tile.getBreakingLevel() === breakingImg.length - 1) {
            let worldTile = GameWorldToTile(tile.getX(), tile.getY());
            inventory.giveItem(tile.getItem());
            game.getWorld().changeTile(worldTile.x, worldTile.y, tileList.Air);
            game.getPlayer().getSkillManager().addXp(tile.xp());
        }
    }
    mouseHover() {
        try {
            if (game.getPlayer().showMenu != menuList.game)
                return;
            if (!TileLookUp(mouseX - game.OffSetX, mouseY - game.OffSetY).isHoverable())
                return;
            push();
            let mouseTile = GameWorldToTile(mouseX - game.OffSetX, mouseY - game.OffSetY);
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
        console.info("A teleportation item a been selected");
    }
    abilityClicked(playerX, playerY) {
        this.tpPlayer(playerX, playerY);
    }
    tpPlayer(playerX, playerY) {
        let mana = game.getPlayer().getManaManager().getMana();
        let mouseTile = GameWorldToTile(mouseX - game.OffSetX, mouseY - game.OffSetY);
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
        if (game.getPlayer().showMenu != menuList.game)
            return;
        let mouseTile = GameWorldToTile(mouseX - game.OffSetX, mouseY - game.OffSetY);
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
        translate(-game.OffSetX, -game.OffSetY);
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
        translate(-game.OffSetX, -game.OffSetY);
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
const offsetX = canvasWidth / 2 - (Inventory.SlotSize * Inventory.BACKPACKWITDH) / 2;
const offsetY = canvasHeight / 2 - (Inventory.SlotSize * Inventory.BACKPACKHEIGHT) / 2;
var tileList;
(function (tileList) {
    tileList[tileList["Air"] = 0] = "Air";
    tileList[tileList["Grass"] = 1] = "Grass";
    tileList[tileList["Stone"] = 2] = "Stone";
    tileList[tileList["Bedrock"] = 3] = "Bedrock";
    tileList[tileList["TempTile"] = 4] = "TempTile";
    tileList[tileList["Water"] = 5] = "Water";
    tileList[tileList["Dirt"] = 6] = "Dirt";
})(tileList || (tileList = {}));
var itemList;
(function (itemList) {
    itemList[itemList["Air"] = 0] = "Air";
    itemList[itemList["Stone"] = 1] = "Stone";
    itemList[itemList["Grass"] = 2] = "Grass";
    itemList[itemList["Pickaxe"] = 3] = "Pickaxe";
    itemList[itemList["TeleportStick"] = 4] = "TeleportStick";
    itemList[itemList["Bedrock"] = 5] = "Bedrock";
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
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
class Tile {
    constructor(obj) {
        this.breakingLevel = 0;
        this.regenerationSpeed = 1000;
        this.x = obj.x * TILE_SIZE;
        this.y = obj.y * TILE_SIZE;
        this.w = obj.w;
        this.id = obj.id;
        this.image = obj.image;
        this.item = obj.item;
        this.breakingLevel = this.breakingLevel;
        this.regenerationSpeed = obj.regenerationSpeed;
        this.solid = obj.isSolid;
        this.breakable = obj.isBreakable;
        this.hoverable = obj.hoverable;
    }
    xp() {
        return { xp: 0, type: SkillsList.mining };
    }
    show() {
        image(this.image, this.x, this.y, this.w, this.w);
        image(breakingImg[this.breakingLevel], this.x, this.y, this.w, this.w);
    }
    isHoverable() {
        return this.hoverable;
    }
    isSolid() {
        return this.solid;
    }
    isBreakable() {
        return this.breakable;
    }
    getItem() {
        return this.item;
    }
    getRegenerationSpeed() {
        return this.regenerationSpeed;
    }
    getId() {
        return this.id;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getW() {
        return this.w;
    }
    getBreakingLevel() {
        return this.breakingLevel;
    }
    setBreakingLevel(v) {
        this.breakingLevel = v;
    }
}
class TilesGen {
    constructor() { }
    static getBedrockTile(x, y) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.Bedrock,
            image: tilesImg[tileList.Bedrock],
            item: itemList.Bedrock,
            breakingLevel: 0,
            regenerationSpeed: 1000,
            isSolid: true,
            isBreakable: false,
            hoverable: true,
            xp: { xp: 0, type: SkillsList.none },
        };
        return new Tile(tile);
    }
    static getAirTile(x, y) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.Air,
            image: tilesImg[tileList.Air],
            item: itemList.Air,
            breakingLevel: 0,
            regenerationSpeed: 1000,
            isSolid: false,
            isBreakable: false,
            hoverable: false,
            xp: { xp: 0, type: SkillsList.none },
        };
        return new Tile(tile);
    }
    static getGrassTile(x, y) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.Grass,
            image: tilesImg[tileList.Grass],
            item: itemList.Grass,
            breakingLevel: 0,
            regenerationSpeed: 1000 * 60,
            isSolid: true,
            isBreakable: true,
            hoverable: true,
            xp: { xp: 1, type: SkillsList.mining },
        };
        return new Tile(tile);
    }
    static getDirtTile(x, y) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.Grass,
            image: tilesImg[tileList.Dirt],
            item: itemList.Grass,
            breakingLevel: 0,
            regenerationSpeed: 1000 * 60,
            isSolid: true,
            isBreakable: true,
            hoverable: true,
            xp: { xp: 1, type: SkillsList.mining },
        };
        return new Tile(tile);
    }
    static getStoneTile(x, y) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.Stone,
            image: tilesImg[tileList.Stone],
            item: itemList.Stone,
            breakingLevel: 0,
            regenerationSpeed: 1000 * 60,
            isSolid: true,
            isBreakable: true,
            hoverable: true,
            xp: { xp: 1, type: SkillsList.mining },
        };
        return new Tile(tile);
    }
    static getTempTile(x, y, afterId, regenerationSpeed) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.TempTile,
            image: tilesImg[tileList.Bedrock],
            item: itemList.Air,
            breakingLevel: 0,
            regenerationSpeed: 1000,
            isSolid: true,
            isBreakable: false,
            hoverable: true,
            xp: { xp: 0, type: SkillsList.mining },
            creationFunction: () => {
                setTimeout(() => {
                    let worldTile = GameWorldToTile(x, y);
                    game.getWorld().changeTile(worldTile.x, worldTile.y, afterId);
                }, regenerationSpeed);
            },
        };
        return new Tile(tile);
    }
    static getWaterTile(x, y) {
        let tile = {
            x: x,
            y: y,
            w: TILE_SIZE,
            id: tileList.Water,
            image: tilesImg[tileList.Water],
            item: itemList.Air,
            breakingLevel: 0,
            regenerationSpeed: 1000 * 60,
            isSolid: false,
            isBreakable: false,
            hoverable: true,
            xp: { xp: 0, type: SkillsList.none },
        };
        return new Tile(tile);
    }
    static tilePicker(tileId, x, y, afterId, regenerationSpeed) {
        switch (tileId) {
            case tileList.Air:
                return TilesGen.getAirTile(x, y);
            case tileList.Grass:
                return TilesGen.getGrassTile(x, y);
            case tileList.Stone:
                return TilesGen.getStoneTile(x, y);
            case tileList.Bedrock:
                return TilesGen.getBedrockTile(x, y);
            case tileList.TempTile:
                return TilesGen.getTempTile(x, y, afterId, regenerationSpeed);
            case tileList.Water:
                return TilesGen.getWaterTile(x, y);
            case tileList.Dirt:
                return TilesGen.getDirtTile(x, y);
        }
    }
}
class World {
    constructor() {
        this.tiles = new Array();
        this.worldGenerator = new WorldGenerator();
        this.setWorld(this.worldGenerator.getWorld());
    }
    load(world) {
        for (let i = 0; i < world.length; i++) {
            this.tiles[i] = new Array();
            for (let j = 0; j < world[i].length; j++) {
                this.tiles[i][j] = this.createTile(world[i][j], i, j);
            }
        }
    }
    show() {
        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                this.tiles[i][j].show();
            }
        }
    }
    setWorld(world) {
        this.load(world);
    }
    changeTile(x, y, tile, tempTile, regenerationSpeed) {
        this.tiles[x][y] = this.createTile(tile, x, y, tempTile, regenerationSpeed);
    }
    breakTile(x, y, regenerationSpeed) {
        return TilesGen.tilePicker(tileList.Air, x, y, regenerationSpeed);
    }
    createTile(tileId, x, y, newTile, regenerationSpeed) {
        return TilesGen.tilePicker(tileId, x, y, newTile, regenerationSpeed);
    }
    getWorldGen() {
        return this.worldGenerator;
    }
}
class WorldGenerator {
    constructor(worldWidth = 200, worldHeight = WorldGenerator.stoneBias + WorldGenerator.dirtBias + WorldGenerator.grassBias + 1) {
        this.circleOccurrence = 0.1;
        this.randomWorldGen(124168153476, worldWidth, worldHeight);
    }
    getWorld() {
        return this.world;
    }
    randomWorldGen(seed, width, height) {
        this.world = new Array(width);
        for (let i = 0; i < width; i++) {
            this.world[i] = new Array(height);
        }
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height - 1; j++) {
                this.world[i][j] = tileList.Air;
            }
        }
        for (let i = 0; i < width; i++) {
            this.world[i][height - 1] = tileList.Bedrock;
        }
        for (let i = 0; i < height; i++) {
            this.world[0][i] = tileList.Bedrock;
            this.world[width - 1][i] = tileList.Bedrock;
        }
        randomSeed(seed);
        let circles = [];
        for (let i = 1; i < width - 1; i++) {
            if (random() < this.circleOccurrence) {
                circles[circles.length] = i;
            }
        }
        for (let x = 1; x < width - 1; x++) {
            for (let y = 0; y < height - 1; y++) {
                let dist = Infinity;
                for (let i = 0; i < circles.length; i++) {
                    dist = min(this.distance(x, y, circles[i], height), dist);
                }
                if (dist < WorldGenerator.stoneBias) {
                    this.world[x][y] = tileList.Stone;
                }
                else if (dist < WorldGenerator.dirtBias + WorldGenerator.stoneBias) {
                    this.world[x][y] = tileList.Dirt;
                }
                else if (dist < WorldGenerator.grassBias + WorldGenerator.dirtBias + WorldGenerator.stoneBias) {
                    this.world[x][y] = tileList.Grass;
                }
            }
        }
    }
    distance(x, y, circleX, circleY) {
        return Math.sqrt(Math.pow(x - circleX, 2) + Math.pow(y - circleY, 2));
    }
    safeSpawn(x) {
        for (let i = 0; i < this.world[x].length; i++) {
            if (this.world[x][i] != tileList.Air)
                return { x: x, y: i - 2 };
        }
        return { x: -1, y: -1 };
    }
}
WorldGenerator.stoneBias = 3;
WorldGenerator.dirtBias = 1;
WorldGenerator.grassBias = 1;
//# sourceMappingURL=build.js.map