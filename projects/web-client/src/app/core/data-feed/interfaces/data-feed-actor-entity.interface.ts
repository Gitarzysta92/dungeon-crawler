import { ICharacter, ITreasure, IDungeonExit, ICreature, IObstacle, IActor } from "@game-logic/lib/features/actors/actors.interface";
import { IInventory } from "@game-logic/lib/features/items/inventory.interface";
import { IDataFeedEntityBase, IVisualSceneTileDeclaration, IVisualUiTileDeclaration } from "./data-feed-entity.interface";


export type IActorDataFeed =
  ICharacterDataFeedEntity |
  ITreasureDataFeedEntity |
  IDungeonExitDataFeedEntity |
  IEnemyDataFeedEntity |
  IObstacleDataFeedEntity;


export type ICharacterDataFeedEntity = ICharacter & { inventory: IInventory; assignedAreaId: string; } & IBoardActorDataFeedEntity;
export type ITreasureDataFeedEntity = ITreasure & IBoardActorDataFeedEntity;
export type IDungeonExitDataFeedEntity = IDungeonExit & IBoardActorDataFeedEntity;
export type IEnemyDataFeedEntity = ICreature & IBoardActorDataFeedEntity;
export type IObstacleDataFeedEntity = IObstacle & IBoardActorDataFeedEntity;
//export type IBoardDataFeedEntity = IBoard & IBoardActorDataFeedEntity;


export interface IBoardActorDataFeedEntity extends IDataFeedEntityBase, IActor {
  //entityType: DataFeedEntityType.Actor,
  informative: { name: string, description: string },
  visualScene: IVisualSceneTileDeclaration,
  visualUi: IVisualUiTileDeclaration
}