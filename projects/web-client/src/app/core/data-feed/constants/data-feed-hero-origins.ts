import {
  adventurer as a,
  noble as n
} from "@game-logic/gameplay/data/hero-origins";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";


export const adventurer: IAuxiliaryContainer<typeof a, INarrationData, IVisualData<IVisualUiData>> = Object.assign(a, {
  narrative: { name: "Adventurer", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})

export const noble: IAuxiliaryContainer<typeof n, INarrationData, IVisualData<IVisualUiData>> = Object.assign(n, {
  narrative: { name: "Noble", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})