import {
  area1 as a1,
  area2 as a2,
  area3 as a3,
  area4 as a4,
  area5 as a5,
  area6 as a6,
  area7 as a7,
  area8 as a8,
  area9 as a9,
  area10 as a10,
  area11 as a11,
  area12 as a12,
  area1Tavern as a1t,
  area1Dungeon as a1d
} from "@game-logic/gameplay/data/areas.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { dungeonTemplate } from "@game-logic/gameplay/data/dungeon.data";
import { hexagonalPlainsFieldComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/terrains/hexagonal-plains/hexagonal-plains.constants";
import { ISceneMediumDeclaration } from "../../scene/mixins/scene-medium/scene-medium.interface";


export const area1Tavern: IDataContainer<typeof a1t, INarrativeMedium, IUiMedium> = Object.assign(a1t, {
  narrative: { name: "First area tavern", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const
});

export const area2Dungeon: IDataContainer<typeof a1d, INarrativeMedium, IUiMedium> = Object.assign(a1d, {
  narrative: { name: "First area dungeon", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const
});

export const area1: IDataContainer<typeof a1, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a1, {
  narrative: { name: "First area", description: "string" },
  nestedAreas: [
    area1Tavern,
    Object.assign(area2Dungeon, dungeonTemplate)
  ],
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area2: IDataContainer<typeof a2, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a2, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area3: IDataContainer<typeof a3, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a3, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  }, 
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area4: IDataContainer<typeof a4, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a4, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area5: IDataContainer<typeof a5, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a5, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area6: IDataContainer<typeof a6, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a6, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area7: IDataContainer<typeof a7, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a7, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area8: IDataContainer<typeof a8, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a8, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area9: IDataContainer<typeof a9, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a9, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
     }
   ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area10: IDataContainer<typeof a10, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a10, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area11: IDataContainer<typeof a11, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a11, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});

export const area12: IDataContainer<typeof a12, INarrativeMedium, IUiMedium, ISceneMediumDeclaration> = Object.assign(a12, {
  narrative: { name: "Second area", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  scene: {
    composerDeclarations: [
      {
        definitionName: hexagonalPlainsFieldComposerDefinitionName,
        primaryColor: 0x3f12a7
      }
    ]
  },
  isNarrationMedium: true as const,
  isMixin: true as const,
  isUiMedium: true as const,
  isSceneMedium: true as const
});





