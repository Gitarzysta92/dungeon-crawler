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
import { ITreasureChestDefinition } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.interface"
import { treasureChestDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/treasure-chest/treasure-chest.constants";
import { ICommonCharacterDefinition} from "@3d-scene/lib/actors/game-objects/tokens/common-character/common-character.interface";
import { commonCharacterDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/common-character/common-character.constants";
import { plainTileComposerDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.constants";
import { IPlainTileDefinition } from "@3d-scene/lib/actors/game-objects/tokens/plain-tile/plain-tile.interface";
import { barrelWithCandlesDefinitionName } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.constants";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";
import { imagesPath } from "./data-feed-commons";
import { IBarrelWithCandlesDefinition } from "@3d-scene/lib/actors/game-objects/tokens/barrel-with-candles/barrel-with-candles.interfaces";
import { IStoneFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/stone-field/stone-field.interface";
import { IBlankFieldDefinition } from "@3d-scene/lib/actors/game-objects/fields/blank-field/blank-field.interface";


export const vendorActor: IAuxiliaryContainer<typeof va, INarrationData, IVisualData<IVisualUiData, ICommonCharacterDefinition>> = Object.assign(va, {
  narrative: { name: "Vendor", description: "Character" },
  visual: {
    scene: {
      definitionName: commonCharacterDefinitionName
    },
    ui: {
      avatar: { url: `${imagesPath}/vendor.png` },
      color: 0x0002,
      icon: ""
    }
  }
});


export const treasureActor: IAuxiliaryContainer<typeof ta, INarrationData, IVisualData<IVisualUiData, ITreasureChestDefinition>> = Object.assign(ta, {
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
  }
});


export const dungeonExitActor: IAuxiliaryContainer<typeof dea, INarrationData, IVisualData<IVisualUiData, IMagicGateDefinition>> = Object.assign(dea, {
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
  }
});


export const ratActor: IAuxiliaryContainer<typeof ra, INarrationData, IVisualData<IVisualUiData, IPlainTileDefinition>> = Object.assign(ra, {
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
  }
});



export const campFireActor: IAuxiliaryContainer<typeof oa, INarrationData, IVisualData<IVisualUiData, ICampFireDefinition>> = Object.assign({...oa}, {
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
  }
});


export const barrelActor: IAuxiliaryContainer<typeof oa, INarrationData, IVisualData<IVisualUiData, IBarrelWithCandlesDefinition>> = Object.assign({...oa}, {
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
  }
});


export const commonField: IAuxiliaryContainer<typeof cf, INarrationData, IVisualData<IVisualUiData, IStoneFieldDefinition>> = Object.assign(cf, {
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
  }
});


export const blankField: IAuxiliaryContainer<typeof bf, INarrationData, IVisualData<IVisualUiData, IBlankFieldDefinition>> = Object.assign(bf, {
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
  }
});