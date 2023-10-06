import { EffectName } from "./effects.constants";

export const modifyStatisticsPayloadDefinition = {
  effectName: EffectName.ModifyStats,
  gatheringSteps: [
    { dataName: 'actor', dataType: 'object' }
  ]
}