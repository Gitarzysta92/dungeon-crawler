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
import { IUiData } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export const staff: IDataContainer<typeof s, INarrationMedium, IUiMedium> = Object.assign(s, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const potion: IDataContainer<typeof p, INarrationMedium, IUiMedium> = Object.assign(p, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const gold: IDataContainer<typeof g, INarrationMedium, IUiMedium> = Object.assign(g, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const twoHandedSword: IDataContainer<typeof ths, INarrationMedium, IUiMedium> = Object.assign(ths, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const boots: IDataContainer<typeof b, INarrationMedium, IUiMedium> = Object.assign(b, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const poo: IDataContainer<typeof po, INarrationMedium, IUiMedium> = Object.assign(po, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const magicPoo: IDataContainer<typeof mpo, INarrationMedium, IUiMedium> = Object.assign(mpo, {
  narrative: { name: "string", description: "string" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});