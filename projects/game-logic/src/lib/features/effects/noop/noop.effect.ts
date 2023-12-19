import { IPayloadDefinition } from "../commons/effect-payload-collector/effect-payload.interface";
import { EffectName } from "../commons/effect.constants";
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