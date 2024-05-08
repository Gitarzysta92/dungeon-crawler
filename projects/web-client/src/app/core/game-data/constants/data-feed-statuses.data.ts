import {
  weaknessStatus as ws,
  protectionStatus as ps,
  burningStatus as bs
} from "@game-logic/gameplay/data/statuses.data"; 
import { IDataContainer } from "../interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";

export const weaknessStatus: IDataContainer<typeof ws, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ws, {
  narrative: { name: "Weakness status", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const protectionStatus: IDataContainer<typeof ps, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ps, {
  narrative: { name: "Protection status", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});

export const burningStatus: IDataContainer<typeof bs, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(bs, {
  narrative: { name: "Burning status", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
});