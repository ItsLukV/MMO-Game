/// <reference path="Abilities.ts"/>
class Teleport extends Abilities {
	manaCost: number = 50;
	diameter: number;

	constructor(diameter: number) {
		super();
		this.diameter = diameter;
	}
	abilitySelected(): void {
		throw new Error("Method not implemented.");
	}
	abilityClicked(playerX: number, playerY: number): void {
		this.tpPlayer(playerX, playerY);
	}

	private tpPlayer(playerX: number, playerY: number) {
		let mana = game.getPlayer().getManaManager().getMana();

		let mouseTile = GameWorldToTile(
			mouseX - game.OffSetX,
			mouseY - game.OffSetY
		);
		let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);

		let rangeCheck =
			this.diameter / 2 >= dist(playerX, playerY, mousePos.x, mousePos.y);

		if (!rangeCheck) return;
		if (TileLookUp(mousePos.x, mousePos.y).isSolid()) return;
		if (this.manaCost > mana) return;
		game.getPlayer().x = mousePos.x + TILE_SIZE / 2;
		game.getPlayer().y = mousePos.y + TILE_SIZE / 2;
		game.getPlayer().getManaManager().useMana(this.manaCost);
	}

	abilityTick(playerX: number, playerY: number): void {
		this.abilityPreview(playerX, playerY);
	}

	private abilityPreview(playerX: number, playerY: number) {
		if (game.getPlayer().showMenu != menuList.game) return;

		let mouseTile = GameWorldToTile(
			mouseX - game.OffSetX,
			mouseY - game.OffSetY
		);
		let mousePos = TileToGameWorld(mouseTile.x, mouseTile.y);
		push();
		strokeWeight(3);
		fill(0, 0, 0, 0);
		rect(mousePos.x, mousePos.y, TILE_SIZE, TILE_SIZE);

		strokeWeight(1);
		fill(76, 255, 0, 100);
		ellipse(playerX, playerY, this.diameter, this.diameter);
		pop();
	}
}
