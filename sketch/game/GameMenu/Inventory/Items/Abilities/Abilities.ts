abstract class Abilities {
  abstract manaCost: number;
  constructor() {}
  abstract abilityTick(playerX?: number, playerY?: number): void;
  abstract abilityClicked(playerX?: number, playerY?: number): void;
  abstract abilitySelected(): void;
}
