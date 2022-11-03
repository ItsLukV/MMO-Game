class AirTile extends Tile {
  constructor(x: number, y: number, w: number) {
    super(x, y, w, tileID.Air);
  }

  isSoild(): boolean {
    return false;
  }

  isBreakable(): boolean {
    return false;
  }
  xp(): XP {
    return { xp: 0, type: SkillsList.none };
  }
}
