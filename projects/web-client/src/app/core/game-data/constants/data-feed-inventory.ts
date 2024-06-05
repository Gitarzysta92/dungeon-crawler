import {
  weaponFirstSlot as wfs,
  weaponSecondSlot as wss,
  headSlot as hs,
  bodySlot as bs,
  necklaceSlot as ns,
  gloveSlot as gs,
  bootsSlot as bos
} from "@game-logic/gameplay/data/inventory.data";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";

export const weaponFirstSlot: IDataContainer<typeof wfs, INarrativeMedium, IUiMedium> = Object.assign(wfs, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'sword', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const weaponSecondSlot: IDataContainer<typeof wss, INarrativeMedium, IUiMedium> = Object.assign(wss, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'sword', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const headSlot: IDataContainer<typeof hs, INarrativeMedium, IUiMedium> = Object.assign(hs, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'helmet', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const bodySlot: IDataContainer<typeof bs, INarrativeMedium, IUiMedium> = Object.assign(bs, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'armor', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const necklaceSlot: IDataContainer<typeof ns, INarrativeMedium, IUiMedium> = Object.assign(ns, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'necklace', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const gloveSlot: IDataContainer<typeof gs, INarrativeMedium, IUiMedium> = Object.assign(gs, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'glove', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const bootsSlot: IDataContainer<typeof bos, INarrativeMedium, IUiMedium> = Object.assign(bos, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: 'feet', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});