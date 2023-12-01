import { IEffectPayload } from "@game-logic/lib/features/effects/payload-definition.interface";
import { GatheringPayloadHook } from "../constants/gathering-payload-hooks";
import { EffectPayloadCollector } from "@game-logic/lib/features/effects/effect-payload-collector";

export interface IGatherPayloadStep {
  name: GatheringPayloadHook,
  payload?: IEffectPayload,
  collector: EffectPayloadCollector
}