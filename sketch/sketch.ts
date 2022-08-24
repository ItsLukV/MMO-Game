let player: Player;
let playerImg: p5.Image;
let world: World;
let tilesImg: p5.Image[];

const GROUNDLEVEL = 700 - 100;

function preload() {
  playerImg = loadImage("sketch/assets/Player.png");
  tilesImg = [];
  tilesImg.push(loadImage("sketch/assets/Air.png"));
  tilesImg.push(loadImage("sketch/assets/Grass.png"));
}
function setup() {
  createCanvas(1000, 700);
  player = new Player(0, 450, 100, 100, playerImg);
  world = new World();
}

function draw() {
  background(220);

  translate(
    width / 2 - player.x - player.w / 2,
    height / 2 - player.y - player.h / 2
  );

  player.tick();

  world.show();
  player.show();
}
function keyPressed() {
  player.pressed(
    keyCode === 65,
    keyCode === 68,
    keyCode === 87,
    keyCode === 83
  );
}

function keyReleased() {
  player.released(
    keyCode === 65,
    keyCode === 68,
    keyCode === 87,
    keyCode === 83
  );
}
