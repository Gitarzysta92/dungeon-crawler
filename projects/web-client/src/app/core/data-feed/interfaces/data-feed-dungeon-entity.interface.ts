import { IDungeon } from "@game-logic/lib/features/dungeon/dungeon.interface";
import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { DataFeedEntityType } from "../constants/data-feed-entity-type";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IBoardCoordinates, IBoardObject } from "@game-logic/lib/features/board/board.interface";
import { IActor } from "@game-logic/lib/features/actors/actors.interface";

export interface IDungeonDataFeedEntity extends IDataFeedEntityBase, IDungeon {
  entityType: DataFeedEntityType.Dungeon,
  informative: { name: string, description: string }
  boardConfiguration: {
    coords: (IBoardCoordinates & { visualScene: ISceneComposerDefinition<unknown>})[],
    boardObjects: (IBoardObject & IActor & { visualScene: ISceneComposerDefinition<unknown>})[];
  }
  visualScene: {
    bgColor: number,
    composerDefinitions: ISceneComposerDefinition<unknown>[]
  }
}