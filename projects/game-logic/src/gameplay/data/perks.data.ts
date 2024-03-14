import { PERK_UNLOCKED_CONDITION } from "../../lib/modules/perks/aspects/conditions/perk-unlocked.condition";
import { UNLOCK_PERK_INTERACTION } from "../../lib/modules/perks/aspects/interactions/unlock-perk.interaction";
import { IPerk } from "../../lib/modules/perks/perk.interface";
import { IMPROVE_STATS_RESOURCE } from "./progression.data";


export const additionallAtackPerk: IPerk = {
  id: "1E7163D6-6166-400D-985D-207B104C1307",
  isEntity: true,
  levels: [
    { level: 1, unlockConditions: [{ delegateId: PERK_UNLOCKED_CONDITION, payload: { perkId: "8265D85B-E74E-449D-A612-23E5860368FE", level: 1 } }] },
  ],
  interaction: [
    { delegateId: UNLOCK_PERK_INTERACTION, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }
  ],
}

export const dualWield: IPerk = {
  id: "8265D85B-E74E-449D-A612-23E5860368FE",
  prevPerkId: additionallAtackPerk.id,
  isEntity: true,
  levels: [
    { level: 1, unlockConditions: [{ delegateId: PERK_UNLOCKED_CONDITION, payload: { perkId: "8265D85B-E74E-449D-A612-23E5860368FE", level: 1 } }] },
  ],
  interaction: [
    { delegateId: UNLOCK_PERK_INTERACTION, cost: [{ value: 1, resourceId: IMPROVE_STATS_RESOURCE }] }
  ],
}
