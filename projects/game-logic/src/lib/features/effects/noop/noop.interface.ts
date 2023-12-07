import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../commons/effects-commons.interface";
import { EffectName } from "../commons/effects-commons.constants";


export interface INoopEffect extends IEffectBase {
  effectName: EffectName.Noop;
}


export interface INoopDefinition extends IEffectDefinitionBase  {
  effect: INoopEffect;
  effectName: EffectName.Noop;
  caster: IEffectCaster;
}

export interface INoopPayload extends INoopDefinition {
  payload: undefined;
}

export interface INoopSignature extends IEffectSignatureBase {
  effectName: EffectName.Noop;
  data: {
    casterId: string;
  }
}