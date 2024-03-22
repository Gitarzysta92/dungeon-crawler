import {
  basicAttack as ba,
  move as m,
  fireball as fb,
  teleport as tele,
  healing as heal,
  vision as v,
  weakness as w,
  curse as c,
  meteorShower as ms,
  cleansingMove as cm,
  domeOfProtection as dop,
  fear as f,
  mindControl as mc,
  burning as bu,
} from "@game-logic/gameplay/data/abilities.data"
import { IAuxiliaryContainer, INarrationData, IVisualData, IVisualUiData } from "../../commons/interfaces/auxiliary-container.interface";



export const basicAttack: IAuxiliaryContainer<typeof ba, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ba, {
  narrative: { name: "Make attack", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const move: IAuxiliaryContainer<typeof ba, INarrationData, IVisualData<IVisualUiData>> = Object.assign(m, {
  narrative: { name: "Move", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const fireball: IAuxiliaryContainer<typeof fb, INarrationData, IVisualData<IVisualUiData>> = Object.assign(fb, {
  narrative: { name: "Fireball", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const teleport: IAuxiliaryContainer<typeof tele, INarrationData, IVisualData<IVisualUiData>> = Object.assign(tele, {
  narrative: { name: "Teleport", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const healing: IAuxiliaryContainer<typeof heal, INarrationData, IVisualData<IVisualUiData>> = Object.assign(heal, {
  narrative: { name: "Healing", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const vision: IAuxiliaryContainer<typeof v, INarrationData, IVisualData<IVisualUiData>> = Object.assign(v, {
  narrative: { name: "Vision", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const weakness: IAuxiliaryContainer<typeof w, INarrationData, IVisualData<IVisualUiData>> = Object.assign(w, {
  narrative: { name: "Weakness", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const curse: IAuxiliaryContainer<typeof c, INarrationData, IVisualData<IVisualUiData>> = Object.assign(c, {
  narrative: { name: "Curse", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const meteor: IAuxiliaryContainer<typeof ms, INarrationData, IVisualData<IVisualUiData>> = Object.assign(ms, {
  narrative: { name: "Meteor", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const cleansingMove: IAuxiliaryContainer<typeof cm, INarrationData, IVisualData<IVisualUiData>> = Object.assign(cm, {
  narrative: { name: "Cleansing move", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const domeOfProtection: IAuxiliaryContainer<typeof dop, INarrationData, IVisualData<IVisualUiData>> = Object.assign(dop, {
  narrative: { name: "Dome of protection", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const fear: IAuxiliaryContainer<typeof f, INarrationData, IVisualData<IVisualUiData>> = Object.assign(f, {
  narrative: { name: "Fear", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const mindControl: IAuxiliaryContainer<typeof mc, INarrationData, IVisualData<IVisualUiData>> = Object.assign(mc, {
  narrative: { name: "Mind control", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});

export const burning: IAuxiliaryContainer<typeof bu, INarrationData, IVisualData<IVisualUiData>> = Object.assign(bu, {
  narrative: { name: "Burning", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  }
});