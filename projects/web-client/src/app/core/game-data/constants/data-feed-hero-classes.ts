
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IDataContainer } from "../interface/data-container.interface";
import { IHeroClassDeclaration } from "@game-logic/gameplay/modules/heroes/mixins/hero-class/hero-class.interface";
import { AssetType } from "../../game-ui/constants/asset-type";



export const warrior: IDataContainer<IHeroClassDeclaration, INarrativeMedium, IUiMedium> = {
  id: "2FB317CE-DD9E-4256-B0E0-E6EC34090020",
  abilities: [],
  perks: [],
  isHeroClass: true,
  isEntity: true, 
  narrative: {
    name: "hero-classes.2FB317CE-DD9E-4256-B0E0-E6EC34090020.name",
    description: "hero-classes.2FB317CE-DD9E-4256-B0E0-E6EC34090020.description"
  },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "hero/2FB317CE-DD9E-4256-B0E0-E6EC34090020-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
}

export const mage: IDataContainer<IHeroClassDeclaration, INarrativeMedium, IUiMedium> = {
  id: "777DEB7C-862C-4F7F-B2E3-690F77CDB2CB",
  abilities: [],
  perks: [],
  isHeroClass: true,
  isEntity: true, 
  narrative: {
    name: "hero-classes.777DEB7C-862C-4F7F-B2E3-690F77CDB2CB.name",
    description: "hero-classes.777DEB7C-862C-4F7F-B2E3-690F77CDB2CB.description"
  },
  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "hero/777DEB7C-862C-4F7F-B2E3-690F77CDB2CB-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
  isMixin: true as const
}