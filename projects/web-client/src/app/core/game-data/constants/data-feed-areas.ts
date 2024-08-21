
import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";
import { hexagonGridDefinitionName } from "@3d-scene/lib/components/hexagon-grid/hexagon-grid.constants";
import { INestedBoardAreaDeclaration } from "@game-logic/gameplay/modules/board-areas/entities/nested-board-area/nested-board-area.interface";
import { IDungeonAreaDeclaration } from "@game-logic/gameplay/modules/dungeon/mixins/dungeon-area/dungeon-area.interface";
import { ENTER_DUNGEON_ACTIVITY } from "@game-logic/gameplay/modules/dungeon/dungeon.constants";
import { BOARD_TRAVEL_ACTIVITY } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { ITEM_RESOURCE_TYPE } from "@game-logic/lib/modules/items/items.constants";
import { FIRST_AREA_ID, SECOND_AREA_ID } from "./common-identifiers.data";
import { TRAVEL_SUPPLIES_ID } from "@game-logic/gameplay/modules/board-areas/board-areas.constants";
import { IBoardAreaDeclaration } from "@game-logic/gameplay/modules/board-areas/entities/board-area/board-area.interface";
import { dungeonDeclaration } from "./data-feed-dungeons";
import { from } from "rxjs";
import { computerPlayer } from "./players.data";
import { AssetType } from "../../game-ui/constants/asset-type";

export const area1Dungeon: IDataContainer<INestedBoardAreaDeclaration & IDungeonAreaDeclaration, INarrativeMedium, IUiMedium> = {
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
  unlockWhen: [],
  narrative: { name: "First area dungeon", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const
}


export const area1Tavern: IDataContainer<INestedBoardAreaDeclaration, INarrativeMedium, IUiMedium> = {
  id: "A8811046-363E-4E37-AB8C-42112054F3DF",
  isUnlocked: true,
  unlockWhen: [],
  isEntity: true,
  isMixin: true,
  isNestedBoardArea: true,
  narrative: { name: "First area tavern", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const
};


export const area2Dungeon: IDataContainer<INestedBoardAreaDeclaration & IDungeonAreaDeclaration, INarrativeMedium, IUiMedium> = {
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
  isActivitySubject: true,
  isNestedBoardArea: true,
  isUnlocked: true,
  unlockWhen: [],
  narrative: { name: "First area dungeon", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const
};


export const area1: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "First area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area2: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  activities: [{ id: BOARD_TRAVEL_ACTIVITY, cost: [{ resourceId: TRAVEL_SUPPLIES_ID, resourceType: ITEM_RESOURCE_TYPE }], isMixin: true, isActivity: true }],
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area3: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  }, 
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area4: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area5: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area6: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area7: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area8: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};


export const area9: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
     }
   ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};

export const area10: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};

export const area11: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};

export const area12: IDataContainer<IBoardAreaDeclaration, INarrativeMedium, IUiMedium, ISceneMediumDeclaration & any> = {
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
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "", ext: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonGridDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
};





