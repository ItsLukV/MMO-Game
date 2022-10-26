let playerImg: p5.Image;
let tilesImg: p5.Image[] = [];
let breakingImg: p5.Image[] = [];
let itemImg: p5.Image[] = [];
let menu: Menu;
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
