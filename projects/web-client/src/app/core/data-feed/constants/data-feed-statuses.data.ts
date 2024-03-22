import {
  weaknessStatus as ws,
  protectionStatus as ps,
  burningStatus as bs
} from "@game-logic/gameplay/data/statuses.data"; 
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";

export const weaknessStatus: IAuxiliaryContainer<typeof ws, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ws, {
  narrative: { name: "Weakness status", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const protectionStatus: IAuxiliaryContainer<typeof ps, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ps, {
  narrative: { name: "Protection status", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const burningStatus: IAuxiliaryContainer<typeof bs, INarrationData, IVisualData<IVisualUiData>> = Object.assign(bs, {
  narrative: { name: "Burning status", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});