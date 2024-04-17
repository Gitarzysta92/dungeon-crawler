import { PERK_UNLOCKED_CONDITION } from "../../lib/modules/perks/aspects/conditions/perk-unlocked.condition";
import { PERK_RESOURCE_TYPE, UNLOCK_PERK_ACTIVITY } from "../../lib/modules/perks/perk.constants";
import { IPerk } from "../../lib/modules/perks/perk.interface";
import { IMPROVE_STATS_RESOURCE } from "./progression.data";


export const additionalAtackPerk: IPerk = {
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
}

export const dualWieldPerk: IPerk = {
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
}
