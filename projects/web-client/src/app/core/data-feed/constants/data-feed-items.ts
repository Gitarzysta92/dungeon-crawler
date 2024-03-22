import {
  staff as s,
  potion as p,
  gold as g,
  twoHandedSword as ths,
  boots as b,
  poo as po,
  magicPoo as mpo
} from "@game-logic/gameplay/data/items.data";
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";


export const staff: IAuxiliaryContainer<typeof s, INarrationData, IVisualData<IVisualUiData>> = Object.assign(s, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const potion: IAuxiliaryContainer<typeof p, INarrationData, IVisualData<IVisualUiData>> = Object.assign(p, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const gold: IAuxiliaryContainer<typeof g, INarrationData, IVisualData<IVisualUiData>> = Object.assign(g, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const twoHandedSword: IAuxiliaryContainer<typeof ths, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ths, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const boots: IAuxiliaryContainer<typeof b, INarrationData, IVisualData<IVisualUiData>> = Object.assign(b, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const poo: IAuxiliaryContainer<typeof po, INarrationData, IVisualData<IVisualUiData>> = Object.assign(po, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const magicPoo: IAuxiliaryContainer<typeof mpo, INarrationData, IVisualData<IVisualUiData>> = Object.assign(mpo, {
  narrative: { name: "string", description: "string" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});