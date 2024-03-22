import { v4 } from 'uuid';
import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants"
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants"
import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants"

import { IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { campFireActor, dungeonExitActor, ratActor, treasureActor } from 'src/app/core/data-feed/constants/data-feed-actors';



export const dObs = Object.assign({ rotation: 0 as IBoardObjectRotation }, campFireActor);
export const dTrs = Object.assign({ rotation: 0 as IBoardObjectRotation }, treasureActor);
export const dRat = Object.assign({ rotation: 0 as IBoardObjectRotation }, ratActor);
export const dExt1 = Object.assign({}, dungeonExitActor);
export const dExt2 = Object.assign({ rotation: 3 as IBoardObjectRotation }, dungeonExitActor);
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
