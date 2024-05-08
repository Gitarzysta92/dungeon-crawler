import {
  additionalAtackPerk as aap,
  dualWieldPerk as dwp
} from "@game-logic/gameplay/data/perks.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";


export const additionalAtackPerk: IDataContainer<typeof aap, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(aap, {
  narrative: { name: "perks.1E7163D6-6166-400D-985D-207B104C1307.name", description: "perks.1E7163D6-6166-400D-985D-207B104C1307.description" },
  visual: {
    ui: { icon: '', avatar: { url: "perks/1E7163D6-6166-400D-985D-207B104C1307-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})

export const dualWieldPerk: IDataContainer<typeof dwp, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(dwp, {
  narrative: { name: "perks.8265D85B-E74E-449D-A612-23E5860368FE.name", description: "perks.8265D85B-E74E-449D-A612-23E5860368FE.description" },
  visual: {
    ui: { icon: '', avatar: { url: "perks/8265D85B-E74E-449D-A612-23E5860368FE-avatar.png" } },
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isMixin: true as const
})