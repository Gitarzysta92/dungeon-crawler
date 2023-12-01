import { IPayloadDefinition } from "../effect-payload.interface";
import { EffectName } from "../effects.constants";
import { INoopPayload, INoopSignature } from "./noop.interface";

export function getNoopPayloadDefinition(): IPayloadDefinition  {
  return {
    caster: {} as any,
    effect: {} as any,
    gatheringSteps: []
  }
}


export function resolveNoop(
  modifyPositionPayload: INoopPayload
): INoopSignature {
  return {
    effectId: "noop",
    effectName: EffectName.Noop,
    data: {
      casterId: modifyPositionPayload.caster.id,
    }
  }
}