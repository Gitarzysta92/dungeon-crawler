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
  circleOfProtection as cop,
  fear as f,
  mindControl as mc,
  burning as bu,
} from "@game-logic/gameplay/data/abilities.data"
import { IVisualUiData } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { IVisualMedium } from "../../game-ui/entities/visual-medium/visual-medium.interface";
import { INarrationMedium } from "../../game-ui/entities/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";



export const basicAttack: IDataContainer<typeof ba, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ba, {
  narrative: { name: "ability.A3ED3076-47E7-479B-86B4-147E07DA584C.name", description: "ability.A3ED3076-47E7-479B-86B4-147E07DA584C.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/A3ED3076-47E7-479B-86B4-147E07DA584C-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const,
  isCommand: true,
  //commandName: 
});

export const move: IDataContainer<typeof ba, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(m, {
  narrative: { name: "ability.34FB322A-EAED-439F-865A-1BEEF206560D.name", description: "ability.34FB322A-EAED-439F-865A-1BEEF206560D.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/34FB322A-EAED-439F-865A-1BEEF206560D-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const fireball: IDataContainer<typeof fb, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(fb, {
  narrative: { name: "ability.A1F8217E-5C5B-4512-A6CE-6C553AC587F0.name", description: "ability.A1F8217E-5C5B-4512-A6CE-6C553AC587F0.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/A1F8217E-5C5B-4512-A6CE-6C553AC587F0-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const teleport: IDataContainer<typeof tele, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(tele, {
  narrative: { name: "ability.C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E.name", description: "ability.C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const healing: IDataContainer<typeof heal, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(heal, {
  narrative: { name: "ability.4A75B866-3878-4D23-954E-9DC4E6663DAE.name", description: "ability.4A75B866-3878-4D23-954E-9DC4E6663DAE.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/4A75B866-3878-4D23-954E-9DC4E6663DAE-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const vision: IDataContainer<typeof v, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(v, {
  narrative: { name: "ability.605E23E0-6DB9-4B09-A84B-B4738E5D9E55.name", description: "ability.605E23E0-6DB9-4B09-A84B-B4738E5D9E55.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/605E23E0-6DB9-4B09-A84B-B4738E5D9E55-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const weakness: IDataContainer<typeof w, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(w, {
  narrative: { name: "ability.A7A7B211B-92FB-4417-B1A9-853FB1564F0A.name", description: "ability.A7A7B211B-92FB-4417-B1A9-853FB1564F0A.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/A7A7B211B-92FB-4417-B1A9-853FB1564F0A-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const curse: IDataContainer<typeof c, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(c, {
  narrative: { name: "ability.636642BE-EA42-4482-B81C-48D8398D3BC5.name", description: "ability.636642BE-EA42-4482-B81C-48D8398D3BC5.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/636642BE-EA42-4482-B81C-48D8398D3BC5-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const meteor: IDataContainer<typeof ms, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(ms, {
  narrative: { name: "ability.B0D3E90C-E359-43C9-A42F-30D9B37B2E0E.name", description: "ability.B0D3E90C-E359-43C9-A42F-30D9B37B2E0E.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/B0D3E90C-E359-43C9-A42F-30D9B37B2E0E-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const cleansingMove: IDataContainer<typeof cm, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(cm, {
  narrative: { name: "ability.85745620-91E7-4BDB-BE6A-EBE7B207E4DD.name", description: "ability.85745620-91E7-4BDB-BE6A-EBE7B207E4DD.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/85745620-91E7-4BDB-BE6A-EBE7B207E4DD-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const domeOfProtection: IDataContainer<typeof dop, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(dop, {
  narrative: { name: "ability.A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A.name", description: "ability.A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const circleOfProtection: IDataContainer<typeof dop, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(cop, {
  narrative: { name: "ability.9CF5DF9C-26BF-400C-9B72-D3D10E206485.name", description: "ability.9CF5DF9C-26BF-400C-9B72-D3D10E206485.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/9CF5DF9C-26BF-400C-9B72-D3D10E206485-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const fear: IDataContainer<typeof f, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(f, {
  narrative: { name: "ability.D6454F3A-9770-45E1-A13B-179CD9A099E7.name", description: "ability.D6454F3A-9770-45E1-A13B-179CD9A099E7.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/D6454F3A-9770-45E1-A13B-179CD9A099E7-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const mindControl: IDataContainer<typeof mc, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(mc, {
  narrative: { name: "ability.A22805E4-BB88-4829-8651-D47C566F57AA.name", description: "ability.A22805E4-BB88-4829-8651-D47C566F57AA.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/A22805E4-BB88-4829-8651-D47C566F57AA-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});

export const burning: IDataContainer<typeof bu, INarrationMedium, IVisualMedium<IVisualUiData>> = Object.assign(bu, {
  narrative: { name: "ability.0CD9349E-B8F9-4BE1-9A00-6B137AFF817A.name", description: "ability.0CD9349E-B8F9-4BE1-9A00-6B137AFF817A.description" },
  visual: {
    ui: { icon: '', avatar: { url: "abilities/0CD9349E-B8F9-4BE1-9A00-6B137AFF817A-avatar.png" } }
  },
  isNarrationMedium: true as const,
  isVisualMedium: true as const
});