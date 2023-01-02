class Body extends BodyPart {
  private w: number;
  private h: number;
  neckJoint: BodyJoint;
  rightArmJoint: BodyJoint;
  leftArmJoint: BodyJoint;
  rightLegJoint: BodyJoint;
  leftLegJoint: BodyJoint;

  constructor() {
    super();
    this.w = 32;
    this.h = 64;
    this.neckJoint = new BodyJoint();
    this.rightArmJoint = new BodyJoint();
    this.leftArmJoint = new BodyJoint();
    this.rightLegJoint = new BodyJoint();
    this.leftLegJoint = new BodyJoint();
  }

  public show(x: number, y: number): void {
    rect(x, y, this.w, this.h);
  }

  public getW() {
    return this.w;
  }

  public getH() {
    return this.h;
  }
}
