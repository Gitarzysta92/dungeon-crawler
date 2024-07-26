import { v4 } from 'uuid';
import { blankFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.constants"
import { stoneFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.constants"
import { commonTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-tile/common-tile.constants"
import { ICubeCoordinates, IBoardObjectRotation } from '@game-logic/lib/modules/board/board.interface';
import { barrelActor, campFireActor, dungeonExitActor, ratActor, treasureActor } from 'src/app/core/game-data/constants/data-feed-actors';
import { IFieldDefinition } from '@3d-scene/lib/actors/game-objects/fields/common/field.interface';
import { ITokenDefinition } from '@3d-scene/lib/actors/game-objects/tokens/common/token.interface';


export const heroTokenDefinition = {
  id: v4(),
  rotation: 0 as IBoardObjectRotation,
  position: { r: -1, q: 1, s: 0 },
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

export const actors: Array<{ position: ICubeCoordinates, rotation: number } & ITokenDefinition<unknown>> = [
  ...(barrelActor.scene as any).composerDeclarations.map(d => Object.assign(d, { position: { r: -1, q: 2, s: -1 }, rotation: 1 })),
  ...(campFireActor.scene as any).composerDeclarations.map(d => Object.assign(d, { position: { r: 2, q: 0, s: -2 }, rotation: 3 })),
  ...(treasureActor.scene as any).composerDeclarations.map(d => Object.assign(d, { position: { r: -2, q: 0, s: 2 }, rotation: 0 })),
  ...(ratActor.scene as any).composerDeclarations.map(d => Object.assign(d, { position: { r: 0, q: 0, s: 0 }, rotation: 0 })),
  ...(dungeonExitActor as any).scene.composerDeclarations.map(d => Object.assign({...d}, { position: { r: 2, q: -1, s: -1 }, rotation: 3 })),
  ...(dungeonExitActor as any).scene.composerDeclarations.map(d => Object.assign({...d}, { position: { r: -1, q: -1, s: 2 }, rotation: 5 })),
  heroTokenDefinition
]


export const fields: Array<{ position: ICubeCoordinates, primaryColor: number } & IFieldDefinition<unknown>> = [
  {
    position: { r: -2, q: 0, s: 2 },
    definitionName: blankFieldComposerDefinitionName,
    primaryColor: 0x3f12a7,
    offsetY: 0.1
  },
  {
    position: { r: -2, q: 1, s: 1 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: -2, q: 2, s: -0 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: -1, q: -1, s: 2 },
    definitionName: blankFieldComposerDefinitionName,
    primaryColor: 0x3f12a7,
    offsetY: 0.1
  },
  {
    position: { r: -1, q: 0, s: 1 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: -1, q: 1, s: -0 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: -1, q: 2, s: -1 },
    definitionName: blankFieldComposerDefinitionName,
    primaryColor: 0x3f12a7,
    offsetY: 0.1
  },
  {
    position: { r: 0, q: -2, s: 2 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 0, q: -1, s: 1 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 0, q: 0, s: -0 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 0, q: 1, s: -1 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 0, q: 2, s: -2 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 1, q: -2, s: 1 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 1, q: -1, s: -0 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 1, q: 0, s: -1 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 1, q: 1, s: -2 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 2, q: -2, s: -0 },
    definitionName: stoneFieldComposerDefinitionName,
    primaryColor: 0x797979
  },
  {
    position: { r: 2, q: -1, s: -1 },
    definitionName: blankFieldComposerDefinitionName,
    primaryColor: 0x3f12a7
  },
  {
    position: { r: 2, q: 0, s: -2 },
    definitionName: blankFieldComposerDefinitionName,
    primaryColor: 0x3f12a7
  }
]