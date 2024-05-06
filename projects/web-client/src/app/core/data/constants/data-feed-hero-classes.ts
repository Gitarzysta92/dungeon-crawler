import {
  warrior as w,
  mage as m
} from "@game-logic/gameplay/data/hero-classes";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";



export const warrior: IDataContainer<typeof w, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(w, {
  narrative: {
    name: "hero-classes.2FB317CE-DD9E-4256-B0E0-E6EC34090020.name",
    description: "hero-classes.2FB317CE-DD9E-4256-B0E0-E6EC34090020.description"
  },
  visual: {
    ui: { icon: '', avatar: { url: "hero/2FB317CE-DD9E-4256-B0E0-E6EC34090020-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const mage: IDataContainer<typeof m, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(m, {
  narrative: {
    name: "hero-classes.777DEB7C-862C-4F7F-B2E3-690F77CDB2CB.name",
    description: "hero-classes.777DEB7C-862C-4F7F-B2E3-690F77CDB2CB.description"
  },
  visual: {
    ui: { icon: '', avatar: { url: "hero/777DEB7C-862C-4F7F-B2E3-690F77CDB2CB-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})