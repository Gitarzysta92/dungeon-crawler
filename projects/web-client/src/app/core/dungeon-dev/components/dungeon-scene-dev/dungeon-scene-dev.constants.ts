import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants"
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants"


import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants"
import { dungeonObstacle, dungeonTreasure, dungeonRat, firstDungeonExit, secondDungeonExit } from "@game-logic/data/dungeon.data"
import { IBoardObjectRotation } from "@game-logic/lib/features/board/board.interface"
import { campFireObstacleActorDataFeedEntity, treasureActorDataFeedEntity, ratActorDataFeedEntity, dungeonExitDataFeedEntity } from "src/app/core/data-feed/constants/data-feed-actors"
import { v4 } from 'uuid';

export const dObs = Object.assign({ ...dungeonObstacle, rotation: 0 as IBoardObjectRotation }, campFireObstacleActorDataFeedEntity);
export const dTrs = Object.assign({ ...dungeonTreasure }, treasureActorDataFeedEntity);
export const dRat = Object.assign({ ...dungeonRat, rotation: 0 as IBoardObjectRotation }, ratActorDataFeedEntity);
export const dExt1 = Object.assign({ ...firstDungeonExit }, dungeonExitDataFeedEntity);
export const dExt2 = Object.assign({ ...secondDungeonExit, rotation: 3 as IBoardObjectRotation }, dungeonExitDataFeedEntity)
export const heroTokenDefinition = {
  id: v4(),
  rotation: 0 as IBoardObjectRotation,
  visualScene: {
    definitionName: commonTileComposerDefinitionName,
    primaryColor: 0x31386c,
    jawelColor: 0xeb6f36,
    texture: {
      assetName: "hero",
      extensionName: "png"
    },
    outlets: [0,3,5]
  }
}

export const dungeonDevSceneDefinitions = [
  {
    o: dExt1,
    position: { r: -2, q: 0, s: 2 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: -2, q: 1, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: -2, q: 2, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: dObs,
    position: { r: -1, q: -1, s: 2 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: -1, q: 0, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: -1, q: 1, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: -1, q: 2, s: -1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 0, q: -2, s: 2 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 0, q: -1, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 0, q: 0, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 0, q: 1, s: -1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 0, q: 2, s: -2 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 1, q: -2, s: 1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 1, q: -1, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 1, q: 0, s: -1 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  { 
    o: heroTokenDefinition,
    position: { r: 1, q: 1, s: -2 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: heroTokenDefinition,
    position: { r: 2, q: -2, s: -0 },
    visualScene: {
      definitionName: stoneFieldComposerDefinitionName,
      primaryColor: 0x797979
    }
  },
  {
    o: dExt2,
    position: { r: 2, q: -1, s: -1 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7
    }
  },
  {
    o: dExt2,
    position: { r: 2, q: 0, s: -2 },
    visualScene: {
      definitionName: blankFieldComposerDefinitionName,
      primaryColor: 0x3f12a7
    }
  }
]
