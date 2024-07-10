import { ITEM_RESOURCE_TYPE } from "../../lib/modules/items/items.constants"
import { BOARD_TRAVEL_ACTIVITY } from "../modules/board-areas/board-areas.constants"
import { IBoardAreaDeclaration } from "../modules/board-areas/entities/board-area/board-area.interface"
import { INestedBoardAreaDeclaration } from "../modules/board-areas/entities/nested-board-area/nested-board-area.interface"
import { ENTER_DUNGEON_ACTIVITY } from "../modules/dungeon/dungeon.constants"
import { IDungeonAreaDeclaration } from "../modules/dungeon/mixins/dungeon-area/dungeon-area.interface"
import { FIRST_AREA_ID, SECOND_AREA_ID, TRAVEL_SUPPLIES_ID } from "./common-identifiers.data"
import { dungeonDeclaration } from "./dungeon.data"
import { computerPlayer } from "./players.data"


export const area1Dungeon: INestedBoardAreaDeclaration & IDungeonAreaDeclaration = {
  id: "2C732FE8-215E-4A5A-8144-F24461AC4F80",
  dungeonId: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  playersNumber: 2,
  predefinedPlayers: [computerPlayer],
  spawnPoints: [{ position: { r: 2, q: 0, s: -2 }, rotation: 0 }],
  activities: [
    { id: ENTER_DUNGEON_ACTIVITY, cost: [], isMixin: true, isActivity: true },
  ],
  isDungeonArea: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  isNestedBoardArea: true,
  isUnlocked: true,
  unlockWhen: []
}

export const area1Tavern: INestedBoardAreaDeclaration = {
  id: "A8811046-363E-4E37-AB8C-42112054F3DF",
  isUnlocked: true,
  unlockWhen: [],
  isEntity: true,
  isMixin: true,
  isNestedBoardArea: true,
}

export const area1: IBoardAreaDeclaration = {
  id: FIRST_AREA_ID,
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [
    area1Tavern,
    area1Dungeon
  ],
  isUnlocked: true,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: -2, q: 0, s: 2 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area2Dungeon: INestedBoardAreaDeclaration & IDungeonAreaDeclaration = {
  id: "4F5B7961-29A9-4FE5-B4B6-22597CECFFC9",
  dungeonId: "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  playersNumber: 2,
  predefinedPlayers: [computerPlayer],
  spawnPoints: [{ position: { r: 2, q: 0, s: -2 }, rotation: 0 }],
  activities: [
    { id: ENTER_DUNGEON_ACTIVITY, cost: [], isMixin: true, isActivity: true },
  ],
  isDungeonArea: true,
  isEntity: true,
  isMixin: true,
  isActivitySubject: true,
  isNestedBoardArea: true,
  isUnlocked: true,
  unlockWhen: []
}

export const area2: IBoardAreaDeclaration = {
  id: SECOND_AREA_ID,
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 1,
  nestedAreas: [Object.assign(area2Dungeon, dungeonDeclaration)],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: 1, q: -2, s: 1  },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }]
}

export const area3: IBoardAreaDeclaration = {
  id: "C2D06B19-FCA6-4F61-A7B2-72299A0C33F9",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: -2, q: 1, s: 1 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area4: IBoardAreaDeclaration = {
  id: "2DBC18B9-7A76-4B75-8A43-DAE1017256FB",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: -1, q: -1, s: 2 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}


export const area5: IBoardAreaDeclaration = {
  id: "47C81DBA-FBB7-4E1F-8267-65C28448CFCA",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: -1, q: 0, s: 1 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area6: IBoardAreaDeclaration = {
  id: "128B9876-034C-43CD-9C19-255F04D3C3E5",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: -1, q: 1, s: -0 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area7: IBoardAreaDeclaration = {
  id: "B76AB5ED-D2B6-4D51-8F9C-386444C7EBE8",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: -1, q: 2, s: -1 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area8: IBoardAreaDeclaration = {
  id: "FB16ECF0-5A35-4EAE-B722-7281CF50B40F",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: 0, q: -2, s: 2 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area9: IBoardAreaDeclaration = {
  id: "5F3C00C1-9AE9-4444-B984-DA7B3FB7FD43",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: 0, q: -1, s: 1 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area10: IBoardAreaDeclaration = {
  id: "19675A4C-D204-456B-87A0-6E2B75F74B81",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: 0, q: 1, s: -1 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}


export const area11: IBoardAreaDeclaration = {
  id: "CEB99589-7330-4666-AF91-C7C0E63F7FF8",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: 0, q: 2, s: -2 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}

export const area12: IBoardAreaDeclaration = {
  id: "3A52FAC0-B07F-49B1-8B67-D27FA6BDDBA5",
  isBoardArea: true,
  isEntity: true,
  terrainDifficulty: 2,
  nestedAreas: [],
  isUnlocked: false,
  unlockWhen: [],
  isMixin: true,
  isActivitySubject: true,
  isBoardField: true,
  position: { r: 0, q: 0, s: 0 },
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
}




// const x = [
//   {
//     position: { r: 1, q: -2, s: 1 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x797979
//       }
//     } 
//   },
//   {
//     position: { r: 1, q: -1, s: -0 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x797979
//       }
//     } 
//   },
//   {
//     position: { r: 1, q: 0, s: -1 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x797979
//       }
//     } 
//   },
//   {
//     position: { r: 1, q: 1, s: -2 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x797979
//       }
//     } 
//   },
//   {
//     position: { r: 2, q: -2, s: -0 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x797979
//       }
//     } 
//   },
//   {
//     position: { r: 2, q: -1, s: -1 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x3f12a7
//       }
//     } 
//   },
//   {
//     position: { r: 2, q: 0, s: -2 },
//     visual: { 
//       scene:{
//         definitionName: hexagonalPlainsFieldComposerDefinitionName,
//         primaryColor: 0x3f12a7
//       }
//     } 
//   }
// ]