class StartMenuButton {
  private x: number;
  private y: number;
  private w: number;
  private h: number;
  private txt: string;
  private txtSize: number;
  private backgroundColor: number;

  constructor(txt: string, x: number, y: number, w: number, h: number, txtSize?: number) {
    this.txt = txt;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    txtSize === undefined ? (this.txtSize = 30) : (this.txtSize = txtSize);

    this.backgroundColor = 255;
  }

  show() {
    push();
    fill(this.backgroundColor);
    stroke(0);
    textSize(this.txtSize);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER);
    let textheight = textAscent() + textDescent();
    fill(0);

    text(this.txt, this.x, this.y + this.h / 2 - textheight / 2, this.w, this.h);
    pop();
  }

  hover() {
    if (this.mouseCollions()) {
      this.backgroundColor = 220;
    } else {
      this.backgroundColor = 255;
    }
  }

  protected mouseCollions(): boolean {
    if (mouseX > this.x && mouseX < this.x + this.w) {
      if (mouseY > this.y && mouseY < this.y + this.h) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
