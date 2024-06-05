import {
  staff as s,
  potion as p,
  gold as g,
  twoHandedSword as ths,
  boots as b,
  poo as po,
  magicPoo as mpo,
  travelSupplies as ts
} from "@game-logic/gameplay/data/items.data";
import { IDataContainer } from "../interface/data-container.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";


export const staff: IDataContainer<typeof s, INarrativeMedium, IUiMedium> = Object.assign(s, {
  narrative: { name: "abilities.ECCD311F-0161-49D0-BA39-3C4968B42497.name", description: "abilities.ECCD311F-0161-49D0-BA39-3C4968B42497.description" },
  uiData: { icon: '', avatar: { url: "items/staff.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const potion: IDataContainer<typeof p, INarrativeMedium, IUiMedium> = Object.assign(p, {
  narrative: { name: "abilities.DDD1EBED-5C4C-42B9-AF10-A66581D90AEF.name", description: "abilities.DDD1EBED-5C4C-42B9-AF10-A66581D90AEF.description" },
  uiData: { icon: '', avatar: { url: "items/health-potion.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const gold: IDataContainer<typeof g, INarrativeMedium, IUiMedium> = Object.assign(g, {
  narrative: { name: "abilities.A41EA621-6FCF-480F-ABB8-D57CA8AE1C1F.name", description: "abilities.A41EA621-6FCF-480F-ABB8-D57CA8AE1C1F.description" },
  uiData: { icon: '', avatar: { url: "items/currency.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const twoHandedSword: IDataContainer<typeof ths, INarrativeMedium, IUiMedium> = Object.assign(ths, {
  narrative: { name: "abilities.F35F997F-405B-4F0A-8A6D-82C771BF6A30.name", description: "abilities.F35F997F-405B-4F0A-8A6D-82C771BF6A30.description" },
  uiData: { icon: '', avatar: { url: "items/two-handed-sword.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const boots: IDataContainer<typeof b, INarrativeMedium, IUiMedium> = Object.assign(b, {
  narrative: { name: "abilities.9D993B4D-8D71-4C28-B86B-5427A5FD62A5.name", description: "abilities.9D993B4D-8D71-4C28-B86B-5427A5FD62A5.description" },
  uiData: { icon: '', avatar: { url: "items/boots.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const poo: IDataContainer<typeof po, INarrativeMedium, IUiMedium> = Object.assign(po, {
  narrative: { name: "abilities.301B6C05-2516-48E3-ADBA-EA01FE0EEF5E.name", description: "abilities.301B6C05-2516-48E3-ADBA-EA01FE0EEF5E.description" },
  uiData: { icon: '', avatar: { url: "items/poo.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const magicPoo: IDataContainer<typeof mpo, INarrativeMedium, IUiMedium> = Object.assign(mpo, {
  narrative: { name: "abilities.12A8A82C-E385-4201-B869-4A7C83FF7363.name", description: "abilities.12A8A82C-E385-4201-B869-4A7C83FF7363.description" },
  uiData: { icon: '', avatar: { url: "items/poo.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});

export const travelSupplies: IDataContainer<typeof ts, INarrativeMedium, IUiMedium> = Object.assign(ts, {
  narrative: { name: "abilities.B649BAA6-3905-465C-8B46-1E3586D3FF9D.name", description: "abilities.B649BAA6-3905-465C-8B46-1E3586D3FF9D.description" },
  uiData: { icon: '', avatar: { url: "items/backpack.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
});