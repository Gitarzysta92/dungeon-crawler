import { Vector3 } from "three";
import { IDungeonDataFeedEntity } from "../interfaces/data-feed-dungeon-entity.interface";
import { DataFeedEntityType } from "./data-feed-entity-type";
import { directionalLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants";
import { hemisphereLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants";
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants";
import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants";
import { campFireObstacleActorDataFeedEntity, treasureActorDataFeedEntity, ratActorDataFeedEntity, dungeonExitDataFeedEntity, barrelWithCandlesObstacleActorDataFeedEntity } from "./data-feed-actors";
import { IFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/common/field.interface";
import { ITokenDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { floatingRockTerrainComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/terrains/floating-rock/floating-rock-terrain.constants";
import { skySphereComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/environment-details/sky-sphere/sky-sphere.constants";
import { dungeon } from "@game-logic/data/dungeon.data";
import { IBoardCoordinates, IBoardObject } from "@game-logic/framework/features/board/board.interface";
import { IActor } from "@game-logic/framework/features/actor/actor.interface";


export const actors: Array<IActor & Partial<IBoardObject> & { visualScene: ITokenDefinition<unknown> }> = [
  Object.assign({ position: { r: -1, q: 2, s: -1 }, rotation: 1 }, barrelWithCandlesObstacleActorDataFeedEntity),
  Object.assign({ position: { r: 2, q: 0, s: -2 }, rotation: 3 }, campFireObstacleActorDataFeedEntity),
  Object.assign({ position: { r: -2, q: 0, s: 2 }, rotation: 0 }, treasureActorDataFeedEntity),
  Object.assign({ position: { r: 0, q: 0, s: 0 }, rotation: 0 }, ratActorDataFeedEntity),
  Object.assign({ position: { r: 2, q: -1, s: -1 }, rotation: 3}, dungeonExitDataFeedEntity),
  Object.assign({ position: { r: -1, q: -1, s: 2 }, rotation: 5 }, dungeonExitDataFeedEntity)
]


export const fields: { position: IBoardCoordinates, visualScene: IFieldDefinition<unknown> & any }[]  = [
  {
    position: { r: -2, q: 0, s: 2 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7,
      offsetY: 0.1
    }
  },
  {
    position: { r: -2, q: 1, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: -2, q: 2, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: -1, q: -1, s: 2 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7,
      offsetY: 0.1
    }
  },
  {
    position: { r: -1, q: 0, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: -1, q: 1, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: -1, q: 2, s: -1 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7,
      offsetY: 0.1
    }
  },
  {
    position: { r: 0, q: -2, s: 2 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 0, q: -1, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 0, q: 0, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 0, q: 1, s: -1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 0, q: 2, s: -2 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 1, q: -2, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 1, q: -1, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 1, q: 0, s: -1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 1, q: 1, s: -2 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 2, q: -2, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    position: { r: 2, q: -1, s: -1 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7
    }
  },
  {
    position: { r: 2, q: 0, s: -2 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7
    }
  }
]




export const dungeonDataFeedEntity: IDungeonDataFeedEntity = Object.assign({ ...dungeon }, {
  entityType: DataFeedEntityType.Dungeon as DataFeedEntityType.Dungeon,
  informative: { name: "string", description: "string" },
  fields: fields,
  actors: actors,
  visualScene: {
    bgColor: 0x2d1048,
    composerDefinitions: [
      {
        definitionName: floatingRockTerrainComposerDefinitionName,
        position: new Vector3(1, -1.3, -1.8),
        color: 0x56680c
      },
      {
        definitionName: directionalLightComposerDefinitionName,
        position: new Vector3(7, 5, 0),
        color: 0x8d5ff9,
        intensity: 2,
        radius: 1,
      },
      {
        definitionName: directionalLightComposerDefinitionName,
        position: new Vector3(-7, 5, 0),
        color: 0xffb400,
        intensity: 1,
        radius: 1,
      },
      {
        definitionName: hemisphereLightComposerDefinitionName,
        skyColor: 0x009dff,
        groundColor: 0x1c0f0a,
        intensity: 1,
        position: new Vector3(0, 0, 0),
      },
      {
        definitionName: skySphereComposerDefinitionName,
        primeColor: 0x0d1857,
        secondColor: 0xe85b35,
      }
    ]
  }
});