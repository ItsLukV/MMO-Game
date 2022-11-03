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
  xp(): XP {
    return { xp: 0, type: SkillsList.none };
  }
}
