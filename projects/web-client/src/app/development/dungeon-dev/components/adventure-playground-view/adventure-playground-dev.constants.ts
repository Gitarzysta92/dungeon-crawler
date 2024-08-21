import { v4 } from 'uuid';
import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants"
import { ICubeCoordinates, IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { treasureActor } from 'src/app/core/game-data/constants/data-feed-actors';
import { IBoardObjectDeclaration } from '@game-logic/lib/modules/board/entities/board-object/board-object.interface';
import { IFieldDefinition } from '@3d-scene/lib/actors/game-objects/fields/common/field.interface';
import { ITokenDefinition } from '@3d-scene/lib/actors/game-objects/tokens/common/token.interface';
import { IActorDeclaration } from '@game-logic/lib/modules/actors/entities/actor/actor.interface';
import { directionalLightComposerDefinitionName } from '@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants';
import { hemisphereLightComposerDefinitionName } from '@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants';
import { Vector3 } from 'three';
import { hexagonalPlainsFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.constants";
import { map2dCoordsToCubeCoords } from 'src/app/core/scene/misc/coords-mappings';
import { boardComposerDefinitionName } from '@3d-scene/lib/components/board/board.constants';
import { skySphereComposerDefinitionName } from '@3d-scene/lib/actors/game-objects/environment-details/sky-sphere/sky-sphere.constants';


export const adventurePlaygroundScene = {
  bgColor: 0x2d1048,
  composerDefinitions: [
    // {
    //   definitionName: boardComposerDefinitionName,
    //   position: new Vector3(0, 0, 0),
    //   color: 0x56680c
    // },
    // {
    //   definitionName: directionalLightComposerDefinitionName,
    //   position: new Vector3(7, 2, 0),
    //   color: 0x8d5ff9,
    //   intensity: 3,
    //   radius: 2,
    // },
    // {
    //   definitionName: directionalLightComposerDefinitionName,
    //   position: new Vector3(0, 30, 0),
    //   color: 0xffb400,
    //   intensity: 2,
    //   radius: 10,
    // },
    {
      definitionName: directionalLightComposerDefinitionName,
      position: new Vector3(-7, 2, 0),
      color: 0xffb400,
      intensity:2,
      radius: 1,
    },
    {
      definitionName: hemisphereLightComposerDefinitionName,
      skyColor: 0x009dff,
      groundColor: 0x1c0f0a,
      intensity: 1,
      position: new Vector3(0, 0, 0),
    },
    // {
    //   definitionName: skySphereComposerDefinitionName,
    //   primeColor: 0x0d1857,
    //   secondColor: 0xffe400,
    // },
    // {
    //   definitionName: fogOfWarComposerDefinitionName,
    //   position: new Vector3(0,2,0)
    // }
  ]
}



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
        fileName: "hero",
        ext:"png",
        dir: "/images/actors"
      },
      outlets: [0,3,5]
    }
  }
}

export const actors: Array<IActorDeclaration & Partial<IBoardObjectDeclaration> & { visual?: { scene?: ITokenDefinition<unknown> } }> = [
  //Object.assign({ position: { r: -1, q: 2, s: -1 }, rotation: 1 }, barrelActor),
  //Object.assign({ position: { r: 2, q: 0, s: -2 }, rotation: 3 }, campFireActor),
  Object.assign({ position: { r: -2, q: 0, s: 2 }, rotation: 0 }, treasureActor),
  // Object.assign({ position: { r: 0, q: 0, s: 0 }, rotation: 0 }, ratActor),
  // Object.assign({ position: { r: 2, q: -1, s: -1 }, rotation: 3}, dungeonExitActor),
  // Object.assign({ position: { r: -1, q: -1, s: 2 }, rotation: 5 }, dungeonExitActor),
  heroTokenDefinition as any
]

export const fields2 = [];


// export const fields: Array<{ position: ICubeCoordinates, primaryColor: number } & IFieldDefinition<unknown>> = generateGrid(2).map((v) => {
//   return {
//     position: v,
//     definitionName: hexagonalPlainsFieldComposerDefinitionName,
//     primaryColor: 0x3f12a7,
//     offsetY: 0.1
//   }
// })


export const terrainMap = [
  // 1  2  3  4  5  6  7  8   9   10 
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, 0, 0, 0, -1, 0, 0, -1, -1],
  [-1, -1, 0, 0, 0, 1, 0, 0, 0, -1],
  [-1, -1, 0, 0, 1, 1, 1, 0, 0, -1],
  [-1, 0, 0, 0, 1, 2, 1, 0, 0, -1],
  [-1, 0, 0, 0, 1, 2, 1, 0, 0, -1],
  [-1, 0, 0, 0, 1, 1, 1, 0, 0, -1],
  [-1, -1, 0, 0, 0, 0, 1, 0, -1, -1],
  [-1, -1, 0, 0, 0, 0, 0, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
]







export const fields3: { position: ICubeCoordinates, visual: { scene: IFieldDefinition<unknown> & { primaryColor: number } } }[]  = [
  {
    position: { r: -2, q: 0, s: 2 },
    visual: { 
      scene: {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7,
        offsetY: 0.1
      }
    }
  },
  {
    position: { r: -2, q: 1, s: 1 },
    visual: { 
      scene: {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -2, q: 2, s: -0 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -1, q: -1, s: 2 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7,
        offsetY: 0.1
      }
    } 
  },
  {
    position: { r: -1, q: 0, s: 1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -1, q: 1, s: -0 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: -1, q: 2, s: -1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7,
        offsetY: 0.1
      }
    } 
  },
  {
    position: { r: 0, q: -2, s: 2 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: -1, s: 1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: 0, s: -0 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: 1, s: -1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 0, q: 2, s: -2 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: -2, s: 1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: -1, s: -0 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: 0, s: -1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 1, q: 1, s: -2 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 2, q: -2, s: -0 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x797979
      }
    } 
  },
  {
    position: { r: 2, q: -1, s: -1 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    } 
  },
  {
    position: { r: 2, q: 0, s: -2 },
    visual: { 
      scene:{
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    } 
  }
]