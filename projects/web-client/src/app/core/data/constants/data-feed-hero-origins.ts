import {
  adventurer as a,
  noble as n
} from "@game-logic/gameplay/data/hero-origins";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";


export const adventurer: IDataContainer<typeof a, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(a, {
  narrative: { name: "Adventurer", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const noble: IDataContainer<typeof n, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(n, {
  narrative: { name: "Noble", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})