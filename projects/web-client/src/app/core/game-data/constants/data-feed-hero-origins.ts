import { IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { IHeroOriginDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero-origin/hero-origin.interface";
import { area1 } from "./data-feed-areas";
import { AssetType } from "../../game-ui/constants/asset-type";


export const adventurer: IDataContainer<IHeroOriginDeclaration, INarrativeMedium, IUiMedium> = {
  id: "829FEEA3-A80B-46D6-ADAC-07B844F09822",
  startingAreaId: area1.id,
  activeQuestIds: [],
  narrative: {
    name: "hero-origins.829FEEA3-A80B-46D6-ADAC-07B844F09822.name",
    description: "hero-origins.829FEEA3-A80B-46D6-ADAC-07B844F09822.description"
  },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "hero/829FEEA3-A80B-46D6-ADAC-07B844F09822-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const,
  isHeroOrigin: true,
  isEntity: true
}

export const noble: IDataContainer<IHeroOriginDeclaration, INarrativeMedium, IUiMedium> = {
  id: "CD8A2ADE-19F4-4D03-9C18-FF9C6092F995",
  startingAreaId: area1.id,
  activeQuestIds: [],
  narrative: {
    name: "hero-origins.CD8A2ADE-19F4-4D03-9C18-FF9C6092F995.name",
    description: "hero-origins.CD8A2ADE-19F4-4D03-9C18-FF9C6092F995.description"
  },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "hero/CD8A2ADE-19F4-4D03-9C18-FF9C6092F995-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const,
  isHeroOrigin: true,
  isEntity: true
}