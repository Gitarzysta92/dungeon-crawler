import { EffectName } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSelector } from "../effects.interface";
import { IEffectPayload } from "../payload-definition.interface";

export interface ITriggerActorEffect extends IEffectBase, IEffectSelector {
  effectName: EffectName.TriggerEffect;
}

export interface ITriggerActorEffectDefinition extends IEffectDefinitionBase {
  effect: ITriggerActorEffect;
  effectName: EffectName.TriggerEffect;
  caster: IEffectCaster;
} 

export interface ITriggerActorEffectPayload extends ITriggerActorEffectDefinition {
  payload: IEffectPayload[];
}
