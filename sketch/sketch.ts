let player: Player;
let playerImg: p5.Image;
let world: World;
let tilesImg: p5.Image[];

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
  if (keyCode === 32) {
    player.x = 256;
    player.y = 450;
  }
}

function keyReleased() {
  player.released(
    keyCode === 65,
    keyCode === 68,
    keyCode === 87,
    keyCode === 83
  );
}
