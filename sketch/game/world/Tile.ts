class Tile {
  private x: number;
  private y: number;
  private w: number;
  private id: number;
  private breakingLevel: number = 0;
  private regenerationSpeed: number = 1000;
  private image: p5.Image;
  private item: itemList;
  private solid: boolean;
  private breakable: boolean;
  private hoverable: boolean;
  constructor(obj: TileInput) {
    this.x = obj.x * TILE_SIZE;
    this.y = obj.y * TILE_SIZE;
    this.w = obj.w;
    this.id = obj.id;
    this.image = obj.image;
    this.item = obj.item;
    this.breakingLevel = this.breakingLevel;
    this.regenerationSpeed = obj.regenerationSpeed;
    this.solid = obj.isSolid;
    this.breakable = obj.isBreakable;
    this.hoverable = obj.hoverable;
  }

  xp(): XP {
    return { xp: 0, type: SkillsList.mining };
  }

  public show() {
    image(this.image, this.x, this.y, this.w, this.w);
    image(breakingImg[this.breakingLevel], this.x, this.y, this.w, this.w);
  }

  // Getters

  public isHoverable() {
    return this.hoverable;
  }

  public isSolid(): boolean {
    return this.solid;
  }

  public isBreakable(): boolean {
    return this.breakable;
  }

  public getItem() {
    return this.item;
  }

  public getRegenerationSpeed(): number {
    return this.regenerationSpeed;
  }

  public getId(): number {
    return this.id;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getW(): number {
    return this.w;
  }

  public getBreakingLevel(): number {
    return this.breakingLevel;
  }

  public setBreakingLevel(v: number) {
    this.breakingLevel = v;
  }
}

interface TileInput {
  x: number;
  y: number;
  w: number;
  id: tileList;
  image: p5.Image;
  item: itemList;
  breakingLevel: number;
  regenerationSpeed: number;
  isSolid: boolean;
  isBreakable: boolean;
  xp: XP;
  hoverable: boolean;
  creationFunction?: any;
}
