import { EffectName } from "../commons/effect.constants";
import { IEffectBase, IEffectCaster, IEffectDeclarationBase, IEffectSelector, IEffectSignatureBase } from "../commons/effect.interface";
import { IEffectPayload } from "../payload-definition.interface";
import { IEffect } from "../resolve-effect.interface";
import { IEffectSignature } from "../signature.interface";

export interface ITriggerActorEffect extends IEffectBase, IEffectSelector {
  effectName: EffectName.TriggerEffect;
}

export interface ITriggerActorEffectDefinition extends IEffectDeclarationBase {
  effect: ITriggerActorEffect;
  effectName: EffectName.TriggerEffect;
  caster: IEffectCaster;
} 

export interface ITriggerActorEffectPayload extends ITriggerActorEffectDefinition {
  payload: { effect: IEffect }[];
  nestedPayloads: IEffectPayload[]
}

export interface ITriggerActorSignature extends IEffectSignatureBase {
  effectName: EffectName.TriggerEffect;
  data: {
    casterId: string;
    signatures: IEffectSignature[]
  }
}