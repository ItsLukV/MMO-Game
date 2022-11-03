class Bar {
  x: number;
  y: number;
  maxWidth: number;
  h: number;
  w: number;
  margin: number;
  color: Color;
  constructor(
    x: number,
    y: number,
    maxWidth: number,
    h: number,
    color?: Color,
    margin?: number
  ) {
    margin === undefined ? (this.margin = 5) : (this.margin = margin);
    this.x = x;
    this.y = y;
    this.w = 0;
    this.maxWidth = maxWidth;
    this.h = h;
    color === undefined
      ? (this.color = { r: 0, g: 0, b: 0 })
      : (this.color = color);
  }
  show(value: number) {
    push();
    fill(this.color.r - 20, this.color.g - 20, this.color.b - 20, 90);
    rect(
      this.x - this.margin,
      this.y - this.margin,
      this.maxWidth + this.margin * 2,
      this.h + this.margin * 2
    );
    fill(this.color.r, this.color.g, this.color.b);
    rect(this.x, this.y, map(value, 0, 100, 0, this.maxWidth), this.h);
    pop();
  }
}
