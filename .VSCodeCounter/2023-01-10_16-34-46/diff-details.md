# Diff Details

Date : 2023-01-10 16:34:46

Directory c:\\repos\\MMO-Game\\sketch

Total : 71 files,  723 codes, 273 comments, 130 blanks, all 1126 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [MMO-Game/sketch/Entity/Entity.ts](/MMO-Game/sketch/Entity/Entity.ts) | TypeScript | -24 | 0 | -3 | -27 |
| [MMO-Game/sketch/Entity/Player.ts](/MMO-Game/sketch/Entity/Player.ts) | TypeScript | -139 | -6 | -17 | -162 |
| [MMO-Game/sketch/Game.ts](/MMO-Game/sketch/Game.ts) | TypeScript | -54 | 0 | -9 | -63 |
| [MMO-Game/sketch/Inventory/Inventory.ts](/MMO-Game/sketch/Inventory/Inventory.ts) | TypeScript | -93 | -1 | -13 | -107 |
| [MMO-Game/sketch/Inventory/InventorySlot.ts](/MMO-Game/sketch/Inventory/InventorySlot.ts) | TypeScript | -22 | 0 | -2 | -24 |
| [MMO-Game/sketch/Inventory/Item.ts](/MMO-Game/sketch/Inventory/Item.ts) | TypeScript | -60 | 0 | -7 | -67 |
| [MMO-Game/sketch/Inventory/Items/Pickaxe.ts](/MMO-Game/sketch/Inventory/Items/Pickaxe.ts) | TypeScript | -10 | 0 | -1 | -11 |
| [MMO-Game/sketch/Inventory/Items/StoneItem.ts](/MMO-Game/sketch/Inventory/Items/StoneItem.ts) | TypeScript | -5 | 0 | -1 | -6 |
| [MMO-Game/sketch/Menu/Buttons/StartButton.ts](/MMO-Game/sketch/Menu/Buttons/StartButton.ts) | TypeScript | -17 | -1 | -3 | -21 |
| [MMO-Game/sketch/Menu/Buttons/WorldGenButton.ts](/MMO-Game/sketch/Menu/Buttons/WorldGenButton.ts) | TypeScript | -17 | -1 | -3 | -21 |
| [MMO-Game/sketch/Menu/Menu.ts](/MMO-Game/sketch/Menu/Menu.ts) | TypeScript | -30 | 0 | -3 | -33 |
| [MMO-Game/sketch/Mining.ts](/MMO-Game/sketch/Mining.ts) | TypeScript | -37 | -2 | -3 | -42 |
| [MMO-Game/sketch/sketch.ts](/MMO-Game/sketch/sketch.ts) | TypeScript | -95 | 0 | -10 | -105 |
| [MMO-Game/sketch/utilities/Buttons.ts](/MMO-Game/sketch/utilities/Buttons.ts) | TypeScript | -62 | 0 | -7 | -69 |
| [MMO-Game/sketch/utilities/Constants.ts](/MMO-Game/sketch/utilities/Constants.ts) | TypeScript | -16 | -1 | -4 | -21 |
| [MMO-Game/sketch/utilities/Utiles.ts](/MMO-Game/sketch/utilities/Utiles.ts) | TypeScript | -29 | -1 | -4 | -34 |
| [MMO-Game/sketch/world/Tile.ts](/MMO-Game/sketch/world/Tile.ts) | TypeScript | -53 | -1 | -14 | -68 |
| [MMO-Game/sketch/world/Tiles/AirTile.ts](/MMO-Game/sketch/world/Tiles/AirTile.ts) | TypeScript | -11 | 0 | -3 | -14 |
| [MMO-Game/sketch/world/Tiles/BedrockTile.ts](/MMO-Game/sketch/world/Tiles/BedrockTile.ts) | TypeScript | -11 | 0 | -2 | -13 |
| [MMO-Game/sketch/world/Tiles/GrassTile.ts](/MMO-Game/sketch/world/Tiles/GrassTile.ts) | TypeScript | -11 | 0 | -3 | -14 |
| [MMO-Game/sketch/world/Tiles/StoneTile.ts](/MMO-Game/sketch/world/Tiles/StoneTile.ts) | TypeScript | -14 | 0 | -4 | -18 |
| [MMO-Game/sketch/world/World.ts](/MMO-Game/sketch/world/World.ts) | TypeScript | -84 | 0 | -7 | -91 |
| [MMO-Game/sketch/world/WorldGen.ts](/MMO-Game/sketch/world/WorldGen.ts) | TypeScript | -25 | -3 | -5 | -33 |
| [sketch/Game.ts](/sketch/Game.ts) | TypeScript | 62 | 0 | 11 | 73 |
| [sketch/StartMenu/Buttons.ts](/sketch/StartMenu/Buttons.ts) | TypeScript | 62 | 0 | 8 | 70 |
| [sketch/StartMenu/Buttons/StartButton.ts](/sketch/StartMenu/Buttons/StartButton.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [sketch/StartMenu/Buttons/WorldGenButton.ts](/sketch/StartMenu/Buttons/WorldGenButton.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [sketch/StartMenu/StartMenu.ts](/sketch/StartMenu/StartMenu.ts) | TypeScript | 30 | 0 | 3 | 33 |
| [sketch/Test/Cheating.ts](/sketch/Test/Cheating.ts) | TypeScript | 25 | 1 | 6 | 32 |
| [sketch/data/crafting/recipes.json](/sketch/data/crafting/recipes.json) | JSON | 15 | 0 | 1 | 16 |
| [sketch/game/Entity/Entity.ts](/sketch/game/Entity/Entity.ts) | TypeScript | 24 | 0 | 3 | 27 |
| [sketch/game/Entity/Player.ts](/sketch/game/Entity/Player.ts) | TypeScript | 182 | 9 | 23 | 214 |
| [sketch/game/Entity/PlayerCharacter/BodyJoint.ts](/sketch/game/Entity/PlayerCharacter/BodyJoint.ts) | TypeScript | 0 | 10 | 2 | 12 |
| [sketch/game/Entity/PlayerCharacter/BodyPart.ts](/sketch/game/Entity/PlayerCharacter/BodyPart.ts) | TypeScript | 0 | 3 | 1 | 4 |
| [sketch/game/Entity/PlayerCharacter/BodyPart/Body.ts](/sketch/game/Entity/PlayerCharacter/BodyPart/Body.ts) | TypeScript | 0 | 28 | 5 | 33 |
| [sketch/game/Entity/PlayerCharacter/BodyPart/Head.ts](/sketch/game/Entity/PlayerCharacter/BodyPart/Head.ts) | TypeScript | 0 | 6 | 1 | 7 |
| [sketch/game/Entity/PlayerCharacter/BodyPart/LeftArm.ts](/sketch/game/Entity/PlayerCharacter/BodyPart/LeftArm.ts) | TypeScript | 0 | 6 | 1 | 7 |
| [sketch/game/Entity/PlayerCharacter/BodyPart/LeftLeg.ts](/sketch/game/Entity/PlayerCharacter/BodyPart/LeftLeg.ts) | TypeScript | 0 | 6 | 1 | 7 |
| [sketch/game/Entity/PlayerCharacter/BodyPart/RightArm.ts](/sketch/game/Entity/PlayerCharacter/BodyPart/RightArm.ts) | TypeScript | 0 | 5 | 1 | 6 |
| [sketch/game/Entity/PlayerCharacter/BodyPart/RightLeg.ts](/sketch/game/Entity/PlayerCharacter/BodyPart/RightLeg.ts) | TypeScript | 0 | 6 | 1 | 7 |
| [sketch/game/Entity/PlayerCharacter/PlayerCharacterHandler.ts](/sketch/game/Entity/PlayerCharacter/PlayerCharacterHandler.ts) | TypeScript | 0 | 25 | 3 | 28 |
| [sketch/game/GameMenu/Crafting/Crafting.ts](/sketch/game/GameMenu/Crafting/Crafting.ts) | TypeScript | 74 | 5 | 8 | 87 |
| [sketch/game/GameMenu/Crafting/CraftingButton.ts](/sketch/game/GameMenu/Crafting/CraftingButton.ts) | TypeScript | 16 | 0 | 2 | 18 |
| [sketch/game/GameMenu/Inventory/Inventory.ts](/sketch/game/GameMenu/Inventory/Inventory.ts) | TypeScript | 149 | 2 | 21 | 172 |
| [sketch/game/GameMenu/Inventory/InventorySlot.ts](/sketch/game/GameMenu/Inventory/InventorySlot.ts) | TypeScript | 35 | 3 | 6 | 44 |
| [sketch/game/GameMenu/Inventory/Item.ts](/sketch/game/GameMenu/Inventory/Item.ts) | TypeScript | 58 | 9 | 12 | 79 |
| [sketch/game/GameMenu/Inventory/ItemGen.ts](/sketch/game/GameMenu/Inventory/ItemGen.ts) | TypeScript | 78 | 0 | 6 | 84 |
| [sketch/game/GameMenu/Inventory/Items/Abilities/Abilities.ts](/sketch/game/GameMenu/Inventory/Items/Abilities/Abilities.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [sketch/game/GameMenu/Inventory/Items/Abilities/Mining.ts](/sketch/game/GameMenu/Inventory/Items/Abilities/Mining.ts) | TypeScript | 41 | 1 | 2 | 44 |
| [sketch/game/GameMenu/Inventory/Items/Abilities/Teleport.ts](/sketch/game/GameMenu/Inventory/Items/Abilities/Teleport.ts) | TypeScript | 42 | 1 | 10 | 53 |
| [sketch/game/GameMenu/Inventory/Items/Stick.ts](/sketch/game/GameMenu/Inventory/Items/Stick.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [sketch/game/GameMenu/Menu.ts](/sketch/game/GameMenu/Menu.ts) | TypeScript | 5 | 0 | 1 | 6 |
| [sketch/game/GameMenu/Skills/Skill.ts](/sketch/game/GameMenu/Skills/Skill.ts) | TypeScript | 33 | 0 | 7 | 40 |
| [sketch/game/GameMenu/Skills/SkillManager.ts](/sketch/game/GameMenu/Skills/SkillManager.ts) | TypeScript | 27 | 0 | 3 | 30 |
| [sketch/game/GameMenu/Skills/SkillMining.ts](/sketch/game/GameMenu/Skills/SkillMining.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [sketch/game/GameMenu/Skills/lvlReq.ts](/sketch/game/GameMenu/Skills/lvlReq.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [sketch/game/Mana/ManaManager.ts](/sketch/game/Mana/ManaManager.ts) | TypeScript | 31 | 0 | 7 | 38 |
| [sketch/game/utilities/Bar.ts](/sketch/game/utilities/Bar.ts) | TypeScript | 39 | 0 | 5 | 44 |
| [sketch/game/utilities/Constants.ts](/sketch/game/utilities/Constants.ts) | TypeScript | 45 | 0 | 9 | 54 |
| [sketch/game/utilities/Utiles.ts](/sketch/game/utilities/Utiles.ts) | TypeScript | 74 | 1 | 8 | 83 |
| [sketch/game/utilities/Vec.ts](/sketch/game/utilities/Vec.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [sketch/game/world/Tile.ts](/sketch/game/world/Tile.ts) | TypeScript | 81 | 1 | 16 | 98 |
| [sketch/game/world/TilesGen.ts](/sketch/game/world/TilesGen.ts) | TypeScript | 146 | 53 | 10 | 209 |
| [sketch/game/world/Tiles/AirTile.ts](/sketch/game/world/Tiles/AirTile.ts) | TypeScript | 0 | 14 | 3 | 17 |
| [sketch/game/world/Tiles/BedrockTile.ts](/sketch/game/world/Tiles/BedrockTile.ts) | TypeScript | 0 | 14 | 2 | 16 |
| [sketch/game/world/Tiles/GrassTile.ts](/sketch/game/world/Tiles/GrassTile.ts) | TypeScript | 0 | 18 | 4 | 22 |
| [sketch/game/world/Tiles/StoneTile.ts](/sketch/game/world/Tiles/StoneTile.ts) | TypeScript | 0 | 18 | 5 | 23 |
| [sketch/game/world/Tiles/TempTile.ts](/sketch/game/world/Tiles/TempTile.ts) | TypeScript | 0 | 8 | 1 | 9 |
| [sketch/game/world/World.ts](/sketch/game/world/World.ts) | TypeScript | 39 | 11 | 8 | 58 |
| [sketch/game/world/WorldGen.ts](/sketch/game/world/WorldGen.ts) | TypeScript | 62 | 26 | 11 | 99 |
| [sketch/sketch.ts](/sketch/sketch.ts) | TypeScript | 100 | 0 | 8 | 108 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details