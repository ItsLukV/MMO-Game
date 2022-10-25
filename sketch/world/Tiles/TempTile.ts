class TempTile extends BedrockTile {
  constructor(x: number, y: number, w: number, afterId: tileID) {
    super(x, y, w);
    setTimeout(() => {
      let worldTile = GameWorldToTile(x, y);
      game.getWorld().changeTile(worldTile.x, worldTile.y, afterId);
    }, 2000);
  }
}
