import { IActor, IBasicStats, IEnemy } from "../../actors/actors.interface";
import { IBoardObject, IBoardSelector } from "../../board/board.interface";
import { EffectName, DamageType } from "../effects.constants";
import { IEffectBase, IEffectCaster, IEffectDefinitionBase, IEffectSignatureBase } from "../effects.interface";

export interface IDealDamage extends IEffectBase {
  effectName: EffectName.DealDamage;
  damageType: DamageType;
  damageValue: number;
}

export interface IDealDamageDefinition extends IEffectDefinitionBase  {
  effect: IDealDamage & IBoardSelector;
  effectName: EffectName.DealDamage;
  caster: IEffectCaster;
}

export interface IDealDamagePayload extends IDealDamageDefinition {
  payload: {
    caster: IActor & IEffectCaster & IBasicStats & Partial<IBoardObject>;
    actor: IEnemy & IBoardObject;
  }[];
}

export interface IDealDamageSignature extends IEffectSignatureBase {
  effectName: EffectName.DealDamage;
  data: {
    damageType: DamageType;
    casterId: string;
    targets: Array<{
      damageDone: number;
      targetId: string;
    }>
  }
}