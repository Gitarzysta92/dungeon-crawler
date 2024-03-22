import {
  warrior as w,
  mage as m
} from "@game-logic/gameplay/data/hero-classes";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";



export const warrior: IAuxiliaryContainer<typeof w, INarrationData, IVisualData<IVisualUiData>> = Object.assign(w, {
  narrative: { name: "Warrior", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})

export const mage: IAuxiliaryContainer<typeof m, INarrationData, IVisualData<IVisualUiData>> = Object.assign(m, {
  narrative: { name: "Mage", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
})