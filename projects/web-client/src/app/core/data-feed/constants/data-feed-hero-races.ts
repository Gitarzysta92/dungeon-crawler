import {
  human as h,
  elf as e
} from "@game-logic/gameplay/data/hero-races";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";

export const human: IAuxiliaryContainer<typeof h, INarrationData, IVisualData<IVisualUiData>> = Object.assign(h, {
  narrative: { name: "Human", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})

export const elf: IAuxiliaryContainer<typeof e, INarrationData, IVisualData<IVisualUiData>> = Object.assign(e, {
  narrative: { name: "Elf", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})