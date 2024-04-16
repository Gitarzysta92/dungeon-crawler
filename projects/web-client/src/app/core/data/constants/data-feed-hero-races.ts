import {
  human as h,
  elf as e
} from "@game-logic/gameplay/data/hero-races";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";

export const human: IDataContainer<typeof h, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(h, {
  narrative: { name: "Human", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const elf: IDataContainer<typeof e, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(e, {
  narrative: { name: "Elf", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})