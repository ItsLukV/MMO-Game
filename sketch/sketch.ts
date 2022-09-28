let playerImg: p5.Image;
let tilesImg: p5.Image[];
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
