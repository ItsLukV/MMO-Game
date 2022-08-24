let player: Player;
let playerImg: p5.Image;
const GROUNDLEVEL = 700 - 100;
function preload() {
  playerImg = loadImage("sketch/assets/player.png");
}
function setup() {
  createCanvas(1000, 700);
  player = new Player(100, 100, 100, 100, playerImg);
}

function draw() {
  background(220);

  player.tick();
  player.show();
  console.log(keyCode);
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
