import {
  adventurer as a,
  noble as n
} from "@game-logic/gameplay/data/hero-origins";
import { IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";


export const adventurer: IDataContainer<typeof a, INarrativeMedium, IUiMedium> = Object.assign(a, {
  narrative: {
    name: "hero-origins.829FEEA3-A80B-46D6-ADAC-07B844F09822.name",
    description: "hero-origins.829FEEA3-A80B-46D6-ADAC-07B844F09822.description"
  },
  uiData: { icon: '', avatar: { url: "hero/829FEEA3-A80B-46D6-ADAC-07B844F09822-avatar.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
})

export const noble: IDataContainer<typeof n, INarrativeMedium, IUiMedium> = Object.assign(n, {
  narrative: {
    name: "hero-origins.CD8A2ADE-19F4-4D03-9C18-FF9C6092F995.name",
    description: "hero-origins.CD8A2ADE-19F4-4D03-9C18-FF9C6092F995.description"
  },
  uiData: { icon: '', avatar: { url: "hero/CD8A2ADE-19F4-4D03-9C18-FF9C6092F995-avatar.png" } },
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
})