import { IEffectBase, IEffectCaster, IEffectDeclarationBase, IEffectSignatureBase } from "../commons/effect.interface";
import { EffectName } from "../commons/effect.constants";


export interface INoopEffect extends IEffectBase {
  effectName: EffectName.Noop;
}


export interface INoopDefinition extends IEffectDeclarationBase  {
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