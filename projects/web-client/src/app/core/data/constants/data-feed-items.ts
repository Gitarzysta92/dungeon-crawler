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
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";


export const staff: IDataContainer<typeof s, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(s, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const potion: IDataContainer<typeof p, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(p, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const gold: IDataContainer<typeof g, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(g, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const twoHandedSword: IDataContainer<typeof ths, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ths, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const boots: IDataContainer<typeof b, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(b, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const poo: IDataContainer<typeof po, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(po, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const magicPoo: IDataContainer<typeof mpo, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(mpo, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});