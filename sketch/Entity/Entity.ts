class Entity {
  x: number;
  y: number;
  w: number;
  h: number;
  img: p5.Image;
  constructor(x: number, y: number, w: number, h: number, img: p5.Image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }

  setOffSet(x: number, y: number) {
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
