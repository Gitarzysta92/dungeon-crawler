import { IEffectBase, IEffectCaster, IEffectDefinitionBase } from "../effects.interface";
import { EffectName } from "../effects.constants";


export interface INoopEffect extends IEffectBase {
  effectName: EffectName.Noop;
}


export interface INoopDefinition extends IEffectDefinitionBase  {
  effect: INoopEffect;
  effectName: EffectName.Noop;
  caster: IEffectCaster;
}


