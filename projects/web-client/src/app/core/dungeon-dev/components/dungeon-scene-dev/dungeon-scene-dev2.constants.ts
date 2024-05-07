import { v4 } from 'uuid';
import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants"
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants"
import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants"

import { IBoardCoordinates, IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { barrelActor, campFireActor, dungeonExitActor, ratActor, treasureActor } from 'src/app/core/data/constants/data-feed-actors';
import { IBoardObjectDeclaration } from '@game-logic/lib/modules/board/entities/board-object/board-object.interface';
import { IFieldDefinition } from '@3d-scene/lib/actors/game-objects/fields/common/field.interface';
import { ITokenDefinition } from '@3d-scene/lib/actors/game-objects/tokens/common/token.interface';
import { IActorDeclaration } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';


export const heroTokenDefinition = {
  id: v4(),
  rotation: 0 as IBoardObjectRotation,
  position: { r: -1, q: 1, s: 0 },
  visual: {
    scene: {
      definitionName: commonTileComposerDefinitionName,
      primaryColor: 0x31386c,
      jawelColor: 0xeb6f36,
      texture: {
        assetName: "hero",
        extensionName: "png",
        dir: "/actors"
      },
      outlets: [0,3,5]
    }
  }
}

export const actors: Array<IActorDeclaration & Partial<IBoardObjectDeclaration> & { visual?: { scene?: ITokenDefinition<unknown> } }> = [
  Object.assign({ position: { r: -1, q: 2, s: -1 }, rotation: 1 }, barrelActor),
  Object.assign({ position: { r: 2, q: 0, s: -2 }, rotation: 3 }, campFireActor),
  Object.assign({ position: { r: -2, q: 0, s: 2 }, rotation: 0 }, treasureActor),
  Object.assign({ position: { r: 0, q: 0, s: 0 }, rotation: 0 }, ratActor),
  Object.assign({ position: { r: 2, q: -1, s: -1 }, rotation: 3}, dungeonExitActor),
  Object.assign({ position: { r: -1, q: -1, s: 2 }, rotation: 5 }, dungeonExitActor),
  heroTokenDefinition
]


export const fields: { position: IBoardCoordinates, visual: { scene: IFieldDefinition<unknown> & { primaryColor: number } } }[]  = [
  {
    position: { r: -2, q: 0, s: 2 },
    visual: { 
      scene: {
        definitionName: blankFieldComposerDefinitionName,
        primaryColor: 0x3f12a7,
        offsetY: 0.1
      }
    }
  },
  {
    position: { r: -2, q: 1, s: 1 },
    visual: { 
      scene: {
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -2, q: 2, s: -0 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -1, q: -1, s: 2 },
    visual: { 
      scene:{
        definitionName: blankFieldComposerDefinitionName,
        primaryColor: 0x3f12a7,
        offsetY: 0.1
      }
    } 
  },
  {
    position: { r: -1, q: 0, s: 1 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -1, q: 1, s: -0 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -1, q: 2, s: -1 },
    visual: { 
      scene:{
        definitionName: blankFieldComposerDefinitionName,
        primaryColor: 0x3f12a7,
        offsetY: 0.1
      }
    } 
  },
  {
    position: { r: 0, q: -2, s: 2 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: -1, s: 1 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: 0, s: -0 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: 1, s: -1 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: 2, s: -2 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: -2, s: 1 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: -1, s: -0 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: 0, s: -1 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: 1, s: -2 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 2, q: -2, s: -0 },
    visual: { 
      scene:{
        definitionName: stoneFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 2, q: -1, s: -1 },
    visual: { 
      scene:{
        definitionName: blankFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    } 
  },
  {
    position: { r: 2, q: 0, s: -2 },
    visual: { 
      scene:{
        definitionName: blankFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    } 
  }
]