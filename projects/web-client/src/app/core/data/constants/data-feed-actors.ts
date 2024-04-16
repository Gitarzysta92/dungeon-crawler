import {
  vendorActor as va,
  treasureActor as ta,
  ratActor as ra,
  dungeonExitActor as dea,
  obstacleActor as oa,
  commonField as cf,
  blankField as bf
} from "@game-logic/gameplay/data/actors.data";


import { campFireDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/camp-fire/camp-fire.constants";
import { ICampFireDefinition } from "@3d-scene/lib/actors/game-objects/tokens/camp-fire/camp-fire.interface";
import { IMagicGateDefinition } from "@3d-scene/lib/actors/game-objects/tokens/magic-gate/magic-gate.interface";
import { magicGateComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/magic-gate/magic-gate.constants";
import { treasureChestDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.constants";
import { plainTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.constants";
import { IPlainTileDefinition } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.interface";
import { barrelWithCandlesDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.constants";
import { IVisualMedium, IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { imagesPath } from "./data-feed-commons";
import { IBarrelWithCandlesDefinition } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.interfaces";
import { IStoneFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.interface";
import { IBlankFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { ITreasureChestDefinition } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.interface";


export const vendorActor: IDataContainer<typeof va, INarrationMedium, IVisualMedium<IVisualUiData, IPlainTileDefinition>> = Object.assign(va, {
  narrative: { name: "Vendor", description: "Character" },
  visual: {
    scene: {
      definitionName: plainTileComposerDefinitionName,
      primaryColor: 0x4e3027,
      outlineColor: 0x4e3027,
      texture: { assetName: "", extensionName: "" },
      outlets: []
    },
    ui: {
      avatar: { url: `${imagesPath}/vendor.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});


export const treasureActor: IDataContainer<typeof ta, INarrationMedium, IVisualMedium<IVisualUiData, ITreasureChestDefinition>> = Object.assign(ta, {
  narrative: { name: "treasure", description: "string" },
  visual: {
    scene: {
      definitionName: treasureChestDefinitionName,
      primaryColor: 0x4e3027,
      secondaryColor: 0x868686,
      tertiaryColor: 0xffc90c,
      lightColor: 0xff8400,
    },
    ui: {
      avatar: { url: `${imagesPath}/treasure.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});


export const dungeonExitActor: IDataContainer<typeof dea, INarrationMedium, IVisualMedium<IVisualUiData, IMagicGateDefinition>> = Object.assign(dea, {
  narrative: { name: "dungeon exit", description: "string" },
  visual: {
    scene: {
      definitionName: magicGateComposerDefinitionName,
      primaryColor: 0x797979,
      primaryTeleportColor: 0x124df4,
      secondaryTeleportColor: 0x83ecff,
      lightColor: 0x2769ff
    },
    ui: {
      avatar: { url: `${imagesPath}/exit.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});


export const ratActor: IDataContainer<typeof ra, INarrationMedium, IVisualMedium<IVisualUiData, IPlainTileDefinition>> = Object.assign(ra, {
  narrative: { name: "dungeon exit", description: "string" },
  visual: {
    scene: {
      definitionName: plainTileComposerDefinitionName,
      primaryColor: 0x297353,
      outlineColor: 0xff4800,
      texture: {
        assetName: "rat",
        extensionName: "png"
      },
      outlets: ra.outlets
    },
    ui: {
      avatar: { url: `${imagesPath}/rat.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});



export const campFireActor: IDataContainer<typeof oa, INarrationMedium, IVisualMedium<IVisualUiData, ICampFireDefinition>> = Object.assign({...oa}, {
  narrative: { name: "obstacle", description: "string" },
  visual: {
    scene: {
      definitionName: campFireDefinitionName,
      woodColor: 0x4b1010,
      flameColor: [0xff4800, 0xffee9d, 0xffecd2] as [number, number, number],
      flameBloomColor: 0xffea86,
      primaryLightColor: 0xffb400,
      secondaryLightColor: 0xff3c00
    },
    ui: {
      avatar: { url: `${imagesPath}/obstacle.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});


export const barrelActor: IDataContainer<typeof oa, INarrationMedium, IVisualMedium<IVisualUiData, IBarrelWithCandlesDefinition>> = Object.assign({...oa}, {
  narrative: { name: "obstacle", description: "string" },
  visual: {
    scene: {
      definitionName: barrelWithCandlesDefinitionName,
      primaryColor: 0x4e3027,
      secondaryColor: 0x868686,
      lightColor: 0xff8400,
    },
    ui: {
      avatar: { url: `${imagesPath}/obstacle.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});


export const commonField: IDataContainer<typeof cf, INarrationMedium, IVisualMedium<IVisualUiData, IStoneFieldDefinition>> = Object.assign(cf, {
  narrative: { name: "Stone field", description: "string" },
  visual: {
    scene: {
      definitionName: barrelWithCandlesDefinitionName,
      primaryColor: 0x4e3027,
      secondaryColor: 0x868686,
      lightColor: 0xff8400,
    },
    ui: {
      avatar: { url: `${imagesPath}/obstacle.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});


export const blankField: IDataContainer<typeof bf, INarrationMedium, IVisualMedium<IVisualUiData, IBlankFieldDefinition>> = Object.assign(bf, {
  narrative: { name: "Blank field", description: "string" },
  visual: {
    scene: {
      definitionName: barrelWithCandlesDefinitionName,
      primaryColor: 0x4e3027,
      secondaryColor: 0x868686,
      lightColor: 0xff8400,
    },
    ui: {
      avatar: { url: `${imagesPath}/obstacle.png` },
      color: 0x0002,
      icon: ""
    }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});