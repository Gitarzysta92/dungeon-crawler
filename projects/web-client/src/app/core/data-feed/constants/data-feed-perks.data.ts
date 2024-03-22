import {
  additionalAtackPerk as aap,
  dualWieldPerk as dwp
} from "@game-logic/gameplay/data/perks.data";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";


export const additionalAtackPerk: IAuxiliaryContainer<typeof aap, INarrationData, IVisualData<IVisualUiData>> = Object.assign(aap, {
  narrative: { name: "Additional perk", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})

export const dualWieldPerk: IAuxiliaryContainer<typeof dwp, INarrationData, IVisualData<IVisualUiData>> = Object.assign(dwp, {
  narrative: { name: "Dual wield perk", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})