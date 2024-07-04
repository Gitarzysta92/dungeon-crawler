import {
  //basicAttack as ba,
  move as m,
  fireball as fb,
  teleport as tele,
  selfHealing as heal,
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
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";



// export const basicAttack: IDataContainer<typeof ba, INarrativeMedium, IUiMedium> = Object.assign(ba, {
//   narrative: { name: "abilities.A3ED3076-47E7-479B-86B4-147E07DA584C.name", description: "abilities.A3ED3076-47E7-479B-86B4-147E07DA584C.description" },
//   uiData: { icon: '', avatar: { url: "abilities/A3ED3076-47E7-479B-86B4-147E07DA584C-avatar.png" } },
//   isNarrationMedium: true as const,
//   isUiMedium: true as const,
//   isCommand: true,
//   //commandName: 
// });

export const move: IDataContainer<typeof m, INarrativeMedium, IUiMedium> = Object.assign(m, {
  narrative: { name: "abilities.34FB322A-EAED-439F-865A-1BEEF206560D.name", description: "abilities.34FB322A-EAED-439F-865A-1BEEF206560D.description" },
  uiData: { icon: '', avatar: { url: "abilities/34FB322A-EAED-439F-865A-1BEEF206560D-avatar.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const fireball: IDataContainer<typeof fb, INarrativeMedium, IUiMedium> = Object.assign(fb, {
  narrative: { name: "abilities.A1F8217E-5C5B-4512-A6CE-6C553AC587F0.name", description: "abilities.A1F8217E-5C5B-4512-A6CE-6C553AC587F0.description" },
  uiData: { icon: '', avatar: { url: "abilities/A1F8217E-5C5B-4512-A6CE-6C553AC587F0-avatar.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const teleport: IDataContainer<typeof tele, INarrativeMedium, IUiMedium> = Object.assign(tele, {
  narrative: { name: "abilities.C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E.name", description: "abilities.C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E.description" },
  uiData: { icon: '', avatar: { url: "abilities/C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E-avatar.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const healing: IDataContainer<typeof heal, INarrativeMedium, IUiMedium> = Object.assign(heal, {
  narrative: { name: "abilities.4A75B866-3878-4D23-954E-9DC4E6663DAE.name", description: "abilities.4A75B866-3878-4D23-954E-9DC4E6663DAE.description" },
  uiData: { icon: '', avatar: { url: "abilities/4A75B866-3878-4D23-954E-9DC4E6663DAE-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const vision: IDataContainer<typeof v, INarrativeMedium, IUiMedium> = Object.assign(v, {
  narrative: { name: "abilities.605E23E0-6DB9-4B09-A84B-B4738E5D9E55.name", description: "abilities.605E23E0-6DB9-4B09-A84B-B4738E5D9E55.description" },
  uiData: { icon: '', avatar: { url: "abilities/605E23E0-6DB9-4B09-A84B-B4738E5D9E55-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const weakness: IDataContainer<typeof w, INarrativeMedium, IUiMedium> = Object.assign(w, {
  narrative: { name: "abilities.A7A7B211B-92FB-4417-B1A9-853FB1564F0A.name", description: "abilities.A7A7B211B-92FB-4417-B1A9-853FB1564F0A.description" },
  uiData: { icon: '', avatar: { url: "abilities/A7A7B211B-92FB-4417-B1A9-853FB1564F0A-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const curse: IDataContainer<typeof c, INarrativeMedium, IUiMedium> = Object.assign(c, {
  narrative: { name: "abilities.636642BE-EA42-4482-B81C-48D8398D3BC5.name", description: "abilities.636642BE-EA42-4482-B81C-48D8398D3BC5.description" },
  uiData: { icon: '', avatar: { url: "abilities/636642BE-EA42-4482-B81C-48D8398D3BC5-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const meteor: IDataContainer<typeof ms, INarrativeMedium, IUiMedium> = Object.assign(ms, {
  narrative: { name: "abilities.B0D3E90C-E359-43C9-A42F-30D9B37B2E0E.name", description: "abilities.B0D3E90C-E359-43C9-A42F-30D9B37B2E0E.description" },
  uiData: { icon: '', avatar: { url: "abilities/B0D3E90C-E359-43C9-A42F-30D9B37B2E0E-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const cleansingMove: IDataContainer<typeof cm, INarrativeMedium, IUiMedium> = Object.assign(cm, {
  narrative: { name: "abilities.85745620-91E7-4BDB-BE6A-EBE7B207E4DD.name", description: "abilities.85745620-91E7-4BDB-BE6A-EBE7B207E4DD.description" },
  uiData: { icon: '', avatar: { url: "abilities/85745620-91E7-4BDB-BE6A-EBE7B207E4DD-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const domeOfProtection: IDataContainer<typeof dop, INarrativeMedium, IUiMedium> = Object.assign(dop, {
  narrative: { name: "abilities.A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A.name", description: "abilities.A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A.description" },
  
  uiData: { icon: '', avatar: { url: "abilities/A2D0A8C0-B3DD-4E6E-A5B4-49C05BD0F39A-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const circleOfProtection: IDataContainer<typeof dop, INarrativeMedium, IUiMedium> = Object.assign(cop, {
  narrative: { name: "abilities.9CF5DF9C-26BF-400C-9B72-D3D10E206485.name", description: "abilities.9CF5DF9C-26BF-400C-9B72-D3D10E206485.description" },
  uiData: { icon: '', avatar: { url: "abilities/9CF5DF9C-26BF-400C-9B72-D3D10E206485-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const fear: IDataContainer<typeof f, INarrativeMedium, IUiMedium> = Object.assign(f, {
  narrative: { name: "abilities.D6454F3A-9770-45E1-A13B-179CD9A099E7.name", description: "abilities.D6454F3A-9770-45E1-A13B-179CD9A099E7.description" },
  uiData: { icon: '', avatar: { url: "abilities/D6454F3A-9770-45E1-A13B-179CD9A099E7-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const mindControl: IDataContainer<typeof mc, INarrativeMedium, IUiMedium> = Object.assign(mc, {
  narrative: { name: "abilities.A22805E4-BB88-4829-8651-D47C566F57AA.name", description: "abilities.A22805E4-BB88-4829-8651-D47C566F57AA.description" },
  uiData: { icon: '', avatar: { url: "abilities/A22805E4-BB88-4829-8651-D47C566F57AA-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});

export const burning: IDataContainer<typeof bu, INarrativeMedium, IUiMedium> = Object.assign(bu, {
  narrative: { name: "abilities.0CD9349E-B8F9-4BE1-9A00-6B137AFF817A.name", description: "abilities.0CD9349E-B8F9-4BE1-9A00-6B137AFF817A.description" },
  uiData: { icon: '', avatar: { url: "abilities/0CD9349E-B8F9-4BE1-9A00-6B137AFF817A-avatar.png" } },
  
  isNarrationMedium: true as const,
  isUiMedium: true as const
});