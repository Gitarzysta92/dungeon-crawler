import { IEffect, IEffectPayload } from "../effects-commons.interface";
import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectPayloadBase, IEffectSelector } from "../effects.interface";

export interface ITriggerEffect extends IEffectBase, IEffectSelector {
  effectName: EffectName.TriggerEffect;
}

export interface ITriggerEffectPayload extends IEffectPayloadBase {
  effectName: EffectName.TriggerEffect;
  payload: Array<{
    effect: IEffect,
    effectPayload: IEffectPayload
  }>
}

export interface IDealDamagePayloadGatheringSteps {
  effectName: EffectName.TriggerEffect;
  gatheringSteps: {
    [key: string]: {
      dataName: 'actor' | 'effect';
    }
  }
}