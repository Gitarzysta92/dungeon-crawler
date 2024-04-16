import {
  warrior as w,
  mage as m
} from "@game-logic/gameplay/data/hero-classes";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";



export const warrior: IDataContainer<typeof w, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(w, {
  narrative: { name: "Warrior", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const mage: IDataContainer<typeof m, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(m, {
  narrative: { name: "Mage", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})