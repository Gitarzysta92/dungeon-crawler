import { EffectName } from "./effects.constants";

export const spawnActorPayloadDefinition = {
  effectName: EffectName.SpawnActor,
  gatheringSteps: [
    { dataName: 'actor', dataType: 'object' },
    { dataName: 'coords', dataType: 'object' }
  ]
}