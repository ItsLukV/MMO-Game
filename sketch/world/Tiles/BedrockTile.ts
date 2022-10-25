class BedrockTile extends Tile {
  constructor(x: number, y: number, w: number) {
    super(x, y, w, tileID.Bedrock);
  }

  isSoild(): boolean {
    return true;
  }
  isBreakable(): boolean {
    return false;
  }
}
