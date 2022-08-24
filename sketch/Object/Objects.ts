class Objects {
  x: number;
  y: number;
  w: number;
  h: number;
  img: p5.Image;
  constructor(x: number, y: number, w: number, h: number, img: p5.IMAGE) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  show() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
}
