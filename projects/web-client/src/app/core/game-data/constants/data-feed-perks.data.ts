
import { IDataContainer } from "../interface/data-container.interface";
import { IUiData } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { IUiMedium } from "../../game-ui/mixins/ui-medium/ui-medium.interface";
import { INarrativeMedium } from "../../game-ui/mixins/narrative-medium/narrative-medium.interface";
import { IPerk } from "@game-logic/lib/modules/perks/perk.interface";
import { PERK_UNLOCKED_CONDITION } from "@game-logic/lib/modules/perks/aspects/conditions/perk-unlocked.condition";
import { UNLOCK_PERK_ACTIVITY, PERK_RESOURCE_TYPE } from "@game-logic/lib/modules/perks/perk.constants";
import { IMPROVE_STATS_RESOURCE } from "./progression.data";
import { AssetType } from "../../game-ui/constants/asset-type";


export const additionalAtackPerk: IDataContainer<IPerk, INarrativeMedium, IUiMedium> = {
  id: "1E7163D6-6166-400D-985D-207B104C1307",
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  levels: [
    { level: 1, unlockConditions: [{ delegateId: PERK_UNLOCKED_CONDITION, payload: { perkId: "8265D85B-E74E-449D-A612-23E5860368FE", level: 1 } }] },
  ],
  activities: [
    { id: UNLOCK_PERK_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: PERK_RESOURCE_TYPE }], isMixin: true, isActivity: true }
  ],
  narrative: { name: "perks.1E7163D6-6166-400D-985D-207B104C1307.name", description: "perks.1E7163D6-6166-400D-985D-207B104C1307.description" },

  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "perks/1E7163D6-6166-400D-985D-207B104C1307-avatar", ext: "png" }},
  isNarrationMedium: true as const,
  isUiMedium: true as const,
}

export const dualWieldPerk: IDataContainer<IPerk, INarrativeMedium, IUiMedium> = {
  id: "8265D85B-E74E-449D-A612-23E5860368FE",
  prevPerkId: additionalAtackPerk.id,
  isEntity: true,
  isActivitySubject: true,
  isMixin: true,
  levels: [
    { level: 1, unlockConditions: [{ delegateId: PERK_UNLOCKED_CONDITION, payload: { perkId: "8265D85B-E74E-449D-A612-23E5860368FE", level: 1 } }] },
  ],
  activities: [
    { id: UNLOCK_PERK_ACTIVITY, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE, resourceType: PERK_RESOURCE_TYPE }], isMixin: true, isActivity: true }
  ],
  narrative: { name: "perks.8265D85B-E74E-449D-A612-23E5860368FE.name", description: "perks.8265D85B-E74E-449D-A612-23E5860368FE.description" },

  uiData: { icon: '', avatar: { type: AssetType.Avatar,  fileName: "perks/8265D85B-E74E-449D-A612-23E5860368FE-avatar", ext: "png" }},

  isNarrationMedium: true as const,
  isUiMedium: true as const,
}