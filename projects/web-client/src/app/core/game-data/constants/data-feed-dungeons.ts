import { Vector3 } from "three";
import { directionalLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/directional-light/directional-light.constants";
import { hemisphereLightComposerDefinitionName } from "@3d-scene/lib/actors/light-objects/hemisphere-light/hemisphere-light.constants";
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants";
import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants";
import { IFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/common/field.interface";
import { ITokenDefinition } from "@3d-scene/lib/actors/game-objects/tokens/common/token.interface";
import { floatingRockTerrainComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/terrains/floating-rock/floating-rock-terrain.constants";
import { skySphereComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/environment-details/sky-sphere/sky-sphere.constants";
import { dungeonTemplate as dt } from "@game-logic/gameplay/data/dungeon.data";
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { IBoardObjectDeclaration } from "@game-logic/lib/modules/board/entities/board-object/board-object.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { barrelActor, campFireActor, dungeonExitActor, ratActor, treasureActor } from "./data-feed-actors";
import { IActorDeclaration } from "@game-logic/lib/modules/actors/entities/actor/actor.interface";
import { IDataContainer } from "../interface/data-container.interface";


export const dungeonTemplate: IDataContainer<typeof dt, INarrationMedium, IVisualMedium<IVisualUiData, any>> = Object.assign(dt, {
  narrative: { name: "string", description: "string" },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  visual: {
    scene: {
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
  }
})








export const actors: Array<IActorDeclaration & Partial<IBoardObjectDeclaration> & { visual?: { scene?: ITokenDefinition<unknown> } }> = [
  Object.assign({ position: { r: -1, q: 2, s: -1 }, rotation: 1 }, barrelActor),
  Object.assign({ position: { r: 2, q: 0, s: -2 }, rotation: 3 }, campFireActor),
  Object.assign({ position: { r: -2, q: 0, s: 2 }, rotation: 0 }, treasureActor),
  Object.assign({ position: { r: 0, q: 0, s: 0 }, rotation: 0 }, ratActor),
  Object.assign({ position: { r: 2, q: -1, s: -1 }, rotation: 3}, dungeonExitActor),
  Object.assign({ position: { r: -1, q: -1, s: 2 }, rotation: 5 }, dungeonExitActor)
]


export const fields: { position: ICubeCoordinates, visualScene: IFieldDefinition<unknown> & any }[]  = [
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