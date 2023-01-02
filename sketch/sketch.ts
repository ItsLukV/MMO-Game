let playerImg: p5.Image;
let tilesImg: p5.Image[] = [];
let breakingImg: p5.Image[] = [];
let itemImg: p5.Image[] = [];
let menu: StartMenu;
let game: Game;
let world: World;
let worldGenerator: WorldGenerator;
enum GameStateList {
  Menu,
  Playing,
  WorldGen,
}
let gameState: GameStateList = GameStateList.Menu;

function preload() {
  playerImg = loadImage("sketch/assets/Player.png");

  tilesImg[tileList.Air] = loadImage("sketch/assets/tiles/Air.png");
  tilesImg[tileList.Grass] = loadImage("sketch/assets/tiles/Grass.png");
  tilesImg[tileList.Stone] = loadImage("sketch/assets/tiles/Stone.png");
  tilesImg[tileList.Bedrock] = loadImage("sketch/assets/tiles/Bedrock.png");
  tilesImg[tileList.TempTile] = null;
  tilesImg[tileList.Water] = loadImage("sketch/assets/tiles/Water.png");

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

  worldGenerator = new WorldGenerator();
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
