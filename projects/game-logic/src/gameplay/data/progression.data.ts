import { IActivityResource } from "../../lib/base/activity/activity.interface";
import { IPromotionDefinition } from "../../lib/modules/progression/progression.interface";


export const IMPROVE_STATS_RESOURCE = "IMPROVE_STATS_RESOURCE";

export const improveStatsInteractionResource: IActivityResource = {
  id: IMPROVE_STATS_RESOURCE,
  value: 1,
  isResource: true
}


const firstLevelPromotion: IPromotionDefinition = {
  level: 2,
  requiredExperience: 200,
  actions: [],
}