<<<<<<< HEAD
import { ICharacter, ITreasure, IDungeonExit, ICreature, IObstacle, IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IInventory } from "@game-logic/lib/features/items/inventory.interface";
import { IDataFeedEntityBase, IVisualSceneTileDeclaration, IVisualUiTileDeclaration } from "./data-feed-entity.interface";
=======
import { ICharacter, ITreasure, IDungeonExit, IEnemy, IObstacle, IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150

// export type IActorDataFeed =
//   ICharacterDataFeedEntity |
//   ITreasureDataFeedEntity |
//   IDungeonExitDataFeedEntity |
//   IEnemyDataFeedEntity |
//   IObstacleDataFeedEntity;
//export type ICharacterDataFeedEntity = ICharacter & { inventory: IInventory; assignedAreaId: string; } & IBoardActorDataFeedEntity;

export type ICharacterDataFeedEntity<T extends ISceneComposerDefinition<unknown> = { definitionName: unknown }> = ICharacter & IBoardActorDataFeedEntity<T>;
export type ITreasureDataFeedEntity<T extends ISceneComposerDefinition<unknown> = { definitionName: unknown }> = ITreasure & IBoardActorDataFeedEntity<T>;
export type IDungeonExitDataFeedEntity<T extends ISceneComposerDefinition<unknown> = { definitionName: unknown }> = IDungeonExit & IBoardActorDataFeedEntity<T>;
export type IEnemyDataFeedEntity<T extends ISceneComposerDefinition<unknown> = { definitionName: unknown }> = IEnemy & IBoardActorDataFeedEntity<T>;
export type IObstacleDataFeedEntity<T extends ISceneComposerDefinition<unknown> = { definitionName: unknown }> = IObstacle & IBoardActorDataFeedEntity<T>;


<<<<<<< HEAD
export type ICharacterDataFeedEntity = ICharacter & { inventory: IInventory; assignedAreaId: string; } & IBoardActorDataFeedEntity;
export type ITreasureDataFeedEntity = ITreasure & IBoardActorDataFeedEntity;
export type IDungeonExitDataFeedEntity = IDungeonExit & IBoardActorDataFeedEntity;
export type IEnemyDataFeedEntity = ICreature & IBoardActorDataFeedEntity;
export type IObstacleDataFeedEntity = IObstacle & IBoardActorDataFeedEntity;
//export type IBoardDataFeedEntity = IBoard & IBoardActorDataFeedEntity;
=======
export interface IBoardActorDataFeedEntity<T> extends IDataFeedEntityBase, IActor {
  visualScene: T;
  visualUi: IActorVisualUi;
}
>>>>>>> f7354e26b4f18506c3eb9218e3c3990ef0d59150

export interface IActorVisualUi {
  avatar: { url: string };
  color: string | number;
}