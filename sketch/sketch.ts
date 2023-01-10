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
