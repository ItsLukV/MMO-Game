class StoneTile extends Tile {
  constructor(x: number, y: number, w: number) {
    super(x, y, w, tileID.Stone);
    this.regenerationSpeed = 1000 * 60 * 2;
  }

  xp(): XP {
    return { xp: 1, type: SkillsList.mining };
  }

  isSoild(): boolean {
    return true;
  }

  isBreakable(): boolean {
    return true;
  }

  item(): itemList {
    return itemList.Stone;
  }
}
