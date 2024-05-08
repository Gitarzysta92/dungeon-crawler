import {
  adventurer as a,
  noble as n
} from "@game-logic/gameplay/data/hero-origins";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";


export const adventurer: IDataContainer<typeof a, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(a, {
  narrative: {
    name: "hero-origins.829FEEA3-A80B-46D6-ADAC-07B844F09822.name",
    description: "hero-origins.829FEEA3-A80B-46D6-ADAC-07B844F09822.description"
  },
  visual: {
    ui: { icon: '', avatar: { url: "hero/829FEEA3-A80B-46D6-ADAC-07B844F09822-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const noble: IDataContainer<typeof n, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(n, {
  narrative: {
    name: "hero-origins.CD8A2ADE-19F4-4D03-9C18-FF9C6092F995.name",
    description: "hero-origins.CD8A2ADE-19F4-4D03-9C18-FF9C6092F995.description"
  },
  visual: {
    ui: { icon: '', avatar: { url: "hero/CD8A2ADE-19F4-4D03-9C18-FF9C6092F995-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})