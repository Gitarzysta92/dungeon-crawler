import { IPayloadDefinition } from "../effect-payload.interface";

export function getNoopPayloadDefinition(): IPayloadDefinition  {
  return {
    caster: {} as any,
    effect: {} as any,
    gatheringSteps: []
  }
}