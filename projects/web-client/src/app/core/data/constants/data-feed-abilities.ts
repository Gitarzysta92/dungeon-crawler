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
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";



export const basicAttack: IDataContainer<typeof ba, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ba, {
  narrative: { name: "Make attack", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isCommand: true,
  //commandName: 
});

export const move: IDataContainer<typeof ba, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(m, {
  narrative: { name: "Move", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } },
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const fireball: IDataContainer<typeof fb, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(fb, {
  narrative: { name: "Fireball", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const teleport: IDataContainer<typeof tele, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(tele, {
  narrative: { name: "Teleport", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const healing: IDataContainer<typeof heal, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(heal, {
  narrative: { name: "Healing", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const vision: IDataContainer<typeof v, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(v, {
  narrative: { name: "Vision", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const weakness: IDataContainer<typeof w, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(w, {
  narrative: { name: "Weakness", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const curse: IDataContainer<typeof c, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(c, {
  narrative: { name: "Curse", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const meteor: IDataContainer<typeof ms, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ms, {
  narrative: { name: "Meteor", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const cleansingMove: IDataContainer<typeof cm, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(cm, {
  narrative: { name: "Cleansing move", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const domeOfProtection: IDataContainer<typeof dop, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(dop, {
  narrative: { name: "Dome of protection", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const fear: IDataContainer<typeof f, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(f, {
  narrative: { name: "Fear", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const mindControl: IDataContainer<typeof mc, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(mc, {
  narrative: { name: "Mind control", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const burning: IDataContainer<typeof bu, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(bu, {
  narrative: { name: "Burning", description: "Some text" },
  visual: {
    ui: { icon: '', avatar: { url: "" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});