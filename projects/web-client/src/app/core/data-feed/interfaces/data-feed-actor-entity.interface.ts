import { ICharacter, ITreasure, IDungeonExit, IEnemy, IObstacle, IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";

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


export interface IBoardActorDataFeedEntity<T> extends IDataFeedEntityBase, IActor {
  visualScene: T;
  visualUi: IActorVisualUi;
}

export interface IActorVisualUi {
  avatar: { url: string };
  color: string | number;
}