import { IDataFeedEntityBase } from "./data-feed-entity.interface";
import { DataFeedEntityType } from "../constants/data-feed-entity-type";
import { ISceneComposerDefinition } from "@3d-scene/lib/helpers/scene-composer/scene-composer.interface";
import { IDungeonGameplayTemplate } from "@game-logic/lib/entities/dungeons/dungeons.interface";
import { ISceneInitialData } from "@3d-scene/app/scene-app.interface";

export type IDungeonDataFeedEntity =
  IDataFeedEntityBase &
  IDungeonGameplayTemplate &
  {
    entityType: DataFeedEntityType.Dungeon,
    fields: { visualScene: ISceneComposerDefinition<unknown> }[],
    actors: { visualScene: ISceneComposerDefinition<unknown> }[]
    visualScene: ISceneInitialData
  };