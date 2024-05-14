import {
  weaknessStatus as ws,
  protectionStatus as ps,
  burningStatus as bs
} from "@game-logic/gameplay/data/statuses.data"; 
import { IDataContainer } from "../interface/data-container.interface";
import { IUiData } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/visual-medium/ui-medium.interface";
import { INarrationMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";

export const weaknessStatus: IDataContainer<typeof ws, INarrationMedium, IUiMedium> = Object.assign(ws, {
  narrative: { name: "Weakness status", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const protectionStatus: IDataContainer<typeof ps, INarrationMedium, IUiMedium> = Object.assign(ps, {
  narrative: { name: "Protection status", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const burningStatus: IDataContainer<typeof bs, INarrationMedium, IUiMedium> = Object.assign(bs, {
  narrative: { name: "Burning status", description: "Some text" },
  uiData: { icon: '', avatar: { url: "" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});