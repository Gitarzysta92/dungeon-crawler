import {
  additionalAtackPerk as aap,
  dualWieldPerk as dwp
} from "@game-logic/gameplay/data/perks.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";


export const additionalAtackPerk: IDataContainer<typeof aap, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(aap, {
  narrative: { name: "Additional perk", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const dualWieldPerk: IDataContainer<typeof dwp, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(dwp, {
  narrative: { name: "Dual wield perk", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } },
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})