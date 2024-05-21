import {
  staff as s,
  potion as p,
  gold as g,
  twoHandedSword as ths,
  boots as b,
  poo as po,
  magicPoo as mpo
} from "@game-logic/gameplay/data/items.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export const staff: IDataContainer<typeof s, INarrativeMedium, IUiMedium> = Object.assign(s, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const potion: IDataContainer<typeof p, INarrativeMedium, IUiMedium> = Object.assign(p, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const gold: IDataContainer<typeof g, INarrativeMedium, IUiMedium> = Object.assign(g, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const twoHandedSword: IDataContainer<typeof ths, INarrativeMedium, IUiMedium> = Object.assign(ths, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const boots: IDataContainer<typeof b, INarrativeMedium, IUiMedium> = Object.assign(b, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const poo: IDataContainer<typeof po, INarrativeMedium, IUiMedium> = Object.assign(po, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const magicPoo: IDataContainer<typeof mpo, INarrativeMedium, IUiMedium> = Object.assign(mpo, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});